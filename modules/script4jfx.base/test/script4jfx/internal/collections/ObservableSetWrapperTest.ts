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
import { Set } from 'script4j.base';
import { HashSet } from 'script4j.base';
import { Iterator } from 'script4j.base';
import { FXCollections } from './../../../../src/script4jfx/collections/FXCollections';
import { ObservableSet } from './../../../../src/script4jfx/collections/ObservableSet';
import { SetChangeListener } from './../../../../src/script4jfx/collections/SetChangeListener';

describe('ObservableSetWrapperTest', () => {

    let set: ObservableSet<string> = null;

    beforeEach(function() {
        let values: Set<string> = new HashSet<string>();
        values.add("A");
        values.add("B");
        values.add("C");
        values.add("D");
        values.add("E");
        set = FXCollections.observableSet(values);
    });

    it('add_addingOneElement_elementWasAdded', () => {
        assert.isTrue(set.add("X"));
        assert.equal(set.size(), 6);
        assert.isTrue(set.contains("X"));
    });

    it('add_addingOneElement_correctEvent', () => {
        let counter: number = 0;
        set.addListener((change) => {
            counter++;
            assert.isTrue(change.wasAdded());
            assert.isFalse(change.wasRemoved());
            assert.isTrue(change.getElementAdded().equals("X"));
            assert.isNull(change.getElementRemoved());
            assert.equal(change.getSet().size(), 6);
        });
        assert.isTrue(set.add("X"));
        assert.equals(counter, 1);
    });

    it('addAll_addingTwoElements_correctEvent', () => {
        let counter: number = 0;
        let temp0: Set<string> = new HashSet<string>();
        let temp1: Set<string> = new HashSet<string>();
        set.addListener((change) => {
            counter++;
            if (counter === 1) {
                assert.isTrue(change.wasAdded());
                assert.isFalse(change.wasRemoved());
                temp1.add(change.getElementAdded());
                assert.isNull(change.getElementRemoved());
                assert.equal(change.getSet().size(), 6);
            } else {
                assert.isTrue(change.wasAdded());
                assert.isFalse(change.wasRemoved());
                temp1.add(change.getElementAdded());
                assert.isNull(change.getElementRemoved());
                assert.equal(change.getSet().size(), 7);
            }
        });
        temp0.add("X");
        temp0.add("Z");
        assert.isTrue(set.addAll(temp0));
        assert.isTrue(temp0.equals(temp1));
        assert.equals(counter, 2);
    });

    it('addAll_addingTwoElements_elementsWereAdded', () => {
        let temp: Set<string> = new HashSet<string>();
        temp.add("X");
        temp.add("Z");
        assert.isTrue(set.addAll(temp));
        assert.equal(set.size(), 7);
        assert.isTrue(set.contains("X"));
        assert.isTrue(set.contains("Z"));
    });

    it('remove_addingOneElement_correctEvent', () => {
        let counter: number = 0;
        set.addListener((change) => {
            counter++;
            assert.isFalse(change.wasAdded());
            assert.isTrue(change.wasRemoved());
            assert.isNull(change.getElementAdded());
            assert.isTrue(change.getElementRemoved().equals("C"));
            assert.equal(change.getSet().size(), 4);
        });
        assert.isTrue(set.remove("C"));
        assert.equals(counter, 1);
    });

    it('removeAll_removingTwoElements_correctEvent', () => {
        let counter: number = 0;
        let temp0: Set<string> = new HashSet<string>();
        let temp1: Set<string> = new HashSet<string>();
        set.addListener((change) => {
            counter++;
            if (counter === 1) {
                assert.isFalse(change.wasAdded());
                assert.isTrue(change.wasRemoved());
                temp1.add(change.getElementRemoved());
                assert.isNull(change.getElementAdded());
                assert.equal(change.getSet().size(), 4);
            } else {
                assert.isFalse(change.wasAdded());
                assert.isTrue(change.wasRemoved());
                temp1.add(change.getElementRemoved());
                assert.isNull(change.getElementAdded());
                assert.equal(change.getSet().size(), 3);
            }
        });
        temp0.add("C");
        temp0.add("E");
        assert.isTrue(set.removeAll(temp0));
        assert.isTrue(temp0.equals(temp1));
        assert.equals(counter, 2);
    });

    it('removeAll_removingTwoElements_elementsWereRemoved', () => {
        let temp: Set<string> = new HashSet<string>();
        temp.add("B");
        temp.add("C");
        assert.isTrue(set.removeAll(temp));
        assert.equal(set.size(), 3);
        assert.isFalse(set.contains("B"));
        assert.isFalse(set.contains("C"));
    });

    it('iterator_removingTwoElements_correctEvent', () => {
        let counter: number = 0;
        let temp: Set<string> = new HashSet<string>();
        set.addListener((change) => {
            counter++;
            if (counter === 1) {
                assert.isFalse(change.wasAdded());
                assert.isTrue(change.wasRemoved());
                temp.add(change.getElementRemoved());
                assert.isNull(change.getElementAdded());
                assert.equal(change.getSet().size(), 4);
            } else {
                assert.isFalse(change.wasAdded());
                assert.isTrue(change.wasRemoved());
                temp.add(change.getElementRemoved());
                assert.isNull(change.getElementAdded());
                assert.equal(change.getSet().size(), 3);
            }
        });
        let iterator: Iterator<string> = set.iterator();
        while (iterator.hasNext()) {
            let obj: string = iterator.next();
            if (obj.equals("B") || obj.equals("C")) {
                iterator.remove();
            }
        }
        assert.isTrue(temp.contains("B"));
        assert.isTrue(temp.contains("C"));
        assert.equals(counter, 2);
    });

    it('iterator_removingTwoElements_elementsWereRemoved', () => {
        let iterator: Iterator<string> = set.iterator();
        while (iterator.hasNext()) {
            let obj: string = iterator.next();
            if (obj.equals("B") || obj.equals("C")) {
                iterator.remove();
            }
        }
        assert.equal(set.size(), 3);
        assert.isFalse(set.contains("B"));
        assert.isFalse(set.contains("C"));
    });

    it('clear_removingAllElements_correctEvents', () => {
        let temp: Set<string> = new HashSet<string>();
        let counter: number = 0;
        set.addListener((change) => {
            counter++;
            assert.isFalse(change.wasAdded());
            assert.isTrue(change.wasRemoved());
            temp.add(change.getElementRemoved());
            assert.isNull(change.getElementAdded());
            assert.equal(change.getSet().size(), 5 - counter);

        });
        set.clear();
        assert.equals(counter, 5);
        assert.isTrue(temp.contains("A"));
        assert.isTrue(temp.contains("B"));
        assert.isTrue(temp.contains("C"));
        assert.isTrue(temp.contains("D"));
        assert.isTrue(temp.contains("E"));
        assert.equals(temp.size(), 5);

    });

});

