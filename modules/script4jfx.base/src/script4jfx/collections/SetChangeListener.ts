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

import { ObservableSet } from './ObservableSet';

 /**
 * Functional interface.
 */
export interface SetChangeListener<E> {

    /**
     * Called after a change has been made to an ObservableSet. This method is called on every
     * elementary change (add/remove) once. This means, complex changes like removeAll(Collection)
     * or clear() may result in more than one call of onChanged method.
     */
    ​onChanged(c: SetChangeListener.Change<E>): void;
}

type SetChangeListenerFunc<E> = (c: SetChangeListener.Change<E>) => void;

export namespace SetChangeListener {
    
    export function lambda<E>(func: SetChangeListenerFunc<E>): SetChangeListener<E> {
        return new class implements SetChangeListener<E> {
            
            public ​onChanged(change: SetChangeListener.Change<E>): void {
                func(change);
            }
        };
    }    

    export abstract class Change<E> {

        private readonly set: ObservableSet<E>;

        public constructor​(set: ObservableSet<E>) {
            this.set = set;
        }

        /**
         * An observable set that is associated with the change.
         */
        public getSet(): ObservableSet<E> {
            return this.set;
        }

        /**
         * Get the new element.
         */
        public abstract getElementAdded(): E;

        /**
         * Get the old element.
         */
        public abstract getElementRemoved(): E;

        /**
         * If this change is a result of add operation.
         */
        public abstract wasAdded(): boolean;

        /**
         * If this change is a result of removal operation.
         */
        public abstract wasRemoved(): boolean;

    }
}
