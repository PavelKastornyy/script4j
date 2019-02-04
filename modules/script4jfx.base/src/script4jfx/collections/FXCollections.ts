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

import { Collection } from 'script4j.base';
import { ObservableArrayList } from './../internal/collections/ObservableArrayList';
import { Set } from 'script4j.base';
import { Map } from 'script4j.base';
import { ObservableList } from './ObservableList';
import { ObservableSet } from './ObservableSet';
import { ObservableMap } from './ObservableMap';
import { ObservableSetWrapper } from './../internal/collections/ObservableSetWrapper';
import { ObservableMapWrapper } from './../internal/collections/ObservableMapWrapper';
import { UnmodifiableObservableListWrapper } from './../internal/collections/UnmodifiableObservableListWrapper';
import { UnmodifiableObservableSetWrapper } from './../internal/collections/UnmodifiableObservableSetWrapper';
import { UnmodifiableObservableMapWrapper } from './../internal/collections/UnmodifiableObservableMapWrapper';

export class FXCollections {

    /**
     * Creates a new observable array list and adds a content of collection col to it.
     */
    static observableArrayList<E>(​col: Collection<E>): ObservableList<E> {
        return new ObservableArrayList(col);
    }

    /**
     * Constructs an ObservableSet that is backed by the specified set.
     */
    static observableSet<E>​(set: Set<E>): ObservableSet<E> {
        return new ObservableSetWrapper(set);
    }

    /**
     * Constructs an ObservableMap that is backed by the specified map.
     */
    static observableMap<K, ​V>​(map: Map<K, ​V>): ObservableMap<K,​ V> {
        return new ObservableMapWrapper(map);
    }

    /**
     * Creates and returns unmodifiable wrapper list on top of provided observable list.
     */
    static unmodifiableObservableList<E>​(list: ObservableList<E>): ObservableList<E> {
        return new UnmodifiableObservableListWrapper(list);
    }

    /**
     * Constructs a read-only interface to the specified ObservableMap.
     */
    static unmodifiableObservableMap<K,​ V>​(map: ObservableMap<K,​V>): ObservableMap<K,​ V> {
        return new UnmodifiableObservableMapWrapper(map);
    }

    /**
     * Creates and returns unmodifiable wrapper on top of provided observable set.
     */
    static unmodifiableObservableSet<E>​(set: ObservableSet<E>): ObservableSet<E> {
        return new UnmodifiableObservableSetWrapper(set);
    }

}


