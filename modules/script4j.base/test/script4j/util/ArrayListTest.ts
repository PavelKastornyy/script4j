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
import {ArrayList} from './../../../src/script4j/util/ArrayList';
import {List} from './../../../src/script4j/util/List';
import {Iterator} from './../../../src/script4j/util/Iterator';
import {IndexOutOfBoundsError} from './../../../src/script4j/lang/IndexOutOfBoundsError';
import {NoSuchElementError} from './../../../src/script4j/util/NoSuchElementError';
import { Consumer } from './../../../src/script4j/util/function/Consumer';
import {IllegalStateError} from './../../../src/script4j/lang/IllegalStateError';

describe('ArrayListTest', () => {

    let obj1: Object = new String("one");
    let obj2: Object = new String("two");
    let obj3: Object = new String("three");

    it('add_objects_addsObject', () => {
        let list: List<Object> = new ArrayList<Object>();
        list.add(obj1);
        assert.equal(list.size(), 1);
        assert.isTrue(list.get(0).equals(obj1));
        list.add(obj2);
        assert.equal(list.size(), 2);
        assert.isTrue(list.get(0).equals(obj1));
        assert.isTrue(list.get(1).equals(obj2));
    });

    it('clear_clearsArray_emptyArray', () => {
        let list: List<Object> = new ArrayList<Object>();
        assert.equal(list.size(), 0);
        list.add(obj1);
        assert.equal(list.size(), 1);
        list.clear();
        assert.equal(list.size(), 0);
    });

    it('contains_differentObjects_checks', () => {
        let list: List<Object> = new ArrayList<Object>();
        assert.isFalse(list.contains(obj1));
        list.add(obj1);
        assert.isTrue(list.contains(obj1));
        assert.isFalse(list.contains(obj2));
        list.add(obj2);
        assert.isTrue(list.contains(obj2));
        list.clear()
        assert.isFalse(list.contains(obj1));
        assert.isFalse(list.contains(obj2));
    });

    it('isEmpty_state_checks', () => {
        let list: List<Object> = new ArrayList<Object>();
        assert.isTrue(list.isEmpty());
        list.add(obj1);
        assert.isFalse(list.isEmpty());
        list.clear();
        assert.isTrue(list.isEmpty());
    });

    it('remove_shiftingObjects_removesObjects', () => {
        let list: List<Object> = new ArrayList<Object>();
        list.add(obj1);
        list.add(obj2);
        list.add(obj3);
        assert.isTrue(list.remove(obj2));
        assert.isTrue(list.get(0).equals(obj1));
        assert.isTrue(list.get(1).equals(obj3));
        assert.equal(list.size(), 2);
        list.remove(obj3);
        assert.isTrue(list.get(0).equals(obj1));
        assert.equal(list.size(), 1);
    });

    it('addByIndex_shiftingObjects_addsObject', () => {
        let list: List<Object> = new ArrayList<Object>();
        list.add(obj1);
        list.addByIndex(0, obj2);
        assert.isTrue(list.get(0).equals(obj2));
        assert.isTrue(list.get(1).equals(obj1));
        assert.equal(list.size(), 2);
        list.addByIndex(1, obj3);
        assert.isTrue(list.get(0).equals(obj2));
        assert.isTrue(list.get(1).equals(obj3));
        assert.isTrue(list.get(2).equals(obj1));
        assert.equal(list.size(), 3);
    });
    
    it('addAllByIndex_shiftingObjects_addsObject', () => {
        let list: List<number> = new ArrayList<number>();
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);
        let list2: List<number> = new ArrayList<number>();
        list2.add(5);
        list2.add(6);
        list2.add(7);
        assert.equal(list.addAllByIndex(2, list2), true);
        assert.equal(list.get(0), 1);
        assert.equal(list.get(1), 2);
        assert.equal(list.get(2), 5);
        assert.equal(list.get(3), 6);
        assert.equal(list.get(4), 7);
        assert.equal(list.get(5), 3);
        assert.equal(list.get(6), 4);
        assert.equal(list.size(), 7);
    });    

    it('get_outOfRange_IndexOutOfBoundsError', () => {
        let list: List<Object> = new ArrayList<Object>();
        assert.throws(() => list.get(0), IndexOutOfBoundsError);
        list.add(obj1);
        assert.throws(() => list.get(2), IndexOutOfBoundsError);
    });

    it('removeByIndex_shiftingObjects_removesObjects', () => {
        let list: List<Object> = new ArrayList<Object>();
        list.add(obj1);
        list.add(obj2);
        list.add(obj3);
        assert.equal(list.removeByIndex(1), obj2);
        assert.isTrue(list.get(0).equals(obj1));
        assert.isTrue(list.get(1).equals(obj3));
        assert.equal(list.size(), 2);
        assert.isTrue(list.removeByIndex(0).equals(obj1));
        assert.isTrue(list.get(0).equals(obj3));
        assert.equal(list.size(), 1);
    });

    it('set_shiftingObjects_setsObjects', () => {
        let list: List<Object> = new ArrayList<Object>();
        list.add(obj1);
        list.set(0, obj2);
        assert.isTrue(list.get(0).equals(obj2));
        assert.equal(list.size(), 1);
        list.add(obj3);
        assert.isTrue(list.set(1, obj1).equals(obj3))
        assert.isTrue(list.get(0).equals(obj2));
        assert.isTrue(list.get(1).equals(obj1));
        assert.equal(list.size(), 2);
    });

    it('subList_correctRange_subList', () => {
        let list: List<Object> = new ArrayList<Object>();
        list.add(obj1);
        list.add(obj2);
        list.add(obj3);
        let subList: List<Object> = list.subList(1, 3);
        assert.isTrue(subList.get(0).equals(obj2));
        assert.isTrue(subList.get(1).equals(obj3));
        assert.equal(subList.size(), 2);
    });

    it('indexOf_objectExists_findsIndex', () => {
        let list: List<Object> = new ArrayList<Object>();
        list.add(obj1);
        list.add(obj2);
        list.add(obj3);
        assert.equal(list.indexOf(obj1), 0);
        assert.equal(list.indexOf(obj2), 1);
        assert.equal(list.indexOf(obj3), 2);
    });

    it('indexOf_objectNotExists_returnsNotFound', () => {
        let list: List<Object> = new ArrayList<Object>();
        list.add(obj1);
        list.add(obj2);
        assert.equal(list.indexOf(obj3), -1);
    });

    it('iterator_hasNext_checks', () => {
        let list: List<Object> = new ArrayList<Object>();
        let iterator: Iterator<Object> = list.iterator();
        assert.isFalse(iterator.hasNext());
        list.add(obj1);
        assert.isTrue(iterator.hasNext());
        list.clear()
        assert.isFalse(iterator.hasNext());
    });

    it('iterator_nextWithElement_returnsElement', () => {
        let list: List<Object> = new ArrayList<Object>();
        let iterator: Iterator<Object> = list.iterator();
        list.add(obj1);
        assert.isTrue(iterator.next().equals(obj1));
    });

    it('iterator_nextWithNoElement_NoSuchElementError', () => {
        let list: List<Object> = new ArrayList<Object>();
        let iterator: Iterator<Object> = list.iterator();
        assert.throws(() => iterator.next(), NoSuchElementError);
        list.add(obj1);
        assert.isTrue(iterator.next().equals(obj1));
        assert.throws(() => iterator.next(), NoSuchElementError);
    });

    it('iterator_removeAfterNext_removesElement', () => {
        let list: List<Object> = new ArrayList<Object>();
        let iterator: Iterator<Object> = list.iterator();
        list.add(obj1);
        iterator.next();
        iterator.remove();
        assert.equal(list.size(), 0);
    });

    it('iterator_removesCorrectElement_removesElement', () => {
        let list: List<Object> = new ArrayList<Object>();
        let iterator: Iterator<Object> = list.iterator();
        list.add(obj1);
        list.add(obj2);
        list.add(obj3);
        iterator.next();
        iterator.next();
        iterator.remove();
        assert.equal(list.size(), 2);
        assert.isTrue(list.get(0).equals(obj1));
        assert.isTrue(list.get(1).equals(obj3));
    });

    it('iterator_removeWithoutNext_IllegalStateError', () => {
        let list: List<Object> = new ArrayList<Object>();
        let iterator: Iterator<Object> = list.iterator();
        list.add(obj1);
        assert.throws(() => iterator.remove(), IllegalStateError);
    });

    it('forEach_severalObjects_callsConsumer', () => {
        let list: List<Object> = new ArrayList<Object>();
        list.add(obj1);
        list.add(obj2);
        let arr: Object[] = [];
        let consumer: Consumer<Object> = Consumer.fromFunc((e: Object) => {
            arr.push(e);
        });
        list.forEach(consumer);
        assert.isTrue(list.get(0).equals(arr[0]));
        assert.isTrue(list.get(1).equals(arr[1]));
        assert.equal(arr.length, 2);
    });

});