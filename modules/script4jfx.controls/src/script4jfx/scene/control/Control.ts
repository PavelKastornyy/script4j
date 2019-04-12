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

import { Region } from 'script4jfx.graphics';
import { ObjectProperty } from 'script4jfx.base';
import { SimpleObjectProperty } from 'script4jfx.base';

export abstract class Control extends Region {

//    /**
//     * The ContextMenu to show for this control.
//     */    
//    private contextMenu: ObjectProperty<ContextMenu> = null;
//
//    /**
//     * The ToolTip for this control.
//     */
//    private tooltip: ObjectProperty<Tooltip> = null;
//    
//    constructor() {
//        super();
//    }
//
//    /**
//     * The ContextMenu to show for this control.
//     */
//    public contextMenuProperty(): ObjectProperty<ContextMenu> {
//        if (this.contextMenu === null) {
//            this.contextMenu = new SimpleObjectProperty(null, this);
//        }
//        return this.contextMenu;
//    }
//
//    /**
//     * Gets the value of the property contextMenu.
//     */
//    public getContextMenu(): ContextMenu {
//        return this.contextMenu === null ? null : this.contextMenu.get();
//    }
//
//    /**
//     * Sets the value of the property contextMenu.
//     */
//    public setContextMenu​(value: ContextMenu): void {
//        this.contextMenuProperty().set(value);
//    }
//
//    /**
//     * The ToolTip for this control.
//     */    
//    public tooltipProperty(): ObjectProperty<Tooltip> {
//        if (this.tooltip === null) {
//            this.tooltip = new SimpleObjectProperty();
//        }
//        return this.tooltip;
//    }
//
//    /**
//     * Sets the value of the property tooltip.
//     */
//    public setTooltip​(value: Tooltip): void {
//        this.tooltipProperty().set(value);
//    }
//
//    /**
//     * Gets the value of the property tooltip.
//     */
//    public getTooltip(): Tooltip {
//        return this.tooltip === null ? null : this.tooltip.get();
//    }

}

