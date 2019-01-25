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


import { ChangeListener } from "./../value/ChangeListener";
import { Set } from "script4j.base";
import { Map } from "script4j.base";
import { HashMap } from "script4j.base";
import { HashSet } from "script4j.base";
import { ObservableValue } from "./../value/ObservableValue";
import { Property } from "./Property";
import { ReadOnlyProperty } from "./ReadOnlyProperty";
import { WritableValue } from "./../value/WritableValue";
import { IllegalArgumentError } from "script4j.base";

/**
 * Supports Multiple binding to different objects.
 * This class has all main logic and other Properties delegate operations to it.
 */
export class PropertyDelegate<T> implements Property<T>, WritableValue<T> {

    private bean: Object;

    private name: string;

    /**
     * These are listeners that were created somewhere else and which listen this property.
     */
    private externalListeners: Set<ChangeListener<T>> = new HashSet<ChangeListener<T>>();

    /**
     * These are listeners that were created by this property to listen other properties.
     */
    private internalForeignListenersByValue: Map<ObservableValue<T>, ChangeListener<T>> = new HashMap();

    /**
     * These are listeners that were created by this property to listen this property.
     */
    private internalSelfListenersByValue: Map<ObservableValue<T>, ChangeListener<T>> = new HashMap();

    /**
     * This is the value we bound to when there is unidirectional binding.
     */
    private unidirectionalBoundValue: ObservableValue<T> = null;

    /**
     * Value of the property.
     */
    private value: T;

    /**
     * We need reference to delegator as we pass it as observable to ChangeListeners.
     */
    private readonly delegator: ReadOnlyProperty<T>;

    constructor(delegator: Object) {
        this.delegator = <ReadOnlyProperty<T>> delegator;
    }

    public addListener(listener: ChangeListener<T>): void {
        this.externalListeners.add(listener);
    }

    public getValue(): T {
        return this.value;
    }

    public removeListener(listener: ChangeListener<T>): void {
        this.externalListeners.remove(listener);
    }

    /**
     * With unidirectional binding property can be bound only to one value, because property always
     * must be equal that value. However, if we bind to several values, then property can be not
     * equal to some of them -> it is impossible state.
     */
    public bind(observable: ObservableValue<T>): void {
        if (this.unidirectionalBoundValue !== null) {
            throw new IllegalArgumentError("Property has already unidirectional binding");
        }
        if (this.internalForeignListenersByValue.size() > 0) {
            throw new IllegalArgumentError("Property has already bidirectional binding");
        }
        this.unidirectionalBoundValue = observable;
        //we get that property value, because must be always equal to that property.
        this.setValue(this.unidirectionalBoundValue.getValue());
        //we create listener to get notification about following changes.
        let foreignListener: ChangeListener<T> = this.createInternalForeignListener();
        this.internalForeignListenersByValue.put(this.unidirectionalBoundValue, foreignListener);
        this.unidirectionalBoundValue.addListener(foreignListener);
    }

    public bindBidirectional(other: Property<T>): void {
        if (this.unidirectionalBoundValue !== null) {
            throw new IllegalArgumentError("Property has already unidirectional binding");
        }
        if (this.internalForeignListenersByValue.get(other) !== null) {
            throw new IllegalArgumentError("Property is already bound to that property");
        }
        //we get that property value, because must be always equal to that property.
        this.setValue(other.getValue());
        let foreignLister: ChangeListener<T> = this.createInternalForeignListener();
        this.internalForeignListenersByValue.put(other, foreignLister);
        other.addListener(foreignLister);
        let selfListener: ChangeListener<T> = this.createInternalSelfListener(other);
        this.internalSelfListenersByValue.put(other, selfListener);
    }

    public isBound(): boolean {
        if (this.unidirectionalBoundValue === null) {
            return false;
        } else {
            return true;
        }
    }

    public unbind(): void {
        if (this.unidirectionalBoundValue === null) {
            return;
        }
        let foreignListener: ChangeListener<T> = this.internalForeignListenersByValue.get(this.unidirectionalBoundValue);
        this.internalForeignListenersByValue.remove(this.unidirectionalBoundValue);
        this.unidirectionalBoundValue.removeListener(foreignListener);
        this.unidirectionalBoundValue = null;
    }

    /**
     * If we do p2.bindBidirectional(p3) then only p2.unbindBirectional(p3) works.
     * p3.unbindBidirectional(p2) won't work.
     */
    public unbindBidirectional(other: Property<T>): void {
        let foreignListener: ChangeListener<T> = this.internalForeignListenersByValue.get(other);
        if (foreignListener !== null) {
            this.internalForeignListenersByValue.remove(other);
            other.removeListener(foreignListener);
        }
        let selfListener: ChangeListener<T> = this.internalSelfListenersByValue.get(other);
        if (selfListener !== null) {
            this.internalSelfListenersByValue.remove(other);
        }
    }

    public setValue(value: T): void {
        let oldValue: T = this.value;
        this.value = value;
        this.externalListeners.forEach((listener) => {
            listener(this.delegator, oldValue, value);
        });
        this.internalSelfListenersByValue.values().forEach((listener) => {
            listener(this.delegator, oldValue, value);
        });
    }

    public getBean(): Object {
        return this.bean;
    }

    public setBean(bean: Object) {
        this.bean = bean;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    private createInternalForeignListener(): ChangeListener<T> {
        return (observable: ObservableValue<T>, oldValue: T, newValue: T) => {
            //no bind see ES6 var https://hackernoon.com/javascript-es6-arrow-functions-and-lexical-this-f2a3e2a5e8c4
            //we need to stop cyclic setting value
            if (!newValue.equals(this.getValue())) {
                this.setValue(newValue);
            }
        };
    }

    private createInternalSelfListener(other: Property<T>): ChangeListener<T> {
        return (observable: ObservableValue<T>, oldValue: T, newValue: T) => {
            //no bind see ES6 var https://hackernoon.com/javascript-es6-arrow-functions-and-lexical-this-f2a3e2a5e8c4
            //we need to stop cyclic setting value
            if (!newValue.equals(other.getValue())) {
                other.setValue(newValue);
            }
        };
    }
}
