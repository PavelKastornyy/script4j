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

import { ReadOnlyNumberProperty } from 'script4jfx.base';
import { ReadOnlyObjectProperty } from 'script4jfx.base';
import { ReadOnlyNumberWrapper } from 'script4jfx.base';
import { ReadOnlyObjectWrapper } from 'script4jfx.base';


export abstract class SelectionModel<T> {
    
    private selectedIndex: ReadOnlyNumberWrapper = new ReadOnlyNumberWrapper(-1, this);
    
    private selectedItem: ReadOnlyObjectWrapper<T> = new ReadOnlyObjectWrapper(null, this);

    /**
     * A method that clears any selection prior to setting the selection to the given index.
     */    
    public abstract clearAndSelect​(index: number): void;

    /**
     * Clears the selection model of all selected indices.
     */
    public abstract clearSelection(): void;

    /**
     * This method will clear the selection of the item in the given index.
     */
    public abstract clearSelection​(index: number): void;

    /**
     * Returns the integer value indicating the currently selected index in this model.
     */
    public getSelectedIndex(): number {
        return this.selectedIndex.get();
    }

    /**
     * Returns the currently selected object (which resides in the selected index position).
     */
    public getSelectedItem(): T {
        return this.selectedItem.get();
    }

    /**
     * This method is available to test whether there are any selected indices/items.
     */
    public abstract isEmpty(): boolean;

    /**
     * Convenience method to inform if the given index is currently selected in this SelectionModel.
     */
    public abstract isSelected​(index: number): boolean;

    /**
     * This will select the given index in the selection model, assuming the index is within the valid range (i.e.
     */
    public abstract selectAt​(index: number): void;

    /**
     * This method will attempt to select the index that contains the given object.
     */
    public abstract select​(obj: T): void;

    /**
     * Refers to the selected index property, which is used to indicate the currently selected index value in the selection model.
     */
    public selectedIndexProperty(): ReadOnlyNumberProperty {
        return this.selectedIndex.getReadOnlyProperty();
    }
    
    /**
     * Refers to the selected item property, which is used to indicate the currently selected item in the selection model.
     */
    public selectedItemProperty(): ReadOnlyObjectProperty<T> {
        return this.selectedItem.getReadOnlyProperty();
    }   

    /**
     * This method will attempt to select the first index in the control.
     */
    public abstract selectFirst(): void;

    /**
     * This method will attempt to select the last index in the control.
     */
    public abstract selectLast(): void;

    /**
     * This method will attempt to select the index directly after the current focused index.
     */
    public abstract selectNext(): void;

    /**
     * This method will attempt to select the index directly before the current focused index.
     */
    public abstract selectPrevious(): void;

    /**
     * Sets the value of the property selectedIndex.
     */
    protected setSelectedIndex​(value: number): void {
        this.selectedIndex.set(value);
    }

    /**
     * Sets the value of the property selectedItem.
     */
    protected setSelectedItem​(value: T): void {
        this.selectedItem.set(value);
    }

}
