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
import { List } from "script4j.base";
import { Map } from "script4j.base";
import { HashMap } from "script4j.base";
import { ArrayList } from "script4j.base";
import { Consumer } from "script4j.base";
import { ObservableValue } from "./../../../beans/value/ObservableValue";
import { Property } from "./../../../beans/property/Property";
import { ReadOnlyProperty } from "./../../../beans/property/ReadOnlyProperty";
import { IllegalArgumentError } from "script4j.base";
import { Objects } from "script4j.base";
import { StringConverter } from "./../../../util/StringConverter";
import { StringProperty } from "./../../../beans/property/StringProperty";


export class ReadOnlyPropertyDelegate<T> { 

    /**
     * These are listeners that were created somewhere else and which listen this property.
     */
    private externalListeners: List<ChangeListener<T>> = new ArrayList<ChangeListener<T>>();

    private previousValue: T = null;

    /**
     * This property is delegator of this delegate. We need reference to property as we pass it as observable to 
     * ChangeListeners.
     */
    private readonly property: ReadOnlyProperty<T> = null;
    
    public constructor(property: ReadOnlyProperty<T>) {
        this.property = <Property<T>> property;
    }

    public addListener(listener: ChangeListener<T>): void {
        this.externalListeners.add(listener);
    }

    public removeListener(listener: ChangeListener<T>): void {
        this.externalListeners.remove(listener);
    }

    public fireValueChangedEvent(): void {
        const savedPrivousValue: T = this.previousValue;
        const currentValue: T = this.property.getValue();
        this.previousValue = currentValue;
        if (!Objects.equals(savedPrivousValue, currentValue)) {
            let consumer: Consumer<ChangeListener<T>> = Consumer.lambda((listener) => {
                listener.changed(this.property, savedPrivousValue, currentValue);
            });
            this.externalListeners.forEach(consumer);
        }
    }
    
    protected getExternalListeners(): List<ChangeListener<T>> {
        return this.externalListeners;
    }
    
    protected getPreviousValue(): T {
        return this.previousValue;
    }
    
    protected getProperty(): ReadOnlyProperty<T> {
        return this.property;
    }
    
}


