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

import { Map } from './Map';
import { Set } from './Set';
import { Collection } from './Collection';
import { Iterator } from './Iterator';

export abstract class AbstractMap<K,V> implements Map<K,V> {

    abstract clear(): void;

    abstract containsKey(key: K): boolean;

    abstract containsValue(value: V): boolean;

    abstract entrySet(): Set<Map.Entry<K, V>>;

    abstract get(key: K): V;

    abstract isEmpty(): boolean;

    abstract keySet(): Set<K>;

    abstract put(key: K, value: V): V;

    abstract remove(key: K): V;

    abstract size(): number;

    abstract values(): Collection<V>;

    public hashCode(): number {
        let hashCode: number = 0;
        let iterator: Iterator<Map.Entry<K, V>> = this.entrySet().iterator();
        while (iterator.hasNext()) {
            let obj: Object = iterator.next();
            hashCode += obj.hashCode();
            hashCode = hashCode | 0;
        }
        return hashCode;
    }

    public equals(obj: Object): boolean {
        if (obj === this) {
            return true;
        }
        if (!(obj instanceof AbstractMap)) {
            return false;
        }
        let thatMap: Map<any,any> = <Map<any,any>> obj;
        if (this.size() != thatMap.size()) {
            return false;
        }
        try {
            let iterator: Iterator<Map.Entry<K, V>> = this.entrySet().iterator();
            while (iterator.hasNext()) {
                let entry: Map.Entry<K, V> = iterator.next();
                let key: K = entry.getKey();
                let value: V = entry.getValue();
                if (value === null) {
                    if (!(thatMap.get(key) == null && thatMap.containsKey(key)))
                        return false;
                } else {
                    if (!value.equals(thatMap.get(key))) {
                        return false;
                    }
                }
            }
        } catch (error) {
            return false;
        }
        return true;
    }

    public toString(): string {
        let result: string = "{";
        let comma: string = "";
        let iterator: Iterator<Map.Entry<K, V>> = this.entrySet().iterator();
        while (iterator.hasNext()) {
            let entry: Map.Entry<K, V> = iterator.next();
            let key: K = entry.getKey();
            let keyStr: string = (key === null)? "null" : key.toString();
            let value: V = entry.getValue();
            let valueStr: string = (value === null)? "null" : value.toString();
            result += comma + keyStr + "=" + valueStr;
            comma = ", ";
        }
        result += "}";
        return result;
    }
}

