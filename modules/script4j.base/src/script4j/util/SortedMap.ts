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
import { Comparator } from './Comparator';

export interface SortedMap<K,V> extends Map<K,V> {

    /**
     * Returns the comparator used to order the keys in this map, or null if this map uses the natural ordering of 
     * its keys.
     */
    comparator(): Comparator<K>;

    /**
     * Returns a Set view of the mappings contained in this map.
     */    
    entrySet(): Set<Map.Entry<K,V>>;
    
    /**
     * Returns the first (lowest) key currently in this map.
     */    
    firstKey(): K;

    /**
     * Returns a view of the portion of this map whose keys are strictly less than toKey.
     */    
    //headMap(toKey: K): SortedMap<K,V>;

    /**
     * Returns a Set view of the keys contained in this map.
     */    
    keySet(): Set<K>;
    
    /**
     * Returns the last (highest) key currently in this map.
     */
    lastKey(): K;
    
    /**
     * Returns a view of the portion of this map whose keys range from fromKey, inclusive, to toKey, exclusive.
     */
    //subMap(fromKey: K, toKey: K): SortedMap<K,V>;
    
    /**
     * Returns a view of the portion of this map whose keys are greater than or equal to fromKey.
     */
    //tailMap(fromKey: K): SortedMap<K,V>;

    /**
     * Returns a Collection view of the values contained in this map.
     */    
    values(): Collection<V>;
}







