/*
 * Copyright (c) 2018-2019 Pavel Kastornyy. All rights reserved.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.
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

import { EventDispatchChain } from './../../event/EventDispatchChain';
import { EventDispatcher } from './../../event/EventDispatcher';
import { Event } from './../../event/Event';
import { List } from 'script4j.base';
import { ArrayList } from 'script4j.base';

export class EventDispatchChainImpl implements EventDispatchChain {
    
    private dispatchers: List<EventDispatcher> = new ArrayList();
    
    public append​(eventDispatcher: EventDispatcher): EventDispatchChain {
        this.dispatchers.add(eventDispatcher);
        return this;
    }

    public dispatchEvent​(event: Event): Event {
        if (this.dispatchers.isEmpty()) {
            return event;
        }
        const dispatcher: EventDispatcher = this.dispatchers.removeByIndex(0);
        if (dispatcher !== null) {
            event = dispatcher.dispatchEvent(event, this);
            return event;
        }
        return event;
    }

    public prepend​(eventDispatcher: EventDispatcher): EventDispatchChain {
        if (this.dispatchers.isEmpty()) {
            this.dispatchers.add(eventDispatcher);
        } else {
            this.dispatchers.addByIndex(0, eventDispatcher);
        }
        return this;
    }
}

