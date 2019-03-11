/*
 * Copyright (c) 2018-2019 Pavel Kastornyy. All rights reserved.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 */

import gulp from 'gulp';
import fs from 'fs';
import packageJson from './../package.json'
const execSync = require('child_process').execSync;
import path from 'path';
import rimraf from 'rimraf';

const MODULES_PATH = __dirname + path.sep + '..' + path.sep + 'modules';
const TEMP_FOLDER = 'tmp';
const DIST_FOLDER = 'dist';
const SRC_FOLDER = 'src';
const TEST_FOLDER = 'test';
const MAIN_DIST_PATH = __dirname + path.sep + '..' + path.sep + DIST_FOLDER;

const MODULE_TYPE = {
    PRODUCTION : 1,
    TESTING: 2,
    TESTS : 3
};

export function installModules() {
    for (let i = 0; i < packageJson.modules.length; i++) {
        const MODULE_PATH = MODULES_PATH + path.sep + packageJson.modules[i];
        //when we need npm install in another folder we do : 	//npm --prefix ./some_project install ./some_project
        execSync('npm run --prefix "' + MODULE_PATH + '" install-module', {stdio: 'inherit', shell: true});
    }
}

export function uninstallModule(modulePath) {
    uninstallNodeProject(modulePath);
}

export function uninstallModules() {
    for (let i = 0; i < packageJson.modules.length; i++) {
	uninstallModule(MODULES_PATH + path.sep + packageJson.modules[i]);
    }
}

export function uninstallAll() {
    uninstallNodeProject(__dirname + path.sep + '..');
    uninstallModules();
}

export function buildModule(modulePath) {
    return doBuildModule(modulePath, MODULE_TYPE.PRODUCTION);
}

export function buildModules() {
    for (let i = 0; i < packageJson.modules.length; i++) {
	buildModule(MODULES_PATH + path.sep + packageJson.modules[i]);
    }
}

export function cleanModule(modulePath) {
    cleanNodeProject(modulePath);
}

export function cleanModules() {
    for (let i = 0; i < packageJson.modules.length; i++) {
	cleanModule(MODULES_PATH + path.sep + packageJson.modules[i]);
    }
}

export function cleanAll() {
    cleanNodeProject(__dirname + path.sep + '..');
    cleanModules();
}

export function testModule(modulePath) {
    doBuildModule(modulePath, MODULE_TYPE.TESTING);
    doBuildModule(modulePath, MODULE_TYPE.TESTS);
    runModuleTests(modulePath);
}

export function testModules() {
    for (let i = 0; i < packageJson.modules.length; i++) {
	testModule(MODULES_PATH + path.sep + packageJson.modules[i]);
    }
}

function uninstallNodeProject(projectPath) {
    const NODE_MODULES_PATH = projectPath + path.sep + 'node_modules';
    const PACKAGE_LOCK_PATH = projectPath + path.sep + 'package-lock.json';
    if (fs.existsSync(NODE_MODULES_PATH)) {
        rimraf.sync(NODE_MODULES_PATH);
    }
    if (fs.existsSync(PACKAGE_LOCK_PATH)) {
        fs.unlinkSync(PACKAGE_LOCK_PATH);
    }
}

function cleanNodeProject(projectPath) {
    const MODULE_DIST_PATH = projectPath + path.sep + DIST_FOLDER;
    const MODULE_TEMP_PATH = projectPath + path.sep + TEMP_FOLDER;
    if (fs.existsSync(MODULE_DIST_PATH)) {
        rimraf.sync(MODULE_DIST_PATH);
    }
    if (fs.existsSync(MODULE_TEMP_PATH)) {
        rimraf.sync(MODULE_TEMP_PATH);
    }
}

function doBuildModule(modulePath, moduleType) {
    let typescriptPath = null;
    let moduleTsFileName = null;
    let moduleJsFileName = null;
    let targetFolderPath = null;
    let testedModuleName = null;
    if (moduleType !== MODULE_TYPE.TESTS) {
        typescriptPath = modulePath + path.sep + SRC_FOLDER;
    } else {
        typescriptPath = modulePath + path.sep + TEST_FOLDER;
    }
    let module = require(typescriptPath + path.sep + 'module-info.js');
    if (moduleType === MODULE_TYPE.PRODUCTION) {
        moduleTsFileName = module.name + '.ts';
        moduleJsFileName = module.name + '.js';
        targetFolderPath = modulePath + path.sep + DIST_FOLDER;
    } else if (moduleType === MODULE_TYPE.TESTING) {
        moduleTsFileName = module.name + '.4spec.ts';
        targetFolderPath = modulePath + path.sep + TEMP_FOLDER;
    } else if (moduleType === MODULE_TYPE.TESTS) {
        moduleTsFileName = module.name + '.ts';
        targetFolderPath = modulePath + path.sep + TEMP_FOLDER;
        testedModuleName = resolve4SpecModuleName(module.name);
    }
    try {
        let classesToExport = [];
        let classesToImport = [];//name = moduleName + . + className
        let totalData = '';
        for (let i = 0; i < module.classes.length; i++) {
            let classFullName = module.classes[i];
            extractClassesToExport(module, classFullName, classesToExport);
            let data = fs.readFileSync(typescriptPath + path.sep + classFullName.replace(/\./g, "/") + ".ts", 'utf8');
            extractClassesToImport(data, classesToImport, moduleType, testedModuleName);
            //now we can remove import lines from data
            data = removeImportLines(data);
            //for dist module we make "exports" changes
            if (moduleType === MODULE_TYPE.PRODUCTION) {
                data = removeExportLines(data);
            }
            totalData += data
                    + '\n\n/* ===================================='
                    + '========================================= */\n\n';
        }
        if (classesToImport.length > 0) {
            totalData = buildImport(module, classesToImport, moduleType) + totalData;
        }
        if (classesToExport.length > 0 && (moduleType === MODULE_TYPE.PRODUCTION)) {
            totalData += buildExport(classesToExport);
        }
        if (!fs.existsSync(targetFolderPath)){
            fs.mkdirSync(targetFolderPath, { recursive: false }, (err) => {
                if (err) throw err;
            });
        }
        fs.writeFileSync(targetFolderPath + path.sep + moduleTsFileName, totalData, { flag: 'w' }, function(err) {
            if(err) return console.error(err);
        });
        //now we can compile, we don't use gulp-typescript as wee need more controll.
        //+ ' --typeRoots ./node_modules/@types',
        execSync('npx tsc "' + targetFolderPath + path.sep + moduleTsFileName
                        + '" --target ES6 --removeComments --moduleResolution Node',
                {stdio: 'inherit', shell: true});
        if (moduleType === MODULE_TYPE.PRODUCTION) {
            if (!fs.existsSync(MAIN_DIST_PATH)){
                fs.mkdirSync(MAIN_DIST_PATH, { recursive: false }, (err) => {
                    if (err) throw err;
                });
            }
            let distTsFilePath = MAIN_DIST_PATH + path.sep + module.name + '-' + packageJson.version + '.ts';
            let distJsFilePath = MAIN_DIST_PATH + path.sep + module.name + '-' + packageJson.version + '.js'
            makeDistFile(targetFolderPath + path.sep + moduleTsFileName, distTsFilePath, distModuleFixer, module);
            makeDistFile(targetFolderPath + path.sep + moduleJsFileName, distJsFilePath, distModuleFixer, module);
        }

    } catch(e) {
        console.log('Error:', e.stack);
    }
}

/**
 Mocha doesn't support ES6. So, we do this way:

        spec files written in
        plain ES6 JavaScript
             |
             |
mocha ---> reading the files
             |
babel ---> compiles the files
           from ES6 to ES5
             |
mocha ---> running the tests
             |
             |
        test results
 */
function runModuleTests(modulePath) {
    let typescriptPath = modulePath + path.sep + TEST_FOLDER;
    let module = require(typescriptPath + path.sep + 'module-info.js');
    let testFilePath = modulePath + path.sep + TEMP_FOLDER + path.sep + module.name + ".js";
    let babelRegisterPath = __dirname + path.sep + 'babelregister.js';
    //With npx you can invoke locally installed utilities like globally installed utilities 
    //(but you must begin the command with npx). 
    //mocha can be called ONLY witin project folder, so we have to use `cd`
    execSync('cd "' + modulePath + '" && npx mocha "' + testFilePath + '" --require "' + babelRegisterPath + '"',
                {stdio: 'inherit', shell: true});
}

function removeImportLines(data) {
    return data.replace(/^import.*$\n/gm, '');
}

function removeExportLines(data) {
    //console.log(data);
    let regexpNotGlobal = /export\s+[class|interface|abstract|enum|function]/;
    data = data.replace(regexpNotGlobal, function(match){
        return match.replace("export", "").trim();
    });
    let regexpGlobal = /export\s+namespace/g;
    data = data.replace(regexpGlobal, function(match){
        return match.replace("export", "").trim();
    });
    return data;
}

function extractClassesToExport(module, classFullName, classesToExport) {
    let lastDotIndex = classFullName.lastIndexOf(".");
    let classShortName = classFullName.substr(lastDotIndex + 1);
    let classPackage = classFullName.substr(0, lastDotIndex);
    if (!("export" in module) || !("packages" in module.export)) {
        return;
    }
    if (module.export.packages.indexOf(classPackage) > -1) {
        if ('exclude' in module.export) {
            if (module.export.exclude.indexOf(classFullName) == -1) {
                classesToExport.push(classShortName);
            }
        } else {
            classesToExport.push(classShortName);
        }
    }
}

function extractClassesToImport(data, classesToImport, moduleType, testedModuleName) {
    let importRegExp = /^import.*$\n/gm;
    let classAndModuleRegExp = /\{\s*(\w+)\s*\}\s+from\s+["']([\w\.\/]+)["']/;
    let importExecResult;
    do {
        importExecResult = importRegExp.exec(data);
        if (importExecResult) {
            let arr = importExecResult[0].match(classAndModuleRegExp);
            if (arr !== null) {
                let shouldAddClass = true;
                //there are two types of import - import within module and import from other module
                //this is internal import (within module)
                if (arr[2].startsWith("./")) {
                    if (moduleType === MODULE_TYPE.PRODUCTION || moduleType === MODULE_TYPE.TESTING) {
                        shouldAddClass = false;
                    } else {
                        arr[2] = testedModuleName;
                    }
                }
                let classNameWithModule = arr[2] + "." + arr[1];
                if (shouldAddClass && classesToImport.indexOf(classNameWithModule) === -1) {
                    classesToImport.push(classNameWithModule);
                }
            }
        }
    } while (importExecResult);
}

function buildImport(module, classesToImport, moduleType) {
    if (classesToImport.length === 0) {
        return "";
    }
    let dataHolder = {};
    for (let i = 0; i < module.import.modules.length; i++) {
        //create array for every module
        dataHolder[module.import.modules[i]] = [];
    }
    for (let i = 0; i < classesToImport.length; i++) {
        let lastDotIndex = classesToImport[i].lastIndexOf(".");
        let classShortName = classesToImport[i].substr(lastDotIndex + 1);
        let moduleName = classesToImport[i].substr(0, lastDotIndex);
        dataHolder[moduleName].push(classShortName);
    }
    let result = "";
    for (let i = 0; i < module.import.modules.length; i++) {
	let importStr = "import ";
        //there is nothing to import, so we import all module.
        let moduleName = module.import.modules[i];
        if (dataHolder[moduleName].length === 0) {
            importStr += "'" + moduleName + "'";
        } else {
            importStr += "{\n"
            for (let z = 0; z < dataHolder[moduleName].length; z++) {
                if (z > 0) {
                    importStr += ",\n";
                }
                importStr += "    " + dataHolder[moduleName][z];
            }
            //we need to show where to look for 4spec module.
            if (moduleType === MODULE_TYPE.TESTS && moduleName === resolve4SpecModuleName(module.name)) {
                importStr +="\n} from './" + moduleName + "'";
            } else {
                importStr +="\n} from '" + moduleName + "'";
            }

        }
	result += importStr + ";\n";
    }
    return result;
}

function buildExport(classesToExport) {
    let exportStr = "";
    for (let n = 0; n < classesToExport.length; n++) {
        if (n > 0) {
            exportStr += ",";
        }
        exportStr += "\n    " + classesToExport[n];
    }
    return "\nexport {" + exportStr + "\n}";
}

function resolve4SpecModuleName(moduleName) {
    return moduleName.replace(".spec", ".4spec")
}

function makeDistFile(src, dest, fixer, module) {
  if (!fs.existsSync(src)) {
       return false;
  }
  let data = fs.readFileSync(src, 'utf-8');
  data = fixer(data, module)
  fs.writeFileSync(dest, data, { flag: 'w' });
}

function distModuleFixer(data, module) {
    if (!("import" in module) || !("modules" in module.import)) {
        return data;
    }
    //let regExpStr = "^} from '(";
    //[] is only for one character
    let regExpStr = "^import (\\{$[\\s\\S]*^\\} from )*'(";
    let isFirst = true;
    for (let i = 0; i < module.import.modules.length; i++) {
        //if imported module is from script4j modules
        if (packageJson.modules.indexOf(module.import.modules[i]) > -1) {
            if (!isFirst) {
                regExpStr += "|";
            }
            regExpStr += module.import.modules[i];
            isFirst = false;
        }
    }
    regExpStr += ")';";
    let regExp = new RegExp(regExpStr, "gm");
    data = data.replace(regExp, function(param, p1, p2) {
        //param is the full expression: import ... 'module';
        //p2 is the name of the module
        return param.replace(p2, "./" + p2 + "-" + packageJson.version);
    })
    return data;
}