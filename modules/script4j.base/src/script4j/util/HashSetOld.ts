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


import { Set } from './Set';
import { List } from './List';
import { ArrayList } from './ArrayList';
import { Iterator } from './Iterator';
import { LooseObject } from './../lang/LooseObject';
import { Consumer } from './../util/function/Consumer';
import { NoSuchElementError } from './../util/NoSuchElementError';
import { IllegalStateError } from './../lang/IllegalStateError';

export class HashSet<E> implements Set<E> {

    private HashSetIterator = class <E> implements Iterator<E> {

        private readonly listsByHashCode: LooseObject<List<E>>;

        private readonly hashCodes: number[];

        private readonly set:HashSet<E>;

        private listCurrentIndex: number = -1;

        private hashCodeCurrentIndex: number = -1;

        private startNextWithNewHashCode: boolean = true;

        private nextWasCalled: boolean = false;

        constructor(listsByHashCode: LooseObject<List<E>>, hashCodes: number[], set:HashSet<E>) {
            this.listsByHashCode = listsByHashCode;
            this.hashCodes = hashCodes;
            this.set = set;
        }

        hasNext(): boolean {
            if (this.hashCodes.length === 0) {
                return false;
            }
            let hashCodeIndex = this.hashCodeCurrentIndex;
            let listCurrentIndex = this.listCurrentIndex;
            if (this.startNextWithNewHashCode) {
                hashCodeIndex++;
                listCurrentIndex = -1;
                if (hashCodeIndex === this.hashCodes.length) {
                    return false;
                }
            }
            let hashCode = this.hashCodes[hashCodeIndex];
            let listForTheHashCode: List<E> = this.listsByHashCode[String(hashCode)];
            if (listCurrentIndex + 1 < listForTheHashCode.size()) {
                return true;
            } else {
                return false;
            }
        }

        next(): E {
            if (this.startNextWithNewHashCode) {
                this.listCurrentIndex = -1;
                if (this.hashCodeCurrentIndex + 1 === this.hashCodes.length) {
                    throw new NoSuchElementError("");
                }
                this.startNextWithNewHashCode = false;
                this.hashCodeCurrentIndex++;
            }
            let hashCode = this.hashCodes[this.hashCodeCurrentIndex];
            let listForTheHashCode: List<E> = this.listsByHashCode[String(hashCode)];
            this.listCurrentIndex++;
            let obj: E = listForTheHashCode.get(this.listCurrentIndex);
            //if this is last in list, then next time from new hash.
            if (this.listCurrentIndex + 1 === listForTheHashCode.size()) {
                this.startNextWithNewHashCode = true;
            }
            this.nextWasCalled = true;
            return obj;
        }

        remove(): void {
            if (!this.nextWasCalled) {
                throw new IllegalStateError("Next was not called before calling remove");
            }
            this.nextWasCalled = false;
            let hashCode = this.hashCodes[this.hashCodeCurrentIndex];
            let listForTheHashCode: List<E> = this.listsByHashCode[String(hashCode)];
            let obj: E = listForTheHashCode.get(this.listCurrentIndex);
            let savedHashCodesLength = this.hashCodes.length;
            this.set.remove(obj);
            //if during remove hashcode was deleted we need to decrement index and start from new line
            if (savedHashCodesLength > this.hashCodes.length) {
                //because start..= true and in hashCodeCurrentIndex++.
                this.hashCodeCurrentIndex--;
                this.listCurrentIndex = -1;
                this.startNextWithNewHashCode = true;
            //otherwiser we are one the same hashcode.
            } else {
                this.listCurrentIndex--;
            }
        }
    }


    private listsByHashCode: LooseObject<List<E>> = {};

    /**
     * Here we save properties which were added to objectHolder it this object can contain system properties.
     */
    private hashCodes: number[] = [];

    constructor() {
        //
    }

    iterator(): Iterator<E> {
        return new this.HashSetIterator(this.listsByHashCode, this.hashCodes, this);
    }

    forEach(consumer: Consumer<E>): void {
        for (let i: number = 0; i < this.hashCodes.length; i++) {
            let listForTheHashCode: List<E> = this.listsByHashCode[String(this.hashCodes[i])];
            listForTheHashCode.forEach(consumer);
        }
    }

    add(obj: E): boolean {
        let listForTheHashCode: List<E> = this.listsByHashCode[String(obj.hashCode())];
        if (listForTheHashCode === undefined) {
            listForTheHashCode = new ArrayList();
            this.listsByHashCode[String(obj.hashCode())] = listForTheHashCode;
            this.hashCodes.push(obj.hashCode());
        }
        let sameObjectIndex:number = listForTheHashCode.indexOf(obj);
        if (sameObjectIndex === -1) {
            listForTheHashCode.add(obj);
            return true;
        } else {
            return false;
        }
    }

    clear(): void {
        for (let i: number = 0; i < this.hashCodes.length; i++) {
            delete this.listsByHashCode[String(this.hashCodes[i])];
        }
        this.hashCodes.splice(0, this.hashCodes.length);
    }

    contains(obj: E): boolean {
        let listForTheHashCode: List<E> = this.listsByHashCode[String(obj.hashCode())];
        if (listForTheHashCode === undefined) {
            return false;
        }
        let sameObjectIndex:number = listForTheHashCode.indexOf(obj);
        if (sameObjectIndex === -1) {
            return false;
        } else {
            return true;
        }
    }

    isEmpty(): boolean {
        if (this.hashCodes.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    remove(obj: E): void {
        let listForTheHashCode: List<E> = this.listsByHashCode[String(obj.hashCode())];
        if (listForTheHashCode === null) {
            return;
        } else {
            listForTheHashCode.remove(obj);
            if (listForTheHashCode.size() === 0) {
                delete this.listsByHashCode[String(obj.hashCode())];
                let hashCodeIndex = this.hashCodes.indexOf(obj.hashCode());
                this.hashCodes.splice(hashCodeIndex, 1);
            }
        }
    }

    size(): number {
        let size: number = 0;
        for (let i: number = 0; i < this.hashCodes.length; i++) {
            let listForTheHashCode: List<E> = this.listsByHashCode[String(this.hashCodes[i])];
            size += listForTheHashCode.size();
        }
        return size;
    }
}