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

import { Styleable } from './../css/Styleable';
import { EventTarget } from 'script4jfx.base';
import { EventDispatchChain } from 'script4jfx.base';
import { EventDispatcher } from 'script4jfx.base';
import { ObjectProperty } from 'script4jfx.base';
import { SimpleObjectProperty } from 'script4jfx.base';
import { FXCollections } from 'script4jfx.base';
import { ReadOnlyObjectProperty } from 'script4jfx.base';
import { ReadOnlyObjectWrapper } from 'script4jfx.base';
import { StringProperty } from 'script4jfx.base';
import { SimpleStringProperty } from 'script4jfx.base';
import { ObservableValue } from 'script4jfx.base';
import { Parent } from './Parent';
import 'jquery';

export abstract class Node implements Styleable, EventTarget {

    /**
     * Specifies the event dispatcher for this node.
     */
    private readonly eventDispatcher: ObjectProperty<EventDispatcher> = new SimpleObjectProperty();
    
    /**
     * Html element for this Node. No setter for this field!
     */
    private readonly element: ReadOnlyObjectWrapper<HTMLElement> = new ReadOnlyObjectWrapper();
    
    /**
     * The parent of this Node.
     */
    private readonly parent: ReadOnlyObjectWrapper<Parent> = new ReadOnlyObjectWrapper();
    
    /**
     * The id of this Node.
     */
    private readonly id: StringProperty = new SimpleStringProperty();

    /**
     * Sets the element, taken from buildHtmlElement().
     */
    constructor() {
        this.element.set(this.buildElement());
        this.id.addListener((observable: ObservableValue<string>, oldValue: string, newValue: string) => {
            $(this.getElement()).attr("id", newValue);
        });
    }

    /**
     * Gets the value of the property eventDispatcher.
     */
    public getEventDispatcher(): EventDispatcher {
        return this.eventDispatcher.get();
    }
    
    /**
     * Sets the value of the property eventDispatcher.
     */
    public setEventDispatcher​(value: EventDispatcher): void {
        this.eventDispatcher.set(value);
    }    

    /**
     * Specifies the event dispatcher for this node.
     */    
    public eventDispatcherProperty(): ObjectProperty<EventDispatcher> {
        return this.eventDispatcher;
    }

    /**
     * Gets the value of the property element.
     */
    public getElement(): HTMLElement {
        return this.element.get();
    }

    /**
     * Specifies the element for this node.
     */    
    public elementProperty(): ReadOnlyObjectProperty<HTMLElement> {
        return this.element.getReadOnlyProperty();
    }    
    
    /**
     * The parent of this Node. If this Node has not been added to a scene graph, then parent will be null.
     */
    public parentProperty(): ReadOnlyObjectProperty<Parent> {
        return this.parent.getReadOnlyProperty();
    }

    /**
     * Gets the value of the property parent.
     */    
    public getParent(): Parent {
        return this.parent.get();
    }

    public buildEventDispatchChain​(tail: EventDispatchChain) {
        let o = FXCollections.observableMap(null);
    }
    
    /**
     * The id of this Node.
     */    
    public idProperty(): StringProperty {
        return this.id;
    }

    /**
     * Sets the value of the property id.
     */    
    public setId​(value: string): void {
        this.id.set(value);
    }

    /**
     * The id of this Node.
     */    
    public getId(): string {
        return this.id.get();
    }

    /**
     * This method is protected because there is no package scope in TS.
     */
    protected setParent(value: Parent): void {
        this.parent.set(value);
    }
    
    protected abstract buildElement(): HTMLElement;
}