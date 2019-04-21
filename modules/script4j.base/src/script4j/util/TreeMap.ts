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

import { SortedMap } from './SortedMap';
import { AbstractMap } from './AbstractMap';
import { Comparator } from './Comparator';
import { Map } from './Map';
import { Collection } from './Collection';
import { Set } from './Set';
import { HashSet } from './HashSet';
import { AbstractSet } from './AbstractSet';
import { BiFunction } from './function/BiFunction';
import { Consumer } from './function/Consumer';
import { Iterator } from './Iterator';
import { UnsupportedOperationError } from './../lang/UnsupportedOperationError';
import { RedBlackBinaryTree } from './../internal/util/RedBlackBinaryTree';
import { IllegalStateError } from './../lang/IllegalStateError';
import { Objects } from './Objects';
import { NoSuchElementError } from './NoSuchElementError';
import { AbstractCollection } from './AbstractCollection';


export class TreeMap<K, V> extends AbstractMap<K, V> implements SortedMap<K, V> {// NavigableMap<K,V>, Cloneable, Serializable

    private static EntrySet = class<K, V> extends AbstractSet<Map.Entry<K, V>> {

        private readonly map: TreeMap<K, V>;

        constructor(map: TreeMap<K, V>) {
            super();
            this.map = map;
        }

        public iterator(): Iterator<Map.Entry<K, V>> {
            return this.map.iterator();
        }

        public forEach(consumer: Consumer<Map.Entry<K, V>>): void {
            let iterator: Iterator<Map.Entry<K, V>> = this.iterator();
            while (iterator.hasNext()) {
                consumer(iterator.next());
            }
        }

        public add(obj: Map.Entry<K, V>): boolean {
            let prevSize = this.size();
            this.map.put(obj.getKey(), obj.getValue());
            return (prevSize !== this.map.size())
        }

        public clear(): void {
            this.map.clear();
        }

        public contains(obj: Map.Entry<K, V>): boolean {
            if (this.map.size() === 0) {
                return false;
            }
            const node: RedBlackBinaryTree.Node<TreeMap.Entry<K, V>> = this.map.tree.findNode(<any>obj);
            if (node !== null) {
                return true;
            } else {
                return false;
            }
        }

        public isEmpty(): boolean {
            return this.map.isEmpty();
        }

        public remove(obj: Map.Entry<K, V>): boolean {
            if (this.map.size() === 0) {
                return false;
            }
            let prevSize = this.map.size();
            this.map.remove(obj.getKey());
            return (prevSize !== this.map.size())
        }

        public size(): number {
            return this.map.size();
        }

    };
    
    private static KeySet = class<K, V> extends AbstractSet<K> {

        private readonly map: TreeMap<K, V>;

        constructor(map: TreeMap<K, V>) {
            super();
            this.map = map;
        }

        public iterator(): Iterator<K> {

            return new class implements Iterator<K> {

                private readonly map: TreeMap<K, V>;

                private readonly delegate: Iterator<Map.Entry<K, V>>;

                constructor(map: TreeMap<K, V>) {
                    this.map = map;
                    this.delegate = this.map.iterator();
                }

                public hasNext(): boolean {
                    return this.delegate.hasNext();
                }

                public next(): K {
                    return this.delegate.next().getKey();
                }

                public remove(): void {
                    this.delegate.remove();
                }

            }(this.map);

        }

        public forEach(consumer: Consumer<K>): void {
            let iterator: Iterator<K> = this.iterator();
            while (iterator.hasNext()) {
                consumer(iterator.next());
            }
        }

        public add(obj: K): boolean {
            throw new UnsupportedOperationError(null);
        }

        public clear(): void {
            this.map.clear();
        }

        public contains(obj: K): boolean {
            return this.map.containsKey(obj);
        }

        public isEmpty(): boolean {
            return this.map.isEmpty();
        }

        public remove(obj: K): boolean {
            let prevSize = this.size();
            this.map.remove(obj);
            return (prevSize !== this.size())
        }

        public size(): number {
            return this.map.size();
        }

    };

    private static ValueCollection = class<K, V> extends AbstractCollection<V> {

        private readonly map: TreeMap<K, V>;

        constructor(map: TreeMap<K, V>) {
            super();
            this.map = map;
        }

        public iterator(): Iterator<V> {

            return new class implements Iterator<V> {

                private readonly map: TreeMap<K, V>;

                private readonly delegate: Iterator<Map.Entry<K, V>>;

                constructor(map: TreeMap<K, V>) {
                    this.map = map;
                    this.delegate = this.map.iterator();
                }

                public hasNext(): boolean {
                    return this.delegate.hasNext();
                }

                public next(): V {
                    return this.delegate.next().getValue();
                }

                public remove(): void {
                    this.delegate.remove();
                }

            }(this.map);

        }

        public forEach(consumer: Consumer<V>): void {
            let iterator: Iterator<V> = this.iterator();
            while (iterator.hasNext()) {
                consumer(iterator.next());
            }
        }

        public add(obj: V): boolean {
            throw new UnsupportedOperationError(null);
        }

        public clear(): void {
            this.map.clear();
        }

        public contains(obj: V): boolean {
            return this.map.containsValue(obj);
        }

        public isEmpty(): boolean {
            return this.map.isEmpty();
        }

        public remove(obj: V): boolean {
            let prevSize = this.size();
            let iterator: Iterator<V> = this.iterator();
            while (iterator.hasNext()) {
                if (Objects.equals(iterator.next(), obj)) {
                    iterator.remove();
                    break;
                }
            }
            return (prevSize !== this.size());
        }

        public size(): number {
            return this.map.size();
        }

    };    

    private readonly comparatorWrapper: Comparator<TreeMap.Entry<K, V>> = 
            (o1: TreeMap.Entry<K, V>, o2: TreeMap.Entry<K, V>): number => {
        return this.aComparator(o1.getKey(), o2.getKey());
    }
    
    private readonly tree: RedBlackBinaryTree<TreeMap.Entry<K, V>> = new RedBlackBinaryTree(this.comparatorWrapper);
    
    private aComparator: Comparator<K> = null;
    
    public constructor​(comparator?: Comparator<K>) {
        super();
        if (comparator !== undefined) {
            this.aComparator = comparator;
        }
    }
    
    public clear(): void {
        this.tree.clear();
    }

    public containsKey(key: K): boolean {
        if (this.size() === 0) {
            return false;
        }
        let node: RedBlackBinaryTree.Node<TreeMap.Entry<K, V>> = this.tree.findNode(new TreeMap.Entry<K, V>(key, null));
        if (node !== null) {
            return true;
        } else {
            return false;
        }
    }

    public containsValue(value: V): boolean {
        if (this.size() === 0) {
            return false;
        }
        return this.tree.traverseAndTest((entry: TreeMap.Entry<K, V>): boolean => {
            return Objects.equals(entry.getValue(), value);
        });
    }

    public get(key: K): V {
        if (this.size() === 0) {
            return null;
        }
        let node: RedBlackBinaryTree.Node<TreeMap.Entry<K, V>> = this.tree.findNode(new TreeMap.Entry<K, V>(key, null));
        if (node === null) {
            return null;
        } else {
            return node.getValue().getValue();
        }
    }

    public isEmpty(): boolean {
        if (this.size() === 0) {
            return true;
        } else {
            return false;
        }
    }
    
    public entrySet(): Set<Map.Entry<K, V>> {
        return new TreeMap.EntrySet<K, V>(this);
    }    

    public keySet(): Set<K> {
        return new TreeMap.KeySet<K, V>(this);
    }
    
    public values(): Collection<V> {
        return new TreeMap.ValueCollection<K, V>(this);
    }    

    public put(key: K, value: V): V {
        if (this.aComparator === null) {
            if (typeof key === "number" || key instanceof Number) {
                this.aComparator = <Comparator<any>>this.createNumberComparator();
            } else if (typeof key === "string" || key instanceof String) {
                this.aComparator = <Comparator<any>>this.createStringComparator();
            } else {
                throw new IllegalStateError("Comparator is not defined");
            }
        }
        let entry: TreeMap.Entry<K, V> = new TreeMap.Entry(key, value);
        let previousEntry: TreeMap.Entry<K, V> = this.tree.add(entry);
        if (previousEntry !== null) {
            return previousEntry.getValue();
        } else {
            return null;
        }
    }

    public remove(key: K): V {
        if (this.size() === 0) {
            return null;
        }
        const entry: TreeMap.Entry<K, V> = new TreeMap.Entry(key, null);
        const node: RedBlackBinaryTree.Node<TreeMap.Entry<K, V>> = this.tree.findNode(entry);
        if (node === null) {
            return null;
        } else {
            //deletes node without its childrent
            this.tree.removeNode(node);
            return node.getValue().getValue();
        }
    }

    public size(): number {
        return this.tree.size();
    }

    public compute​(key: K, remappingFunction: BiFunction<K,​ V,​ V>): V {
        const entry: TreeMap.Entry<K, V> = new TreeMap.Entry(key, null);
        const node: RedBlackBinaryTree.Node<TreeMap.Entry<K, V>> = this.tree.findNode(entry);
        let oldValue: V = null;
        if (node !== null) {
            oldValue = node.getValue().getValue();
            this.tree.removeNode(node);
        }
        let newValue: V = remappingFunction(key, oldValue);
        if (newValue !== null) {
            entry.setValue(newValue);
            this.tree.add(entry);
        }
        return newValue;
    }
    
    public comparator(): Comparator<K> {
        return this.aComparator;
    }

    public firstKey(): K {
        const node: RedBlackBinaryTree.Node<TreeMap.Entry<K, V>> = this.tree.getFirstNode();
        if (node !== null) {
            return node.getValue().getKey();
        } else {
            return null;
        }
    }

    public lastKey(): K {
        const node: RedBlackBinaryTree.Node<TreeMap.Entry<K, V>> = this.tree.getLastNode();
        if (node !== null) {
            return node.getValue().getKey();
        } else {
            return null;
        }
    }
    
    private createNumberComparator(): Comparator<number> {
        return  (o1: number, o2: number): number => {
            if (o1 < o2) {
                return -1;
            } else if (o1 === o2) { 
                return 0;
            } else if (o1 > o2){
                return +1;
            }
        }
    }
    
    private createStringComparator(): Comparator<string> {
        return (o1: string, o2: string): number => {
            return o1.compareTo(o2);
        }
    }
    
    private iterator(): Iterator<Map.Entry<K, V>> {
        return new class implements Iterator<Map.Entry<K, V>> {

            private readonly map: TreeMap<K, V>;

            private currentNode: RedBlackBinaryTree.Node<TreeMap.Entry<K, V>> = null;
            
            private nextNode: RedBlackBinaryTree.Node<TreeMap.Entry<K, V>> = null;            

            private nextWasCalled = false;

            private hasNextWasCalled = false;
            
            private deletionHappened = false;
            
            constructor(map: TreeMap<K, V>) {
                this.map = map;
            }

            public hasNext(): boolean {
                if (this.map.size() === 0) {
                    return false;
                }
                this.hasNextWasCalled = true;
                //for example when we remove the second element, currentNode is null.
                if (this.currentNode === null && !this.deletionHappened) {
                    this.nextNode = this.map.tree.getFirstNode();
                } else {
                    if (this.deletionHappened) {
                        //this.nextNode is set in deletion.
                        this.deletionHappened = false;
                    } else {
                        this.nextNode = this.map.tree.getSuccessorOf(this.currentNode);
                    }
                }
                if (this.nextNode !== null) {
                    return true;
                } else {
                    return false;
                }
            }

            public next(): Map.Entry<K, V> {
                if (!this.hasNextWasCalled) {
                    if (!this.hasNext()) {
                        throw new NoSuchElementError();
                    }
                }
                this.hasNextWasCalled = false;
                this.nextWasCalled = true;
                this.currentNode = this.nextNode;
                this.nextNode = null;
                return this.currentNode.getValue();
            }

            public remove(): void {
                if (!this.nextWasCalled) {
                    throw new IllegalStateError(null);
                }
                this.nextWasCalled = false;
                this.nextNode = this.map.tree.getSuccessorOf(this.currentNode);
                this.map.tree.removeNode(this.currentNode);
                this.currentNode = null;
                this.deletionHappened = true;
            }
            
        }(this);
    }    
}

export namespace TreeMap {

    export class Entry<K, V> implements Map.Entry<K, V> {

        private readonly key: K;

        /**
         * This field is not readonly because we can change the value for the existring entry.
         */
        private value: V;

        constructor(key: K, value: V) {
            this.key = key;
            this.value = value;
        }

        public equals(obj: Object): boolean {
            if (this === obj) {
                return true;
            }
            if (obj === null) {
                return false;
            }
            if (!(obj instanceof TreeMap.Entry)) {
                return false;
            }
            let other: TreeMap.Entry<K, V> = <TreeMap.Entry<K, V>>obj;
            if (!this.key.equals(other.getKey())) {
                return false;
            }
            if (!this.value.equals(other.getValue())) {
                return false;
            }
            return true;
        }

        public getKey(): K {
            return this.key;
        }


        public getValue(): V {
            return this.value;
        }

        public setValue(value: V) {
            this.value = value;
        }

        public hashCode(): number {
            let hash: number = 7;
            hash = 31 * hash + Objects.hashCode(this.key);
            hash = 31 * hash + Objects.hashCode(this.value);
            hash = hash | 0; //convert to int32
            return hash;
        }

        public toString(): string {
            return "Entry{" + "key=" + this.key.toString() + ", value=" + this.value.toString() + "}";
        }
    }
}
