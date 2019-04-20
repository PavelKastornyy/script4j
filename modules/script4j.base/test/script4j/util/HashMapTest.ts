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
import {Set} from './../../../src/script4j/util/Set';
import {HashSet} from './../../../src/script4j/util/HashSet';
import {List} from './../../../src/script4j/util/List';
import {ArrayList} from './../../../src/script4j/util/ArrayList';
import {Iterator} from './../../../src/script4j/util/Iterator';
import {Collection} from './../../../src/script4j/util/Collection';
import {Map} from './../../../src/script4j/util/Map';
import {HashMap} from './../../../src/script4j/util/HashMap';
import { CommonMapTest } from './CommonMapTest';

describe('HashMapTest', () => {

    const commonMapTest: CommonMapTest = new CommonMapTest();

    it('constructor_capacityIsNotPassed_defaultCapacity', () => {
        let map: Map<Object, Object> = new HashMap<Object, Object>();
        assert.equal((map as any).capacity, 16);
    });

    it('constructor_capacityIsPassed_passedCapacity', () => {
        let map: Map<Object, Object> = new HashMap<Object, Object>(4);
        assert.equal((map as any).capacity, 4);
    });

    it('clear_emptyMap_clearsMap', () => {
        let map: Map<Object, Object> = new HashMap<Object, Object>(4);
        commonMapTest.clear_emptyMap_clearsMap(map);
    });

    it('clear_notEmptyMap_clearsMap', () => {
        let map: Map<Object, Object> = new HashMap<Object, Object>(4);
        commonMapTest.clear_notEmptyMap_clearsMap(map);
    });

    it('containsKey_keyExist_true', () => {
        let map: Map<Object, Object> = new HashMap<Object, Object>(4);
        commonMapTest.containsKey_keyExist_true(map);
    });

    it('containsKey_keyNotExist_false', () => {
        let map: Map<Object, Object> = new HashMap<Object, Object>(4);
        commonMapTest.containsKey_keyNotExist_false(map);
    });

    it('containsValue_valueExistString_true', () => {
        let map: Map<Object, string> = new HashMap<Object, string>(4);
        commonMapTest.containsValue_valueExistString_true(map);
    });

    it('containsValue_valueNotExistString_false', () => {
        let map: Map<Object, string> = new HashMap<Object, string>(4);
        commonMapTest.containsValue_valueNotExistString_false(map);
    });

    it('containsValue_valueExistNumber_true', () => {
        let map: Map<Object, number> = new HashMap<Object, number>(4);
        commonMapTest.containsValue_valueExistNumber_true(map);
    });

    it('containsValue_valueNotExistNumber_false', () => {
        let map: Map<Object, number> = new HashMap<Object, number>(4);
        commonMapTest.containsValue_valueNotExistNumber_false(map);
    });

    it('entries_emptyMap_emptySet', () => {
        let map: Map<Object, string> = new HashMap<Object, string>(4);
        commonMapTest.entries_emptyMap_emptySet(map);
    });

    it('entries_nonEmptyMap_returnsEntries', () => {
        let map: Map<string, Object> = new HashMap<string, Object>(4);
        commonMapTest.entries_nonEmptyMap_returnsEntries(map);
    });

    it('get_objectsNotExist_returnsNull', () => {
        let map: Map<string, Object> = new HashMap<string, Object>(4);
        commonMapTest.get_objectsNotExist_returnsNull(map);
    });

    it('get_objectsExist_returnsObjects', () => {
        let map: Map<string, Object> = new HashMap<string, Object>(4);
        commonMapTest.get_objectsExist_returnsObjects(map);
    });

    it('isEmpty_objectsWereNotAdded_true', () => {
        let map: Map<string, Object> = new HashMap<string, Object>(4);
        commonMapTest.isEmpty_objectsWereNotAdded_true(map);
    });

    it('isEmpty_objectsWereAdded_false', () => {
        let map: Map<string, Object> = new HashMap<string, Object>(4);
        commonMapTest.isEmpty_objectsWereAdded_false(map);
    });

    it('keys_objectsWereNotAdded_emptySet', () => {
        let map: Map<string, Object> = new HashMap<string, Object>(4);
        commonMapTest.keys_objectsWereNotAdded_emptySet(map);
    });

    it('keys_objectsWereAdded_correctKeys', () => {
        let map: Map<string, Object> = new HashMap<string, Object>(4);
        commonMapTest.keys_objectsWereAdded_correctKeys(map);
    });

    it('put_keyExists_oldValue', () => {
        let map: Map<string, Object> = new HashMap<string, Object>(4);
        commonMapTest.put_keyExists_oldValue(map);
    });

    it('remove_keyNotExists_null', () => {
        let map: Map<string, Object> = new HashMap<string, Object>(4);
        commonMapTest.remove_keyNotExists_null(map);
    });

    it('remove_keysExist_returnsValue', () => {
        let map: Map<string, Object> = new HashMap<string, Object>(4);
        commonMapTest.remove_keysExist_returnsValue(map);
    });

    it('values_objectsWereNotAdded_emptyCollection', () => {
        let map: Map<string, Object> = new HashMap<string, Object>(4);
        commonMapTest.values_objectsWereNotAdded_emptyCollection(map);
    });

    it('values_objectsWereAdded_correctValues', () => {
        let map: Map<string, Object> = new HashMap<string, Object>(4);
        commonMapTest.values_objectsWereAdded_correctValues(map);
    });
    
    it('compute_valueExists_valueReplaced', () => {
        let map: Map<string, number> = new HashMap<string, number>();
        commonMapTest.compute_valueExists_valueReplaced(map);
    });
    
    it('compute_valueNotExists_valuePut', () => {
        let map: Map<string, number> = new HashMap<string, number>();
        commonMapTest.compute_valueNotExists_valuePut(map);
    });
    
    it('compute_resultIsNull_valueRemoved', () => {
        let map: Map<string, number> = new HashMap<string, number>();
        commonMapTest.compute_resultIsNull_valueRemoved(map);
    });
});