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

import { ObservableList } from './ObservableList';
import { List } from 'script4j.base';
import { ArrayList } from 'script4j.base';

 /**
 * Functional interface.
 */
export interface ListChangeListener<E> {

    /**
     * Called after a change has been made to an ObservableList.
     */
    onChanged(c: ListChangeListener.Change<E>): void;
}

type ListChangeListenerFunc<E> = (c: ListChangeListener.Change<E>) => void;

export namespace ListChangeListener {
    
    export function fromFunc<E>(func: ListChangeListenerFunc<E>): ListChangeListener<E> {
        return new class implements ListChangeListener<E> {
            
            public onChanged(c: ListChangeListener.Change<E>): void {
                func(c);
            }
        };
    }    

    export abstract class Change<E> {

        private readonly list: ObservableList<E>;

        /**
         * Constructs a new Change instance on the given list.
         */
        constructor​(list: ObservableList<E>){
            this.list = list;
        }

        /**
         * Returns the size of the interval that was added.
         */
        public getAddedSize(): number {
            return this.wasAdded() ? this.getTo() - this.getFrom() : 0;
        }

        /**
         * Returns a subList view of the list that contains only the elements added.
         */
        public getAddedSubList(): List<E> {
            if (this.wasAdded()) {
                return this.getList().subList(this.getFrom(), this.getTo());
            } else {
                return new ArrayList<E>();
            }
        }

        /**
         *  If wasAdded() is true, the interval contains all the values that were added.
         *  If wasPermutated() is true, the interval marks the values that were permutated.
         *  If wasRemoved() is true and wasAdded is false, getFrom() and getTo() should return the same number -
         *  the place where the removed elements were positioned in the list.
         */
        public abstract getFrom(): number;

        /**
         * The source list of the change.
         */
        public getList(): ObservableList<E> {
            return this.list;
        }

//        /**
//         * If this change is a permutation, it returns an integer array that describes the permutation.
//         */
//        protected abstract getPermutation(): number[];
//
//        /**
//         * This method allows developers to observe the permutations that occurred in this change.
//         */
//        public getPermutation​(int i): number;

        /**
         * An immutable list of removed/replaced elements.
         */
        public abstract getRemoved(): List<E>;

        /**
         * Returns the size of getRemoved() list.
         */
        public getRemovedSize(): number {
            return this.getRemoved().size();
        }

        /**
         * The end of the change interval.
         */
        public abstract getTo(): number;

        /**
         * Goes to the next change. Whenever possible we try to make only one change, however, in some situations
         * that is not possible, for example when in {0, 1, 2, 3, 4} we remove `1` and `4`. As these elements
         * are separated from each other we can't give only one change because we can't set proper to and from.
         * So, in this example we will have two changes.
         */
        public abstract next(): boolean;

        /**
         * Resets to the initial stage.
         */
        public abstract reset(): void;

        /**
         * Indicates if elements were added during this change.
         */
        public wasAdded(): boolean {
            //to understand this code, read doc for getFrom().
            return (!this.wasUpdated() && this.getFrom() < this.getTo());
        }

//        /**
//         * Indicates if the change was only a permutation.
//         */
//        wasPermutated(): boolean;

        /**
         * Indicates if elements were removed during this change.
         */
        public wasRemoved(): boolean {
            return !this.getRemoved().isEmpty();
        }

        /**
         * Indicates if elements were replaced during this change.
         */
        public wasReplaced(): boolean {
            return this.wasAdded() && this.wasRemoved();
        }

        /**
         * Indicates that the elements between getFrom() (inclusive) to getTo() exclusive has changed.
         * This is the only optional event type and may not be fired by all ObservableLists.
         */
        public wasUpdated(): boolean {
            return false;
        }

    }
}