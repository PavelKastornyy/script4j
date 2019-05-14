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

describe('ObservableArrayListTest', () => {

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
        list.addAt(1, "X");
        assert.equal(list.size(), 6);
        assert.isTrue(list.get(1).equals("X"));
    });

    it('addByIndex_addingOneElement_correctEvent', () => {
        let counter: number = 0;
        list.addListener(ListChangeListener.lambda((change) => {
            counter++;
            assert.isTrue(change.next());
            assert.isFalse(change.next());
            assert.equal(change.getFrom(), 1);
            assert.equal(change.getTo(), 2);
            assert.isTrue(change.wasAdded());
            assert.isFalse(change.wasRemoved());
            assert.isFalse(change.wasReplaced());
            assert.isFalse(change.wasUpdated());
            assert.equal(change.getAddedSize(), 1);
            assert.isTrue(change.getAddedSubList().get(0).equals("X"));
            assert.equal(change.getRemovedSize(), 0);
        }));
        list.addAt(1, "X");
        assert.equal(counter, 1);
    });
    
    it('addAllByIndex_nonEmptyCollection_correctEvent', () => {
        let list2: List<string> = new ArrayList<string>();
        list2.add("X");
        list2.add("Y");
        list2.add("Z");        
        let counter: number = 0;
        list.addListener(ListChangeListener.lambda((change) => {
            counter++;
            assert.isTrue(change.next());
            assert.isFalse(change.next());
            assert.equal(change.getFrom(), 2);
            assert.equal(change.getTo(), 5);
            assert.isTrue(change.wasAdded());
            assert.isFalse(change.wasRemoved());
            assert.isFalse(change.wasReplaced());
            assert.isFalse(change.wasUpdated());
            assert.equal(change.getAddedSize(), 3);
            assert.isTrue(change.getAddedSubList().get(0).equals("X"));
            assert.isTrue(change.getAddedSubList().get(1).equals("Y"));
            assert.isTrue(change.getAddedSubList().get(2).equals("Z"));
            assert.equal(change.getAddedSubList().size(), 3);
            assert.equal(change.getRemovedSize(), 0);
        }));
        assert.equal(list.addAllAt(2, list2), true);
        assert.equal(list.size(), 8);
        assert.equal(counter, 1);
    });      

    it('removeByIndex_removingOneElement_correctEvent', () => {
        let counter: number = 0;
        list.addListener(ListChangeListener.lambda((change) => {
            counter++;
            assert.isTrue(change.next());
            assert.isFalse(change.next());
            assert.equal(change.getFrom(), 1);
            assert.equal(change.getTo(), 1);
            assert.isFalse(change.wasAdded());
            assert.isTrue(change.wasRemoved());
            assert.isFalse(change.wasReplaced());
            assert.isFalse(change.wasUpdated());
            assert.equal(change.getRemovedSize(), 1);
            assert.isTrue(change.getRemoved().get(0).equals("B"));
            assert.equal(change.getAddedSize(), 0);
        }));
        assert.isTrue(list.removeAt(1).equals("B"));
        assert.equal(counter, 1);
    });

    it('removeByIndex_removingOneElement_correctSize', () => {
        assert.isTrue(list.removeAt(1).equals("B"));
        assert.equal(list.size(), 4);
    });

    it('set_replacingExistingElement_correctEvent', () => {
        let counter: number = 0;
        list.addListener(ListChangeListener.lambda((change) => {
            counter++;
            assert.isTrue(change.next());
            assert.isFalse(change.next());
            assert.equal(change.getFrom(), 1);
            assert.equal(change.getTo(), 2);
            assert.isTrue(change.wasAdded());
            assert.isTrue(change.wasRemoved());
            assert.isTrue(change.wasReplaced());
            assert.isFalse(change.wasUpdated());
            assert.equal(change.getRemovedSize(), 1);
            assert.isTrue(change.getRemoved().get(0).equals("B"));
            assert.equal(change.getAddedSize(), 1);
            assert.isTrue(change.getAddedSubList().get(0).equals("X"));
        }));
        assert.isTrue(list.set(1, "X").equals("B"));;
        assert.equal(counter, 1);
    });

    it('set_replacingExistingElement_elementIsReplaced', () => {
        assert.isTrue(list.set(1, "X").equals("B"));;
        assert.isTrue(list.get(1).equals("X"));
    });

    it('add_addingOneElement_correctEvent', () => {
        let counter: number = 0;
        list.addListener(ListChangeListener.lambda((change) => {
            counter++;
            assert.isTrue(change.next());
            assert.isFalse(change.next());
            assert.equal(change.getFrom(), 5);
            assert.equal(change.getTo(), 6);
            assert.isTrue(change.wasAdded());
            assert.isFalse(change.wasRemoved());
            assert.isFalse(change.wasReplaced());
            assert.isFalse(change.wasUpdated());
            assert.equal(change.getAddedSize(), 1);
            assert.isTrue(change.getAddedSubList().get(0).equals("X"));
            assert.equal(change.getRemovedSize(), 0);
        }));
        list.add("X");
        assert.equal(counter, 1);
    });

    it('add_addingOneElement_elementWasAdded', () => {
        assert.isTrue(list.add("X"));
        assert.equal(list.size(), 6);
        assert.isTrue(list.get(5).equals("X"));
    });

    it('addAll_addingTwoElements_correctEvent', () => {
        let counter: number = 0;
        list.addListener(ListChangeListener.lambda((change) => {
            counter++;
            assert.isTrue(change.next());
            assert.isFalse(change.next());
            assert.equal(change.getFrom(), 5);
            assert.equal(change.getTo(), 7);
            assert.isTrue(change.wasAdded());
            assert.isFalse(change.wasRemoved());
            assert.isFalse(change.wasReplaced());
            assert.isFalse(change.wasUpdated());
            assert.equal(change.getAddedSize(), 2);
            assert.isTrue(change.getAddedSubList().get(0).equals("X"));
            assert.isTrue(change.getAddedSubList().get(1).equals("Z"));
            assert.equal(change.getRemovedSize(), 0);
        }));
        let temp: List<string> = new ArrayList<string>();
        temp.add("X");
        temp.add("Z");
        list.addAll(temp);
        assert.equal(counter, 1);
    });

    it('addAll_addingTwoElements_elementsWereAdded', () => {
        let temp: List<string> = new ArrayList<string>();
        temp.add("X");
        temp.add("Z");
        list.addAll(temp);
        assert.equal(list.size(), 7);
        assert.isTrue(list.get(5).equals("X"));
        assert.isTrue(list.get(6).equals("Z"));
    });

    it('clear_clearingExistingElements_correctEvent', () => {
        let counter: number = 0;
        list.addListener(ListChangeListener.lambda((change) => {
            counter++;
            assert.isTrue(change.next());
            assert.isFalse(change.next());
            assert.equal(change.getFrom(), 0);
            assert.equal(change.getTo(), 0);
            assert.isFalse(change.wasAdded());
            assert.isTrue(change.wasRemoved());
            assert.isFalse(change.wasReplaced());
            assert.isFalse(change.wasUpdated());
            assert.equal(change.getRemovedSize(), 5);
            assert.isTrue(change.getRemoved().get(1).equals("B"));
            assert.equal(change.getAddedSize(), 0);
        }));
        list.clear();
        assert.equal(counter, 1);
    });

    it('clear_clearingExistingElements_emptyList', () => {
        list.clear();
        assert.equal(list.size(), 0);
        assert.isTrue(list.isEmpty());
    });

    it('remove_removingOneElement_correctEvent', () => {
        let counter: number = 0;
        list.addListener(ListChangeListener.lambda((change) => {
            counter++;
            assert.isTrue(change.next());
            assert.isFalse(change.next());
            assert.equal(change.getFrom(), 1);
            assert.equal(change.getTo(), 1);
            assert.isFalse(change.wasAdded());
            assert.isTrue(change.wasRemoved());
            assert.isFalse(change.wasReplaced());
            assert.isFalse(change.wasUpdated());
            assert.equal(change.getRemovedSize(), 1);
            assert.isTrue(change.getRemoved().get(0).equals("B"));
            assert.equal(change.getAddedSize(), 0);
        }));
        list.remove("B");
        assert.equal(counter, 1);
    });

    it('remove_removingOneElement_correctSize', () => {
        assert.isTrue(list.remove("B"));
        assert.equal(list.size(), 4);
    });

    it('removeAll_removingThreeElements_correctEvent', () => {
        let counter: number = 0;
        list.addListener(ListChangeListener.lambda((change) => {
            counter++;
            //first change
            assert.isTrue(change.next());
            assert.equal(change.getFrom(), 0);
            assert.equal(change.getTo(), 0);
            assert.isFalse(change.wasAdded());
            assert.isTrue(change.wasRemoved());
            assert.isFalse(change.wasReplaced());
            assert.isFalse(change.wasUpdated());
            assert.equal(change.getRemovedSize(), 2);
            assert.isTrue(change.getRemoved().get(0).equals("A"));
            assert.isTrue(change.getRemoved().get(1).equals("B"));
            assert.equal(change.getAddedSize(), 0);
            //second change
            assert.isTrue(change.next());
            assert.equal(change.getFrom(), 2);
            assert.equal(change.getTo(), 2);
            assert.isFalse(change.wasAdded());
            assert.isTrue(change.wasRemoved());
            assert.isFalse(change.wasReplaced());
            assert.isFalse(change.wasUpdated());
            assert.equal(change.getRemovedSize(), 1);
            assert.isTrue(change.getRemoved().get(0).equals("E"));
            assert.equal(change.getAddedSize(), 0);
            //third?
            assert.isFalse(change.next());
        }));
        let temp: List<string> = new ArrayList<string>();
        temp.add("A");
        temp.add("B");
        temp.add("E");
        assert.isTrue(list.removeAll(temp));
        assert.equal(counter, 1);
    });

    it('iterator_removeOneElement_correctEvent', () => {
        let counter: number = 0;
        list.addListener(ListChangeListener.lambda((change) => {
            counter++;
            assert.isTrue(change.next());
            assert.isFalse(change.next());
            assert.equal(change.getFrom(), 0);
            assert.equal(change.getTo(), 0);
            assert.isFalse(change.wasAdded());
            assert.isTrue(change.wasRemoved());
            assert.isFalse(change.wasReplaced());
            assert.isFalse(change.wasUpdated());
            assert.equal(change.getRemovedSize(), 1);
            assert.isTrue(change.getRemoved().get(0).equals("B"));
            assert.equal(change.getAddedSize(), 0);
        }));
        let iterator: Iterator<string> = list.iterator();
        assert.isTrue(iterator.hasNext());
        iterator.next();
        iterator.next();//removing B
        iterator.remove();
        assert.equal(counter, 1);
    });

});




