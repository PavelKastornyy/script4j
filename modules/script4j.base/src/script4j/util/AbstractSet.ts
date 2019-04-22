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
import { Set } from './Set';
import { Iterator } from './Iterator';
import { Collection } from './Collection';
import { Objects } from './Objects';

export abstract class AbstractSet<E> extends AbstractCollection<E> implements Set<E> {

    public hashCode(): number {
        let hashCode: number = 0;
        let i: Iterator<E> = this.iterator();
        while (i.hasNext()) {
            let obj: E = i.next();
            if (obj != null) {
                hashCode += obj.hashCode();
                hashCode = hashCode | 0;//converto to int32
            }
        }
        return hashCode;
    }

    public equals(obj: Object): boolean{
        if (obj === null) {
            return false;
        }
        if (obj === this) {
            return true;
        }
        if (!(obj instanceof AbstractSet)) {
            return false;
        }
        let colleciton: Collection<E> = <Collection<E>> obj;
        if (colleciton.size() !== this.size()) {
            return false;
        }
        return this.containsAll(colleciton);
    }

    public toString(): string {
        let result: string = "[";
        let comma: string = "";
        let iterator: Iterator<E> = this.iterator();
        while (iterator.hasNext()) {
            let value: E = iterator.next();
            result += comma + Objects.toString(value);
            comma = ", ";
        }
        result += "]";
        return result;
    }
}

