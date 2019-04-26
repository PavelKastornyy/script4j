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

import { AbstractObservableListBase } from './AbstractObservableListBase';
import { ObservableList } from './../../collections/ObservableList';
import { List } from 'script4j.base';
import { Collection } from 'script4j.base';
import { Iterator } from 'script4j.base';
import { UnsupportedOperationError } from 'script4j.base';
import { ListChangeListener } from './../../collections/ListChangeListener';

export class UnmodifiableObservableListWrapper<E> extends AbstractObservableListBase<E> {

    private readonly list: ObservableList<E>;

    public constructor(list: ObservableList<E>) {
        super();
        this.list = list;
    }

    public addListener​(listener: ListChangeListener<E>): void {
        this.list.addListener(listener);
    }

    public removeListener​(listener: ListChangeListener<E>): void {
        this.list.removeListener(listener);
    }

    public addByIndex(index: number, obj: E): void {
        throw new UnsupportedOperationError();
    }
    
    public addAllByIndex(index: number, collection: Collection<E>): boolean {    
        throw new UnsupportedOperationError();
    }

    public removeByIndex(index: number): E {
        throw new UnsupportedOperationError();
    }

    public set(index: number, obj: E): E {
        throw new UnsupportedOperationError();
    }

    public add(obj: E): boolean {
        throw new UnsupportedOperationError();
    }

    public addAll(c: Collection<E>): boolean {
        throw new UnsupportedOperationError();
    }

    public clear(): void {
        throw new UnsupportedOperationError();
    }

    public remove(obj: E): boolean {
        throw new UnsupportedOperationError();
    }

    public removeAll(c: Collection<E>): boolean {
        throw new UnsupportedOperationError();
    }

    public iterator(): Iterator<E> {
        return new class<E> implements Iterator<E> {

            private readonly delegate: Iterator<E> = null;

            constructor(delegate: Iterator<E>) {
                this.delegate = delegate;
            }

            hasNext(): boolean {
                return this.delegate.hasNext();
            }

            next(): E {
                return this.delegate.next();
            }

            remove(): void {
                throw new UnsupportedOperationError();
            }
        }(this.list.iterator());
    }

    protected getList(): List<E> {
        return this.list;
    }
}