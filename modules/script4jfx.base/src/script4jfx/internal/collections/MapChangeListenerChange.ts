/*
 * Copyright (c) 2018-2019 Pavel Kastornyy. All rights reserved.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.
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

import { MapChangeListener } from './../../collections/MapChangeListener';
import { ObservableMap } from './../../collections/ObservableMap';

export class MapChangeListenerChange<K, V> extends MapChangeListener.Change<K, V> {

        private key: K = null;

        private valueAdded: V = null;

        private valuedRemoved: V = null;

        private added: boolean = false;

        private removed: boolean = false;

        constructor(map: ObservableMap<K, V>) {
            super(map);
        }

        /**
         * A key associated with the change.
         */
        public getKey(): K {
            return this.key;
        }

        public setKey(key: K) {
            this.key = key;
        }

        /**
         * Get the new value of the key.
         */
        public getValueAdded(): V {
            return this.valueAdded;
        }

        public setValueAdded(value: V) {
            this.valueAdded = value;
        }

        /**
         * Get the old value of the key.
         */
        public getValueRemoved(): V {
            return this.valuedRemoved;
        }

        public setValueRemoved(value: V) {
            this.valuedRemoved = value;
        }

        /**
         * If this change is a result of add operation.
         */
        public wasAdded(): boolean {
            return this.added;
        }

        public setAdded(added: boolean) {
            this.added = added;
        }

        /**
         * If this change is a result of removal operation.
         */
        public wasRemoved(): boolean {
            return this.removed;
        }

        public setRemoved(removed: boolean) {
            this.removed = removed;
        }
}

