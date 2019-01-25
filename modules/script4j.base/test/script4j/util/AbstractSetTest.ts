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
import { Set } from './../../../src/script4j/util/Set';
import { HashSet } from './../../../src/script4j/util/HashSet';

describe('AbstractSetTest', () => {

    it('hashCode_equalSets_sameHashCode', () => {
        let set1: Set<String> = new HashSet<String>();
        let set2: Set<String> = new HashSet<String>();
        set1.add("first");
        set1.add("second");
        set2.add("first");
        set2.add("second");
        assert.isNotNaN(set1.hashCode());
        assert.isFinite(set1.hashCode())
        assert.isNotNull(set1.hashCode())
        assert.equal(set1.hashCode(), set2.hashCode());
    });

    it('hashCode_differentSets_differentHashCode', () => {
        let set1: Set<String> = new HashSet<String>();
        let set2: Set<String> = new HashSet<String>();
        set1.add("first");
        set1.add("second");
        set1.add("third");
        set2.add("first");
        set2.add("second");
        assert.isFinite(set1.hashCode())
        assert.isNotNull(set1.hashCode())
        assert.notEqual(set1.hashCode(), set2.hashCode());
    });

    it('equals_equalSets_true', () => {
        let set1: Set<String> = new HashSet<String>();
        let set2: Set<String> = new HashSet<String>();
        set1.add("first");
        set1.add("second");
        set2.add("first");
        set2.add("second");
        assert.isTrue(set1.equals(set2));
    });

    it('equals_differentSets_false', () => {
        let set1: Set<String> = new HashSet<String>();
        let set2: Set<String> = new HashSet<String>();
        set1.add("first");
        set1.add("second");
        set1.add("third");
        set2.add("first");
        set2.add("second");
        assert.isFalse(set1.equals(set2));
    });
});
