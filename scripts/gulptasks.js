/*
 * Copyright (c) 2018 Pavel Kastornyy. All rights reserved.
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
import concat from 'gulp-concat';
import deleteLines from 'gulp-delete-lines';
import replace from 'gulp-replace';
import insert from 'gulp-insert';
import typescript from 'gulp-typescript';
import packageJson from './../package.json'
import gulpif from 'gulp-if';
import mocha from 'gulp-mocha';
var spawn = require('child_process').spawn;

const MODULES_PATH = __dirname + "/../modules/";
const DIST_PATH = __dirname + '/../dist/';

export function installModules() {
    for (let i = 0; i < packageJson.modules.length; i++) {
	let child = spawn('cd ' + MODULES_PATH + packageJson.modules[i] + ' && npm install',
		{stdio: 'inherit', shell: true});
    }
}

export function uninstallModules() {
    for (let i = 0; i < packageJson.modules.length; i++) {
	let child = spawn('cd ' + MODULES_PATH + packageJson.modules[i]
                + ' && rm -rf node_modules && rm -f package-lock.json',
		{stdio: 'inherit', shell: true});
    }
}

export function buildModule(modulePath, isForTesting) {
    return doBuildModule(modulePath, false, isForTesting);
}

export function buildTestModule(modulePath) {
    return doBuildModule(modulePath, true, true);
}

function doBuildModule(modulePath, isTestModule, isForTesting) {
    let typescriptPath = null;
    let moduleFileName = null;
    if (!isTestModule) {
        typescriptPath = modulePath + '/src';
    } else {
        typescriptPath = modulePath + '/test';
    }
    let module = require(typescriptPath + '/module-info.js');
    if (!isTestModule && isForTesting) {
        moduleFileName = module.name + '.4tests-' + packageJson.version +  '.ts';
    } else {
        moduleFileName = module.name + '-' + packageJson.version +  '.ts';
    }
    return gulp.src(resolvePaths(typescriptPath, module.classes))
        .pipe(concat(moduleFileName, concatSettings()))
        .pipe(deleteLines({
          'filters': [
                /^import/i
         ]}))
        .pipe(insert.prepend(buildImportSection(module.import)))
        .pipe(gulpif(!isForTesting, replace(/export(.{10})/g, removeExports)))
        .pipe(gulpif(!isForTesting, insert.append(buildExportSection(module.export))))
        .pipe(gulp.dest(modulePath + '/lib/'))//to module/lib
        .pipe(gulpif((!isForTesting && !isTestModule), gulp.dest(DIST_PATH)))//to script4j/dist
        .pipe(typescript({
            noImplicitAny: true,
//            outFile: module.name + '-' + packageJson.version + '.js',
            target: 'ES2015',
            removeComments: true
        }))
        .pipe(gulp.dest(modulePath + '/lib/'))//to module/lib
        .pipe(gulpif((!isForTesting && !isTestModule), gulp.dest(DIST_PATH)));//to script4j/dist
}

export function buildModules() {
    for (let i = 0; i < packageJson.modules.length; i++) {
	buildModule(MODULES_PATH + packageJson.modules[i]);
    }
}

export function cleanModule(modulePath) {
    let child = spawn('rm -rf ' + modulePath + '/lib', {stdio: 'inherit', shell: true});
}

export function cleanModules() {
    for (let i = 0; i < packageJson.modules.length; i++) {
	cleanModule(MODULES_PATH + packageJson.modules[i]);
    }
}

//export function testModule(modulePath) {
//    let task1 = buildModule(modulePath, true);
//    let task2 = buildTestModule(modulePath);
//    let task3 = runModuleTests(modulePath);
//    return [task1, task2, task1];
//}

/**
 * Mocha doesn't support ES6. So, we do this way
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
export function runModuleTests(modulePath) {
    let typescriptPath = modulePath + '/test';
    let module = require(typescriptPath + '/module-info.js');
    let testFile = modulePath + '/lib/' + module.name + "-" + packageJson.version + ".js";
    return gulp.src([testFile], { read: false })
        .pipe(mocha({
            reporter: 'spec',
            compilers: [
                'js:babel-core/register',
            ]
    }));
}

function resolvePaths(base, classes) {
    let result = [];
    for (let i = 0; i < classes.length; i++) {
	result.push(base + "/" + classes[i]);
    }
    return result;
}

function removeExports(match, p1, offset, string) {
    //console.log('Found ' + match + ' with param ' + p1 + ' at ' + offset);
    p1 = p1.trimLeft();
    if (p1.startsWith('class')) {
	return p1;
    }
    return 'export';
}

function buildImportSection(importSection) {
    if (importSection === undefined) {
	return "";
    }
    let result = "";
    for (let i = 0; i < importSection.length; i++) {
	let importObj = importSection[i];
	let importStr = "import ";
        if ("from" in importObj) {
            importStr += "{\n";
        }
	for (let z = 0; z < importObj.classes.length; z++) {
	    if (z > 0) {
		importStr += ",\n";
            }
	    importStr += "    " + importObj.classes[z];
        }
        if ("from" in importObj) {
            let moduleName = importObj.from;
            moduleName = moduleName.replace("${PROJECT.VERSION}", packageJson.version);
            importStr += "\n} from '" + moduleName + "'";
        }
	result += importStr + ";\n";
    }
    return result;
}

function buildExportSection(exportSection) {
    if (exportSection === undefined) {
	return "";
    }
    let exportStr = "\n\nexport {\n";
    for (let z = 0; z < exportSection.classes.length; z++) {
        if (z > 0) {
	    exportStr += ",\n";
        }
	exportStr += "    "+ exportSection.classes[z];
    }
    exportStr += "\n};";
    return exportStr;
}

function concatSettings() {
    return {
        newLine: '\n\n/* ================================' +
                 '========================================= */\n\n'
    }
}