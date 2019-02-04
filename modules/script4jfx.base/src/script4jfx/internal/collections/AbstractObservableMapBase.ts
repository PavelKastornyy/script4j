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

import { ObservableMap } from './../../collections/ObservableMap';
import { Set } from 'script4j.base';
import { Map } from 'script4j.base';
import { HashSet } from 'script4j.base';
import { Collection } from 'script4j.base';
import { MapChangeListener } from './../../collections/MapChangeListener';
import { Objects } from 'script4j.base';

export abstract class AbstractObservableMapBase<K, V> implements ObservableMap<K, V> {

    private listeners: Set<MapChangeListener<K, V>> = new HashSet<MapChangeListener<K, V>>();

    public constructor() {
        //
    }

    public addListener​(listener: MapChangeListener<K, V>): void {
        this.listeners.add(listener);
    }

    public removeListener​(listener: MapChangeListener<K, V>): void {
        this.listeners.remove(listener);
    }

    public containsKey(key: K): boolean {
        return this.getMap().containsKey(key);
    }

    public containsValue(value: V): boolean {
        return this.getMap().containsValue(value);
    }

    public get(key: K): V {
        return this.getMap().get(key);
    }

    public isEmpty(): boolean {
        return this.getMap().isEmpty();
    }

    public size(): number {
        return this.getMap().size();
    }

    public toString(): string {
        return this.getClass().getName()
                + "{map=" + (this.getMap() === null ? "null" : this.getMap().toString()) + "}";
    }

    public abstract clear(): void;

    public abstract entrySet(): Set<Map.Entry<K, V>>;

    public abstract keySet(): Set<K>;

    public abstract put(key: K, value: V): V;

    public abstract remove(key: K): V;

    public abstract values(): Collection<V>;

    protected abstract getMap(): Map<K, V>;

    protected getListeners(): Set<MapChangeListener<K, V>> {
        return this.listeners;
    }

    protected fireChangeEvent(event: MapChangeListener.Change<K, V>) {
        this.listeners.forEach((listener) => {
            listener(event);
        });
    }
}