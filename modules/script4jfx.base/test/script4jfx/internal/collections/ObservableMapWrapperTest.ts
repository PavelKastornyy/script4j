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
import { beforeEach } from 'mocha';
import { Map } from 'script4j.base';
import { HashMap } from 'script4j.base';
import { Iterator } from 'script4j.base';
import { FXCollections } from './../../../../src/script4jfx/collections/FXCollections';
import { ObservableMap } from './../../../../src/script4jfx/collections/ObservableMap';
import { MapChangeListener } from './../../../../src/script4jfx/collections/MapChangeListener';

describe('ObservableMapWrapperTest', () => {

    let map: ObservableMap<number, string> = null;

    beforeEach(function() {
        let originalMap: Map<number, string> = new HashMap<number, string>();
        originalMap.put(1, "A");
        originalMap.put(2, "B");
        originalMap.put(3, "C");
        originalMap.put(4, "D");
        originalMap.put(5, "E");
        map = FXCollections.observableMap(originalMap);
    });

    it('EntrySetWrapper#iterator_removingTwoElements_correctEvents', () => {
        let counter: number = 0;
        let expected: Map<number, string> = new HashMap<number, string>();
        let actual: Map<number, string> = new HashMap<number, string>();
        map.addListener(MapChangeListener.fromFunc((change) => {
            counter++;
            if (counter === 1) {
                assert.isFalse(change.wasAdded());
                assert.isTrue(change.wasRemoved());
                actual.put(change.getKey(), change.getValueRemoved());
                assert.isNull(change.getValueAdded());
                assert.equal(change.getMap().size(), 4);
            } else if (counter === 2) {
                assert.isFalse(change.wasAdded());
                assert.isTrue(change.wasRemoved());
                actual.put(change.getKey(), change.getValueRemoved());
                assert.isNull(change.getValueAdded());
                assert.equal(change.getMap().size(), 3);
            }
        }));
        expected.put(3, "C");
        expected.put(5, "E");
        let iterator: Iterator<Map.Entry<number, string>> = map.entrySet().iterator();
        while (iterator.hasNext()) {
            let key: number = iterator.next().getKey();
            if (key === 3 || key === 5) {
                iterator.remove();
            }
        }
        assert.isTrue(expected.equals(actual));
        assert.equal(counter, 2);
        assert.equal(map.size(), 3);
    });

    it('clear_removingAllElements_correctEvent', () => {
        let mapCopy: Map<number, string> = new HashMap<number, string>();
        let counter: number = 0;
        map.addListener(MapChangeListener.fromFunc((change) => {
            counter++;
            assert.isFalse(change.wasAdded());
            assert.isTrue(change.wasRemoved());
            mapCopy.put(change.getKey(), change.getValueRemoved());
            assert.isNull(change.getValueAdded());
            assert.equal(change.getMap().size(), 5 - counter);
        }));
        map.clear();
        assert.equal(counter, 5);
        assert.equal(map.size(), 0);
        assert.equal(mapCopy.size(), 5);
    });

    it('KeySetWrapper#iterator_removingTwoElements_correctEvents', () => {
        let counter: number = 0;
        let expected: Map<number, string> = new HashMap<number, string>();
        let actual: Map<number, string> = new HashMap<number, string>();
        map.addListener(MapChangeListener.fromFunc((change) => {
            counter++;
            if (counter === 1) {
                assert.isFalse(change.wasAdded());
                assert.isTrue(change.wasRemoved());
                actual.put(change.getKey(), change.getValueRemoved());
                assert.isNull(change.getValueAdded());
                assert.equal(change.getMap().size(), 4);
            } else if (counter === 2) {
                assert.isFalse(change.wasAdded());
                assert.isTrue(change.wasRemoved());
                actual.put(change.getKey(), change.getValueRemoved());
                assert.isNull(change.getValueAdded());
                assert.equal(change.getMap().size(), 3);
            }
        }));
        expected.put(3, "C");
        expected.put(5, "E");
        let iterator: Iterator<number> = map.keySet().iterator();
        while (iterator.hasNext()) {
            let key: number = iterator.next();
            if (key === 3 || key === 5) {
                iterator.remove();
            }
        }
        assert.isTrue(expected.equals(actual));
        assert.equal(counter, 2);
        assert.equal(map.size(), 3);
    });

    it('put_keyExists_correctEvent', () => {
        let counter: number = 0;
        map.addListener(MapChangeListener.fromFunc((change) => {
            counter++;
            assert.isTrue(change.wasAdded());
            assert.isTrue(change.wasRemoved());
            assert.isTrue(change.getValueAdded().equals("X"))
            assert.isTrue(change.getValueRemoved().equals("A"))
            assert.equal(change.getMap().size(), 5);
        }));
        map.put(1, "X");
        assert.equal(counter, 1);
        assert.equal(map.size(), 5);
    });

    it('put_keyNotExists_correctEvent', () => {
        let counter: number = 0;
        map.addListener(MapChangeListener.fromFunc((change) => {
            counter++;
            assert.isTrue(change.wasAdded());
            assert.isFalse(change.wasRemoved());
            assert.isTrue(change.getValueAdded().equals("X"))
            assert.isNull(change.getValueRemoved())
            assert.equal(change.getMap().size(), 6);
        }));
        map.put(10, "X");
        assert.equal(counter, 1);
        assert.equal(map.size(), 6);
    });

    it('remove_elementExists_correctEvent', () => {
        let counter: number = 0;
        map.addListener(MapChangeListener.fromFunc((change) => {
            counter++;
            assert.isFalse(change.wasAdded());
            assert.isTrue(change.wasRemoved());
            assert.isTrue(change.getKey().equals(2));
            assert.isTrue(change.getValueRemoved().equals("B"));
            assert.isNull(change.getValueAdded());
            assert.equal(change.getMap().size(), 5 - counter);
        }));
        assert.isTrue(map.remove(2).equals("B"));
        assert.equal(counter, 1);
        assert.equal(map.size(), 4);
    });

    it('ValueCollectionWrapper#iterator_removingTwoElements_correctEvents', () => {
        let counter: number = 0;
        let expected: Map<number, string> = new HashMap<number, string>();
        let actual: Map<number, string> = new HashMap<number, string>();
        map.addListener(MapChangeListener.fromFunc((change) => {
            counter++;
            if (counter === 1) {
                assert.isFalse(change.wasAdded());
                assert.isTrue(change.wasRemoved());
                actual.put(change.getKey(), change.getValueRemoved());
                assert.isNull(change.getValueAdded());
                assert.equal(change.getMap().size(), 4);
            } else if (counter === 2) {
                assert.isFalse(change.wasAdded());
                assert.isTrue(change.wasRemoved());
                actual.put(change.getKey(), change.getValueRemoved());
                assert.isNull(change.getValueAdded());
                assert.equal(change.getMap().size(), 3);
            }
        }));
        expected.put(3, "C");
        expected.put(5, "E");
        let iterator: Iterator<string> = map.values().iterator();
        while (iterator.hasNext()) {
            let value: string = iterator.next();
            if (value.equals("C") || value.equals("E")) {
                iterator.remove();
            }
        }
        assert.isTrue(expected.equals(actual));
        assert.equal(counter, 2);
        assert.equal(map.size(), 3);
    });
});

