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

import { InputEvent} from './InputEvent';
import { KeyCode } from './KeyCode';
import { EventType } from 'script4jfx.base';
import { UnsupportedOperationError } from 'script4j.base';
import { EventTarget } from 'script4jfx.base';
import { MouseButton } from './MouseButton';

export class MouseEvent extends InputEvent {
    
    public static readonly ANY: EventType<MouseEvent> =
            new EventType<MouseEvent>(InputEvent.ANY, "MOUSE");

    public static readonly MOUSE_PRESSED: EventType<MouseEvent> =
            new EventType<MouseEvent>(MouseEvent.ANY, "MOUSE_PRESSED");

    public static readonly MOUSE_RELEASED: EventType<MouseEvent> =
            new EventType<MouseEvent>(MouseEvent.ANY, "MOUSE_RELEASED");

    public static readonly MOUSE_CLICKED: EventType<MouseEvent> =
            new EventType<MouseEvent>(MouseEvent.ANY, "MOUSE_CLICKED");

//    public static readonly MOUSE_ENTERED_TARGET: EventType<MouseEvent> =
//            new EventType<MouseEvent>(MouseEvent.ANY, "MOUSE_ENTERED_TARGET");
//
//    public static readonly MOUSE_ENTERED: EventType<MouseEvent> =
//            new EventType<MouseEvent>(MouseEvent.MOUSE_ENTERED_TARGET, "MOUSE_ENTERED");
//
//    public static readonly MOUSE_EXITED_TARGET: EventType<MouseEvent> =
//            new EventType<MouseEvent>(MouseEvent.ANY, "MOUSE_EXITED_TARGET");
//
//    public static readonly MOUSE_EXITED: EventType<MouseEvent> =
//            new EventType<MouseEvent>(MouseEvent.MOUSE_EXITED_TARGET, "MOUSE_EXITED");
//
//    public static readonly MOUSE_MOVED: EventType<MouseEvent> =
//            new EventType<MouseEvent>(MouseEvent.ANY, "MOUSE_MOVED");
//
//    public static readonly MOUSE_DRAGGED: EventType<MouseEvent> =
//            new EventType<MouseEvent>(MouseEvent.ANY, "MOUSE_DRAGGED");
//
//    public static readonly DRAG_DETECTED: EventType<MouseEvent> =
//            new EventType<MouseEvent>(MouseEvent.ANY, "DRAG_DETECTED");
    
    private readonly x: number; 
    
    private readonly y: number;
    
    private readonly sceneX: number; 
    
    private readonly sceneY: number;
    
    private readonly screenX: number;
    
    private readonly screenY: number;
    
    private readonly button: MouseButton;
    
    private readonly clickCount: number;
    
    private readonly shiftDown: boolean;
    
    private readonly controlDown: boolean;
    
    private readonly altDown: boolean;
    
    private readonly metaDown: boolean;
    
    private readonly primaryButtonDown: boolean;
    
    private readonly middleButtonDown: boolean;
    
    private readonly secondaryButtonDown: boolean;
    
    private readonly synthesized: boolean;
    
    private readonly popupTrigger: boolean;
    
    private readonly stillSincePress: boolean;
            
    constructor(source: Object, target: EventTarget, eventType: EventType<MouseEvent>, originalEvent: any,
        x: number, y: number, screenX: number, screenY: number, button: MouseButton, clickCount: number, 
        shiftDown: boolean, controlDown: boolean, altDown: boolean, metaDown: boolean, 
        primaryButtonDown: boolean, middleButtonDown: boolean, secondaryButtonDown: boolean, 
        synthesized: boolean, popupTrigger: boolean, stillSincePress: boolean) {
        super(source, target, eventType, originalEvent);
        this.x = x;
        this.y = y;
        this.sceneX = x;
        this.sceneY = y;
        this.screenX = screenX;
        this.screenY = screenY;
        this.button = button;
        this.clickCount = clickCount;
        this.shiftDown = shiftDown;
        this.controlDown = controlDown;
        this.altDown = altDown;
        this.metaDown = metaDown;
        this.primaryButtonDown = primaryButtonDown;
        this.middleButtonDown = middleButtonDown;
        this.secondaryButtonDown = secondaryButtonDown;
        this.synthesized = synthesized;
        this.popupTrigger = popupTrigger;
        this.stillSincePress = stillSincePress;
    }

    /**
     * Which, if any, of the mouse buttons is responsible for this event.    
     */
    getButton(): MouseButton {
        return this.button;
    }

    /**
     * Returns number of mouse clicks associated with this event.
     */
    getClickCount(): number {
        return this.clickCount;
    }
    
    /**
     * Gets the event type of this event.
     */
    getEventType(): EventType<MouseEvent> {
        return super.getEventType();
    }
    
    
    /**
     * Returns horizontal position of the event relative to the origin of the Scene that contains the MouseEvent's source.
     */
    getSceneX(): number {
        return this.sceneX;
    }
    
    /**
     * Returns vertical position of the event relative to the origin of the Scene that contains the MouseEvent's source.
     */
    getSceneY(): number {
        return this.sceneY;
    }
    
    /**
     * Returns absolute horizontal position of the event.
     */
    getScreenX(): number {
        return this.screenX;
    }
    
    /**
     * Returns absolute vertical position of the event.
     */
    getScreenY(): number {
        return this.screenY;
    }
    
    /**
     * Horizontal position of the event relative to the origin of the MouseEvent's source.
     */
    getX(): number {
        throw new UnsupportedOperationError();
    }
    
    /**
     * Vertical position of the event relative to the origin of the MouseEvent's source.
     */
    getY(): number {
        throw new UnsupportedOperationError();
    }
    
    /**
     * Depth position of the event relative to the origin of the MouseEvent's source.
     */
    getZ(): number {
        throw new UnsupportedOperationError();
    }
    
    /**
     * Whether or not the Alt modifier is down on this event.
     */
    isAltDown(): boolean {
        return this.altDown;
    }
    
    /**
     * Whether or not the Control modifier is down on this event.
     */
    isControlDown(): boolean {
        return this.controlDown;
    }
    
    /**
     * Determines whether this event will be followed by DRAG_DETECTED event.
     */
    isDragDetect(): boolean {
        throw new UnsupportedOperationError();
    }
    
    /**
     * Whether or not the Meta modifier is down on this event.
     */
    isMetaDown(): boolean {
        return this.metaDown;
    }
    
    /**
     * Returns true if middle button (button 2) is currently pressed.
     */
    isMiddleButtonDown(): boolean {
        return this.middleButtonDown;
    }
    
    /**
     * Returns true if this mouse event is the popup menu trigger event for the platform.
     */
    isPopupTrigger(): boolean {
        return this.popupTrigger;
    }
    
    /**
     * Returns true if primary button (button 1, usually the left) is currently pressed.
     */
    isPrimaryButtonDown(): boolean {
        return this.primaryButtonDown;
    }
    
    /**
     * Returns true if secondary button (button 3, usually the right) is currently pressed.
     */
    isSecondaryButtonDown(): boolean {
        return this.secondaryButtonDown;
    }
    
    /**
     * Whether or not the Shift modifier is down on this event.
     */
    isShiftDown(): boolean {
        return this.shiftDown;
    }
    
    /**
     * Returns whether or not the host platform common shortcut modifier is down on this event.
     */
    isShortcutDown(): boolean {
        throw new UnsupportedOperationError();
    }
    
    /**
     * Indicates whether the mouse cursor stayed in the system-provided hysteresis area since last pressed event that 
     * occurred before this event.
     */
    isStillSincePress(): boolean {
        throw new UnsupportedOperationError();
    }
    
    /**
     * Indicates whether this event is synthesized from using a touch screen instead of usual mouse event source 
     * devices like mouse or track pad.    
     */
    isSynthesized(): boolean {
        throw new UnsupportedOperationError();
    }
    
    
}

