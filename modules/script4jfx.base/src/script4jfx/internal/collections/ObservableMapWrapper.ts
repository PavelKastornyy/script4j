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

import { AbstractObservableMapBase } from './AbstractObservableMapBase';
import { Map } from 'script4j.base';
import { Set } from 'script4j.base';
import { AbstractSet } from 'script4j.base';
import { Collection } from 'script4j.base';
import { Consumer } from 'script4j.base';
import { Iterator } from 'script4j.base';
import { MapChangeListenerChange } from './MapChangeListenerChange';

export class ObservableMapWrapper<K, V> extends AbstractObservableMapBase<K, V> {

    private readonly map: Map<K, V>;

    /**
     * We don't export to namespace as we need private methods.
     */
    private static EntrySetWrapper = class<K, V> extends AbstractSet<Map.Entry<K, V>> {

        private readonly delegate: Set<Map.Entry<K, V>> = null;

        private readonly mapWrapper: ObservableMapWrapper<K, V> = null;

        public constructor(mapWrapper: ObservableMapWrapper<K, V>) {
            super();
            this.mapWrapper = mapWrapper;
            this.delegate = mapWrapper.map.entrySet();
        }

        public iterator(): Iterator<Map.Entry<K, V>> {
            return new class implements Iterator<Map.Entry<K, V>> {

                private readonly mapWrapper: ObservableMapWrapper<K, V>;

                private readonly delegate: Iterator<Map.Entry<K, V>>;

                private currentEntry: Map.Entry<K, V>;

                public constructor(mapWrapper: ObservableMapWrapper<K, V>, delegate: Iterator<Map.Entry<K, V>>) {
                    this.mapWrapper = mapWrapper;
                    this.delegate = delegate;
                }

                public hasNext(): boolean {
                    return this.delegate.hasNext();
                }

                public next(): Map.Entry<K, V> {
                    this.currentEntry = this.delegate.next();
                    return this.currentEntry;
                }

                public remove(): void {
                    this.delegate.remove();
                    this.mapWrapper.fireRemovedChangeEvent(this.currentEntry.getKey(), this.currentEntry.getValue());
                }
            } (this.mapWrapper, this.delegate.iterator());
        }

        public forEach(consumer: Consumer<Map.Entry<K, V>>): void {
            this.delegate.forEach(consumer);
        }

        public add(obj: Map.Entry<K, V>): boolean {
            return this.delegate.add(obj);
        }

        public clear(): void {
            let iterator: Iterator<Map.Entry<K, V>> = this.iterator();
            while (iterator.hasNext()) {
                iterator.next();
                iterator.remove();
            }
        }

        public contains(obj: Map.Entry<K, V>): boolean {
            return this.delegate.contains(obj);
        }

        public isEmpty(): boolean {
            return this.delegate.isEmpty();
        }

        public remove(obj: Map.Entry<K, V>): boolean {
            if (this.delegate.remove(obj)) {
                this.mapWrapper.fireRemovedChangeEvent(obj.getKey(), obj.getValue());
                return true;
            } else {
                return false;
            }
        }

        public size(): number {
            return this.delegate.size();
        }
    };

    private static KeySetWrapper = class<K, V> extends AbstractSet<K> {

        private readonly delegate: Set<K> = null;

        private readonly mapWrapper: ObservableMapWrapper<K, V> = null;

        public constructor(mapWrapper: ObservableMapWrapper<K, V>) {
            super();
            this.mapWrapper = mapWrapper;
            this.delegate = mapWrapper.map.keySet();
        }

        public iterator(): Iterator<K> {
            return new class implements Iterator<K> {

                /**
                 * For removing we need key and value, that's why here in backend have entryset iterator.
                 */
                private readonly delegate: Iterator<Map.Entry<K, V>>;

                public constructor(delegate: Iterator<Map.Entry<K, V>>) {
                    this.delegate = delegate;
                }

                public hasNext(): boolean {
                    return this.delegate.hasNext();
                }

                public next(): K {
                    return this.delegate.next().getKey();
                }

                public remove(): void {
                    this.delegate.remove();
                }
            } (this.mapWrapper.entrySet().iterator());
        }

        public forEach(consumer: Consumer<K>): void {
            this.delegate.forEach(consumer);
        }

        public add(obj: K): boolean {
            return this.delegate.add(obj);
        }

        public clear(): void {
            let iterator: Iterator<K> = this.iterator();
            while (iterator.hasNext()) {
                iterator.next();
                iterator.remove();
            }
        }

        public contains(obj: K): boolean {
            return this.delegate.contains(obj);
        }

        public isEmpty(): boolean {
            return this.delegate.isEmpty();
        }

        public remove(obj: K): boolean {
            let previousValue: V = this.mapWrapper.map.get(obj);
            if (this.delegate.remove(obj)) {
                this.mapWrapper.fireRemovedChangeEvent(obj, previousValue);
                return true;
            } else {
                return false;
            }
        }

        public size(): number {
            return this.delegate.size();
        }
    };

    private static ValueCollectionWrapper = class<K, V> implements Collection<V> {

        private readonly delegate: Collection<V> = null;

        private readonly mapWrapper: ObservableMapWrapper<K, V> = null;

        public constructor(mapWrapper: ObservableMapWrapper<K, V>) {
            this.mapWrapper = mapWrapper;
            this.delegate = mapWrapper.map.values();
        }

        public add(obj: V): boolean {
            return this.delegate.add(obj);
        }

        public addAll(c: Collection<V>): boolean {
            return this.delegate.addAll(c);
        }

        public clear(): void {
            let iterator: Iterator<V> = this.iterator();
            while (iterator.hasNext()) {
                iterator.next();
                iterator.remove();
            }
        }

        public contains(obj: V): boolean {
            return this.delegate.contains(obj);
        }

        public containsAll(c: Collection<V>): boolean {
            return this.delegate.containsAll(c);
        }

        public isEmpty(): boolean {
            return this.delegate.isEmpty();
        }

        public remove(obj: V): boolean {
            let result: boolean = false;
            let iterator: Iterator<V> = this.iterator();
            while (iterator.hasNext()) {
                let value: V =  iterator.next();
                if (value === null) {
                    if (obj === null) {
                        result = true;
                        iterator.remove();
                        break;
                    }
                } else {
                    if (value.equals(obj)) {
                        result = true;
                        iterator.remove();
                        break;
                    }
                }
            }
            return result;
        }

        public removeAll(collection: Collection<V>): boolean {
            let result: boolean = false;
            let iterator: Iterator<V> = this.iterator();
            while (iterator.hasNext()) {
                let value: V =  iterator.next();
                if (collection.contains(value)) {
                    result = true;
                    iterator.remove();
                }
            }
            return result;
        }

        public size(): number {
            return this.delegate.size();
        }

        public iterator(): Iterator<V> {
            return new class implements Iterator<V> {

                /**
                 * For removing we need key and value, that's why here in backend have entryset iterator.
                 */
                private readonly delegate: Iterator<Map.Entry<K, V>>;

                public constructor(delegate: Iterator<Map.Entry<K, V>>) {
                    this.delegate = delegate;
                }

                public hasNext(): boolean {
                    return this.delegate.hasNext();
                }

                public next(): V {
                    return this.delegate.next().getValue();
                }

                public remove(): void {
                    this.delegate.remove();
                }
            } (this.mapWrapper.entrySet().iterator());
        }

        public forEach(consumer: Consumer<V>): void {
            this.delegate.forEach(consumer);
        }
    };

    public constructor(map: Map<K, V>) {
        super();
        this.map = map;
    }

    public clear(): void {
        let entrySet: Set<Map.Entry<K, V>> = this.entrySet();
        let iterator: Iterator<Map.Entry<K, V>> = entrySet.iterator();
        while (iterator.hasNext()) {
            iterator.next();
            iterator.remove();
        }
    }

    public entrySet(): Set<Map.Entry<K, V>> {
        return new ObservableMapWrapper.EntrySetWrapper<K, V>(this);
    }

    public keySet(): Set<K> {
        return new ObservableMapWrapper.KeySetWrapper<K, V>(this);
    }

    public put(key: K, value: V): V {
        let prevSize: number = this.map.size();
        let prevValue: V = this.map.put(key, value);
        let change: MapChangeListenerChange<K, V> = new MapChangeListenerChange<K, V>(this);
        change.setAdded(true);
        change.setKey(key);
        change.setValueAdded(value);
        //it means that value was replaced
        if (prevSize === this.map.size()) {
            change.setRemoved(true);
            change.setValueRemoved(prevValue);
        }
        this.fireChangeEvent(change);
        return prevValue;
    }

    public remove(key: K): V {
        let prevSize: number = this.map.size();
        let prevValue: V = this.map.get(key);
        if (prevSize > this.map.size()) {
            this.fireRemovedChangeEvent(key, prevValue);
        }
        return prevValue;
    }

    public values(): Collection<V> {
        return new ObservableMapWrapper.ValueCollectionWrapper(this);
    }

    protected getMap(): Map<K, V> {
        return this.map;
    }

    private fireRemovedChangeEvent(key: K, value: V) {
        let change: MapChangeListenerChange<K, V> = new MapChangeListenerChange<K, V>(this);
        change.setRemoved(true);
        change.setKey(key);
        change.setValueRemoved(value);
        this.fireChangeEvent(change);
    }
}