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
import { SimpleStringProperty } from "./../../../../src/script4jfx/beans/property/SimpleStringProperty";

describe('SimpleStringPropertyTest', () => {

    let prop1: SimpleStringProperty = null;
    let prop2: SimpleStringProperty = null;
    let prop3: SimpleStringProperty = null;

    beforeEach(function() {
        prop1 = new SimpleStringProperty();
        prop2 = new SimpleStringProperty();
        prop3 = new SimpleStringProperty();
    });

    it('bind_twoProperties_correctBinding', () => {
        prop1.set("first");
        prop2.bind(prop1);
        assert.equal(prop1.get(), prop2.get());
        prop1.set("second");
        assert.equal(prop1.get(), prop2.get());
    });

    it('bindBidirectional_twoProperties_correctBinding', () => {
        prop1.set("first");
        prop2.bindBidirectional(prop1);
        assert.equal(prop1.get(), prop2.get());
        prop1.set("second");
        assert.equal(prop1.get(), prop2.get());
        prop2.set("third");
        assert.equal(prop1.get(), prop2.get());
    });

    it('bindBidirectional_threeProperties_correctBinding', () => {
        prop1.set("first");
        prop2.bindBidirectional(prop1);
        prop3.bindBidirectional(prop2);
        assert.equal(prop1.get(), prop2.get());
        assert.equal(prop2.get(), prop3.get());
        prop1.set("second");
        assert.equal(prop1.get(), prop2.get());
        assert.equal(prop2.get(), prop3.get());
        prop2.set("third");
        assert.equal(prop1.get(), prop2.get());
        assert.equal(prop2.get(), prop3.get());
        prop3.set("fouth");
        assert.equal(prop1.get(), prop2.get());
        assert.equal(prop2.get(), prop3.get());
    });

    it('unbind_twoProperties_correctUnbinding', () => {
        prop1.set("first");
        prop2.bind(prop1);
        assert.equal(prop1.get(), prop2.get());
        prop2.unbind();
        prop1.set("second");
        assert.equal(prop1.get(), "second");
        assert.equal(prop2.get(), "first");
    });

    it('unbindBidirectional_threePropertiesSameSide_correctUnbinding', () => {
        prop1.set("first");
        prop2.bindBidirectional(prop1);
        prop3.bindBidirectional(prop2);
        prop2.unbindBidirectional(prop1);// prop2 -> prop1
        prop1.set("second");
        assert.equal(prop1.get(), "second");
        assert.equal(prop2.get(), "first");
        assert.equal(prop3.get(), "first");
        prop2.set("third");
        assert.equal(prop1.get(), "second");
        assert.equal(prop2.get(), "third");
        assert.equal(prop3.get(), "third");
        prop3.set("fouth");
        assert.equal(prop1.get(), "second");
        assert.equal(prop2.get(), "fouth");
        assert.equal(prop3.get(), "fouth");
        prop3.unbindBidirectional(prop2); // prop3 -> prop2
        prop2.set("fifth");
        assert.equal(prop2.get(), "fifth");
        assert.equal(prop3.get(), "fouth");
        prop3.set("sixth");
        assert.equal(prop2.get(), "fifth");
        assert.equal(prop3.get(), "sixth");
    });

    it('unbindBidirectional_threePropertiesOpositeSide_correctUnbinding', () => {
        prop1.set("first");
        prop2.bindBidirectional(prop1);
        prop3.bindBidirectional(prop2);
        prop1.unbindBidirectional(prop2); // prop1 -> prop2
        prop1.set("second");
        assert.equal(prop1.get(), "second");
        assert.equal(prop2.get(), "first");
        assert.equal(prop3.get(), "first");
        prop2.set("third");
        assert.equal(prop1.get(), "second");
        assert.equal(prop2.get(), "third");
        assert.equal(prop3.get(), "third");
        prop3.set("fouth");
        assert.equal(prop1.get(), "second");
        assert.equal(prop2.get(), "fouth");
        assert.equal(prop3.get(), "fouth");
        prop2.unbindBidirectional(prop3); // prop2 -> prop3
        prop2.set("fifth");
        assert.equal(prop2.get(), "fifth");
        assert.equal(prop3.get(), "fouth");
        prop3.set("sixth");
        assert.equal(prop2.get(), "fifth");
        assert.equal(prop3.get(), "sixth");
    });
});


