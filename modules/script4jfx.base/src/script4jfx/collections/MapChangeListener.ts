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

import { ObservableMap } from './ObservableMap';

 /**
 * Functional interface.
 */
export interface MapChangeListener<K, V> {

    /**
     * Called after a change has been made to an ObservableMap.
     */
    onChanged(change: MapChangeListener.Change<K, V>): void;
}

type MapChangeListenerFunc<K, V> = (change: MapChangeListener.Change<K, V>) => void;

export namespace MapChangeListener {
    
    export function lambda<K, V>(func: MapChangeListenerFunc<K, V>): MapChangeListener<K, V> {
        return new class implements MapChangeListener<K, V> {
            
            public onChanged(change: MapChangeListener.Change<K, V>): void {
                func(change);
            }
        };
    }    

    export abstract class Change<K,​V> {

        private readonly map: ObservableMap<K,​V>;

        /**
         * Constructs a change associated with a map.
         */
        public constructor​(map: ObservableMap<K,​V>) {
            this.map = map;
        }

        /**
         * An observable map that is associated with the change.
         */
        public getMap(): ObservableMap<K,​V> {
            return this.map;
        }

        /**
         * A key associated with the change.
         */
        public abstract getKey(): K;

        /**
         * Get the new value of the key.
         */
        public abstract getValueAdded(): V;

        /**
         * Get the old value of the key.
         */
        public abstract getValueRemoved(): V;

        /**
         * If this change is a result of add operation.
         */
        public abstract wasAdded(): boolean;

        /**
         * If this change is a result of removal operation.
         */
        public abstract wasRemoved(): boolean;

    }
}

