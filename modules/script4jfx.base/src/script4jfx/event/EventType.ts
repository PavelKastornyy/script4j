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

import { Event } from './Event';

/**
 * There are Event classes, i.e. subclasses of Event, that define particular methods for that class.
 * E.g. MouseEvent defines various methods that can be used to query the coordinates of the mouse
 * when the event occurred (getX(), getY(), getSceneX(), getScreenX() etc); ScrollEvent defines methods
 * to query the amount and direction of the scroll: getDeltaX(), getDeltaY(), etc).
 *
 * EventType is a more fine-grained object that specifies what happened. So constants of the EventType
 * class include MOUSE_CLICKED, MOUSE_PRESSED, KEY_TYPED, SCROLL_STARTED, etc. Each of these values
 * is associated with a particular Event subclass.
 *
 * The event registration method is addEventHandler(...). This method takes two parameters: an EventType
 * (which type of event to listen for), and an EventHandler. The EventHandler is generic for obvious
 * reasons: by defining an EventHandler<T extends Event> you get to define a handle(T event) method
 * that takes the appropriate event object, which you can then query in the type-specific way.
 * (E.g. an EventHandler<MouseEvent> has a handle(MouseEvent event) method, which can query the coordinates
 * of the mouse, etc).
 *
 * Now, it clearly only makes sense to register an EventHandler<T> for an EventType that is associated with
 * the Event subclass T. Furthermore, it's desirable to allow for the compiler to enforce this. By making
 * the EventType class generic: EventType<T extends Event>, we get to let the compiler enforce this rule.
 * MOUSE_CLICKED is not just an instance of EventType, it's an instance of EventType<MouseEvent>. Since the
 * signature of the addEventHandler(...) method is addEventHandler(EventType<T>, EventHandler<T>), the
 * compiler enforces that the handler is "for the same class of event" as the event type.
 *
 * When you combine this with using lambdas (or I suppose with type inference, in particular), it becomes
 * quite powerful:
 * node.addEventHandler(MOUSE_CLICKED, e -> {...});
 * Because MOUSE_CLICKED is specifically an EventType<MouseEvent>, the compiler is able to infer that the
 * event handler defined by the lambda is an EventHandler<MouseEvent>, and thus that e is a MouseEvent.
 * So the compiler can now infer that
 *
 * node.addEventHandler(MOUSE_CLICKED, e -> System.out.println(e.getX()));
 * node.addEventHandler(KEY_TYPED, e -> System.out.println(e.getText()));
 * are legal, but
 * node.addEventHandler(MOUSE_CLICKED, e -> System.out.println(e.getText()));
 * is not. If EventType were not generic, this would not be possible.
 *
 * From https://stackoverflow.com/a/26809705/5057736
 */
export class EventType<T extends Event> {

    /**
     * The root event type. All other event types are either direct or
     * indirect sub types of it. It is also the only event type which
     * has its super event type set to {@code null}.
     */
    public static readonly ROOT: EventType<Event> = new EventType<Event>(null, "EVENT");

    private readonly superType: EventType<T>;

    private readonly name: string;


    /**
     * Constructs a new EventType with the specified super type and name.
     */
    constructor(​superType: EventType<T>, name: string) {
        this.superType = superType;
        this.name = name;
    }

    /**
     * Gets the name of this event type.
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Gets the super type of this event type.
     */
    public getSuperType(): EventType<T> {
        return this.superType;
    }

    /**
     * Returns a string representation of this EventType object.
     */
    public toString(): string {
        return "EventType{" + "name=" + this.name + "}";
    }
}

