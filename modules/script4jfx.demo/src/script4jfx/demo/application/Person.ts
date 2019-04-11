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

import { Country } from './Country';
import { Objects } from 'script4j.base';

export class Person {
     
    private firstName: string = null;
    
    private lastName: string = null;
    
    private age: number = null;
    
    private country: Country = null;
    
    private resume: string = null;
    
    public constructor() {
        //does nothing
    }
    
    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }
    
    public getFirstName(): string {
        return this.firstName;
    }
    
    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }
    
    public getLastName(): string {
        return this.lastName;
    }
    
    public setAge(age: number): void {
        this.age = age;
    }
    
    public getAge(): number {
        return this.age;
    }
    
    public setCountry(country: Country): void {
        this.country = country;
    }
    
    public getCountry(): Country {
        return this.country;
    }
    
    public setResume(resume: string): void {
        this.resume = resume;
    }
    
    public getResume(): string {
        return this.resume;
    }
    
    public toString(): string {
        return "{firstName: " + this.firstName + ", lastName:" + this.lastName + ", age: " + this.age +
            ", country:" + Objects.toString(this.country) + ", resume:" + this.resume + "}";
    }
}

