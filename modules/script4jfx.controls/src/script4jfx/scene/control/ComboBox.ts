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

import { ComboBoxBase } from './ComboBoxBase';
import { ObservableList } from 'script4jfx.base';
import { ObjectProperty } from 'script4jfx.base';
import { Callback } from 'script4jfx.base';
import { SimpleObjectProperty } from 'script4jfx.base';
import { SimpleNumberProperty } from 'script4jfx.base';
import { NumberProperty } from 'script4jfx.base';
import { Objects } from 'script4j.base';
import { StringConverter } from 'script4jfx.base';
import { ChangeListener } from 'script4jfx.base';
import { ObservableValue } from 'script4jfx.base';
import { SingleSelectionModel } from './SingleSelectionModel';
import { ComboBoxListViewSkin } from './skin/ComboBoxListViewSkin';
import { ListChangeListener } from 'script4jfx.base';

export class ComboBox<T> extends ComboBoxBase<T> {

    private static SingleSelectionModelImpl = class<T> extends SingleSelectionModel<T> {
        
        private comboBox: ComboBox<T> = null;
        
        public constructor(comboBox: ComboBox<T>) {
            super();
            this.comboBox = comboBox;
        }
        
        public selectAt(index: number): void {
            super.selectAt(index);
            (<ComboBoxListViewSkin<T>> this.comboBox.getSkin()).selectAt(index);
        }
        
        public clearSelection(index?: number): void {
            super.clearSelection(index);
            (<ComboBoxListViewSkin<T>> this.comboBox.getSkin()).clearSelection();
        }
        
        protected getItemCount(): number {
            return this.comboBox.getItems().size();
        }
        
        protected getModelItem​(index: number): T {
            return this.comboBox.getItems().get(index);
        }
    };
    
    /**
     * Providing a custom cell factory allows for complete customization of the rendering of items in the ComboBox.
     */    
    //private cellFactory: ObjectProperty<Callback<ListView<T>,​ListCell<T>>>;
    private cellFactory: ObjectProperty<Callback<T, string>> = new SimpleObjectProperty();

    /**
     * Converts the user-typed input (when the ComboBox is editable) to an object of type T, such that the input may be 
     * retrieved via the value property.
     */
    private converter: ObjectProperty<StringConverter<T>> = new SimpleObjectProperty();

    /**
     * The list of items to show within the ComboBox popup.
     */
    private items: ObjectProperty<ObservableList<T>> = new SimpleObjectProperty();

    /**
     * The selection model for the ComboBox.
     */
    private selectionModel: ObjectProperty<SingleSelectionModel<T>> = new SimpleObjectProperty();

    /**
     * The maximum number of rows to be visible in the ComboBox popup when it is showing.
     */
    private visibleRowCount: NumberProperty = new SimpleNumberProperty();
    
    /**
     * The listener that controls adding/removing items to obervable collection.
     */
    private itemsChangeListener: ListChangeListener<T> = ListChangeListener.lambda((change) => {
        while (change.next()) {
           if (change.wasRemoved()) {
               for (let pos: number = change.getFrom(); pos < change.getTo(); pos++)     {
                   (<ComboBoxListViewSkin<T>> this.getSkin()).removeItemAt(pos);
               }
            }
            if (change.wasAdded()) {
                let index: number = 0;
                for (let pos: number = change.getFrom(); pos < change.getTo(); pos++)     {
                    (<ComboBoxListViewSkin<T>> this.getSkin()).addItemAt(pos, change.getAddedSubList().get(index++));
                }
            }
        }
    });
    
    private updateSelectionModel: boolean = true;
    
    /**
     * Item can be changed via selectionModel and via value.
     */
    private selectedItemChangeListener: ChangeListener<T> = ChangeListener.lambda((observable: ObservableValue<T>, 
            oldValue: T, newValue: T) => {
        try {
            this.updateSelectionModel = false;
            this.setValue(newValue);
        } finally {
            this.updateSelectionModel = true;
        }
    });

    /**
     * Creates a default ComboBox instance with the provided items list and a default selection model.
     */    
    constructor(items?: ObservableList<T>) {
        super();
        this.setCellFactory(Callback.lambda((obj: T): string => {
            if (obj !== null) {
                return obj.toString();
            } else {
                return "";
            }
        }));
        this.cellFactoryProperty().addListener(ChangeListener.lambda((observable: ObservableValue<Callback<T, string>>, 
                oldValue: Callback<T, string>, newValue: Callback<T, string>) => {
            (<ComboBoxListViewSkin<T>> this.getSkin()).rerenderItems(this.getItems());
        }));
        this.itemsProperty().addListener(ChangeListener.lambda((observable: ObservableValue<ObservableList<T>>, 
                oldValue: ObservableList<T>, newValue: ObservableList<T>) => {
            if (oldValue !== null) {
                oldValue.removeListener(this.itemsChangeListener);
            }
            if (newValue !== null) {
                newValue.addListener(this.itemsChangeListener);
            }
            (<ComboBoxListViewSkin<T>> this.getSkin()).rerenderItems(this.getItems());
        }));
        this.selectionModelProperty().addListener(ChangeListener.lambda((
                observable: ObservableValue<SingleSelectionModel<T>>, oldValue: SingleSelectionModel<T>, 
                newValue: SingleSelectionModel<T>) => {
            if (oldValue !== null) {
                oldValue.selectedItemProperty().removeListener(this.selectedItemChangeListener);
            }
            if (newValue !== null) {
                newValue.selectedItemProperty().addListener(this.selectedItemChangeListener);
            }
            if (this.getItems() !== null) {
                (<ComboBoxListViewSkin<T>> this.getSkin()).rerenderItems(this.getItems());
            }
        }));
        this.setSelectionModel(new ComboBox.SingleSelectionModelImpl(this));
        this.valueProperty().addListener(ChangeListener.lambda((observable: ObservableValue<T>, 
            oldValue: T, newValue: T) => {
            if (this.updateSelectionModel) {
                this.getSelectionModel().select(newValue);
            }
        }));
        this.visibleRowCountProperty().addListener(ChangeListener.lambda((observable: ObservableValue<number>, 
                oldValue: number, newValue: number) => {
            (<ComboBoxListViewSkin<T>> this.getSkin()).setSize(newValue);
        }));
    }
    
    /**
     * Providing a custom cell factory allows for complete customization of the rendering of items in the ComboBox.
     */
    cellFactoryProperty(): ObjectProperty<Callback<T, string>> {
        return this.cellFactory;
    }

    /**
     * Converts the user-typed input (when the ComboBox is editable) to an object of type T, such that the input may be 
     * retrieved via the value property.
     */
    converterProperty(): ObjectProperty<StringConverter<T>> {
        return this.converter;
    }

    /**
     * Gets the value of the property cellFactory.
     */
    getCellFactory(): Callback<T, string> {
        return this.cellFactory.get();
    }
    
    /**
     * Gets the value of the property converter.
     */
    getConverter(): StringConverter<T> {
        return this.converter.get();
    }
    
    /**
     * Gets the value of the property items.
     */
    getItems(): ObservableList<T> {
        return this.items.get();
    }
    
    /**
     * Gets the value of the property selectionModel.
     */
    getSelectionModel(): SingleSelectionModel<T> {
        return this.selectionModel.get();
    }
    
    /**
     * Gets the value of the property visibleRowCount.
     */
    getVisibleRowCount(): number {
        return this.visibleRowCount.get();
    }
    
    /**
     * The list of items to show within the ComboBox popup.
     */
    itemsProperty(): ObjectProperty<ObservableList<T>> {
        return this.items;
    }

    /**
     * The selection model for the ComboBox.
     */
    selectionModelProperty(): ObjectProperty<SingleSelectionModel<T>> {
        return this.selectionModel;
    }
    
    /**
     * Sets the value of the property cellFactory.
     */
    setCellFactory​(value: Callback<T, string>): void {
        this.cellFactory.set(value);
    }
    
    /**
     * Sets the value of the property converter.
     */
    setConverter​(value: StringConverter<T>): void {
        this.converter.set(value);
    }
    
    /**
     * Sets the value of the property items.
     */
    setItems​(value: ObservableList<T>): void {
        this.items.set(value);
    }
    
    /**
     * Sets the value of the property selectionModel.
     */
    setSelectionModel​(value: SingleSelectionModel<T>): void {
        this.selectionModel.set(value);
    }
    
    /**
     * Sets the value of the property visibleRowCount.
     */
    setVisibleRowCount​(value: number): void {
        this.visibleRowCount.set(value);
    }
    
    /**
     * The maximum number of rows to be visible in the ComboBox popup when it is showing.
     */
    visibleRowCountProperty(): NumberProperty {
        return this.visibleRowCount;
    }
    
}

