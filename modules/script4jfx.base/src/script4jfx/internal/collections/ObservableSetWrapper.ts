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

import { AbstractObservableSetBase } from './AbstractObservableSetBase';
import { Set } from 'script4j.base';
import { HashSet } from 'script4j.base';
import { Iterator } from 'script4j.base';
import { Collection } from 'script4j.base';
import { SetChangeListenerChange } from './SetChangeListenerChange';

/**
 * This is wrapper, because it can work with any type of sets.
 */
export class ObservableSetWrapper<E> extends AbstractObservableSetBase<E> {

    private readonly set: Set<E>;

    public constructor(set: Set<E>) {
        super();
        this.set = set;
    }

    public add(obj: E): boolean {
        if (this.set.add(obj)) {
            let event: SetChangeListenerChange<E> = new SetChangeListenerChange<E>(this);
            event.setAdded(true);
            event.setElementAdded(obj);
            this.fireChangeEvent(event);
            return true;
        } else {
            return false;
        }
    }

    public addAll(collection: Collection<E>): boolean {
        let iterator: Iterator<E> = collection.iterator();
        let result = false;
        while (iterator.hasNext()) {
            if (this.add(iterator.next())) {
                result = true;
            }
        }
        return result;
    }

    public remove(obj: E): boolean {
        if (this.set.remove(obj)) {
            let event: SetChangeListenerChange<E> = new SetChangeListenerChange<E>(this);
            event.setRemoved(true);
            event.setElementRemoved(obj);
            this.fireChangeEvent(event);
            return true;
        } else {
            return false;
        }
    }

    public removeAll(collection: Collection<E>): boolean {
        let result = false;
        let iterator: Iterator<E> = collection.iterator();
        //this is set, only one occurance
        while (iterator.hasNext()) {
            if (this.remove(iterator.next())) {
                result = true;
            }
        }
        return result;
    }

    public clear(): void {
        let iterator: Iterator<E> = this.iterator();
        while (iterator.hasNext()) {
            iterator.next();
            iterator.remove();
        }
    }

    public iterator(): Iterator<E> {
        return new class implements Iterator<E> {

            private readonly delegate: Iterator<E>;

            private readonly impl: ObservableSetWrapper<E>

            private currentElement: E = null;

            constructor(impl: ObservableSetWrapper<E>) {
                this.impl = impl;
                this.delegate = impl.set.iterator();
            }

            public hasNext(): boolean {
                return this.delegate.hasNext();
            }

            public next(): E {
                this.currentElement = this.delegate.next();
                return this.currentElement;
            }

            remove(): void {
                this.delegate.remove();
                //if we have not exception it means element was removed.
                let event: SetChangeListenerChange<E> = new SetChangeListenerChange<E>(this.impl);
                event.setRemoved(true);
                event.setElementRemoved(this.currentElement);
                this.impl.fireChangeEvent(event);
            }
        }(this);
    }

    protected getSet(): Set<E> {
        return this.set;
    }
}

