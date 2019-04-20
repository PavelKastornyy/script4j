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

import './../../../src/script4j/lang/String';
import { assert } from 'chai';
import { describe } from 'mocha';
import { it } from 'mocha';
import { Integer } from './../../../src/script4j/lang/Integer';

describe('StringTest', () => {

    it('hashCode_severalCalls_similarResult', () => {
        let s: string = "javascript/typescript";
        let firstHashCode = s.hashCode();
        let secondHashCode = s.hashCode();
        assert.isNotNaN(firstHashCode);
        assert.isNotNull(firstHashCode);
        assert.equal(firstHashCode, secondHashCode);
    });

    it('hashCode_inRange_correctResult', () => {
        let s: string = "This code is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; \n\
                without even the implied warranty of MERCHANTABILITY or * \n\
                FITNESS FOR A PARTICULAR PURPOSE. Такой подход!";
        let hash: number = s.hashCode();
        assert.isNotNaN(hash);
        assert.isNotNull(hash);
        assert.isAtLeast(hash, Integer.MIN_VALUE);
        assert.isAtMost(hash, Integer.MAX_VALUE);
    });

    it('equals_sameString_true', () => {
        assert.isTrue("javascript".equals("javascript"));
    });

    it('equals_sameStringPrimitiveAndObject_true', () => {
        assert.isTrue("javascript".equals(new String("javascript")));
        assert.isTrue((new String("javascript")).equals("javascript"));
    });

    it('equals_differentString_false', () => {
        assert.isFalse("javascript".equals("typescript"));
    });

    it('toString_primitive_string', () => {
        let s: string = "javascript";
        assert.equal(s.toString(), "javascript");
    });

    it('toString_object_string', () => {
        let s: String = new String("javascript");
        assert.equal(s.toString(), "javascript");
    });
    
    it('valueOf_instanceMethod_string', () => {
        let s: String = new String("javascript");
        assert.equal(s.valueOf(), "javascript");
        let ss: string = "javascript";
        assert.equal(ss.valueOf(), "javascript");
    });
    
    it('valueOf_staticMethod_string', () => {
        let s: String = new String("javascript");
        assert.equal(String.valueOf(s), "javascript");
        let ss: string = "javascript";
        assert.equal(String.valueOf(ss), "javascript");
    });
    
    it('startsWith_withoutOffset_correctResult', () => {
        let s: string = "javascript is a language";
        assert.equal(s.startsWith("javascript"), true);
        assert.equal(s.startsWith("javascript2"), false);
    });
    
    it('startsWith_withOffset_correctResult', () => {
        let s: String = new String("javascript is a language");
        assert.equal(s.startsWith("is", 11), true);
        assert.equal(s.startsWith("is", 12), false);
    });
    
    it('compareTo_otherNotNull_correctResult', () => {
        let s: string = "bbb";
        assert.isTrue(s.compareTo("aaa") > 0);
        assert.isTrue(s.compareTo("bbb") === 0);
        assert.isTrue(s.compareTo("ccc") < 0);
    });
});