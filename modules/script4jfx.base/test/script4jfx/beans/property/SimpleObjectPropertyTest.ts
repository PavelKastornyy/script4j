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
import { SimpleObjectProperty } from "./../../../../src/script4jfx/beans/property/SimpleObjectProperty";

describe('SimpleObjectPropertyTest', () => {
    
    class Student {
        
        private name: string = null;
        
        public getName(): string {
            return this.name;
        }
        
        public setName(name: string): void {
            this.name = name;
        }
    }

    let prop1: SimpleObjectProperty<Student> = null;
    let prop2: SimpleObjectProperty<Student> = null;
    let prop3: SimpleObjectProperty<Student> = null;

    beforeEach(function() {
        prop1 = new SimpleObjectProperty();
        prop2 = new SimpleObjectProperty();
        prop3 = new SimpleObjectProperty();
    });


    it('bindBidirectional_twoProperties_correctBinding', () => {
        let student1: Student = new Student();
        let student2: Student = new Student();
        let student3: Student = new Student();
        prop2.set(student1);
        assert.equal(prop2.get(), student1);
        prop2.bindBidirectional(prop1);
        assert.equal(prop1.get(), prop2.get());
        prop1.set(student2);
        assert.equal(prop1.get(), student2);
        assert.equal(prop1.get(), prop2.get());
        prop2.set(student3);
        assert.equal(prop2.get(), student3);
        assert.equal(prop1.get(), prop2.get());
    });

    it('unbind_twoProperties_correctUnbinding', () => {
        let student1: Student = new Student();
        let student2: Student = new Student();
        let student3: Student = new Student();
        prop1.set(student1);
        prop2.bindBidirectional(prop1);
        assert.equal(prop1.get(), prop2.get());
        prop2.unbindBidirectional(prop1);
        prop1.set(student2);
        assert.equal(prop1.get(), student2);
        assert.equal(prop2.get(), student1);
    });

});


