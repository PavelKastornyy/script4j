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

import { ChangeListener } from "./../../../beans/value/ChangeListener";
import { Set } from "script4j.base";
import { Map } from "script4j.base";
import { HashMap } from "script4j.base";
import { HashSet } from "script4j.base";
import { Consumer } from "script4j.base";
import { ObservableValue } from "./../../../beans/value/ObservableValue";
import { Property } from "./../../../beans/property/Property";
import { ReadOnlyProperty } from "./../../../beans/property/ReadOnlyProperty";
import { IllegalArgumentError } from "script4j.base";
import { Objects } from "script4j.base";
import { StringConverter } from "./../../../util/StringConverter";
import { StringProperty } from "./../../../beans/property/StringProperty";
import { ReadOnlyPropertyDelegate } from './ReadOnlyPropertyDelegate';

/**
 * Supports Multiple binding to different objects.
 * This class has all main logic and other Properties delegate operations to it.
 *
 */
export class PropertyDelegate<T> extends ReadOnlyPropertyDelegate<T> { 

    /**
     * These are listeners that were created by this property to listen other properties.
     */
    private internalListenersByValue: Map<ObservableValue<T>, ChangeListener<T>> = new HashMap();

    /**
     * This is the value we bound to when there is unidirectional binding.
     */
    private unidirectionalBoundValue: ObservableValue<T> = null;

    /**
     * Value of the property.
     */
    private currentValue: T = null;

    /**
     * Only one of two properties (XProperty, but not StringProperty) has this converter.
     */
    private converter: StringConverter<T> = null;

    public constructor(property: Property<T>, initialValue?: T) {
        super(property);
        if (initialValue !== undefined) {
            this.currentValue = initialValue;
        }
    }

    public static bindBidirectional<T>(prop1: Property<T| string>, prop2: Property<T>, 
            converter?: StringConverter<T>): void {
        let delegate1: PropertyDelegate<T| string> = PropertyDelegate.getDelegate(prop1);
        let delegate2: PropertyDelegate<T> = PropertyDelegate.getDelegate(prop2);
        if (converter !== undefined) {
            delegate2.setConverter(converter);
        }
        delegate1.bindBidirectional(prop2);
    }

    public static unbindBidirectional<T>(prop1: Property<T>, prop2: Property<T>): void {
        PropertyDelegate.getDelegate(prop1).unbindBidirectional(prop2);
    }

    protected static getDelegate<T>(prop: ReadOnlyProperty<T>) {
        return <PropertyDelegate<T>>(<any> prop).delegate;
    }

    public get(): T {
        return this.currentValue;
    }

    public set(value: T): void {
        if (value === undefined) {
            throw new IllegalArgumentError("Value is undefined");
        }
        this.currentValue = value;
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
        if (this.internalListenersByValue.size() > 0) {
            throw new IllegalArgumentError("Property has already bidirectional binding");
        }
        this.unidirectionalBoundValue = observable;
        //we get that property value, because must be always equal to that property.
        this.set(this.unidirectionalBoundValue.getValue());
        //we create listener to get notification about following changes.
        let foreignListener: ChangeListener<T> = this.createInternalListener();
        this.internalListenersByValue.put(this.unidirectionalBoundValue, foreignListener);
        this.unidirectionalBoundValue.addListener(foreignListener);
    }

    public bindBidirectional(other: Property<T>): void {
        if (this.unidirectionalBoundValue !== null) {
            throw new IllegalArgumentError("Property has already unidirectional binding");
        }
        if (this.internalListenersByValue.get(other) !== null) {
            throw new IllegalArgumentError("Property is already bound to that property");
        }
        //we get that property value, because must be always equal to that property.
        let convertedValue: T = this.convertValue(other, other.getValue());
        this.set(convertedValue);
        this.doBindBidirectional(other);
        //now we do the same from the side of other property
        let otherDelegate: PropertyDelegate<T> = PropertyDelegate.getDelegate(other);
        otherDelegate.doBindBidirectional(this.getProperty());
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
        let foreignListener: ChangeListener<T> = this.internalListenersByValue.remove(this.unidirectionalBoundValue);
        this.unidirectionalBoundValue.removeListener(foreignListener);
        this.unidirectionalBoundValue = null;
    }

    /**
     * If we do p2.bindBidirectional(p3) then both p2.unbindBirectional(p3) works and p3.unbindBidirectional(p2) works.
     */
    protected unbindBidirectional(other: Property<T>): void {
        //removing the listener which listens other
        this.doUnbindBidirectional(other);
        //removing the listener which listens this
        let otherDelegate: PropertyDelegate<T> = PropertyDelegate.getDelegate(other);
        otherDelegate.doUnbindBidirectional(this.getProperty());
    }

    protected getProperty(): Property<T> {
        return <Property<T>>super.getProperty();
    }    

    private createInternalListener(): ChangeListener<T> {
        return ChangeListener.lambda<any>((observable: ObservableValue<T>, oldValue: T, newValue: T) => {
            //no bind see ES6 var https://hackernoon.com/javascript-es6-arrow-functions-and-lexical-this-f2a3e2a5e8c4
            //we need to stop cyclic setting value
            let newConvertedValue: T = this.convertValue(<ReadOnlyProperty<T>>observable, newValue);
            this.getProperty().setValue(newConvertedValue);
        });
    }

    private doBindBidirectional(other: ReadOnlyProperty<T>) {
        let foreignListener: ChangeListener<T> = this.createInternalListener();
        this.internalListenersByValue.put(other, foreignListener);
        other.addListener(foreignListener);
    }

    private doUnbindBidirectional(other: ReadOnlyProperty<T>) {
        let foreignListener: ChangeListener<T> = this.internalListenersByValue.remove(other);
        if (foreignListener !== null) {
            other.removeListener(foreignListener);
        }
    }
    
    private getConverter(): StringConverter<T> {
        return this.converter;
    }
    
    private setConverter(converter: StringConverter<T>): void {
        this.converter = converter;
    }
    
    private convertValue(other: ReadOnlyProperty<T>, value: T): T {
        let otherDelagate: PropertyDelegate<T> = PropertyDelegate.getDelegate(other);
        if (this.getProperty() instanceof StringProperty) {
            if (otherDelagate.getConverter() === null) {
                return value;
            } else {
                return <any> otherDelagate.getConverter().toString(value);
            }
            
        } else if (other instanceof StringProperty) {
            if (this.getConverter() === null) {
                return value;
            } else {
                return <any> this.getConverter().fromString(<any>value);
            }
        } else {
            //if there is no string property at all
            return value;
        }
    }
}
