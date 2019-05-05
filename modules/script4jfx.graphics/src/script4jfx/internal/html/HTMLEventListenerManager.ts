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
import { EventBus } from './../scene/eventbus/EventBus';
import { BusEventListener } from './../scene/eventbus/BusEventListener';
import { HandlerEvent } from './../scene/busevents/HandlerEvent';
import { KeyEvent } from './../../scene/input/KeyEvent';
import { MouseEvent } from './../../scene/input/MouseEvent';
import { MouseButton } from './../../scene/input/MouseButton';
import { KeyCode } from './../../scene/input/KeyCode';
import { HTMLEventType } from './HTMLEventType';
import { JQueryDataKeys } from './JQueryDataKeys';
import { Node } from './../../scene/Node';
import { EventTarget } from 'script4jfx.base';
import { BiFunction } from 'script4j.base';
import { List } from 'script4j.base';
import { ArrayList } from 'script4j.base';
import { Event } from 'script4jfx.base';
import { HTMLKeyMapper } from './HTMLKeyMapper';
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
export class HTMLEventListenerManager {
    
    private rootElement: HTMLElement = null;
    
    /**
     * We need to know the count of handlers of all Nodes that are on Scene. At the same time references to
     * handlers are not required and we don't want to control them.
     */
    private readonly handlerCountsByEventType: Map<EventType<any>, number> = new HashMap();
    
    /**
     * Listeners that were added to root html element. If there can be situation that fx listeners overlap html 
     * listeners, then it must be fixed. jQuery is not used because it doesn't support capturing phase.
     * 
     */
    private readonly listenersByHtmlType: Map<string, EventListener> = new HashMap();
    
    /**
     * It can be not 1:1
     */
    //private readonly htmlEvenTypesByFxEventType: Map<EventType<any>, string> = new HashMap();
    
    private readonly eventBus: EventBus = null;
    
    /**
     * Listener that will be called when a handler will be added/removed to/from scene or when node with handlers
     * will be added/removed to/from scene.
     */
    private readonly handlerListener: BusEventListener<HandlerEvent> = 
            BusEventListener.fromFunc((event: HandlerEvent)=> {
                const eventType: EventType<HandlerEvent> = event.getEventType();
                if (eventType === HandlerEvent.HANDLER_ADDED) {
                    this.addCounts(event.getСountsByType());
                } else if (eventType === HandlerEvent.HANDLER_REMOVED) {
                    this.subtractCounts(event.getСountsByType());
                }
        });
    
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
        this.handlerCountsByEventType.compute(eventType, BiFunction.fromFunc((k: EventType<any>, v: number) => {
            if (v === null) {
                v = 0;
            }
            v = v + value;
            if (v > 0) {
                this.createListenerIfAbsent(eventType);
            }
            return v;
        }));
    }
    
    private subtractFromCount(eventType: EventType<any>, value: number): void {
        if (value === null) {
            return;
        }
        this.handlerCountsByEventType.compute(eventType, BiFunction.fromFunc((k: EventType<any>, v: number) => {
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
        }));
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
    
    /**
     * The method is respobsible for creating listeners in html.
     */
    private createListenerIfAbsent(eventType: EventType<any>): void {
        const types: List<EventType<Event>> = this.getTypes(eventType);
        const baseType: EventType<any> = types.get(2);
        if (baseType === KeyEvent.ANY) {
            this.createKeyListenerIfAbsent(eventType);
        } else if (baseType === MouseEvent.ANY) {
            this.createMouseListenerIfAbsent(eventType);
        }
    }
    
    /**
     * The method is responsible for destroying listeners in html.
     */
    private destroyListenerIfPresent(eventType: EventType<any>): void {
        const types: List<EventType<Event>> = this.getTypes(eventType);
        const baseType: EventType<any> = types.get(2);
        if (baseType === KeyEvent.ANY) {
            this.destroyKeyListenerIfPresent(eventType);
        } else if (baseType === MouseEvent.ANY) {
            this.destroyMouseListenerIfPresent(eventType);
        }
    }
    
    private createKeyListenerIfAbsent(eventType: EventType<KeyEvent>): void {
        let htmlEventType: string = null;
        if (eventType === KeyEvent.KEY_TYPED) {
            htmlEventType = HTMLEventType.Key.KEY_PRESSED;
        } else if (eventType === KeyEvent.KEY_PRESSED) {
            htmlEventType = HTMLEventType.Key.KEY_DOWN;
        } else if (eventType === KeyEvent.KEY_RELEASED) {
            htmlEventType = HTMLEventType.Key.KEY_UP;
        }
        if (this.listenersByHtmlType.containsKey(htmlEventType)) {
            return;
        }
        let listener: EventListener = (e: KeyboardEvent) => {
            const node: Node = this.resolveNode(<HTMLElement>e.target);
            if (node !== null) {
                const event: KeyEvent = this.createKeyEvent(e, eventType, node);
                node.fireEvent(event);
                if (event.getOriginalResult() !== null) {
                    return event.getOriginalResult();
                }
            }
        };
        this.doCreateListener(htmlEventType, listener);
    }
    
    private createMouseListenerIfAbsent(eventType: EventType<KeyEvent>): void {
        let oneClickListener: EventListener = (e: any) => {
            const node: Node = this.resolveNode(<HTMLElement>e.target);
            if (node !== null) {
                const event: MouseEvent = this.createMouseEvent(e, eventType, node, 1);
                node.fireEvent(event);
                if (event.getOriginalResult() !== null) {
                    return event.getOriginalResult();
                }
            }
        };
        let dblClickListener: EventListener = (e: any) => {
            const node: Node = this.resolveNode(<HTMLElement>e.target);
            if (node !== null) {
                const event: MouseEvent = this.createMouseEvent(e, eventType, node, 2);
                node.fireEvent(event);
                if (event.getOriginalResult() !== null) {
                    return event.getOriginalResult();
                }
            }
        };
        let htmlEventType: string = null;
        if (eventType === MouseEvent.MOUSE_PRESSED) {
            htmlEventType = HTMLEventType.Mouse.MOUSE_DOWN;
        } else if (eventType === MouseEvent.MOUSE_RELEASED) {
            htmlEventType = HTMLEventType.Mouse.MOUSE_UP;
        }
        if (htmlEventType !== null) {
            if (!this.listenersByHtmlType.containsKey(htmlEventType)) {
                return;
            }
            this.doCreateListener(htmlEventType, oneClickListener);
        //clicked - multiple events
        } else {
            htmlEventType = HTMLEventType.Mouse.CLICK;
            if (!this.listenersByHtmlType.containsKey(htmlEventType)) {
                this.doCreateListener(htmlEventType, oneClickListener);
            }
            htmlEventType = HTMLEventType.Mouse.DOUBLE_CLICK;
            if (!this.listenersByHtmlType.containsKey(htmlEventType)) {
                this.doCreateListener(htmlEventType, dblClickListener);
            }
            htmlEventType = HTMLEventType.Mouse.CONEXT_MENU;
            if (!this.listenersByHtmlType.containsKey(htmlEventType)) {
                this.doCreateListener(htmlEventType, oneClickListener);
            }
        }
    }
    
    private doCreateListener(htmlEventType: string, listener: EventListener) {
        //capturing phase, not supported by jQuery
        this.rootElement.addEventListener(htmlEventType, listener, true);
        this.listenersByHtmlType.put(htmlEventType, listener);
    }
    
    private destroyKeyListenerIfPresent(eventType: EventType<KeyEvent>): void {
        let htmlEventType: string = null;
        if (eventType === KeyEvent.KEY_TYPED) {
            htmlEventType = HTMLEventType.Key.KEY_PRESSED;
        } else if (eventType === KeyEvent.KEY_PRESSED) {
            htmlEventType = HTMLEventType.Key.KEY_DOWN;
        } else if (eventType === KeyEvent.KEY_RELEASED) {
            htmlEventType = HTMLEventType.Key.KEY_UP;
        }
        if (htmlEventType !== null) {
            this.doDestroyListener(htmlEventType);
        }
    }    
    
    private destroyMouseListenerIfPresent(eventType: EventType<KeyEvent>): void {
        let htmlEventType: string = null;
        let listener: EventListener = null;
        if (eventType === MouseEvent.MOUSE_PRESSED) {
            htmlEventType = HTMLEventType.Mouse.MOUSE_DOWN;
        } else if (eventType === MouseEvent.MOUSE_RELEASED) {
            htmlEventType = HTMLEventType.Mouse.MOUSE_UP;
        }
        if (htmlEventType !== null) {
            this.doDestroyListener(htmlEventType);
        //clicked - multiple events
        } else {
            htmlEventType = HTMLEventType.Mouse.CLICK;
            this.doDestroyListener(htmlEventType);
            htmlEventType = HTMLEventType.Mouse.DOUBLE_CLICK;
            this.doDestroyListener(htmlEventType);
            htmlEventType = HTMLEventType.Mouse.CONEXT_MENU;
            this.doDestroyListener(htmlEventType);
        }
    }
    
    private doDestroyListener(htmlEventType: string) {
        //capturing phase, not supported by jQuery
        let listener: EventListener = this.listenersByHtmlType.remove(htmlEventType);
        if (listener === null) {
            return;
        }
        this.rootElement.removeEventListener(htmlEventType, listener, true);
    }
    
    private createKeyEvent(event: KeyboardEvent, eventType: EventType<KeyEvent>, eventTarget: EventTarget): KeyEvent {
        return new KeyEvent(
                null, //source
                eventTarget, 
                eventType, 
                event, 
                null, //character
                event.key, //text
                this.resolveKeyCode(event.code), //code
                event.shiftKey, //shiftDown
                event.ctrlKey, //controlDown
                event.altKey, //altDown
                event.metaKey //metaDown
                ); 
    }
    
    /**
     * For mouseenter, mouseleave, mouseover, mouseout или mousemove event.button IS NOT USED.
     */
    private createMouseEvent(event: any, eventType: EventType<KeyEvent>, 
            eventTarget: EventTarget, clickCount: number): MouseEvent {
        let primaryButtonDown: boolean = false;
        let middleButtonDown: boolean = false;
        let secondaryButtonDown: boolean = false; 
        let button: MouseButton = MouseButton.NONE;
        switch (event.button) {
            case 0: 
                primaryButtonDown = true;
                button = MouseButton.PRIMARY;
            break;
            case 1: 
                middleButtonDown = true;
                button = MouseButton.MIDDLE;
            break;
            case 2:
                secondaryButtonDown = true;
                button = MouseButton.SECONDARY;
            break;
        }
        return new MouseEvent(
                null, //source, 
                eventTarget,//target, 
                eventType, 
                event, //originalEvent,
                event.offsetX, //x
                event.offsetY, //y
                event.clientX, //screenX, 
                event.clientY, //screenY, 
                button, 
                clickCount, 
                event.shiftKey, //shiftDown, 
                event.ctrlKey, //controlDown, 
                event.altKey, //altDown, 
                event.metaKey, //metaDown, 
                primaryButtonDown, 
                middleButtonDown, 
                secondaryButtonDown, 
                null, //synthesized, 
                null, //popupTrigger, 
                null, //stillSincePress
                );
    }
    
    private resolveNode(target: HTMLElement): Node {
        let node: Node = $(target).data(JQueryDataKeys.NODE);
        if (typeof node !== "undefined") {
            return node;
        } else {
            if (target.parentElement !== null) {
                return this.resolveNode(target.parentElement);
            } else {
                return null;
            }
        }
    }
    
    private getTypes<T extends Event>(eventType: EventType<T>): List<EventType<T>> {
        const types: List<EventType<T>> = new ArrayList();
        while (eventType !== null) {
            if (types.isEmpty()) {
                types.add(eventType);
            } else {
                types.addByIndex(0, eventType);
            }
            eventType = eventType.getSuperType();
        }
        return types;
    }    
    
    private resolveKeyCode(code: string): KeyCode {
        return HTMLKeyMapper.map(code);
//        if (code.startsWith("Key")) {
//            code = code.substr(3);
//        } else if (code.startsWith("Digit")) {
//            code = code.substr(5);
//        } else if (code.startsWith("Numpad")) {
//            code = code.substr(6);
//            //extra space
//            code = "Numpad " + code;
//        }
//        return code;
    }
    
}