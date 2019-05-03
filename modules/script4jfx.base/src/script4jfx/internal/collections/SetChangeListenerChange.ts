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

import { SetChangeListener } from './../../collections/SetChangeListener';
import { ObservableSet } from './../../collections/ObservableSet';

export class SetChangeListenerChange<E> extends SetChangeListener.Change<E> {

    private elementAdded: E = null;

    private elementRemoved: E = null;

    private added: boolean = false;

    private removed: boolean = false;

    public constructor​(set: ObservableSet<E>) {
        super(set);
    }

    /**
     * Get the new element.
     */
    public getElementAdded(): E {
        return this.elementAdded;
    }

    public setElementAdded(e: E): void {
        this.elementAdded = e;
    }

    /**
     * Get the old element.
     */
    public getElementRemoved(): E {
        return this.elementRemoved;
    }

    public setElementRemoved(e: E): void {
        this.elementRemoved = e;
    }

    /**
     * If this change is a result of add operation.
     */
    public wasAdded(): boolean {
        return this.added;
    }

    public setAdded(added: boolean): void {
        this.added = added;
    }

    /**
     * If this change is a result of removal operation.
     */
    public wasRemoved(): boolean {
        return this.removed;
    }

    public setRemoved(removed: boolean): void {
        this.removed = removed;
    }

}

