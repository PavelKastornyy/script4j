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


import { Set } from './Set';
import { Collection } from './Collection';
import { AbstractCollection } from './AbstractCollection';
import { Map } from './Map';
import { Consumer } from './function/Consumer';
import { List } from './List';
import { ArrayList } from './ArrayList';
import { UnsupportedOperationError } from './../lang/UnsupportedOperationError';
import { IllegalStateError } from './../lang/IllegalStateError';
import { Iterator } from './Iterator';
import { NoSuchElementError } from './NoSuchElementError';
/**
 * Load factor is not supported.
 */
export class HashMap<K, V> implements Map<K, V> {

    public static readonly DEFAULT_CAPACITY: number = 16;

    /**
     * However, EntrySet is a field, but not a type, but we have access to private methods and fields of HashMap.
     */
    private EntrySet = class<K> extends AbstractCollection<Map.Entry<K, V>> implements Set<Map.Entry<K, V>> {

        private readonly map: HashMap<K, V>;

        constructor(map: HashMap<K, V>) {
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
            throw new UnsupportedOperationError(null);
        }

        public clear(): void {
            this.map.clear();
        }

        public contains(obj: Map.Entry<K, V>): boolean {
            //return this.map.containsKey(obj);
            throw new UnsupportedOperationError(null);
        }

        public isEmpty(): boolean {
            return this.map.isEmpty();
        }

        public remove(obj: Map.Entry<K, V>): void {
            this.map.remove(obj.getKey());
        }

        public size(): number {
            return this.map.size();
        }

    };

    private KeySet = class<K> extends AbstractCollection<K> implements Set<K> {

        private readonly map: HashMap<K, V>;

        constructor(map: HashMap<K, V>) {
            super();
            this.map = map;
        }

        public iterator(): Iterator<K> {

            return new class implements Iterator<K> {

                private readonly map: HashMap<K, V>;

                private readonly iterator: Iterator<Map.Entry<K, V>>;

                constructor(map: HashMap<K, V>) {
                    this.map = map;
                    this.iterator = this.map.iterator();
                }

                public hasNext(): boolean {
                    return this.iterator.hasNext();
                }

                public next(): K {
                    return this.iterator.next().getKey();
                }

                public remove(): void {
                    this.iterator.remove();
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

        public remove(obj: K): void {
            this.map.remove(obj);
        }

        public size(): number {
            return this.map.size();
        }

    };

    private ValueCollection = class<V> extends AbstractCollection<V> {

        private readonly map: HashMap<K, V>;

        constructor(map: HashMap<K, V>) {
            super();
            this.map = map;
        }

        public iterator(): Iterator<V> {

            return new class implements Iterator<V> {

                private readonly map: HashMap<K, V>;

                private readonly iterator: Iterator<Map.Entry<K, V>>;

                constructor(map: HashMap<K, V>) {
                    this.map = map;
                    this.iterator = this.map.iterator();
                }

                public hasNext(): boolean {
                    return this.iterator.hasNext();
                }

                public next(): V {
                    return this.iterator.next().getValue();
                }

                public remove(): void {
                    this.iterator.remove();
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

        public remove(obj: V): void {
            let iterator: Iterator<V> = this.iterator();
            while (iterator.hasNext()) {
                if (iterator.next().equals(obj)) {
                    iterator.remove();
                    break;
                }
            }
        }

        public size(): number {
            return this.map.size();
        }

    };

    /**
     * Array of list. Different objects can have equal hascode.
     */
    private buckets: List<Map.Entry<K, V>>[];

    private capacity: number;

    constructor(capacity?: number) {
        if (capacity === undefined) {
            this.capacity = HashMap.DEFAULT_CAPACITY;
        } else {
            this.capacity = capacity;
        }
        this.buckets = this.newBucketsArray(this.capacity);
    }

    public clear(): void {
        this.buckets = this.newBucketsArray(this.capacity);
    }

    public containsKey(key: K): boolean {
        let bucket: List<Map.Entry<K, V>> = this.resolveBucket(key.hashCode());
        if (bucket === null) {
            return false;
        }
        let mapEntry: Map.Entry<K, V> =  null;
        for (let i: number = 0; i < bucket.size(); i++) {
            mapEntry = bucket.get(i);
            if (this.checkIfKeysAreSimilar(key, mapEntry.getKey())) {
                return true;
            }
        }
        return false;
    }

    public containsValue(value: V): boolean {
        for (let i: number = 0; i < this.buckets.length; i++) {
            let bucket: List<Map.Entry<K, V>> = this.buckets[i];
            if (bucket === null) {
                continue;
            }
            let mapEntry: Map.Entry<K, V> =  null;
            for (let z: number = 0; z < bucket.size(); z++) {
                mapEntry = bucket.get(z);
                if (mapEntry.getValue().equals(value)) {
                    return true;
                }
            }
        }
        return false;
    }

    public entrySet(): Set<Map.Entry<K, V>> {
//        let result: Set<MapEntry<K, V>> = new HashSet<MapEntry<K, V>>();
//        let bucket: List<MapEntry<K, V>>;
//        for (let i: number = 0; i < this.capacity; i++) {
//            bucket = this.buckets[i];
//            if (bucket !== null) {
//                bucket.forEach((entry: MapEntry<K, V>) => result.add(entry));
//            }
//        }
//        return result;
        return new this.EntrySet(this);
    }

    public get(key: K): V {
        let bucket: List<Map.Entry<K, V>> = this.resolveBucket(key.hashCode());
        if (bucket === null) {
            return null;
        }
        let mapEntry: Map.Entry<K, V> =  null;
        for (let i: number = 0; i < bucket.size(); i++) {
            mapEntry = bucket.get(i);
            if (this.checkIfKeysAreSimilar(key, mapEntry.getKey())) {
                return mapEntry.getValue();
            }
        }
        return null;
    }

    public isEmpty(): boolean {
        let bucket: List<Map.Entry<K, V>> = null;
        for (let i: number = 0; i < this.buckets.length; i++) {
            bucket = this.buckets[i];
            if (bucket !== null && !bucket.isEmpty()) {
                return false;
            }
        }
        return true;
    }

    public keySet(): Set<K> {
        return new this.KeySet(this);
    }

    public put(key: K, value: V): V {
        let previousValue:V = null;
        let bucketIndex: number = this.calculateBucket(key.hashCode());
        let bucket: List<Map.Entry<K, V>> = this.buckets[bucketIndex];
        if (bucket === null) {
            bucket = new ArrayList<Map.Entry<K, V>>();
            this.buckets[bucketIndex] = bucket;
        }
        //if entry with such key exists we take existing entry and replace value
        let entry: HashMap.Entry<K, V> = null;
        for (let i: number = 0; i < bucket.size(); i++) {
            if (this.checkIfKeysAreSimilar(bucket.get(i).getKey(), key)) {
                entry = <HashMap.Entry<K, V>> bucket.get(i);
                previousValue = entry.getValue();
                entry.setValue(value);
                break;
            }
        }
        //if entry doesn't exist we create new
        if (entry === null) {
            entry = new HashMap.Entry<K, V>(key, value);
            bucket.add(entry);
        }
        return previousValue;
    }

    public remove(key: K): V {
        let oldValue: V = null;
        let bucketIndex: number = this.calculateBucket(key.hashCode());
        let bucket: List<Map.Entry<K, V>> = this.buckets[bucketIndex];
        if (bucket !== null) {
            let entry: Map.Entry<K, V> = null;
            for (let i: number = 0; i < bucket.size(); i++) {
                entry = bucket.get(i);
                if (this.checkIfKeysAreSimilar(entry.getKey(), key)) {
                    oldValue = entry.getValue();
                    bucket.removeByIndex(i);
                    break;
                }
            }
            if (bucket.isEmpty()) {
                //Here we don't splice
                this.buckets[bucketIndex] = null;
            }
        }
        return oldValue;
    }

    public size(): number {
        let size: number = 0;
        let bucket: List<Map.Entry<K, V>>;
        for (let i: number = 0; i < this.capacity; i++) {
            bucket = this.buckets[i];
            if (bucket !== null) {
                size += bucket.size();
            }
        }
        return size;
    }

    public values(): Collection<V> {
        return new this.ValueCollection(this);
    }

    private iterator(): Iterator<Map.Entry<K, V>> {
        return new class implements Iterator<Map.Entry<K, V>> {

            private readonly map: HashMap<K, V>;

            private currentBucketIndex = -1;

            private currentEntryIndex: number = -1;

            private currentBucket: List<Map.Entry<K, V>> = null;

            private nextWasCalled = false;

            private hasNextWasCalled = false;

            constructor(map: HashMap<K, V>) {
                this.map = map;
            }

            public hasNext(): boolean {
                this.hasNextWasCalled = true;
                do {
                    if (this.currentBucket === null) {
                        this.currentBucket = this.getNextBucket();
                    }
                    if (this.currentBucket === null) {
                        return false;
                    }
                    if (this.currentEntryIndex + 1 >= this.currentBucket.size()) {
                        this.currentEntryIndex = -1;
                        this.currentBucket = null;
                    } else {
                        this.currentEntryIndex++;
                        return true;
                    }
                } while(true)
            }

            public next(): Map.Entry<K, V> {
                if (!this.hasNextWasCalled) {
                    if (!this.hasNext()) {
                        throw new NoSuchElementError(null);
                    }
                }
                this.hasNextWasCalled = false;
                this.nextWasCalled = true;
                return this.currentBucket.get(this.currentEntryIndex);
            }

            public remove(): void {
                if (!this.nextWasCalled) {
                    throw new IllegalStateError(null);
                }
                this.nextWasCalled = false;
                this.currentBucket.removeByIndex(this.currentEntryIndex);
                this.currentEntryIndex--;
                if (this.currentBucket.isEmpty()) {
                    this.map.buckets[this.currentBucketIndex] = null;
                    this.currentBucketIndex--;
                    this.currentBucket = null;
                }
            }

            private getNextBucket(): List<Map.Entry<K, V>> {
                for (let i: number = this.currentBucketIndex + 1; i < this.map.buckets.length; i++) {
                    if (this.map.buckets[i] !== null) {
                        this.currentBucketIndex = i;
                        return this.map.buckets[i];
                    }
                }
                return null;
            }

        }(this);
    }

    private resolveBucket(hashCode: number): List <Map.Entry < K, V>> {
        let bucketIndex = this.calculateBucket(hashCode);
        return this.buckets[bucketIndex];
    }

    private calculateBucket(hashCode: number): number {
        //hashCode can be negative
        return Math.abs(hashCode) % this.capacity;
    }

    /**
     * Returns true if hashCodes are equal and .equals returns true.
     */
    private checkIfKeysAreSimilar(key1: K, key2: K): boolean {
        if (key1.hashCode() !== key2.hashCode()) {
            return false;
        }
        if (key1.equals(key2)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Creates array and fill its with nulls, as Array.fill we can not use in NetBeans TypeScript plugin.
     */
    private newBucketsArray(capacity: number): List<Map.Entry<K, V>>[] {
        let result:List<Map.Entry<K, V>>[] = new Array(capacity);
        for (let i: number = 0; i < result.length; i++) {
            result[i] = null;
        }
        return result;
    }
}

export namespace HashMap {

    export class Entry<K, V> implements Map.Entry<K, V> {

        private readonly key: K;

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
            if (!(obj instanceof HashMap.Entry)) {
                return false;
            }
            let other: HashMap.Entry<K, V> = <HashMap.Entry<K, V>>obj;
            if (!this.key.equals(other.key)) {
                return false;
            }
            if (!this.value.equals(other.value)) {
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
            let result: number = 3;
            result = 31 * result + this.key.hashCode();
            result = 31 * result + this.value.hashCode();
            return result;
        }
    }
}
