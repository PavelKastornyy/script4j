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
import { HashMap } from './../../../src/script4j/util/HashMap';
import { BiFunction } from './../../../src/script4j/util/function/BiFunction';

export class CommonMapTest {
    
    private static EqualObject = class {

        public hashCode(): number {
            return 47;
        }

        public equals(obj: Object): boolean {
            if (obj instanceof CommonMapTest.EqualObject) {
                return true;
            } else {
                return false;
            }
        }
    }    
    
    private readonly notEqualObj1: Object = new Object();

    private readonly notEqualObj2: Object = new Object();

    private readonly notEqualObj3: Object =  new Object();
    
    private readonly equalObj1  = new CommonMapTest.EqualObject();
    
    private readonly equalObj2 = new CommonMapTest.EqualObject();
    
    public getNotEqualObj1(): Object {
        return this.notEqualObj1;
    }
    
    public getNotEqualObj2(): Object {
        return this.notEqualObj2;
    }
    
    public getNotEqualObj3(): Object {
        return this.notEqualObj3;
    }
    
    public getEqualObj1(): Object {
        return this.equalObj1;
    }
    
    public getEqualObj2(): Object {
        return this.equalObj2;
    }
    
    public compute_resultIsNull_valueRemoved(map: Map<string, number>): void {
        map.put("a", 10);
        let result = map.compute("a", BiFunction.lambda((k: string, n: number) => {
            return null;
        }));
        assert.equal(result, null);
        assert.equal(map.size(), 0);
    }
    
    public compute_valueNotExists_valuePut(map: Map<string, number>): void {
        map.put("a", 10);
        let result = map.compute("b", BiFunction.lambda((k: string, n: number) => {
            if (n === null) {
                n = 1;
            }
            return n * 5;
        }));
        assert.equal(result, 5);
        assert.equal(map.size(), 2);
        assert.equal(map.get("a"), 10);
        assert.equal(map.get("b"), 5);
    }
    
    public compute_valueExists_valueReplaced(map: Map<string, number>): void {
        map.put("a", 10);
        map.put("b", 20);
        let result = map.compute("a", BiFunction.lambda((k: string, n: number) => {
            return 10 * 10;
        }));
        assert.equal(result, 100);
        assert.equal(map.size(), 2);
        assert.equal(map.get("a"), 100);
        assert.equal(map.get("b"), 20);
    }
    
    public values_objectsWereAdded_correctValues(map: Map<string, Object>): void {
        map.put("foo", this.notEqualObj1);
        map.put("doo", this.notEqualObj2);
        let values: Collection<Object>  = map.values();
        assert.isTrue(values.contains(this.notEqualObj1));
        assert.isTrue(values.contains(this.notEqualObj2));
        assert.equal(values.size(), 2);
    }
    
    public values_objectsWereNotAdded_emptyCollection(map: Map<string, Object>):  void {
        assert.isTrue(map.values().isEmpty());
    }
    
    public remove_keysExist_returnsValue(map: Map<string, Object>):  void {
        map.put("foo", this.notEqualObj1);
        map.put("doo", this.notEqualObj2);
        assert.equal(map.remove("foo"), this.notEqualObj1);
        assert.equal(map.size(), 1);
        assert.isFalse(map.isEmpty());
        assert.equal(map.remove("doo"), this.notEqualObj2);
        assert.equal(map.size(), 0);
        assert.isTrue(map.isEmpty());
    }
    
    public remove_keyNotExists_null(map: Map<string, Object>): void {
        assert.equal(map.remove("foo"), null);
    }
    
    public put_keyExists_oldValue(map: Map<string, Object>): void {
        map.put("foo", this.notEqualObj1);
        assert.equal(map.size(), 1);
        assert.equal(map.get("foo"), this.notEqualObj1);
        let oldValue = map.put("foo", this.notEqualObj2);
        assert.equal(oldValue, this.notEqualObj1);
        assert.equal(map.get("foo"), this.notEqualObj2);
        assert.equal(map.size(), 1);
    }
    
    public keys_objectsWereAdded_correctKeys(map: Map<string, Object>): void {
        map.put("foo", this.notEqualObj1);
        map.put("doo", this.notEqualObj2);
        let keys: Set<string>  = map.keySet();
        assert.isTrue(keys.contains("foo"));
        assert.isTrue(keys.contains("doo"));
        assert.equal(keys.size(), 2);
    }
    
    public isEmpty_objectsWereAdded_false(map: Map<string, Object>): void {
        map.put("foo", this.notEqualObj1);
        assert.isFalse(map.isEmpty());
    }
    
    public keys_objectsWereNotAdded_emptySet(map: Map<string, Object>): void {
        assert.isTrue(map.keySet().isEmpty());
    }
    
    public isEmpty_objectsWereNotAdded_true(map: Map<string, Object>): void {
        assert.isTrue(map.isEmpty());
    }
    
    public get_objectsExist_returnsObjects(map: Map<string, Object>): void {
        map.put("foo", this.notEqualObj1);
        map.put("doo", this.notEqualObj2);
        assert.equal(map.get("foo"), this.notEqualObj1);
        assert.equal(map.get("doo"), this.notEqualObj2);
    }

    public get_objectsNotExist_returnsNull(map: Map<string, Object>): void {
        assert.equal(map.get("foo"), null);
        assert.equal(map.get("doo"), null);
    }
    
    public entries_nonEmptyMap_returnsEntries(map: Map<string, Object>): void {
        map.put("foo", this.notEqualObj1);
        let set: Set<Map.Entry<string, Object>> = map.entrySet();
        let entry: Map.Entry<string, Object> = set.iterator().next();
        assert.isTrue(entry.getKey().equals("foo"));
        assert.equal(entry.getValue(), this.notEqualObj1);
        map.put("doo", this.notEqualObj2);
        set = map.entrySet();
        assert.equal(set.size(), 2);
    }
    
    public entries_emptyMap_emptySet(map: Map<Object, string>): void {
        let set: Set<Map.Entry<Object, string>> = map.entrySet();
        assert.equal(set.size(), 0);
    }
    
    public containsValue_valueNotExistNumber_false(map: Map<Object, number>): void {
        map.put(this.notEqualObj1, 100);
        map.put(this.notEqualObj2, 200);
        assert.equal(map.size(), 2);
        assert.isFalse(map.containsValue(1000));
    }
    
    public containsValue_valueExistNumber_true(map: Map<Object, number>): void {
        map.put(this.notEqualObj1, 1);
        map.put(this.notEqualObj2, 2);
        assert.equal(map.size(), 2);
        assert.isTrue(map.containsValue(1));
        assert.isTrue(map.containsValue(2));
    }
    
    public containsValue_valueNotExistString_false(map: Map<Object, string>): void {
        map.put(this.notEqualObj1, "foo");
        map.put(this.notEqualObj2, "boo");
        assert.equal(map.size(), 2);
        assert.isFalse(map.containsValue("doo"));
    }

    public containsValue_valueExistString_true(map: Map<Object, string>): void {
        map.put(this.notEqualObj1, "foo");
        map.put(this.notEqualObj2, "boo");
        assert.equal(map.size(), 2);
        assert.isTrue(map.containsValue("foo"));
        assert.isTrue(map.containsValue("boo"));
    }

    public containsKey_keyNotExist_false(map: Map<Object, Object> ): void {
        map.put(this.notEqualObj1, "foo");
        map.put(this.notEqualObj2, "boo");
        assert.equal(map.size(), 2);
        assert.isFalse(map.containsKey(this.notEqualObj3));
    }
    
    public containsKey_keyExist_true(map: Map<Object, Object> ): void {
        map.put(this.notEqualObj1, "foo");
        map.put(this.notEqualObj2, "boo");
        map.put(this.equalObj2, "doo");
        assert.equal(map.size(), 3);
        assert.isTrue(map.containsKey(this.notEqualObj1));
        assert.isTrue(map.containsKey(this.notEqualObj2));
        assert.isTrue(map.containsKey(this.equalObj2));
        assert.isTrue(map.containsKey(this.equalObj1));
    }
    
    public clear_notEmptyMap_clearsMap(map: Map<Object, Object>): void {
        map.put(this.notEqualObj1, "one");
        map.put(this.notEqualObj2, "two");
        assert.equal(map.size(), 2);
        assert.isFalse(map.isEmpty());
        map.clear();
        assert.equal(map.size(), 0);
        assert.isTrue(map.isEmpty());
    }
   
    public clear_emptyMap_clearsMap(map: Map<Object, Object>): void {
        map.clear();
        assert.isTrue(map.isEmpty());
    }
}

