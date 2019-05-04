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
import { ReadOnlyStringWrapper } from "./../../../../src/script4jfx/beans/property/ReadOnlyStringWrapper";
import { ReadOnlyStringProperty } from "./../../../../src/script4jfx/beans/property/ReadOnlyStringProperty";
import { ChangeListener } from "./../../../../src/script4jfx/beans/value/ChangeListener";
import { ObservableValue } from "./../../../../src/script4jfx/beans/value/ObservableValue";

describe('ReadOnlyStringWrapperTest', () => {

//    let prop1: SimpleStringProperty = null;
//    let prop2: SimpleStringProperty = null;
//    let prop3: SimpleStringProperty = null;
    let wrapper1: ReadOnlyStringWrapper = null;

    beforeEach(function() {
//        prop1 = new SimpleStringProperty();
//        prop2 = new SimpleStringProperty();
//        prop3 = new SimpleStringProperty();
        wrapper1 = new ReadOnlyStringWrapper();
    });

    it('ReadOnlyPropertyImpl#fireValueChangedEvent_valueChanged_listenersCalled', () => {
        const readOnly: ReadOnlyStringProperty = wrapper1.getReadOnlyProperty();
        const str: string = "test string";
        let counter: number = 0;
        readOnly.addListener(ChangeListener.fromFunc((observable: ObservableValue<string>, 
                oldStr: string, newStr: string) => {
            assert.equal(oldStr, null);
            assert.equal(newStr, str);
            counter++;
        }));
        wrapper1.set(str);
        assert.equal(wrapper1.get(), str);
        assert.equal(readOnly.get(), str);
        assert.equal(readOnly.getValue(), str);
        assert.equal(counter, 1);
    });
});    

