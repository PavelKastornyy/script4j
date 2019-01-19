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

import { assert } from 'chai';
import { describe } from 'mocha';
import './../../../src/script4j/lang/Object';

describe('ObjectTest', () => {

    it('hashCode_defaultValue_inRange', () => {
        let obj: Object = new Object();
        assert.isAtLeast(obj.hashCode(), 0);
        assert.isAtMost(obj.hashCode(), 4294967296);
    });

    it('hashCode_severalCalls_similarResult', () => {
        let obj: Object = new Object();
        let firstHashCode = obj.hashCode();
        let secondHashCode = obj.hashCode();
        assert.equal(firstHashCode, secondHashCode);
    });
});