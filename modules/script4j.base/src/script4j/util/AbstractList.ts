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

import { AbstractCollection } from './AbstractCollection';
import { List } from './List';
import { Iterator } from './Iterator';

export abstract class AbstractList<E> extends AbstractCollection<E> implements List<E> {

    constructor() {
        super();
    }

    abstract addByIndex(index: number, obj: E): void;

    abstract get(index: number): E;

    abstract removeByIndex(index: number): void;

    abstract set(index: number, obj: E): void;

    abstract indexOf(obj: E): number;

    public equals(obj: Object): boolean {
        if (obj === null) {
            return false;
        }
        if (obj === this) {
            return true;
        }
        if (!(obj instanceof AbstractList)) {
            return false;
        }
        let that: List<any> = <List<any>>obj;
        if (this.size() !== that.size()) {
            return false;
        }
        //for performance we use iterators, but not get, because every list has its own impl.
        let thisIterator: Iterator<E> = this.iterator();
        let thatIterator: Iterator<any> = that.iterator();
        while (thisIterator.hasNext() && thatIterator.hasNext()) {
            let thisElement: Object = thisIterator.next();
            let thatElement: Object = thatIterator.next();
            if (thisElement === null) {
                if (thatElement !== null) {
                    return false;
                }
            } else if (!thisElement.equals(thatElement)) {
                return false;
            }
        }
        return true;
    }

    public hashCode(): number {
        let hashCode: number = 1;
        let iterator: Iterator<E> = this.iterator();
        while (iterator.hasNext()) {
            let element: E = iterator.next();
            hashCode = 31 * hashCode + (element == null ? 0 : element.hashCode());
            hashCode = hashCode | 0;//converto to int32
        }
        return hashCode;
    }


}

