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

import { LoggerFactory } from './../../../../src/script4j/internal/logging/LoggerFactory';
import { Logger } from './../../../../src/script4j/internal/logging/Logger';
import { PrintWriter } from './../../../../src/script4j/io/PrintWriter';
import { assert } from 'chai';
import { describe } from 'mocha';

describe('LoggerFactoryTest', () => {

    it('getLogger_multipleCallWithSameClass_sameLogger', () => {
        let logger1: Logger = LoggerFactory.getLogger(Number);
        let logger2: Logger = LoggerFactory.getLogger(Number);
        assert.isTrue(logger1.equals(logger2));
        let logger3: Logger = LoggerFactory.getLogger(PrintWriter);
        let logger4: Logger = LoggerFactory.getLogger(PrintWriter);
        assert.isTrue(logger3.equals(logger4));
        assert.isFalse(logger1.equals(logger4));
    });
});