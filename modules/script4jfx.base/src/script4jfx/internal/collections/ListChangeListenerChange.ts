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

import { ListChangeListener } from './../../collections/ListChangeListener';
import { List } from 'script4j.base';
import { ArrayList } from 'script4j.base';
import { IllegalStateError } from 'script4j.base'

export class ListChangeListenerChange<E> extends ListChangeListener.Change<E> {

    private currentNode: ListChangeListenerChange.Node<E> = null;

    private nodes: List<ListChangeListenerChange.Node<E>> = new ArrayList<ListChangeListenerChange.Node<E>>();

    private nodeIndex: number = -1;

    public getFrom(): number {
        this.checkIfNotInitialState();
        return this.currentNode.getFrom();
    }

    public getRemoved(): List<E> {
        this.checkIfNotInitialState();
        return this.currentNode.getRemoved();
    }

    public getTo(): number {
        this.checkIfNotInitialState();
        return this.currentNode.getTo();
    }

    public next(): boolean {
        if (this.nodes.size() > this.nodeIndex + 1) {
            this.currentNode = this.nodes.get(++this.nodeIndex);
            return true;
        } else {
            return false;
        }
    }

    public reset(): void {
        this.currentNode = null;
        this.nodeIndex = -1;
    }

    public newNode(): ListChangeListenerChange.Node<E> {
        let node: ListChangeListenerChange.Node<E> = new ListChangeListenerChange.Node<E>();
        this.nodes.add(node);
        return node;
    }

    private checkIfNotInitialState(): void {
        if (this.nodeIndex === -1) {
            throw new IllegalStateError("The change is in initial state. Call next()");
        }
    }
}

export namespace ListChangeListenerChange {

    export class Node<E> {

        private from: number;

        private removed: List<E> = new ArrayList<E>();

        private to: number;

        public getFrom(): number {
            return this.from;
        }

        public setFrom(f: number) {
            this.from = f;
        }

        public getRemoved(): List<E> {
            return this.removed;
        }

        public getTo(): number {
            return this.to;
        }

        public setTo(to: number) {
            this.to = to;
        }

    }

}

