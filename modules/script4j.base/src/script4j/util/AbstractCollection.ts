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

import { Collection } from "./Collection";
import { Consumer } from "./function/Consumer";
import { Iterator } from "./Iterator";

export abstract class AbstractCollection<E> implements Collection<E> {

    public abstract iterator(): Iterator<E>;

    public abstract forEach(consumer: Consumer<E>): void;

    public abstract add(obj: E): boolean;

    public abstract clear(): void;

    public abstract contains(obj: E): boolean;

    public abstract isEmpty(): boolean;

    public abstract remove(obj: E): boolean;

    public abstract size(): number;

    public addAll(collection: Collection<E>): boolean {
        let result: boolean = false;
        let it: Iterator<E> = collection.iterator();
        while (it.hasNext()) {
            if (this.add(it.next())) {
                result = true;
            }
        }
        return result;
    }

    public containsAll(collection: Collection<E>): boolean {
        let it: Iterator<E> = collection.iterator();
        while (it.hasNext()) {
            if (!this.contains(it.next())) {
                return false;
            }
        }
        return true;
    }

    public removeAll(collection: Collection<E>): boolean {
        let result: boolean = false;
        //we iterate this collection because we need all occurances, but fot that collection
        //we use contains which makes search until the first occurance + we use iterator.
        let it: Iterator<E> = this.iterator();
        while (it.hasNext()) {
            let obj: E = it.next();
            if (collection.contains(obj)) {
                it.remove()
                result = true;
            }
        }
        return result;
    }
}

