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

describe('HashSetTest', () => {

    let notEqualObj1: Object = new class {

        public hashCode():number {
            return 10000;
        }
    };

    let notEqualObj2: Object = new class {

        public hashCode():number {
            return 10000;
        }
    };

    let notEqualObj3: Object =  new class {

        public hashCode():number {
            return 20000;
        }
    };

    class EqualObject {

        public hashCode(): number {
            return 100;
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

    it('iterator_hasNextForNotEqualObjects_checks', () => {
        let set: Set<Object> = new HashSet();
        let iterator: Iterator<Object> = set.iterator();
        assert.equal(iterator.hasNext(), false);
        set.add(notEqualObj1);
        set.add(notEqualObj2);
        set.add(notEqualObj3);
        iterator = set.iterator();
        assert.equal(iterator.hasNext(), true);
        iterator.next();
        assert.equal(iterator.hasNext(), true);
        iterator.next();
        assert.equal(iterator.hasNext(), true);
        iterator.next();
        assert.equal(iterator.hasNext(), false);
    });

    it('iterator_removeAfterNext_removesElement', () => {
        let set: Set<Object> = new HashSet();
        let iterator: Iterator<Object> = set.iterator();
        assert.equal(iterator.hasNext(), false);
        set.add(notEqualObj1);
        set.add(notEqualObj2);
        set.add(notEqualObj3);
        iterator = set.iterator();
        let obj1: Object = iterator.next();
        iterator.remove();
        assert.equal(set.size(), 2);
        let obj2: Object = iterator.next();
        iterator.remove();
        assert.equal(set.size(), 1);
        let obj3: Object = iterator.next();
        iterator.remove();
        assert.equal(set.size(), 0);
        assert.notEqual(obj1, obj2);
        assert.notEqual(obj2, obj3);
        assert.notEqual(obj1, obj3);
    });

    it('add_notEqualObjects_addsObject', () => {
        let set: Set<Object> = new HashSet();
        assert.equal(set.add(notEqualObj1), true);
        assert.equal(set.size(), 1);
        assert.equal(set.add(notEqualObj2), true);
        assert.equal(set.size(), 2);
        assert.equal(set.add(notEqualObj3), true);
        assert.equal(set.size(), 3);
    });

    it('add_equalObjects_addsObject', () => {
        let set: Set<Object> = new HashSet();
        assert.equal(set.add(equalObj1), true);
        assert.equal(set.size(), 1);
        assert.equal(set.add(equalObj1), false);
        assert.equal(set.size(), 1);
    });

    it('forEach_multipleObjects_execution', () => {
        let set: Set<Object> = new HashSet();
        assert.equal(set.add(notEqualObj1), true);
        assert.equal(set.add(notEqualObj2), true);
        assert.equal(set.add(notEqualObj3), true);
        let list: List<Object> = new ArrayList<Object>();
        set.forEach((obj: Object) => {list.add(obj)});
        assert.isTrue(list.get(0).equals(notEqualObj1));
        assert.isTrue(list.get(1).equals(notEqualObj2));
        assert.isTrue(list.get(2).equals(notEqualObj3));
    });

    it('clear_notEqualObjects_clears', () => {
        let set: Set<Object> = new HashSet();
        assert.equal(set.add(notEqualObj1), true);
        assert.equal(set.add(notEqualObj2), true);
        assert.equal(set.add(notEqualObj3), true);
        set.clear();
        assert.isTrue(set.isEmpty());
        assert.equal(set.size(), 0);
    });

    it('contains_objectWasNotAdded_false', () => {
        let set: Set<Object> = new HashSet();
        assert.equal(set.add(notEqualObj1), true);
        assert.equal(set.add(notEqualObj2), true);
        assert.equal(set.add(notEqualObj3), true);
        assert.isFalse(set.contains(equalObj1));
    });

    it('contains_objectsWereAdded_true', () => {
        let set: Set<Object> = new HashSet();
        assert.equal(set.add(notEqualObj1), true);
        assert.equal(set.add(notEqualObj2), true);
        assert.equal(set.add(notEqualObj3), true);
        assert.isTrue(set.contains(notEqualObj1));
        assert.isTrue(set.contains(notEqualObj2));
        assert.isTrue(set.contains(notEqualObj3));
    });

    it('isEmpty_objectsWereNotAdded_true', () => {
        let set: Set<Object> = new HashSet();
        assert.isTrue(set.isEmpty());
    });

    it('isEmpty_objectsWereAdded_false', () => {
        let set: Set<Object> = new HashSet();
        assert.equal(set.add(notEqualObj1), true);
        assert.equal(set.add(notEqualObj2), true);
        assert.equal(set.add(notEqualObj3), true);
        assert.isFalse(set.isEmpty());
    });

    it('size_objectsWereNotAdded_zero', () => {
        let set: Set<Object> = new HashSet();
        assert.equal(set.size(), 0);
    });

    it('size_objectsWereAdded_correctSize', () => {
        let set: Set<Object> = new HashSet();
        assert.equal(set.add(notEqualObj1), true);
        assert.equal(set.add(notEqualObj2), true);
        assert.equal(set.add(notEqualObj3), true);
        assert.equal(set.size(), 3);
        assert.equal(set.add(equalObj1), true);
        assert.equal(set.size(), 4);
    });
});