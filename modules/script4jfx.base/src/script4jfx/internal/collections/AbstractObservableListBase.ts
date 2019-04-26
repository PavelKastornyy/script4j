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

import { ObservableList } from './../../collections/ObservableList';
import { ListChangeListener } from './../../collections/ListChangeListener';
import { List } from 'script4j.base';
import { Collection } from 'script4j.base';
import { Iterator } from 'script4j.base';
import { Consumer } from 'script4j.base';
import { Set } from 'script4j.base';
import { ArrayList } from 'script4j.base';

export abstract class AbstractObservableListBase<E> implements ObservableList<E> {

    private listeners: List<ListChangeListener<E>> = new ArrayList<ListChangeListener<E>>();

    public constructor() {
        //
    }

    public addListener​(listener: ListChangeListener<E>): void {
        this.listeners.add(listener);
    }

    public removeListener​(listener: ListChangeListener<E>): void {
        this.listeners.remove(listener);
    }

    public get(index: number): E {
        return this.getList().get(index);
    }

    public subList​(fromIndex: number, toIndex: number): List<E> {
        return this.getList().subList(fromIndex, toIndex);
    }

    public indexOf(obj: E): number {
        return this.getList().indexOf(obj);
    }

    public contains(obj: E): boolean {
        return this.getList().contains(obj);
    }

    public containsAll(c: Collection<E>): boolean {
        return this.getList().containsAll(c);
    }

    public isEmpty(): boolean {
        return this.getList().isEmpty();
    }

    public size(): number {
        return this.getList().size();
    }

    public forEach(consumer: Consumer<E>): void {
        this.getList().forEach(consumer);
    }

    public toString(): string {
        return this.getClass().getName()
                + "{list=" + (this.getList() === null ? "null" : this.getList().toString()) + "}";
    }

    public abstract addByIndex(index: number, obj: E): void;
    
    public abstract addAllByIndex(index: number, c: Collection<E>): boolean;

    public abstract removeByIndex(index: number): E;

    public abstract set(index: number, obj: E): E;

    public abstract add(obj: E): boolean;

    public abstract addAll(c: Collection<E>): boolean;

    public abstract clear(): void;

    public abstract remove(obj: E): boolean;

    public abstract removeAll(c: Collection<E>): boolean;

    public abstract iterator(): Iterator<E>;

    protected abstract getList(): List<E>;

    protected fireChangeEvent(event: ListChangeListener.Change<E>) {
        let consumer: Consumer<ListChangeListener<E>> = Consumer.fromFunc((listener) => {
            listener.onChanged(event);
        });
        this.listeners.forEach(consumer);
    }
}



