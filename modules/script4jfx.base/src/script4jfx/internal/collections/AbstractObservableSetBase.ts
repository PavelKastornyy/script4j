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

import { ObservableSet } from './../../collections/ObservableSet';
import { SetChangeListener } from './../../collections/SetChangeListener';
import { Collection } from 'script4j.base';
import { Iterator } from 'script4j.base';
import { Consumer } from 'script4j.base';
import { Set } from 'script4j.base';
import { List } from 'script4j.base';
import { ArrayList } from 'script4j.base';

export abstract class AbstractObservableSetBase<E> implements ObservableSet<E> {

    private listeners: List<SetChangeListener<E>> = new ArrayList<SetChangeListener<E>>();

    public constructor() {
        //
    }

    public addListener​(listener: SetChangeListener<E>): void {
        this.listeners.add(listener);
    }

    public removeListener​(listener: SetChangeListener<E>): void {
        this.listeners.remove(listener);
    }

    public toString(): string {
        return this.getClass().getName()
                + "{set=" + (this.getSet() === null ? "null" : this.getSet().toString()) + "}";
    }

    public contains(obj: E): boolean {
        return this.getSet().contains(obj);
    }

    public containsAll(c: Collection<E>): boolean {
        return this.getSet().containsAll(c);
    }

    public isEmpty(): boolean {
        return this.getSet().isEmpty();
    }

    public abstract add(obj: E): boolean;

    public abstract addAll(c: Collection<E>): boolean;

    public abstract clear(): void;

    public abstract remove(obj: E): boolean;

    public abstract removeAll(c: Collection<E>): boolean;

    public abstract iterator(): Iterator<E>;

    public size(): number {
        return this.getSet().size();
    }

    public forEach(consumer: Consumer<E>): void {
        this.getSet().forEach(consumer);
    }

    protected abstract getSet(): Set<E>;

    protected fireChangeEvent(event: SetChangeListener.Change<E>) {
        let consumer: Consumer<SetChangeListener<E>> = Consumer.fromFunc((listener) => {
            listener.onChanged(event);
        });
        this.listeners.forEach(consumer);
    }
}

