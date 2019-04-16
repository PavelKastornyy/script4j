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

import { BusEvent } from './../eventbus/BusEvent';
import { EventType } from 'script4jfx.base';
import { Map } from 'script4j.base';

/**
 * This event is thrown when one or more handler was added to scene.
 */
export class HandlerEvent extends BusEvent {
    
    /**
     * Common supertype for all handler event types.
     */
    public static readonly ANY: EventType<HandlerEvent> = new EventType<HandlerEvent>(BusEvent.ANY, "HANDLER");

    /**
     * This event occurs when a handler has been added to node that is on scene.
     */
    public static readonly HANDLER_ADDED: EventType<HandlerEvent> = 
            new EventType<HandlerEvent>(HandlerEvent.ANY, "HANDLER_ADDED");
    
    /**
     * This event occurs when a handler has been removed to node that is on scene.
     */
    public static readonly HANDLER_REMOVED: EventType<HandlerEvent> = 
            new EventType<HandlerEvent>(HandlerEvent.ANY, "HANDLER_REMOVED");

    private readonly countsByType: Map<EventType<any>, number>;
    
    constructor(source: Object, eventType: EventType<HandlerEvent>, countsByType: Map<EventType<any>, number>) {
        super(source, eventType);
        this.countsByType = countsByType;
    }
    
    public getСountsByType(): Map<EventType<any>, number> {
        return this.countsByType;
    }
    
    /**
     * Gets the event type of this event.
     */
    public getEventType(): EventType<HandlerEvent> {
        return <EventType<HandlerEvent>>super.getEventType();
    }
}