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

import { Control } from './Control';
import { ObjectProperty } from 'script4jfx.base';
import { SimpleObjectProperty } from 'script4jfx.base';

export abstract class ComboBoxBase<T> extends Control {
    

    /**
     * The value of this ComboBox is defined as the selected item if the input is not editable, or if it is editable, 
     * the most recent user action: either the value input by the user, or the last selected item.
     */
    private value: ObjectProperty<T> = new SimpleObjectProperty();

    
    /**
     * Creates a default ComboBoxBase instance.
     */
    public constructor() {
        super();
    }
    
    /**
     * The value of this ComboBox is defined as the selected item if the input is not editable, or if it is editable, 
     * the most recent user action: either the value input by the user, or the last selected item.
     */
    public valueProperty(): ObjectProperty<T> {
        return this.value
    }

    
    /**
     * Sets the value of the property value.
     */
    public setValue​(value: T): void {
        this.value.set(value);
    }
    
    /**
     * Gets the value of the property value.
     */
    public getValue(): T {
        return this.value.get();
    }
    
}

