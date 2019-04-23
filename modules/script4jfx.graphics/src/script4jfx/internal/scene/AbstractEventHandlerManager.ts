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
import { EventBus } from './eventbus/EventBus';
import { HandlerEvent } from './busevents/HandlerEvent';
import { Event } from 'script4jfx.base';
import { ChangeListener } from 'script4jfx.base';
import { InputEvent } from './../../scene/input/InputEvent';
import { HandlerTree } from './HandlerTree';

export abstract class AbstractEventHandlerManager {
    
    /**
     * These are types of handlers that are added via addEventHandler() and setOnXXX().
     * The first ones are added to the head of the list, the second ones are added to the tail.
     */
    private eventHandlerTree: HandlerTree = null;
    
    /**
     * Event filters.
     */
    private eventFilterTree: HandlerTree = null;
    
    /**
     * Either Scene or Node that contains this maanger.
     */
    private readonly bean: Object;
    
    constructor(bean: Object) {
        this.bean = bean;
    }
    
    public getBean() {
        return this.bean;
    }
    
    public getEventHandlers(evenType: EventType<Event>):List<EventHandler<Event>> {
        if (this.eventHandlerTree === null) {
            return null;
        } else {
            return this.eventHandlerTree.getHandlers(evenType);
        }
    }
    
    public getEventFilters(eventType: EventType<Event>): List<EventHandler<Event>> {
        if (this.eventFilterTree === null) {
            return null;
        } else {
            return this.eventFilterTree.getHandlers(eventType);
        }
    }
    
    public getEventHandlersByType(): Map<EventType<Event>, List<EventHandler<Event>>> {
        if (this.eventHandlerTree !== null) {
            return this.eventHandlerTree.getEventHandlerByType();
        } else {
            return null;
        }
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
     * Registers an event filter to this node.
     */
    public addEventFilterByType<T extends Event>(eventType: EventType<T>, eventFilter: EventHandler<T>): void {
        if (this.eventFilterTree === null) {
            this.eventFilterTree = new HandlerTree();
        }
        this.eventFilterTree.addHandler(eventType, eventFilter);
    }
    
    /**
     * Unregisters a previously registered event filter from this node.
     */
    public removeEventFilterByType<T extends Event>(eventType: EventType<T>, eventFilter: EventHandler<T>): void {
        if (this.eventFilterTree === null) {
            return;
        }
        this.eventFilterTree.removeHandler(eventType, eventFilter);
        if (this.eventFilterTree.isEmpty()) {
            this.eventFilterTree = null;
        }
    }    
    
    /**
     * This method is called in addEventHandler.
     */
    public addEventHandlerByType<T extends Event>(eventType: EventType<T>, handler: EventHandler<T>): void {
        if (this.eventHandlerTree === null) {
            this.eventHandlerTree = new HandlerTree();
        }
        this.eventHandlerTree.addHandler(eventType, handler);
        this.doOnHandlerAdded(eventType, handler);
    }
    
    /**
     * This method is called in removeEventHandler.
     */
    public removeEventHandlerByType<T extends Event>(eventType: EventType<T>, handler: EventHandler<T>): void {
        if (this.eventHandlerTree === null) {
            return;
        }
        this.eventHandlerTree.removeHandler(eventType, handler);
        this.doOnHandlerRemoved(eventType, handler);
        if (this.eventHandlerTree.isEmpty()) {
            this.eventHandlerTree = null;
        }
    }
    
    /**
     * This method is called after new handler was added.
     */
    protected doOnHandlerAdded<T extends Event>(eventType: EventType<T>, handler: EventHandler<T>): void {
        const eventBus = this.getEventBus();
        if (eventBus === null) {
            return;
        }
        const countsByType: Map<EventType<T>, number> = new HashMap();
        countsByType.put(eventType, 1);
        const event: HandlerEvent = new HandlerEvent(this, HandlerEvent.HANDLER_ADDED, countsByType);
        eventBus.post(event);
    }
    
    /**
     * This method is called after one handler was removed.
     */
    protected doOnHandlerRemoved<T extends Event>(eventType: EventType<T>, handler: EventHandler<T>): void {
        const eventBus = this.getEventBus();
        if (eventBus === null) {
            return;
        }
        const countsByType: Map<EventType<T>, number> = new HashMap();
        countsByType.put(eventType, 1);
        const event: HandlerEvent = new HandlerEvent(this, HandlerEvent.HANDLER_REMOVED, countsByType);
        eventBus.post(event);
    }
    
    /**
     * This method is called after one handler was replaced by another.
     */
    protected doOnHandlerReplaced<T extends Event>(eventType: EventType<T>, oldHandler: EventHandler<T>, 
            newHandler: EventHandler<T>): void {
        //no logic yet        
    }
    
    protected abstract getEventBus(): EventBus;    
    
    private createEventProperty<T extends Event>(eventType: EventType<T>): ObjectProperty<EventHandler<T>>  {
        const prop: ObjectProperty<EventHandler<T>> = new SimpleObjectProperty<EventHandler<T>>(null, this.bean);
        prop.addListener(ChangeListener.fromFunc((observable: ObservableValue<EventHandler<T>>, 
                    oldHandler: EventHandler<T>, newHandler: EventHandler<T>) => {
                if (newHandler !== null && oldHandler === null) {
                    this.addEventHandlerByType(eventType, newHandler);
                } else if (newHandler === null && oldHandler !== null) {
                    this.removeEventHandlerByType(eventType, oldHandler);
                //there can be situation when null is set to null
                } else if (newHandler !== null && oldHandler !== null) {
                    this.removeEventHandlerByType(eventType, oldHandler);
                    this.addEventHandlerByType(eventType, newHandler);
                }
            }));
        return prop;
    }    
}

