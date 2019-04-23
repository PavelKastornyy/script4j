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

export class KeyEvent extends InputEvent {

    /**
     * Common supertype for all key event types.
     */
    public static readonly ANY: EventType<KeyEvent> = new EventType<KeyEvent>(InputEvent.ANY, "KEY");

    /**
     * This event occurs when a key has been pressed.
     */
    public static readonly KEY_PRESSED: EventType<KeyEvent> = new EventType<KeyEvent>(KeyEvent.ANY, "KEY_PRESSED");

    /**
     * This event occurs when a key has been released.
     */
    public static readonly KEY_RELEASED: EventType<KeyEvent> = new EventType<KeyEvent>(KeyEvent.ANY, "KEY_RELEASED");

    /**
     * This event occurs when a character-generating key was typed
     * (pressed and released).  The event contains the {@code character}
     * field containing the typed string, the {@code code} and {@code text}
     * fields are not used.
     */
    public static readonly KEY_TYPED: EventType<KeyEvent> = new EventType<KeyEvent>(KeyEvent.ANY, "KEY_TYPED");
    
    private readonly character: string;
    
    private readonly text: string;
    
    private readonly code: KeyCode;
    
    private readonly shiftDown: boolean;
    
    private readonly controlDown: boolean;
    
    private readonly altDown: boolean;
    
    private readonly metaDown: boolean;


    constructor​(source: Object, target: EventTarget, eventType: EventType<KeyEvent>, originalEvent: KeyboardEvent, 
            character: string, text: string, code: KeyCode, shiftDown: boolean, controlDown: boolean, altDown: boolean,            
            metaDown: boolean) {
        super(source, target, eventType, originalEvent);
        this.character = character;
        this.text = text;
        this.code = code;
        this.shiftDown = shiftDown;
        this.controlDown = controlDown;
        this.altDown = altDown;
        this.metaDown = metaDown;
    }

    /**
     * Gets the event type of this event.
     */    
    public getEventType(): EventType<KeyEvent> {
        return <EventType<KeyEvent>>super.getEventType();
    }
    
    public getOriginalEvent(): KeyboardEvent {
        return super.getOriginalEvent();
    }    

    /**
     * The Unicode character or sequence of characters associated with the key typed event.
     */    
    public getCharacter(): string {
        return this.character;
    }

    /**
     * The key code associated with the key in this key pressed or key released event.
     */
    public getCode(): KeyCode {
        return this.code;
    }

    /**
     * A String describing the key code, such as "HOME", "F1" or "A", for key pressed and key released events.
     */
    public getText(): string {
        return this.text;
    }
    
    /**
     * Returns whether or not the Alt modifier is down on this event.
     */
    public isAltDown(): boolean {
        return this.altDown;
    }
    
    /**
     * Returns whether or not the Control modifier is down on this event.
     */
    public isControlDown(): boolean {
        return this.controlDown;
    }
    
    /**
     * Returns whether or not the Meta modifier is down on this event.
     */
    public isMetaDown(): boolean {
        return this.metaDown;
    }
    
    /**
     * Returns whether or not the Shift modifier is down on this event.
     */
    public isShiftDown(): boolean {
        return this.shiftDown;
    }
    
    /**
     * Returns whether or not the host platform common shortcut modifier is down on this event.
     */
    public isShortcutDown(): boolean {
        throw new UnsupportedOperationError();
    }
    
}