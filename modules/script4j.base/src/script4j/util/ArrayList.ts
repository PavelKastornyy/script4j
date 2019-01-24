/*
 * Copyright (c) 2018-2019 Pavel Kastornyy. All rights reserved.
 * The specified copyright does not cover application programming interface
 * (API) and the documentation for this API, which were taken from other
 * libraries. See NOTICE file for more information.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation. Copyright holder designates
 * this particular file as subject to the "Classpath" exception as provided
 * by copyright holder in the LICENSE file that accompanied this code.
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


import { AbstractList } from './AbstractList';
import { Iterator } from './Iterator';
import { Consumer } from './../util/function/Consumer';
import { IndexOutOfBoundsError } from './../lang/IndexOutOfBoundsError';
import { NoSuchElementError } from './../util/NoSuchElementError';
import { IllegalStateError } from './../lang/IllegalStateError';

export class ArrayList<E> extends AbstractList<E> {

    private ArrayListIterator = class <E> implements Iterator<E> {

        private readonly array:E[];

        private currentIndex:number = -1;

        private nextWasCalled: boolean = false;

        constructor(array:E[]) {
            this.array = array;
        }

        hasNext(): boolean {
            if (this.currentIndex + 1 < this.array.length) {
                return true;
            } else {
                return false;
            }
        }

        next(): E {
            if (this.currentIndex + 1 === this.array.length) {
                throw new NoSuchElementError("Element with index " + this.currentIndex + " doesn't exist");
            }
            this.nextWasCalled = true;
            return this.array[++this.currentIndex];
        }

        remove(): void {
            if (!this.nextWasCalled) {
                throw new IllegalStateError("Next was not called before calling remove");
            }
            this.nextWasCalled = false;
            this.array.splice(this.currentIndex, 1);
        }
    }

    private array:E[] = [];

    constructor() {
        super();
    }

    public add(obj: E): boolean {
        this.array.push(obj);
        return true;
    }

    public clear(): void {
        this.array.splice(0, this.array.length);
    }

    public contains(obj: E): boolean {
        //we can not use here this.array.indexOf because we need to check equality.
        for (let i: number = 0; i < this.array.length; i++) {
            if (this.array[i].equals(obj)) {
                return true;
            }
        }
        return false;
    }

    public isEmpty(): boolean {
        if (this.array.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    public iterator(): Iterator<E> {
        return new this.ArrayListIterator(this.array);
    }

    forEach(consumer: Consumer<E>): void {
        for (let i: number = 0; i < this.size(); i++) {
            consumer(this.get(i));
        }
    }

    public remove(obj: E): void {
        let index = this.indexOf(obj);
        if (index > -1) {
           this.array.splice(index, 1);
        }
    }

    public size(): number {
        return this.array.length;
    }

    public addByIndex(index: number, obj: E): void {
        this.checkIndexIsInRange(index);
        this.array.splice(index, 0, obj);
    }

    public get(index: number): E {
        this.checkIndexIsInRange(index);
        return this.array[index];
    }

    public removeByIndex(index: number): void {
        this.checkIndexIsInRange(index);
        this.array.splice(index, 1);
    }

    public set(index: number, obj: E): void {
        this.checkIndexIsInRange(index);
        this.array[index] = obj;
    }

    public indexOf(obj: E): number {
        for (let i: number = 0; i < this.size(); i++) {
            if (this.get(i).equals(obj)) {
                return i;
            }
        }
        return -1;
        //return this.array.indexOf(obj, 0); WRONG
    }

    public toString(): string {
        let elementsStr:string = "";
        for (let i: number = 0; i < this.array.length; i++) {
            if (i > 0){
                elementsStr +=",";
            }
            elementsStr += i + "=" + this.array[i];
        }
        return "ArrayList{" + elementsStr + '}';
    }

    private checkIndexIsInRange(index: number): void {
        if (index >= this.size() || index < 0) {
            throw new IndexOutOfBoundsError("Index is " + index + " but the length is " + this.size());
        }
    }
}