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

import { SelectionModel } from './SelectionModel';
import { Objects } from 'script4j.base';

export abstract class SingleSelectionModel<T> extends SelectionModel<T> {
    
    /**
     * In the SingleSelectionModel, this method is functionally equivalent to calling select(index), as only one selection is allowed at a time.
     */
    public clearAndSelect​(index: number): void {
        this.clearSelection(index);
        this.selectAt(index);
    }

    /**
     * Clears the selection model of all selected indices.
     */
    public clearSelection(index?: number): void {
        if (index !== undefined) {
            if (index === this.getSelectedIndex()) {
                this.setSelectedIndex(-1);
                this.setSelectedItem(null);
            }
        } else {
            this.setSelectedIndex(-1);
            this.setSelectedItem(null);
        }
    }

    /**
     * This method is available to test whether there are any selected indices/items.
     */
    public isEmpty(): boolean {
        return this.getSelectedIndex() === -1 ? true : false;
    }

    /**
     * This method will return true if the given index is the currently selected index in this SingleSelectionModel.
     */
    public isSelected​(index: number): boolean {
        return this.getSelectedIndex() === index ? true : false;
    }

    /**
     * Selects the given index.
     */
    public selectAt(index: number): void {
        if (index < this.getItemCount()) {
            this.setSelectedIndex(index);
            this.setSelectedItem(this.getModelItem(index));
        }
    }

    /**
     * Selects the index for the first instance of given object in the underlying data model.
     */
    public select(obj: T): void {
        this.clearSelection();
        for (let i: number = 0; i < this.getItemCount(); i++) {
            if (Objects.equals(obj, this.getModelItem(i))) {
                this.selectAt(i);
                break;
            }
        }
    }

    /**
     * Selects the first index.
     */
    public selectFirst(): void {
        if (this.getItemCount() > 0) {
            this.selectAt(0);
        }
    }

    /**
     * Selects the last index.
     */
    public selectLast(): void {
        if (this.getItemCount() > 0) {
            this.selectAt(this.getItemCount() - 1);
        }
    }

    /**
     * Selects the next index.
     */
    public selectNext(): void {
        if (this.getItemCount() > 0) {
            let current: number = this.getSelectedIndex();
            current++;
            if (current < this.getItemCount()) {
                this.selectAt(current);
            }
        }
    }

    /**
     * Selects the previous index.
     */
    public selectPrevious(): void {
        if (this.getItemCount() > 0) {
            let current: number = this.getSelectedIndex();
            current--;
            if (current >= 0) {
                this.selectAt(current);
            }
        }
    }
    
    /**
     * Gets the number of items available for the selection model.
     */
    protected abstract getItemCount(): number;

    /**
     * Gets the data model item associated with a specific index.
     */
    protected abstract getModelItem​(index: number): T;    

}
