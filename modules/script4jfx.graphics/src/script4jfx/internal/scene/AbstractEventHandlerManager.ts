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

import { KeyEvent } from './../../scene/input/KeyEvent';
import { EventHandler } from 'script4jfx.base';
import { List } from 'script4j.base';
import { Map } from 'script4j.base';
import { HashMap } from 'script4j.base';
import { ArrayList } from 'script4j.base';
import { ObjectProperty } from 'script4jfx.base';
import { ObservableValue } from 'script4jfx.base';
import { EventType } from 'script4jfx.base';
import { SimpleObjectProperty } from 'script4jfx.base';
import { IllegalStateError } from 'script4j.base';
import { EventHandlerListener } from './EventHandlerListener';

export abstract class AbstractEventHandlerManager {
    
    /**
     * These are types of handlers that are added via addEventHandler();
     */
    private multipleEventHandlersByType: Map<EventType<any>, List<EventHandler<any>>> = null;
    
    /**
     * These are types of handlers that are added via setOnXXX();
     */
    private singleEventHandlersByType: Map<EventType<any>, EventHandler<any>> = null;
    
    /**
     * Return either Scene or Node that contains this helper.
     */
    private readonly bean: Object;
    
    /**
     * We use listener but not properties for performance reasons.
     */
    private handlerListener: EventHandlerListener = null;
    
    constructor(bean: Object) {
        this.bean = bean;
    }
    
    public getBean() {
        return this.bean;
    }
    
    public getSingleEventHandlersByType(): Map<EventType<any>, EventHandler<any>> {
        return this.singleEventHandlersByType;
    }
    
    public getMultipleEventHandlersByType(): Map<EventType<any>, List<EventHandler<any>>> {
        return this.multipleEventHandlersByType;
    }
    
    public setHandlerListener(listener: EventHandlerListener) {
        this.handlerListener = listener;
    }
    
    public getHandlerListener() {
        return this.handlerListener;
    }
    
    public createOnKeyReleased(): ObjectProperty<EventHandler<KeyEvent>> {
        return this.createEventProperty(KeyEvent.KEY_RELEASED);
    }
    
    public createOnKeyPressed(): ObjectProperty<EventHandler<KeyEvent>> {
        return this.createEventProperty(KeyEvent.KEY_PRESSED);
    }
    
    public createOnKeyTyped(): ObjectProperty<EventHandler<KeyEvent>> {
        return this.createEventProperty(KeyEvent.KEY_TYPED);
    }
    
    /**
     * This method is called in addEventHandler.
     */
    public addMultipleEventHandlerByType(eventType: EventType<any>, handler: EventHandler<any>): void {
        if (this.multipleEventHandlersByType === null) {
            this.multipleEventHandlersByType = new HashMap<EventType<any>, List<EventHandler<any>>>();
        }
        let handlers: List<EventHandler<any>> = this.multipleEventHandlersByType.get(eventType);
        if (handlers === null) {
            handlers = new ArrayList<EventHandler<any>>();
            this.multipleEventHandlersByType.put(eventType, handlers);
        }
        if (handlers.add(handler)) {
            this.doOnHandlerWasAdded(eventType, handler);
        }
    }
    
    /**
     * This method is called in removeEventHandler.
     */
    public removeMultipleEventHandlerByType(eventType: EventType<any>, handler: EventHandler<any>): void {
        if (this.multipleEventHandlersByType === null) {
            return;
        }
        let handlers: List<EventHandler<any>> = this.multipleEventHandlersByType.get(eventType);
        if (handlers === null) {
            return;
        }
        if (handlers.remove(handler)) {
            this.doOnHandlerWasRemoved(eventType, handler);
        }
        if (handlers.isEmpty()) {
            this.multipleEventHandlersByType.remove(eventType);
        }
        if (this.multipleEventHandlersByType.isEmpty()) {
            this.multipleEventHandlersByType = null;
        }
    }
    
    /**
     * This method is called after new handler was added.
     */
    protected doOnHandlerWasAdded(eventType: EventType<any>, handler: EventHandler<any>): void {
        if (this.handlerListener !== null) {
            this.handlerListener.handlerWasAdded(eventType, this);
        }
    }
    
    /**
     * This method is called after one handler was removed.
     */
    protected doOnHandlerWasRemoved(eventType: EventType<any>, handler: EventHandler<any>): void {
        if (this.handlerListener !== null) {
            this.handlerListener.handlerWasRemoved(eventType, this);
        }
    }
    
    /**
     * This method is called after one handler was replaced by another.
     */
    protected doOnHandlerWasReplaced(eventType: EventType<any>, oldHandler: EventHandler<any>, 
            newHandler: EventHandler<any>): void {
        //no logic yet        
    }
    
    private createEventProperty(eventType: EventType<any>): ObjectProperty<EventHandler<any>>  {
        const prop: ObjectProperty<EventHandler<any>> =  
                new SimpleObjectProperty<EventHandler<any>>(null, this.bean);
        prop.addListener((observable: ObservableValue<EventHandler<any>>, oldHandler: EventHandler<any>, 
                newHandler: EventHandler<any>) => {
                if (newHandler !== null && oldHandler === null) {
                    this.addSingleEventHandlerByType(eventType, newHandler);
                } else if (newHandler === null && oldHandler !== null) {
                    this.removeSingleEventHandlerByType(eventType);
                //there can be situation when null is set to null
                } else if (newHandler !== null && oldHandler !== null) {
                    this.replaceSingleEventHandlerByType(eventType, newHandler);
                }
            });
        return prop;
    }    
    
    private addSingleEventHandlerByType(eventType: EventType<any>, handler: EventHandler<any>): void {
        if (this.singleEventHandlersByType === null) {
            this.singleEventHandlersByType = new HashMap<EventType<any>, EventHandler<any>>();
        }
        let previousSize = this.singleEventHandlersByType.size();
        this.singleEventHandlersByType.put(eventType, handler);
        if (this.singleEventHandlersByType.size() > previousSize) {
            this.doOnHandlerWasAdded(eventType, handler);
        }
    }
    
    private removeSingleEventHandlerByType(eventType: EventType<any>): void {
        if (this.singleEventHandlersByType === null) {
            return;
        }
        const previousSize = this.singleEventHandlersByType.size();
        const handler: EventHandler<any> = this.singleEventHandlersByType.remove(eventType);
        if (this.singleEventHandlersByType.size() < previousSize) {
            this.doOnHandlerWasRemoved(eventType, handler);
        }
        if (this.singleEventHandlersByType.isEmpty()) {
            this.singleEventHandlersByType = null;
        }
    }
    
    private replaceSingleEventHandlerByType(eventType: EventType<any>, newHandler: EventHandler<any>): void {
        if (this.singleEventHandlersByType === null) {
            return;
        }
        let previousSize = this.singleEventHandlersByType.size();
        let oldHandler: EventHandler<any> = this.singleEventHandlersByType.put(eventType, newHandler);
        if (this.singleEventHandlersByType.size() === previousSize) {
            this.doOnHandlerWasReplaced(eventType, oldHandler, newHandler);
        } else {
            throw new IllegalStateError("The size of singleEventHandlersByType changed after replacing");
        }
    }
}

