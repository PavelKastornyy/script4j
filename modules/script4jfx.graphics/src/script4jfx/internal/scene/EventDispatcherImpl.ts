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

import { EventDispatcher } from 'script4jfx.base';
import { EventDispatchChain } from 'script4jfx.base';
import { Event } from 'script4jfx.base';
import { AbstractEventHandlerManager } from './AbstractEventHandlerManager';


export class EventDispatcherImpl implements EventDispatcher {
    
    private readonly eventHandlerManager: AbstractEventHandlerManager;
    
    constructor(eventHandlerManager: AbstractEventHandlerManager) {
        this.eventHandlerManager = eventHandlerManager;
    }
    
    public dispatchEvent​(event: Event, chain: EventDispatchChain): Event {
        event = this.dispatchCapturingEvent(event);
        if (event.isConsumed()) {
            return null;
        }
        event = chain.dispatchEvent(event);
        if (event != null) {
            event = this.dispatchBubblingEvent(event);
            if (event.isConsumed()) {
                return null;
            }
        }
       return event;
    }
    
    private dispatchCapturingEvent(event: Event): Event {
        const handlers = this.eventHandlerManager.getEventFilters(event.getEventType());
        if (handlers !== null && !handlers.isEmpty()) {
            for (let i: number = 0; i < handlers.size(); i++) {
                handlers.get(i).handle(event);
            }
        }
        return event;
    }
    
    private dispatchBubblingEvent(event: Event): Event {
        const handlers = this.eventHandlerManager.getEventHandlers(event.getEventType());
        if (handlers !== null && !handlers.isEmpty()) {
            for (let i: number = 0; i < handlers.size(); i++) {
                handlers.get(i).handle(event);
            }
        }
        return event;
    }
}


