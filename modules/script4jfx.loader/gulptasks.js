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

import { buildModule, cleanModule, uninstallModule, testModule } from './../../scripts/gulptasks';
import gulp from 'gulp';
import fs from 'fs';
import path from 'path';
import packageJson from './package.json'

const JQUERY_VERSION = packageJson.devDependencies.jquery;
const REFLECT_VERSION =  packageJson.devDependencies["reflect-metadata"];

gulp.task('build-module', function(done) { 
    buildModule(__dirname);
    const sep = path.sep;
    const nodeModulePath = __dirname + sep + "node_modules";
    const distPath = __dirname + sep + ".." + sep + ".." + sep + "dist";
    const reflectSrc = nodeModulePath + sep + "reflect-metadata" + sep + "Reflect.js";
    const reflectDest = distPath + sep + "reflect-" + REFLECT_VERSION + ".js";
    fs.copyFileSync(reflectSrc, reflectDest);
    done(); 
});

gulp.task('clean-module', function(done) { cleanModule(__dirname); done(); });
gulp.task('uninstall-module', function(done) { uninstallModule(__dirname); done();});
gulp.task('test-module', function(done) { testModule(__dirname); done(); });