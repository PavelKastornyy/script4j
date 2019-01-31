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
import { beforeEach} from 'mocha';
import { List } from 'script4j.base';
import { ArrayList } from 'script4j.base';
import { Iterator } from 'script4j.base';
import { FXCollections } from './../../../../src/script4jfx/collections/FXCollections';
import { ObservableList } from './../../../../src/script4jfx/collections/ObservableList';
import { ListChangeListener } from './../../../../src/script4jfx/collections/ListChangeListener';

describe('ObservableArrayListImplTest', () => {

    let list: ObservableList<string> = null;

    beforeEach(function() {
        let values: List<string> = new ArrayList<string>();
        values.add("A");
        values.add("B");
        values.add("C");
        values.add("D");
        values.add("E");
        list = FXCollections.observableArrayList(values);
    });

    it('addByIndex_addingOneElement_elementWasAdded', () => {
        list.addByIndex(1, "X");
        assert.equal(list.size(), 6);
        assert.isTrue(list.get(1).equals("X"));
    });

    it('addByIndex_addingOneElement_correctEvent', () => {
        let change: ListChangeListener.Change<string>;
        list.addListener((ch) => {
            change = ch;
        });
        list.addByIndex(1, "X");
        assert.isTrue(change.next());
        assert.isFalse(change.next());
        assert.equal(change.getFrom(), 1);
        assert.equal(change.getTo(), 2);
        assert.isTrue(change.wasAdded());
        assert.isFalse(change.wasRemoved());
        assert.isFalse(change.wasReplaced());
        assert.isFalse(change.wasUpdated());
        assert.equal(change.getAddedSize(), 1);
        assert.equal(change.getAddedSubList().get(0), "X");
        assert.equal(change.getRemovedSize(), 0);
    });

    it('removeByIndex_removingOneElement_correctEvent', () => {
        let change: ListChangeListener.Change<string>;
        list.addListener((ch) => {
            change = ch;
        });
        list.removeByIndex(1);
        assert.isTrue(change.next());
        assert.isFalse(change.next());
        assert.equal(change.getFrom(), 1);
        assert.equal(change.getTo(), 1);
        assert.isFalse(change.wasAdded());
        assert.isTrue(change.wasRemoved());
        assert.isFalse(change.wasReplaced());
        assert.isFalse(change.wasUpdated());
        assert.equal(change.getRemovedSize(), 1);
        assert.equal(change.getRemoved().get(0), "B");
        assert.equal(change.getAddedSize(), 0);
    });

    it('removeByIndex_removingOneElement_correctSize', () => {
        list.removeByIndex(1);
        assert.equal(list.size(), 4);
    });

    it('set_replacingExistingElement_correctEvent', () => {
        let change: ListChangeListener.Change<string>;
        list.addListener((ch) => {
            change = ch;
        });
        list.set(1, "X");
        assert.isTrue(change.next());
        assert.isFalse(change.next());
        assert.equal(change.getFrom(), 1);
        assert.equal(change.getTo(), 2);
        assert.isTrue(change.wasAdded());
        assert.isTrue(change.wasRemoved());
        assert.isTrue(change.wasReplaced());
        assert.isFalse(change.wasUpdated());
        assert.equal(change.getRemovedSize(), 1);
        assert.equal(change.getRemoved().get(0), "B");
        assert.equal(change.getAddedSize(), 1);
        assert.equal(change.getAddedSubList().get(0), "X");
    });

    it('set_replacingExistingElement_elementIsReplaced', () => {
        list.set(1, "X");
        assert.isTrue(list.get(1).equals("X"));
    });

    it('add_addingOneElement_correctEvent', () => {
        let change: ListChangeListener.Change<string>;
        list.addListener((ch) => {
            change = ch;
        });
        list.add("X");
        assert.isTrue(change.next());
        assert.isFalse(change.next());
        assert.equal(change.getFrom(), 5);
        assert.equal(change.getTo(), 6);
        assert.isTrue(change.wasAdded());
        assert.isFalse(change.wasRemoved());
        assert.isFalse(change.wasReplaced());
        assert.isFalse(change.wasUpdated());
        assert.equal(change.getAddedSize(), 1);
        assert.equal(change.getAddedSubList().get(0), "X");
        assert.equal(change.getRemovedSize(), 0);
    });

    it('add_addingOneElement_elementWasAdded', () => {
        list.add("X");
        assert.equal(list.size(), 6);
        assert.isTrue(list.get(5).equals("X"));
    });

    it('addAll_addingTwoElements_correctEvent', () => {
        let change: ListChangeListener.Change<string>;
        list.addListener((ch) => {
            change = ch;
        });
        let temp: List<string> = new ArrayList<string>();
        temp.add("X");
        temp.add("Z");
        list.addAll(temp);
        assert.isTrue(change.next());
        assert.isFalse(change.next());
        assert.equal(change.getFrom(), 5);
        assert.equal(change.getTo(), 7);
        assert.isTrue(change.wasAdded());
        assert.isFalse(change.wasRemoved());
        assert.isFalse(change.wasReplaced());
        assert.isFalse(change.wasUpdated());
        assert.equal(change.getAddedSize(), 2);
        assert.equal(change.getAddedSubList().get(0), "X");
        assert.equal(change.getAddedSubList().get(1), "Z");
        assert.equal(change.getRemovedSize(), 0);
    });

    it('addAll_addingTwoElements_elementsWereAdded', () => {
        let temp: List<string> = new ArrayList<string>();
        temp.add("X");
        temp.add("Z");
        list.addAll(temp);
        assert.equal(list.size(), 7);
        assert.isTrue(list.get(5).equals("X"));
    });

    it('clear_clearingExistingElements_correctEvent', () => {
        let change: ListChangeListener.Change<string>;
        list.addListener((ch) => {
            change = ch;
        });
        list.clear();
        assert.isTrue(change.next());
        assert.isFalse(change.next());
        assert.equal(change.getFrom(), 0);
        assert.equal(change.getTo(), 0);
        assert.isFalse(change.wasAdded());
        assert.isTrue(change.wasRemoved());
        assert.isFalse(change.wasReplaced());
        assert.isFalse(change.wasUpdated());
        assert.equal(change.getRemovedSize(), 5);
        assert.equal(change.getRemoved().get(1), "B");
        assert.equal(change.getAddedSize(), 0);
    });

    it('clear_clearingExistingElements_emptyList', () => {
        list.clear();
        assert.equal(list.size(), 0);
        assert.isTrue(list.isEmpty());
    });

    it('remove_removingOneElement_correctEvent', () => {
        let change: ListChangeListener.Change<string>;
        list.addListener((ch) => {
            change = ch;
        });
        list.remove("B");
        assert.isTrue(change.next());
        assert.isFalse(change.next());
        assert.equal(change.getFrom(), 1);
        assert.equal(change.getTo(), 1);
        assert.isFalse(change.wasAdded());
        assert.isTrue(change.wasRemoved());
        assert.isFalse(change.wasReplaced());
        assert.isFalse(change.wasUpdated());
        assert.equal(change.getRemovedSize(), 1);
        assert.equal(change.getRemoved().get(0), "B");
        assert.equal(change.getAddedSize(), 0);
    });

    it('remove_removingOneElement_correctSize', () => {
        list.remove("B");
        assert.equal(list.size(), 4);
    });

    it('removeAll_removingThreeElements_correctEvent', () => {
        let change: ListChangeListener.Change<string>;
        list.addListener((ch) => {
            change = ch;
        });
        let temp: List<string> = new ArrayList<string>();
        temp.add("A");
        temp.add("B");
        temp.add("E");
        list.removeAll(temp);
        //the first change
        assert.isTrue(change.next());
        assert.equal(change.getFrom(), 0);
        assert.equal(change.getTo(), 0);
        assert.isFalse(change.wasAdded());
        assert.isTrue(change.wasRemoved());
        assert.isFalse(change.wasReplaced());
        assert.isFalse(change.wasUpdated());
        assert.equal(change.getRemovedSize(), 2);
        assert.equal(change.getRemoved().get(0), "A");
        assert.equal(change.getRemoved().get(1), "B");
        assert.equal(change.getAddedSize(), 0);
        //the second change
        assert.isTrue(change.next());
        assert.equal(change.getFrom(), 2);
        assert.equal(change.getTo(), 2);
        assert.isFalse(change.wasAdded());
        assert.isTrue(change.wasRemoved());
        assert.isFalse(change.wasReplaced());
        assert.isFalse(change.wasUpdated());
        assert.equal(change.getRemovedSize(), 1);
        assert.equal(change.getRemoved().get(0), "E");
        assert.equal(change.getAddedSize(), 0);
        assert.isFalse(change.next());
    });

    it('iterator_removeOneElement_correctEvent', () => {
        let change: ListChangeListener.Change<string>;
        list.addListener((ch) => {
            change = ch;
        });
        let iterator: Iterator<string> = list.iterator();
        assert.isTrue(iterator.hasNext());
        iterator.next();
        iterator.next();//removing B
        iterator.remove();
        assert.isTrue(change.next());
        assert.isFalse(change.next());
        assert.equal(change.getFrom(), 0);
        assert.equal(change.getTo(), 0);
        assert.isFalse(change.wasAdded());
        assert.isTrue(change.wasRemoved());
        assert.isFalse(change.wasReplaced());
        assert.isFalse(change.wasUpdated());
        assert.equal(change.getRemovedSize(), 1);
        assert.equal(change.getRemoved().get(0), "B");
        assert.equal(change.getAddedSize(), 0);
    });

});




