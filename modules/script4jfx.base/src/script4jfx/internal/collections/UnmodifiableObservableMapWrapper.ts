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
import { ObservableMap } from './../../collections/ObservableMap';
import { MapChangeListener } from './../../collections/MapChangeListener';
import { UnsupportedOperationError } from 'script4j.base';
import { Collection } from 'script4j.base';
import { Iterator } from 'script4j.base';
import { Set } from 'script4j.base';
import { Map } from 'script4j.base';
import { AbstractSet } from 'script4j.base';
import { Consumer } from 'script4j.base';
import { AbstractCollection } from 'script4j.base';

export class UnmodifiableObservableMapWrapper<K, V> extends AbstractObservableMapBase<K, V> {

    private readonly map: ObservableMap<K, V>;

    private static EntrySetWrapper = class <K, V> extends AbstractSet<Map.Entry<K, V>> {

        private readonly delegate: Set<Map.Entry<K, V>> = null;

        public constructor(delegate: Set<Map.Entry<K, V>>) {
            super();
            this.delegate = delegate;
        }

        public iterator(): Iterator<Map.Entry<K, V>> {

            return new class<K, V> implements Iterator<Map.Entry<K, V>> {

                private readonly delegate: Iterator<Map.Entry<K, V>> = null;

                public constructor(delegate: Iterator<Map.Entry<K, V>>) {
                    this.delegate = delegate;
                }

                hasNext(): boolean {
                    return this.delegate.hasNext();
                }

                next(): Map.Entry<K, V> {
                    return this.delegate.next();
                }

                remove(): void {
                    throw new UnsupportedOperationError();
                }
            }(this.delegate.iterator());
        }

        public forEach(consumer: Consumer<Map.Entry<K, V>>): void {
            this.delegate.forEach(consumer);
        }

        public add(obj: Map.Entry<K, V>): boolean {
            throw new UnsupportedOperationError();
        }

        public clear(): void {
            throw new UnsupportedOperationError();
        }

        public contains(obj: Map.Entry<K, V>): boolean {
            return this.delegate.contains(obj);
        }

        public isEmpty(): boolean {
            return this.delegate.isEmpty();
        }

        public remove(obj: Map.Entry<K, V>): boolean {
            throw new UnsupportedOperationError();
        }

        public size(): number {
            return this.delegate.size();
        }

    };

    private static KeySetWrapper = class <K> extends AbstractSet<K> {

        private readonly delegate: Set<K> = null;

        public constructor(delegate: Set<K>) {
            super();
            this.delegate = delegate;
        }

        public iterator(): Iterator<K> {

            return new class<K> implements Iterator<K> {

                private readonly delegate: Iterator<K> = null;

                public constructor(delegate: Iterator<K>) {
                    this.delegate = delegate;
                }

                hasNext(): boolean {
                    return this.delegate.hasNext();
                }

                next(): K {
                    return this.delegate.next();
                }

                remove(): void {
                    throw new UnsupportedOperationError();
                }
            }(this.delegate.iterator());
        }

        public forEach(consumer: Consumer<K>): void {
            this.delegate.forEach(consumer);
        }

        public add(obj: K): boolean {
            throw new UnsupportedOperationError();
        }

        public clear(): void {
            throw new UnsupportedOperationError();
        }

        public contains(obj: K): boolean {
            return this.delegate.contains(obj);
        }

        public isEmpty(): boolean {
            return this.delegate.isEmpty();
        }

        public remove(obj: K): boolean {
            throw new UnsupportedOperationError();
        }

        public size(): number {
            return this.delegate.size();
        }

    };

    private static ValueCollectionWrapper = class<V> extends AbstractCollection<V> {

        private readonly delegate: Collection<V> = null;

        public constructor(delegate: Collection<V>) {
            super();
            this.delegate = delegate;
        }

        public iterator(): Iterator<V> {

            return new class<V> implements Iterator<V> {

                private readonly delegate: Iterator<V> = null;

                public constructor(delegate: Iterator<V>) {
                    this.delegate = delegate;
                }

                hasNext(): boolean {
                    return this.delegate.hasNext();
                }

                next(): V {
                    return this.delegate.next();
                }

                remove(): void {
                    throw new UnsupportedOperationError();
                }
            }(this.delegate.iterator());
        }

        public forEach(consumer: Consumer<V>): void {
            this.delegate.forEach(consumer);
        }

        public add(obj: V): boolean {
            throw new UnsupportedOperationError();
        }

        public clear(): void {
            throw new UnsupportedOperationError();
        }

        public contains(obj: V): boolean {
            return this.delegate.contains(obj);
        }

        public isEmpty(): boolean {
            return this.delegate.isEmpty();
        }

        public remove(obj: V): boolean {
            throw new UnsupportedOperationError();
        }

        public size(): number {
            return this.delegate.size();
        }
    };

    public constructor(map: ObservableMap<K, V>) {
        super();
        this.map = map;
    }

    public addListener​(listener: MapChangeListener<K, V>): void {
        this.map.addListener(listener);
    }

    public removeListener​(listener: MapChangeListener<K, V>): void {
        this.map.removeListener(listener);
    }

    public clear(): void {
        throw new UnsupportedOperationError();
    }

    public entrySet(): Set<Map.Entry<K, V>> {
        return new UnmodifiableObservableMapWrapper.EntrySetWrapper(this.map.entrySet());
    }

    public keySet(): Set<K> {
        return new UnmodifiableObservableMapWrapper.KeySetWrapper(this.map.keySet());
    }

    public put(key: K, value: V): V {
        throw new UnsupportedOperationError();
    }

    public remove(key: K): V {
        throw new UnsupportedOperationError();
    }

    public values(): Collection<V> {
        return new UnmodifiableObservableMapWrapper.ValueCollectionWrapper(this.map.values());
    }

    protected getMap(): Map<K, V> {
        return this.map;
    }
}

