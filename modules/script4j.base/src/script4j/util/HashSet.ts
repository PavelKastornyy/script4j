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
import { Iterator } from './Iterator';
import { Consumer } from './../util/function/Consumer';
import { Map } from './Map';
import { HashMap} from './HashMap';

export class HashSet<E> implements Set<E> {

    private readonly map: Map<E, Object> = new HashMap();

    private readonly value: Object = new Object();

    constructor() {
        //
    }

    iterator(): Iterator<E> {
        return this.map.keySet().iterator();
    }

    forEach(consumer: Consumer<E>): void {
        this.map.keySet().forEach(consumer);
    }

    add(obj: E): boolean {
        return (this.map.put(obj, this.value) == null);
    }

    clear(): void {
        this.map.clear();
    }

    contains(obj: E): boolean {
        return this.map.containsKey(obj);
    }

    isEmpty(): boolean {
        return this.map.isEmpty();
    }

    remove(obj: E): void {
        this.map.remove(obj);
    }

    size(): number {
        return this.map.size();
    }
}

