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
import { EventBus } from './eventbus/EventBus';
import { BusEventListener } from './eventbus/BusEventListener';
import { HandlerEvent } from './busevents/HandlerEvent';
import { KeyEvent } from './../../scene/input/KeyEvent';
import { HtmlEventType } from './HtmlEventType';
import 'jquery';

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
    private readonly handlerCountsByEventType: Map<EventType<any>, number> = new HashMap();
    
    /**
     * Listeners that were added to root html element. If there can be situation that fx listeners overlap html 
     * listeners, then it must be fixed. jQuery is not used because it doesn't support capturing phase.
     */
    private readonly listenersByEventType: Map<EventType<any>, EventListener> = new HashMap();
    
    /**
     * It can be not 1:1
     */
    //private readonly htmlEvenTypesByFxEventType: Map<EventType<any>, string> = new HashMap();
    
    private readonly eventBus: EventBus = null;
    
    /**
     * Listener that will be called when a handler will be added/removed to/from scene or when node with handlers
     * will be added/removed to/from scene.
     */
    private readonly handlerListener: BusEventListener<HandlerEvent> = (event: HandlerEvent)=> {
        const eventType: EventType<HandlerEvent> = event.getEventType();
        if (eventType === HandlerEvent.HANDLER_ADDED) {
            this.addCounts(event.getСountsByType());
        } else if (eventType === HandlerEvent.HANDLER_REMOVED) {
            this.subtractCounts(event.getСountsByType());
        }
    };
    
    /**
     * Root is parent root that was added to scene.
     */
    constructor(root: HTMLElement, eventBus: EventBus) {
        this.rootElement = root;
        this.eventBus = eventBus;
    }
    
    public initialize(countsByType: Map<EventType<any>, number>): void {
        this.addCounts(countsByType);
        this.eventBus.register(HandlerEvent.HANDLER_ADDED, this.handlerListener);
        this.eventBus.register(HandlerEvent.HANDLER_REMOVED, this.handlerListener);
    }

    public deinitialize(): void {
        this.eventBus.unregister(HandlerEvent.HANDLER_ADDED, this.handlerListener);
        this.eventBus.unregister(HandlerEvent.HANDLER_REMOVED, this.handlerListener);
        this.handlerCountsByEventType.clear();
    }    
    
    private addToCount(eventType: EventType<any>, value: number): void {
        if (value === null) {
            return;
        }
        this.handlerCountsByEventType.compute(eventType, (k: EventType<any>, v: number) => {
            if (v === null) {
                v = 0;
            }
            v = v + value;
            if (v > 0) {
                this.createListenerIfAbsent(eventType);
            }
            return v;
        });
    }
    
    private subtractFromCount(eventType: EventType<any>, value: number): void {
        if (value === null) {
            return;
        }
        this.handlerCountsByEventType.compute(eventType, (k: EventType<any>, v: number) => {
            if (v === null) {
                return null;
            }
            v = v - value;
            if (v <= 0) {
                this.destroyListenerIfPresent(eventType);
                //remove this eventType from map
                return null;
            }
            return v;
        });
    }
    
    private addCounts(countsByType: Map<EventType<any>, number>): void {
        if (countsByType.isEmpty()) {
            return;
        }
        const iterator: Iterator<Map.Entry<EventType<any>, number>> = countsByType.entrySet().iterator();
        while (iterator.hasNext()) {
            const entry: Map.Entry<EventType<any>, number> = iterator.next();
            this.addToCount(entry.getKey(), entry.getValue());
        }
    }
    
    private subtractCounts(countsByType: Map<EventType<any>, number>): void {
        if (countsByType.isEmpty()) {
            return;
        }
        const iterator: Iterator<Map.Entry<EventType<any>, number>> = countsByType.entrySet().iterator();
        while (iterator.hasNext()) {
            const entry: Map.Entry<EventType<any>, number> = iterator.next();
            this.subtractFromCount(entry.getKey(), entry.getValue());
        }
    }
    
    private createListenerIfAbsent(eventType: EventType<any>): void {
        if (this.listenersByEventType.containsKey(eventType)) {
            return;
        }
        if (eventType.getSuperType() === KeyEvent.ANY) {
            this.createKeyListener(eventType);
        }
    }
    
    private destroyListenerIfPresent(eventType: EventType<any>): void {
        if (!this.listenersByEventType.containsKey(eventType)) {
            return;
        }
        if (eventType.getSuperType() === KeyEvent.ANY) {
            this.destroyKeyListener(eventType);
        }
    }
    
    private createKeyListener(eventType: EventType<KeyEvent>): void {
        let listener: EventListener = null;
        let htmlEventType: string = null;
        if (eventType === KeyEvent.KEY_TYPED) {
            listener = function(e) {
                console.log("KEY_TYPED");
                e.stopPropagation();
            };
            htmlEventType = HtmlEventType.Key.KEY_PRESSED;
        } else if (eventType === KeyEvent.KEY_PRESSED) {
            listener = function(e) {
                console.log("KEY_PRESSED");
                e.stopPropagation();
            };
            htmlEventType = HtmlEventType.Key.KEY_DOWN;
        } else if (eventType === KeyEvent.KEY_RELEASED) {
            listener = function(e) {
                console.log("KEY_RELEASED");
                e.stopPropagation();
            };
            htmlEventType = HtmlEventType.Key.KEY_UP;
        }
        //capturing phase, not supported by jQuery
        this.rootElement.addEventListener(htmlEventType, listener, true);
        this.listenersByEventType.put(eventType, listener);
    }
    
    private destroyKeyListener(eventType: EventType<KeyEvent>): void {
        const listener: EventListener = this.listenersByEventType.remove(eventType);
        let htmlEventType: string = null;
        if (listener === null) {
            return;
        }
        if (eventType === KeyEvent.KEY_TYPED) {
            htmlEventType = HtmlEventType.Key.KEY_PRESSED;
        } else if (eventType === KeyEvent.KEY_PRESSED) {
            htmlEventType = HtmlEventType.Key.KEY_DOWN;
        } else if (eventType === KeyEvent.KEY_RELEASED) {
            htmlEventType = HtmlEventType.Key.KEY_UP;
        }
        //capturing phase, not supported by jQuery
        this.rootElement.removeEventListener(htmlEventType, listener, true);
    }
}