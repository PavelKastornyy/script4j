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

import {uninstallAll, cleanAll, installModules, uninstallModules, 
    buildModules, cleanModules, testModules } from './scripts/gulptasks';
import gulp from 'gulp';

gulp.task('uninstall-all', function(done) { uninstallAll(); done(); });
gulp.task('clean-all', function(done) { cleanAll(); done(); });
gulp.task('install-modules', function(done) { installModules(); done(); });
gulp.task('uninstall-modules', function(done) { uninstallModules(); done(); });
gulp.task('build-modules', function(done) { buildModules(); done(); });
gulp.task('clean-modules', function(done) { cleanModules(); done(); });
gulp.task('test-modules', function(done) { testModules(); done(); });

