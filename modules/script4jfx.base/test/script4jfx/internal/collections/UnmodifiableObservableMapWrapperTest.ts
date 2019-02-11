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
import { UnsupportedOperationError } from 'script4j.base';

describe('UnmodifiableObservableMapWrapperTest', () => {

    let map: ObservableMap<number, string> = null;

    let unmodifiableMap: ObservableMap<number, string> = null;

    beforeEach(function() {
        let originalMap: Map<number, string> = new HashMap<number, string>();
        originalMap.put(1, "A");
        originalMap.put(2, "B");
        originalMap.put(3, "C");
        originalMap.put(4, "D");
        originalMap.put(5, "E");
        map = FXCollections.observableMap(originalMap);
        unmodifiableMap = FXCollections.unmodifiableObservableMap(map);
    });

    it('get_elementsExist_correctValue', () => {
        assert.isTrue(unmodifiableMap.get(2).equals("B"));
    });

    it('size_elementsExist_correctValue', () => {
        assert.equals(unmodifiableMap.size(), 5);
    });

    it('put_keyNotExists_UnsupportedOperationError', () => {
        assert.throws(() => unmodifiableMap.put(6, "F"), UnsupportedOperationError);
        assert.equals(unmodifiableMap.size(), 5);
    });

    it('EntrySetWrapper#iterator_removingEntry_UnsupportedOperationError', () => {
        let iterator: Iterator<Map.Entry<number, string>> = unmodifiableMap.entrySet().iterator();
        let removeWasCalled: boolean = false;
        while (iterator.hasNext()) {
            let key: number = iterator.next().getKey();
            if (key === 3) {
                assert.throws(() => iterator.remove(), UnsupportedOperationError);
                removeWasCalled = true;
            }
        }
        assert.equals(unmodifiableMap.size(), 5);
        assert.isTrue(removeWasCalled);
    });
});

