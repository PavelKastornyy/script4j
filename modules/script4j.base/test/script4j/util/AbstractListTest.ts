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
import {List} from './../../../src/script4j/util/List';
import {ArrayList} from './../../../src/script4j/util/ArrayList';

describe('AbstractListTest', () => {

    it('hashCode_equalLists_sameHashCode', () => {
        let list1: List<String> = new ArrayList<String>();
        let list2: List<String> = new ArrayList<String>();
        list1.add("first");
        list1.add("second");
        list2.add("first");
        list2.add("second");
        assert.isNotNaN(list1.hashCode());
        assert.isFinite(list1.hashCode())
        assert.isNotNull(list1.hashCode())
        assert.equal(list1.hashCode(), list2.hashCode());
    });

    it('hashCode_differentLists_differentHashCode', () => {
        let list1: List<String> = new ArrayList<String>();
        let list2: List<String> = new ArrayList<String>();
        list1.add("first");
        list1.add("second");
        list1.add("third");
        list2.add("first");
        list2.add("second");
        assert.isFinite(list1.hashCode())
        assert.isNotNull(list1.hashCode())
        assert.notEqual(list1.hashCode(), list2.hashCode());
    });

    it('equals_equalLists_true', () => {
        let list1: List<String> = new ArrayList<String>();
        let list2: List<String> = new ArrayList<String>();
        list1.add("first");
        list1.add("second");
        list2.add("first");
        list2.add("second");
        assert.isTrue(list1.equals(list2));
    });

    it('equals_differentLists_false', () => {
        let list1: List<String> = new ArrayList<String>();
        let list2: List<String> = new ArrayList<String>();
        list1.add("first");
        list1.add("second");
        list1.add("third");
        list2.add("first");
        list2.add("second");
        assert.isFalse(list1.equals(list2));
    });
});
