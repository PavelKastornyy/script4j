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
import { it } from 'mocha';
import './../../../src/script4j/lang/Object';
import { Class } from './../../../src/script4j/lang/Class';
import { Integer } from './../../../src/script4j/lang/Integer';
import { ArrayList } from './../../../src/script4j/util/ArrayList';
import { HashSet } from './../../../src/script4j/util/HashSet';

describe('ObjectTest', () => {

    it('hashCode_defaultValue_inRange', () => {
        let obj: Object = new Object();
        assert.isAtLeast(obj.hashCode(), Integer.MIN_VALUE);
        assert.isAtMost(obj.hashCode(), Integer.MAX_VALUE);
    });

    it('hashCode_severalCalls_similarResult', () => {
        let obj: Object = new Object();
        let firstHashCode = obj.hashCode();
        let secondHashCode = obj.hashCode();
        assert.equal(firstHashCode, secondHashCode);
    });

    it('hashCode_jsClass_correctResul', () => {
        let firstHashCode = Number.hashCode();
        let secondHashCode = Number.hashCode();
        assert.isNotNaN(firstHashCode);
        assert.isNotNull(firstHashCode);
        assert.isAtLeast(firstHashCode, Integer.MIN_VALUE);
        assert.isAtMost(firstHashCode, Integer.MAX_VALUE);
        assert.equal(firstHashCode, secondHashCode);
    });

    it('hashCode_javaClass_correctResul', () => {
        let firstHashCode = Class.hashCode();
        let secondHashCode = Class.hashCode();
        assert.isNotNaN(firstHashCode);
        assert.isNotNull(firstHashCode);
        assert.isAtLeast(firstHashCode, Integer.MIN_VALUE);
        assert.isAtMost(firstHashCode, Integer.MAX_VALUE);
        assert.equal(firstHashCode, secondHashCode);
    });

    it('toString_knownHashCode_correctString', () => {
        let testObj1: Object = new class {
            public hashCode():number {
                return 255;
            }
        };
        assert.equal(testObj1.toString(), "_class@ff");
    });
    
    it('class_classByLiteralAndClassFromInstance_sameClassInstance', () => {
        assert.equal(ArrayList.class(), new ArrayList().getClass());
    });
});