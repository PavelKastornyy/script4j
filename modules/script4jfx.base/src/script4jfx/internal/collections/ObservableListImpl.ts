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

import { ObservableList } from './../../collections/ObservableList';
import { ListChangeListener } from './../../collections/ListChangeListener';
import { List } from 'script4j.base';
import { ArrayList } from 'script4j.base';
import { Collection } from 'script4j.base';
import { Iterator } from 'script4j.base';
import { Consumer } from 'script4j.base';
import { Set } from 'script4j.base';
import { HashSet } from 'script4j.base';

export abstract class ObservableListImpl<E> implements ObservableList<E> {

    private listeners: Set<ListChangeListener<E>> = new HashSet<ListChangeListener<E>>();

    public constructor() {
        //
    }

    public addListener​(listener: ListChangeListener<E>): void {
        this.listeners.add(listener);
    }

    public removeListener​(listener: ListChangeListener<E>): void {
        this.listeners.remove(listener);
    }

    public abstract addByIndex(index: number, obj: E): void;

    public get(index: number): E {
        return this.getList().get(index);
    }

    public abstract removeByIndex(index: number): void;

    public abstract set(index: number, obj: E): void;

    public subList​(fromIndex: number, toIndex: number): List<E> {
        return this.getList().subList(fromIndex, toIndex);
    }

    public indexOf(obj: E): number {
        return this.getList().indexOf(obj);
    }

    public abstract add(obj: E): boolean;

    public abstract addAll(c: Collection<E>): boolean;

    public abstract clear(): void;

    public contains(obj: E): boolean {
        return this.getList().contains(obj);
    }

    public containsAll(c: Collection<E>): boolean {
        return this.getList().containsAll(c);
    }

    public isEmpty(): boolean {
        return this.getList().isEmpty();
    }

    public abstract remove(obj: E): boolean;

    public abstract removeAll(c: Collection<E>): boolean;

    public size(): number {
        return this.getList().size();
    }

    public abstract iterator(): Iterator<E>;

    public forEach(consumer: Consumer<E>): void {
        this.getList().forEach(consumer);
    }

    protected abstract getList(): List<E>;

    protected getListeners(): Set<ListChangeListener<E>> {
        return this.listeners;
    }

    protected fireChangeEvent(event: ListChangeListener.Change<E>) {
        this.listeners.forEach((listener) => {
            listener(event);
        });
    }
}



