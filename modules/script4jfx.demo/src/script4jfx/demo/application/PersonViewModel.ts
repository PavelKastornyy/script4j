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

import { ViewModel } from './../mvvm/ViewModel';
import { ModelWrapper } from './../mvvm/ModelWrapper';
import { StringProperty } from 'script4jfx.base';
import { NumberProperty } from 'script4jfx.base';
import { Person } from './Person';

export class PersonViewModel implements ViewModel {
    
    private wrapper: ModelWrapper<Person> = new ModelWrapper<Person>();

    private readonly firstName: StringProperty = this.wrapper.stringField(
            Person.prototype.getFirstName, 
            Person.prototype.setFirstName,
            null);
    
    private readonly lastName: StringProperty = this.wrapper.stringField(
            Person.prototype.getLastName, 
            Person.prototype.setLastName,
            null);
    
    private readonly age: NumberProperty = this.wrapper.numberField(
            Person.prototype.getAge, 
            Person.prototype.setAge,
            null);
    
    //private readonly country...: ... = new ...();
    
    private readonly resume: StringProperty = this.wrapper.stringField(
            Person.prototype.getResume, 
            Person.prototype.setResume,
            null);
    
    constructor() {
        
    }
    
    public firstNameProperty(): StringProperty {
        return this.firstName;
    }
    
    public lastNameProperty(): StringProperty {
        return this.lastName;
    }
    
    public ageProperty(): NumberProperty {
        return this.age;
    }
    
    public resumeProperty(): StringProperty {
        return this.resume;
    }
    
    public setModel(person: Person): void {
        this.wrapper.setModel(person);
    }
    
    public reset(): void {
        this.wrapper.reset();
    }
    
    public read(): void {
        this.wrapper.read();
    }
    
    public save(): void {
        this.wrapper.save();
    }
}
