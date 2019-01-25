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

describe('HashMapTest', () => {

    let notEqualObj1: Object = new class {

        public hashCode():number {
            return 1;
        }
    };

    let notEqualObj2: Object = new class {

        public hashCode():number {
            return 2;
        }
    };

    let notEqualObj3: Object =  new class {

        public hashCode():number {
            return 333;
        }
    };

    class EqualObject {

        public hashCode(): number {
            return 47;
        }

        public equals(obj: Object): boolean {
            if (obj instanceof EqualObject) {
                return true;
            } else {
                return false;
            }
        }
    }

    let equalObj1: EqualObject = new EqualObject();
    let equalObj2: EqualObject = new EqualObject();

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
        map.clear();
        assert.isTrue(map.isEmpty());
    });

    it('clear_notEmptyMap_clearsMap', () => {
        let map: Map<Object, Object> = new HashMap<Object, Object>(4);
        map.put(notEqualObj1, "one");
        map.put(notEqualObj2, "two");
        assert.equal(map.size(), 2);
        assert.isFalse(map.isEmpty());
        map.clear();
        assert.equal(map.size(), 0);
        assert.isTrue(map.isEmpty());
    });

    it('containsKey_keyExist_true', () => {
        let map: Map<Object, Object> = new HashMap<Object, Object>(4);
        map.put(notEqualObj1, "foo");
        map.put(notEqualObj2, "boo");
        map.put(equalObj2, "doo");
        assert.equal(map.size(), 3);
        assert.isTrue(map.containsKey(notEqualObj1));
        assert.isTrue(map.containsKey(notEqualObj2));
        assert.isTrue(map.containsKey(equalObj2));
        assert.isTrue(map.containsKey(equalObj1));
    });

    it('containsKey_keyNotExist_false', () => {
        let map: Map<Object, Object> = new HashMap<Object, Object>(4);
        map.put(notEqualObj1, "foo");
        map.put(notEqualObj2, "boo");
        assert.equal(map.size(), 2);
        assert.isFalse(map.containsKey(notEqualObj3));
    });

    it('containsValue_valueExistString_true', () => {
        let map: Map<Object, String> = new HashMap<Object, String>(4);
        map.put(notEqualObj1, "foo");
        map.put(notEqualObj2, "boo");
        assert.equal(map.size(), 2);
        assert.isTrue(map.containsValue("foo"));
        assert.isTrue(map.containsValue("boo"));
    });

    it('containsValue_valueNotExistString_false', () => {
        let map: Map<Object, String> = new HashMap<Object, String>(4);
        map.put(notEqualObj1, "foo");
        map.put(notEqualObj2, "boo");
        assert.equal(map.size(), 2);
        assert.isFalse(map.containsValue("doo"));
    });

    it('containsValue_valueExistNumber_true', () => {
        let map: Map<Object, Number> = new HashMap<Object, Number>(4);
        map.put(notEqualObj1, 1);
        map.put(notEqualObj2, 2);
        assert.equal(map.size(), 2);
        assert.isTrue(map.containsValue(1));
        assert.isTrue(map.containsValue(2));
    });

    it('containsValue_valueNotExistNumber_false', () => {
        let map: Map<Object, Number> = new HashMap<Object, Number>(4);
        map.put(notEqualObj1, 100);
        map.put(notEqualObj2, 200);
        assert.equal(map.size(), 2);
        assert.isFalse(map.containsValue(1000));
    });

    it('entries_emptyMap_emptySet', () => {
        let map: Map<Object, String> = new HashMap<Object, String>(4);
        let set: Set<Map.Entry<Object, String>> = map.entrySet();
        assert.equal(set.size(), 0);
    });

    it('entries_nonEmptyMap_returnsEntries', () => {
        let map: Map<String, Object> = new HashMap<String, Object>(4);
        map.put("foo", notEqualObj1);
        let set: Set<Map.Entry<String, Object>> = map.entrySet();
        let entry: Map.Entry<String, Object> = set.iterator().next();
        assert.isTrue(entry.getKey().equals("foo"));
        assert.equal(entry.getValue(), notEqualObj1);
        map.put("doo", notEqualObj2);
        set = map.entrySet();
        assert.equal(set.size(), 2);
    });

    it('get_objectsNotExist_returnsNull', () => {
        let map: Map<String, Object> = new HashMap<String, Object>(4);
        assert.equal(map.get("foo"), null);
        assert.equal(map.get("doo"), null);
    });

    it('get_objectsExist_returnsObjects', () => {
        let map: Map<String, Object> = new HashMap<String, Object>(4);
        map.put("foo", notEqualObj1);
        map.put("doo", notEqualObj2);
        assert.equal(map.get("foo"), notEqualObj1);
        assert.equal(map.get("doo"), notEqualObj2);
    });

    it('isEmpty_objectsWereNotAdded_true', () => {
        let map: Map<String, Object> = new HashMap<String, Object>(4);
        assert.isTrue(map.isEmpty());
    });

    it('isEmpty_objectsWereAdded_false', () => {
        let map: Map<String, Object> = new HashMap<String, Object>(4);
        map.put("foo", notEqualObj1);
        assert.isFalse(map.isEmpty());
    });

    it('keys_objectsWereNotAdded_emptySet', () => {
        let map: Map<String, Object> = new HashMap<String, Object>(4);
        assert.isTrue(map.keySet().isEmpty());
    });

    it('keys_objectsWereAdded_correctKeys', () => {
        let map: Map<String, Object> = new HashMap<String, Object>(4);
        map.put("foo", notEqualObj1);
        map.put("doo", notEqualObj2);
        let keys: Set<String>  = map.keySet();
        assert.isTrue(keys.contains("foo"));
        assert.isTrue(keys.contains("doo"));
        assert.equal(keys.size(), 2);
    });

    it('put_keyExists_oldValue', () => {
        let map: Map<String, Object> = new HashMap<String, Object>(4);
        map.put("foo", notEqualObj1);
        assert.equal(map.size(), 1);
        assert.equal(map.get("foo"), notEqualObj1);
        let oldValue = map.put("foo", notEqualObj2);
        assert.equal(oldValue, notEqualObj1);
        assert.equal(map.get("foo"), notEqualObj2);
        assert.equal(map.size(), 1);
    });

    it('remove_keyNotExists_null', () => {
        let map: Map<String, Object> = new HashMap<String, Object>(4);
        assert.equal(map.remove("foo"), null);
    });

    it('remove_keysExist_returnsValue', () => {
        let map: Map<String, Object> = new HashMap<String, Object>(4);
        map.put("foo", notEqualObj1);
        map.put("doo", notEqualObj2);
        assert.equal(map.remove("foo"), notEqualObj1);
        assert.equal(map.size(), 1);
        assert.isFalse(map.isEmpty());
        assert.equal(map.remove("doo"), notEqualObj2);
        assert.equal(map.size(), 0);
        assert.isTrue(map.isEmpty());
    });


    it('values_objectsWereNotAdded_emptyCollection', () => {
        let map: Map<String, Object> = new HashMap<String, Object>(4);
        assert.isTrue(map.values().isEmpty());
    });

    it('values_objectsWereAdded_correctValues', () => {
        let map: Map<String, Object> = new HashMap<String, Object>(4);
        map.put("foo", notEqualObj1);
        map.put("doo", notEqualObj2);
        let values: Collection<Object>  = map.values();
        assert.isTrue(values.contains(notEqualObj1));
        assert.isTrue(values.contains(notEqualObj2));
        assert.equal(values.size(), 2);
    });


});