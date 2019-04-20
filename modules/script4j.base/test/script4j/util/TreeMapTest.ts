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
import { List } from './../../../src/script4j/util/List';
import { ArrayList } from './../../../src/script4j/util/ArrayList';
import { Iterator } from './../../../src/script4j/util/Iterator';
import { Collection } from './../../../src/script4j/util/Collection';
import { Map } from './../../../src/script4j/util/Map';
import { TreeMap } from './../../../src/script4j/util/TreeMap';
import { HashMap } from './../../../src/script4j/util/HashMap';
import { Comparator } from './../../../src/script4j/util/Comparator';
import { RedBlackBinaryTree } from './../../../src/script4j/internal/util/RedBlackBinaryTree';
import { CommonMapTest } from './CommonMapTest';

describe('TreeMapTest', () => {
    
    const commonMapTest: CommonMapTest = new CommonMapTest();
    
    const numberMap: Map<Object, number> = new HashMap();
    numberMap.put(commonMapTest.getNotEqualObj1(), 1);
    numberMap.put(commonMapTest.getNotEqualObj2(), 2);
    numberMap.put(commonMapTest.getNotEqualObj3(), 3);
    numberMap.put(commonMapTest.getEqualObj1(), 4);
    numberMap.put(commonMapTest.getEqualObj2(), 5);
    
    const comparator: Comparator<Object> = (obj1: Object, obj2: Object): number => {
        return numberMap.get(obj1) - numberMap.get(obj2);
    };

    it('clear_emptyMap_clearsMap', () => {
        let map: Map<Object, Object> = new TreeMap<Object, Object>();
        commonMapTest.clear_emptyMap_clearsMap(map);
    });

    it('clear_notEmptyMap_clearsMap', () => {
        let map: Map<Object, Object> = new TreeMap<Object, Object>(comparator);
        commonMapTest.clear_notEmptyMap_clearsMap(map);
    });

    it('containsKey_keyExist_true', () => {
        let map: Map<Object, Object> = new TreeMap<Object, Object>(comparator);
        commonMapTest.containsKey_keyExist_true(map);
    });

    it('containsKey_keyNotExist_false', () => {
        let map: Map<Object, Object> = new TreeMap<Object, Object>(comparator);
        commonMapTest.containsKey_keyNotExist_false(map);
    });

    it('containsValue_valueExistString_true', () => {
        let map: Map<Object, string> = new TreeMap<Object, string>(comparator);
        commonMapTest.containsValue_valueExistString_true(map);
    });

    it('containsValue_valueNotExistString_false', () => {
        let map: Map<Object, string> = new TreeMap<Object, string>(comparator);
        commonMapTest.containsValue_valueNotExistString_false(map);
    });

    it('containsValue_valueExistNumber_true', () => {
        let map: Map<Object, number> = new TreeMap<Object, number>(comparator);
        commonMapTest.containsValue_valueExistNumber_true(map);
    });

    it('containsValue_valueNotExistNumber_false', () => {
        let map: Map<Object, number> = new TreeMap<Object, number>(comparator);
        commonMapTest.containsValue_valueNotExistNumber_false(map);
    });

    it('entries_emptyMap_emptySet', () => {
        let map: Map<Object, string> = new TreeMap<Object, string>();
        commonMapTest.entries_emptyMap_emptySet(map);
    });

    it('entries_nonEmptyMap_returnsEntries', () => {
        let map: Map<string, Object> = new TreeMap<string, Object>();
        commonMapTest.entries_nonEmptyMap_returnsEntries(map);
    });

    it('get_objectsNotExist_returnsNull', () => {
        let map: Map<string, Object> = new TreeMap<string, Object>();
        commonMapTest.get_objectsNotExist_returnsNull(map);
    });

    it('get_objectsExist_returnsObjects', () => {
        let map: Map<string, Object> = new TreeMap<string, Object>();
        commonMapTest.get_objectsExist_returnsObjects(map);
    });

    it('isEmpty_objectsWereNotAdded_true', () => {
        let map: Map<string, Object> = new TreeMap<string, Object>();
        commonMapTest.isEmpty_objectsWereNotAdded_true(map);
    });

    it('isEmpty_objectsWereAdded_false', () => {
        let map: Map<string, Object> = new TreeMap<string, Object>();
        commonMapTest.isEmpty_objectsWereAdded_false(map);
    });

    it('keys_objectsWereNotAdded_emptySet', () => {
        let map: Map<string, Object> = new TreeMap<string, Object>();
        commonMapTest.keys_objectsWereNotAdded_emptySet(map);
    });

    it('keys_objectsWereAdded_correctKeys', () => {
        let map: Map<string, Object> = new TreeMap<string, Object>();
        commonMapTest.keys_objectsWereAdded_correctKeys(map);
    });

    it('put_keyExists_oldValue', () => {
        let map: Map<string, Object> = new TreeMap<string, Object>();
        commonMapTest.put_keyExists_oldValue(map);
    });

    it('remove_keyNotExists_null', () => {
        let map: Map<string, Object> = new TreeMap<string, Object>();
        commonMapTest.remove_keyNotExists_null(map);
    });

    it('remove_keysExist_returnsValue', () => {
        let map: Map<string, Object> = new TreeMap<string, Object>();
        commonMapTest.remove_keysExist_returnsValue(map);
    });

    it('values_objectsWereNotAdded_emptyCollection', () => {
        let map: Map<string, Object> = new TreeMap<string, Object>();
        commonMapTest.values_objectsWereNotAdded_emptyCollection(map);
    });

    it('values_objectsWereAdded_correctValues', () => {
        let map: Map<string, Object> = new TreeMap<string, Object>();
        commonMapTest.values_objectsWereAdded_correctValues(map);
    });
    
//    it('compute_valueExists_valueReplaced', () => {
//        let map: Map<string, number> = new TreeMap<string, number>();
//        commonMapTest.compute_valueExists_valueReplaced(map);
//    });
//    
//    it('compute_valueNotExists_valuePut', () => {
//        let map: Map<string, number> = new TreeMap<string, number>();
//        commonMapTest.compute_valueNotExists_valuePut(map);
//    });
//    
//    it('compute_resultIsNull_valueRemoved', () => {
//        let map: Map<string, number> = new TreeMap<string, number>();
//        commonMapTest.compute_resultIsNull_valueRemoved(map);
//    });    

    it('entrySet_removingWithIterator_correctResult', () => {
        let map: Map<number, string> = new TreeMap();
        map.put(100, "a");
        map.put(110, "a");
        map.put(120, "a");
        map.put(160, "a");
        map.put(130, "a");
        map.put(150, "a");
        map.put(140, "a");
        assert.equal(map.size(), 7);
        assert.equal(map.size(), 7);
        let list: List<number> = new ArrayList();
        const iterator: Iterator<Map.Entry<number, string>> = map.entrySet().iterator();
        while (iterator.hasNext()) {
            let entry: Map.Entry<number, string> = iterator.next();
            list.add(entry.getKey());
            iterator.remove();
        }
        assert.equal(list.get(0), 100);
        assert.equal(list.get(1), 110);
        assert.equal(list.get(2), 120);
        assert.equal(list.get(3), 130);
        assert.equal(list.get(4), 140);
        assert.equal(list.get(5), 150);
        assert.equal(list.get(6), 160);
        assert.equal(list.size(), 7);
        assert.equal(map.size(), 0);
    });
    
    

});

