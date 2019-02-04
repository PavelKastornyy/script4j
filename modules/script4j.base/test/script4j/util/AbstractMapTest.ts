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
import {Map} from './../../../src/script4j/util/Map';
import {HashMap} from './../../../src/script4j/util/HashMap';

describe('AbstractMapTest', () => {

    it('hashCode_equalMap_sameHashCode', () => {
        let map1: Map<String, Number> = new HashMap<String, Number>();
        let map2: Map<String, Number> = new HashMap<String, Number>();
        map1.put("first", 1);
        map1.put("second", 2);
        map2.put("first", 1);
        map2.put("second", 2);
        assert.isNotNaN(map1.hashCode());
        assert.isNotNull(map1.hashCode())
        assert.isFinite(map1.hashCode())
        assert.equal(map1.hashCode(), map2.hashCode());
    });

    it('hashCode_differentMap_differentHashCode', () => {
        let map1: Map<String, Number> = new HashMap<String, Number>();
        let map2: Map<String, Number> = new HashMap<String, Number>();
        map1.put("first", 1);
        map1.put("second", 2);
        map1.put("third", 3);
        map2.put("first", 1);
        map2.put("second", 2);
        assert.isNotNaN(map1.hashCode());
        assert.isNotNull(map1.hashCode())
        assert.notEqual(map1.hashCode(), map2.hashCode());
    });

    it('equals_equalMap_true', () => {
        let map1: Map<String, Number> = new HashMap<String, Number>();
        let map2: Map<String, Number> = new HashMap<String, Number>();
        map1.put("first", 1);
        map1.put("second", 2);
        map2.put("first", 1);
        map2.put("second", 2);
        assert.isTrue(map1.equals(map2));
    });

    it('equals_differentMap_false', () => {
        let map1: Map<String, Number> = new HashMap<String, Number>();
        let map2: Map<String, Number> = new HashMap<String, Number>();
        map1.put("first", 1);
        map1.put("second", 2);
        map1.put("third", 3);
        map2.put("first", 1);
        map2.put("second", 2);
        assert.isFalse(map1.equals(map2));
    });

    it('toString_objectsWereAdded_correctString', () => {
        let map: Map<number, string> = new HashMap<number, string>();
        map.put(1, "A");
        map.put(2, "B");
        map.put(3, "C");
        assert.isTrue(map.toString().equals("{1=A, 2=B, 3=C}"));
    });

});
