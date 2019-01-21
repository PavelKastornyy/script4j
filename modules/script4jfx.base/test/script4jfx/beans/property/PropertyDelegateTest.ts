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
import { PropertyDelegate } from './../../../../src/script4jfx/beans/property/PropertyDelegate';

describe('PropertyDelegateTest', () => {

    let prop1: PropertyDelegate<string> = null;
    let prop2: PropertyDelegate<string> = null;
    let prop3: PropertyDelegate<string> = null;

    beforeEach(function() {
        prop1 = new PropertyDelegate<string>(null);
        //as we don't have a delegator, we set it to delegate.
        (prop1 as any).delegator = prop1;
        prop2 = new PropertyDelegate<string>(null);
        //as we don't have a delegator, we set it to delegate.
        (prop2 as any).delegator = prop2;
        prop3 = new PropertyDelegate<string>(null);
        //as we don't have a delegator, we set it to delegate.
        (prop3 as any).delegator = prop3;
    });

    it('bind_thereIsNoBinding_correctBinding', () => {
        prop1.setValue("first");
        prop2.bind(prop1);
        assert.equal(prop1.getValue(), prop2.getValue());
        prop1.setValue("second");
        assert.equal(prop1.getValue(), prop2.getValue());
    });

    it('bindBidirectional_twoProperties_correctBinding', () => {
        prop1.setValue("first");
        prop2.bindBidirectional(prop1);
        assert.equal(prop1.getValue(), prop2.getValue());
        prop1.setValue("second");
        assert.equal(prop1.getValue(), prop2.getValue());
        prop2.setValue("third");
        assert.equal(prop1.getValue(), prop2.getValue());
    });

    it('bindBidirectional_threeProperties_correctBinding', () => {
        prop1.setValue("first");
        prop2.bindBidirectional(prop1);
        prop3.bindBidirectional(prop2);
        assert.equal(prop1.getValue(), prop2.getValue());
        assert.equal(prop2.getValue(), prop3.getValue());
        prop1.setValue("second");
        assert.equal(prop1.getValue(), prop2.getValue());
        assert.equal(prop2.getValue(), prop3.getValue());
        prop2.setValue("third");
        assert.equal(prop1.getValue(), prop2.getValue());
        assert.equal(prop2.getValue(), prop3.getValue());
        prop3.setValue("fouth");
        assert.equal(prop1.getValue(), prop2.getValue());
        assert.equal(prop2.getValue(), prop3.getValue());
    });

    it('unbind_thereIsUnidirectionalBinding_correctUnbinding', () => {
        prop1.setValue("first");
        prop2.bind(prop1);
        assert.equal(prop1.getValue(), prop2.getValue());
        prop2.unbind();
        prop1.setValue("second");
        assert.equal(prop1.getValue(), "second");
        assert.equal(prop2.getValue(), "first");
    });

    it('unbindBidirectional_threeProperties_correctUnbinding', () => {
        prop1.setValue("first");
        prop2.bindBidirectional(prop1);
        prop3.bindBidirectional(prop2);

        prop2.unbindBidirectional(prop1);
        assert.equal((prop2 as any).internalForeignListenersByValue.size(), 0);
        assert.equal((prop2 as any).internalSelfListenersByValue.size(), 0);

        prop1.setValue("second");
        assert.equal(prop1.getValue(), "second");
        assert.equal(prop2.getValue(), "first");
        assert.equal(prop3.getValue(), "first");

        prop2.setValue("third");
        assert.equal(prop1.getValue(), "second");
        assert.equal(prop2.getValue(), "third");
        assert.equal(prop3.getValue(), "third");

        prop3.setValue("fouth");
        assert.equal(prop1.getValue(), "second");
        assert.equal(prop2.getValue(), "fouth");
        assert.equal(prop3.getValue(), "fouth");

        prop3.unbindBidirectional(prop2);
        prop2.setValue("fifth");
        assert.equal(prop2.getValue(), "fifth");
        assert.equal(prop3.getValue(), "fouth");

        prop3.setValue("sixth");
        assert.equal(prop2.getValue(), "fifth");
        assert.equal(prop3.getValue(), "sixth");

    });
});
