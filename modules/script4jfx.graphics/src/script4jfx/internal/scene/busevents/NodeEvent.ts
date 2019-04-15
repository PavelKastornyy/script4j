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
import { EventHandlerCounter } from './../EventHandlerCounter';
import { EventType } from 'script4jfx.base';

export class NodeEvent extends BusEvent {
    
    /**
     * Common supertype for all node event types.
     */
    public static readonly ANY: EventType<NodeEvent> = new EventType<NodeEvent>(BusEvent.ANY, "NODE");

    /**
     * This event occurs when a node has been added to scene.
     */
    public static readonly NODE_ADDED: EventType<NodeEvent> = 
            new EventType<NodeEvent>(NodeEvent.ANY, "NODE_ADDED");
    
    /**
     * This event occurs when a node has been removed from scene.
     */
    public static readonly NODE_REMOVED: EventType<NodeEvent> = 
            new EventType<NodeEvent>(NodeEvent.ANY, "NODE_REMOVED");

    private readonly counterResult: EventHandlerCounter.Result;
    
    constructor(source: Object, eventType: EventType<NodeEvent>, counterResult: EventHandlerCounter.Result) {
        super(source, eventType);
        this.counterResult = counterResult;
    }
    
    public getCounterResult(): EventHandlerCounter.Result {
        return this.counterResult;
    }
    
    /**
     * Gets the event type of this event.
     */
    public getEventType(): EventType<NodeEvent> {
        return <EventType<NodeEvent>>super.getEventType();
    }
}

