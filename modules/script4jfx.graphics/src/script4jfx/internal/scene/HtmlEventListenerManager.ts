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

import { EventType } from 'script4jfx.base';
import { Map } from 'script4j.base';
import { Iterator } from 'script4j.base';
import { HashMap } from 'script4j.base'
import { EventHandlerCounter } from './EventHandlerCounter';
import { EventBus } from './eventbus/EventBus';
import { BusEventListener } from './eventbus/BusEventListener';
import { HandlerEvent } from './busevents/HandlerEvent';
import { NodeEvent } from './busevents/NodeEvent';

/**
 * This class is resposible for adding and removing event listeners to/from root HTML code.
 * All event listeners are added only to root HTML element because we need to get event
 * as early as possible to control it and pass via our implementation.
 * 
 * When a root is added/removed to/from scene this manager counts all handlers or reinitiazes the map.
 * When new nodes are added/removed to/from scene this manager calculates the difference.
 * When a handler is added/removed to/from scene or its existing nodes we use EventHandlerListener.
 */
export class HtmlEventListenerManager {
    
    private rootElement: HTMLElement = null;
    
    /**
     * We need to know the count of handlers of all Nodes that are on Scene. At the same time references to
     * handlers are not required and we don't want to control them.
     */
    private readonly handlerCountsByEventType: Map<EventType<any>, number> = new HashMap<EventType<any>, number>();
    
    /**
     * Listeners that were added to root html element.
     */
    private readonly listenersByEventType: Map<EventType<any>, EventListener> = new HashMap<EventType<any>, EventListener>();
    
    private readonly eventBus: EventBus = null;
    
    /**
     * Listener that will be called when a handler will be added/removed to/from scene.
     */
    private readonly handlerListener: BusEventListener<HandlerEvent> = (event: HandlerEvent)=> {
        const eventType: EventType<HandlerEvent> = event.getEventType();
        if (eventType === HandlerEvent.HANDLER_ADDED) {
            this.addToCount(event.getHandlerEventType(), 1);
        } else if (eventType === HandlerEvent.HANDLER_REMOVED) {
            this.subtractFromCount(event.getHandlerEventType(), 1);
        }
    };
    
    /**
     * Listener that will be called when a node will be added/removed to/from scene.
     */
    private readonly nodeListener: BusEventListener<NodeEvent> = (event: NodeEvent)=> {
        const eventType: EventType<NodeEvent> = event.getEventType();
        if (eventType === NodeEvent.NODE_ADDED) {
            this.addResult(event.getCounterResult());
        } else if (eventType === NodeEvent.NODE_REMOVED) {
            this.subtractResult(event.getCounterResult());
        }
    };
    
    /**
     * Root is parent root that was added to scene.
     */
    constructor(root: HTMLElement, eventBus: EventBus) {
        this.rootElement = root;
        this.eventBus = eventBus;
    }
    
    public initialize(counterResult: EventHandlerCounter.Result): void {
        this.addResult(counterResult);
        this.eventBus.register(HandlerEvent.HANDLER_ADDED, this.handlerListener);
        this.eventBus.register(HandlerEvent.HANDLER_REMOVED, this.handlerListener);
        this.eventBus.register(NodeEvent.NODE_ADDED, this.nodeListener);
        this.eventBus.register(NodeEvent.NODE_REMOVED, this.nodeListener);
    }

    public deinitialize(): void {
        this.eventBus.unregister(HandlerEvent.HANDLER_ADDED, this.handlerListener);
        this.eventBus.unregister(HandlerEvent.HANDLER_REMOVED, this.handlerListener);
        this.eventBus.unregister(NodeEvent.NODE_ADDED, this.nodeListener);
        this.eventBus.unregister(NodeEvent.NODE_REMOVED, this.nodeListener);
        this.handlerCountsByEventType.clear();
    }    
    
    private addToCount(eventType: EventType<any>, value: number): void {
        this.handlerCountsByEventType.compute(eventType, (k: EventType<any>, v: number) => {
            if (v === null) {
                v = 0;
            }
            return v + value;
        });
    }
    
    private subtractFromCount(eventType: EventType<any>, value: number): void {
        this.handlerCountsByEventType.compute(eventType, (k: EventType<any>, v: number) => {
            if (v === null) {
                return null;
            }
            v = v - value;
            if (v < 0) {
                return null;
            }
            return v;
        });
    }
    
    private addResult(counterResult: EventHandlerCounter.Result): void {
        if (counterResult.isEmpty()) {
            return;
        }
        const iterator: Iterator<Map.Entry<EventType<any>, number>> = counterResult.entrySet().iterator();
        while (iterator.hasNext()) {
            const entry: Map.Entry<EventType<any>, number> = iterator.next();
            this.addToCount(entry.getKey(), entry.getValue());
        }
    }
    
    private subtractResult(counterResult: EventHandlerCounter.Result): void {
        if (counterResult.isEmpty()) {
            return;
        }
        const iterator: Iterator<Map.Entry<EventType<any>, number>> = counterResult.entrySet().iterator();
        while (iterator.hasNext()) {
            const entry: Map.Entry<EventType<any>, number> = iterator.next();
            this.subtractFromCount(entry.getKey(), entry.getValue());
        }
    }
}