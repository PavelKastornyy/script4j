/*
 * Copyright (c) 2018-2019 Pavel Kastornyy. All rights reserved.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.
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

import { PropertyDelegate } from './../../../../src/script4jfx/internal/beans/property/PropertyDelegate';
import { ChangeListener } from "./../../../../src/script4jfx/beans/value/ChangeListener";
import { ObservableValue } from "./../../../../src/script4jfx/beans/value/ObservableValue";
import { Property } from "./../../../../src/script4jfx/beans/property/Property";

class PropertyDelegateChild<T> extends PropertyDelegate<T> {

    public constructor(del: Object) {
        super(del);
    }

    public addListener(listener: ChangeListener<T>): void {
        super.addListener(listener);
    }

    public get(): T {
        return super.get();
    }

    public set(value: T): void {
        super.set(value);
    }

    public removeListener(listener: ChangeListener<T>): void {
        super.removeListener(listener);
    }

    public bind(observable: ObservableValue<T>): void {
        super.bind(observable);
    }

    public bindBidirectional(other: Property<T>): void {
        super.bindBidirectional(other)
    }

    public isBound(): boolean {
        return super.isBound();
    }

    public unbind(): void {
        super.unbind();
    }

    public unbindBidirectional(other: Property<T>): void {
        super.unbindBidirectional(other);
    }

    public fireValueChangedEvent(): void {
        super.fireValueChangedEvent();
    }
}

