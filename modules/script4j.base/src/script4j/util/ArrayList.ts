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
import { List } from './List';
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
            if (this.array[i] === null) {
                if (obj === null) {
                    return true;
                }
            } else {
                if (obj !== null && this.array[i].equals(obj)) {
                    return true;
                }
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

    public remove(obj: E): boolean {
        let index = this.indexOf(obj);
        if (index > -1) {
           this.array.splice(index, 1);
           return true;
        } else {
            return false;
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

    public removeByIndex(index: number): E {
        let previous: E = this.get(index);
        this.array.splice(index, 1);
        return previous;
    }

    public set(index: number, obj: E): E {
        let previous: E = this.get(index);
        this.array[index] = obj;
        return previous;
    }

    public subList​(fromIndex: number, toIndex: number): List<E> {
        this.checkIndexIsInRange(fromIndex);
        if (toIndex !== 0) {
            //-1 as toIndex is exclusive
            this.checkIndexIsInRange(toIndex - 1);
        }
        let result: List<E> = new ArrayList<E>();
        for (let index: number = fromIndex; index < toIndex; index++) {
            result.add(this.array[index]);
        }
        return result;
    }

    public indexOf(obj: E): number {
        for (let i: number = 0; i < this.size(); i++) {
            let checkObject = this.get(i);
            if (checkObject === null) {
                if (obj === null) {
                    return i;
                }
            } else {
                if (obj !== null && checkObject.equals(obj)) {
                    return i;
                }
            }
        }
        return -1;
        //return this.array.indexOf(obj, 0); WRONG
    }

    private checkIndexIsInRange(index: number): void {
        if (index >= this.size() || index < 0) {
            throw new IndexOutOfBoundsError("Index is " + index + " but the length is " + this.size());
        }
    }
}