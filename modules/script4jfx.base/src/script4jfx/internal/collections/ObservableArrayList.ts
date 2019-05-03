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

import { AbstractObservableListBase } from './AbstractObservableListBase';
import { ListChangeListenerChange } from './ListChangeListenerChange';
import { List } from 'script4j.base';
import { ArrayList } from 'script4j.base';
import { Collection } from 'script4j.base';
import { Iterator } from 'script4j.base';

export class ObservableArrayList<E> extends AbstractObservableListBase<E> {

    private readonly list: List<E> = new ArrayList<E>();

    public constructor(col: Collection<E>) {
        super();
        this.list.addAll(col);
    }

    public addByIndex(index: number, obj: E): void {
        this.list.addByIndex(index, obj);
        let change: ListChangeListenerChange<E> = this.createInitialChange();
        let node: ListChangeListenerChange.Node<E> = change.newNode();
        node.setFrom(index);
        node.setTo(index + 1);
        this.fireChangeEvent(change);
    }

    public removeByIndex(index: number): E {
        let prevSize: number = this.list.size();
        let prevValue: E = this.list.removeByIndex(index);
        if (prevSize !== this.list.size()) {
            let change: ListChangeListenerChange<E> = this.createInitialChange();
            let node: ListChangeListenerChange.Node<E> = change.newNode();
            node.setFrom(index);
            node.setTo(index);
            node.getRemoved().add(prevValue);
            this.fireChangeEvent(change);
        }
        return prevValue;
    }

    public set(index: number, obj: E): E {
        let prevValue: E = this.list.set(index, obj);
        let change: ListChangeListenerChange<E> = this.createInitialChange();
        let node: ListChangeListenerChange.Node<E> = change.newNode();
        node.setFrom(index);
        node.setTo(index + 1);
        node.getRemoved().add(prevValue);
        this.fireChangeEvent(change);
        return prevValue;
    }

    public add(obj: E): boolean {
        let frm: number = this.list.size();
        if (this.list.add(obj)) {
            let change: ListChangeListenerChange<E> = this.createInitialChange();
            let node: ListChangeListenerChange.Node<E> = change.newNode();
            node.setFrom(frm);
            node.setTo(frm + 1);
            this.fireChangeEvent(change);
            return true;
        } else {
            return false;
        }
    }

    public addAll(c: Collection<E>): boolean {
        let prevSize = this.list.size();
        if (this.list.addAll(c)) {
            let change: ListChangeListenerChange<E> = this.createInitialChange();
            let node: ListChangeListenerChange.Node<E> = change.newNode();
            node.setFrom(prevSize);
            node.setTo(this.list.size());
            this.fireChangeEvent(change);
            return true;
        } else {
            return false;
        }
    }
    
    public addAllByIndex(index: number, collection: Collection<E>): boolean {
        if (this.list.addAllByIndex(index, collection)) {
            let change: ListChangeListenerChange<E> = this.createInitialChange();
            let node: ListChangeListenerChange.Node<E> = change.newNode();
            node.setFrom(index);//inclusive
            node.setTo(index + collection.size()); //exclusive
            this.fireChangeEvent(change);
            return true;
        } else {
            return false;
        }
    }

    public clear(): void {
        let change: ListChangeListenerChange<E> = this.createInitialChange();
        let node: ListChangeListenerChange.Node<E> = change.newNode();
        node.setFrom(0);
        node.setTo(0);
        node.getRemoved().addAll(this.list);
        this.list.clear();
        this.fireChangeEvent(change);
    }

    public remove(obj: E): boolean {
        let index: number = this.list.indexOf(obj);
        if (index === -1) {
            return false;
        }
        //for perfomance we remove by index as we know it already
        this.list.removeByIndex(index)
        let change: ListChangeListenerChange<E> = this.createInitialChange();
        let node: ListChangeListenerChange.Node<E> = change.newNode();
        node.setFrom(index);
        node.setTo(index);
        node.getRemoved().add(obj);
        this.fireChangeEvent(change);
        return true;
    }

    /**
     *  When removeAll in every change to/from are equal and counted this way - every change node
     *  has indexes according to list that is result after all previous change nodes.
     *  For example, list ["A", "B", "C", "D", "E"], if we list.removeAll("A", "B", "E") then we will have two changes:
     *  1) FROM:0, TO:0, Removed: [A, B];
     *  2) FROM:2, TO:2, Removed: [E] (2 because we consider "E" in ["C", "D", "E"];
     */
    public removeAll(collection: Collection<E>): boolean {
        //step 0 we select all elements we need to delete
        let selected: List<ObservableArrayList.IndexAndValue<E>>
            = new ArrayList<ObservableArrayList.IndexAndValue<E>>();
        for (let i: number = 0; i < this.list.size(); i++) {
            let value: E = this.list.get(i);
            if (collection.contains(value)) {
                selected.add(new ObservableArrayList.IndexAndValue(i, value));
            }
        }
        //step 1 we remove elements and create one change event with one or many nodes.
        //we remove by index as we know what elements exist and their indexes
        let change: ListChangeListenerChange<E> = null;
        if (selected.size() > 0) {
            change = this.createInitialChange();
        }
        let currentIndexAndValue: ObservableArrayList.IndexAndValue<E> = null;
        let nextIndexAndValue: ObservableArrayList.IndexAndValue<E> = null;
        let currentChangeNode: ListChangeListenerChange.Node<E> = null;
        for (let i: number = 0; i < selected.size(); i++) {
            currentIndexAndValue = selected.get(i);
            if (i + 1 < selected.size()) {
                nextIndexAndValue = selected.get(i + 1);
            } else {
                nextIndexAndValue = null;
            }
            this.list.removeByIndex(i);
            //now we see, if we start a change node
            if (currentChangeNode === null) {
                currentChangeNode = change.newNode();
                currentChangeNode.setFrom(currentIndexAndValue.getIndex() - i);
                currentChangeNode.setTo(currentIndexAndValue.getIndex() - i);
            }
            currentChangeNode.getRemoved().add(currentIndexAndValue.getValue());
            //now we see. if we finish this change node, nodes are not consecutive
            if (nextIndexAndValue !== null && currentIndexAndValue.getIndex() + 1 !== nextIndexAndValue.getIndex()) {
                currentChangeNode = null;
            }
        }
        if (change !== null) {
            this.fireChangeEvent(change);
            return true;
        } else {
            return false;
        }
    }

    public iterator(): Iterator<E> {
        return new class implements Iterator<E> {

            private readonly delegate: Iterator<E>;

            private readonly impl: ObservableArrayList<E>

            private index: number = -1;

            private currentElement: E = null;

            constructor(impl: ObservableArrayList<E>) {
                this.impl = impl;
                this.delegate = impl.list.iterator();
            }

            public hasNext(): boolean {
                return this.delegate.hasNext();
            }

            public next(): E {
                this.index++;
                this.currentElement = this.delegate.next();
                return this.currentElement;
            }

            remove(): void {
                this.delegate.remove();
                //if we have not exception it means element was removed
                let change: ListChangeListenerChange<E> = this.impl.createInitialChange();
                let node: ListChangeListenerChange.Node<E> = change.newNode();
                node.setFrom(0);
                node.setTo(0);
                node.getRemoved().add(this.currentElement);
                this.impl.fireChangeEvent(change);
            }
        }(this);
    }

    protected getList(): List<E> {
        return this.list;
    }

    private createInitialChange(): ListChangeListenerChange<E> {
        let change: ListChangeListenerChange<E> = new ListChangeListenerChange<E>(this);
        return change;
    }
}

export namespace ObservableArrayList {

    export class IndexAndValue<E> {

        private readonly index: number;

        private readonly value: E;

        constructor(index: number, value:E) {
            this.index = index;
            this.value = value;
        }

        public getIndex(): number {
            return this.index;
        }

        public getValue(): E {
            return this.value;
        }
    }
}