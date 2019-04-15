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

import { EventObject } from 'script4j.base';
import { UnsupportedOperationError } from 'script4j.base';
import { EventTarget } from './EventTarget';
import { EventType } from './EventType';

export class Event extends EventObject {

    /**
     * Common supertype for all event types.
     */
    public static readonly ANY: EventType<Event> = null;

    private readonly target: EventTarget;

    private readonly eventType: EventType<Event>;

    private consumed: boolean = false;

    /**
     * Construct a new Event with the specified event source, target and type.
     */
    constructor​(source: Object, target: EventTarget, eventType: EventType<Event>) {
        super(source);
        this.target = target;
        this.eventType = eventType;
    }

    /**
     * Fires the specified event.
     */
    public static fireEvent​(eventTarget: EventTarget, event: Event): void {
        throw new UnsupportedOperationError("Not implemented yet");
    }

    /**
     * Marks this Event as consumed.
     */
    public consume(): void {
        this.consumed = true;
    }

    /**
     * Creates and returns a copy of this event with the specified event source and target.
     */
    public copyFor​(newSource: Object, newTarget: EventTarget): Event {
        throw new UnsupportedOperationError("Not implemented yet");
    }

    /**
     * Gets the event type of this event.
     */
    public getEventType(): EventType<Event> {
        return this.eventType;
    }

    /**
     * Returns the event target of this event.
     */
    public getTarget(): EventTarget {
        return this.target;
    }

    /**
     * Indicates whether this Event has been consumed by any filter or handler.
     */
    public isConsumed(): boolean {
        return this.consumed;
    }

}

