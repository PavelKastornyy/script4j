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

import { ComboBoxPopupControl } from './ComboBoxPopupControl';
import { ComboBox } from './../ComboBox';
import { ObservableList } from 'script4jfx.base';
import { Callback } from 'script4jfx.base';
import 'jquery';

export class ComboBoxListViewSkin<T> extends ComboBoxPopupControl<T> {
    
    /**
     * Creates a new ComboBoxListViewSkin instance, installing the necessary child nodes into the Control children list, 
     * as well as the necessary input mappings for handling key, mouse, etc events.
     */
    public constructor ​(control: ComboBox<T>, element: HTMLElement) {
        super(control, element);
    }
    
    public getDefaultCssClass(): string {
        return "fx-combo-box";
    }
    
    public setSize(size: number): void {
        this.getElement().size = size;
    }
    
    public rerenderItems(items: ObservableList<T>): void {
        let $select: JQuery = $(this.getElement());
        $select.empty();
        for (let i: number = 0; i < items.size(); i++) {
            $select
                .append($("<option></option>")
                //.attr("value",key)
                .text((<ComboBox<T>> this.getSkinnable()).getCellFactory().call(items.get(i)))); 
        }
    }
    
    public addItemAt(index: number, item: T): void {
        const $select: JQuery = $(this.getElement());
        const cellFactory: Callback<T, string> = (<ComboBox<T>> this.getSkinnable()).getCellFactory();
        $select.eq(index).before($("<option></option>").val("").text(cellFactory.call(item)));
    }
    
    public removeItemAt(index: number): void {
        const $select: JQuery = $(this.getElement());
        $select.eq(index).remove();
    }
    
    public initialize(): void {
        super.initialize();
        const $select: JQuery = $(this.getElement());
        let that: ComboBoxListViewSkin<T> = this;
        $select.on('change', function (e) {
            that.setChangeBlocked(true);
            (<ComboBox<T>> that.getSkinnable()).getSelectionModel().selectAt(that.getElement().selectedIndex);
            that.setChangeBlocked(false);
        });
        
    }
    
    public selectAt(index: number): void {
        if (!this.isChangeBlocked()) {
            this.getElement().selectedIndex = index; 
        }
    }
    
    public clearSelection(): void {
        this.selectAt(-1);
    }
    
    public getElement(): HTMLSelectElement {
        return <HTMLSelectElement>super.getElement();
    }
    
    protected createDefaultElement(): HTMLElement {
        return $('<select></select>')[0];
    }   

}

