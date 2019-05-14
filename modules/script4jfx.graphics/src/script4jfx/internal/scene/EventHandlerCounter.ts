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

import { AbstractEventHandlerManager } from './AbstractEventHandlerManager';
import { Map } from 'script4j.base';
import { List } from 'script4j.base';
import { BiFunction } from 'script4j.base';
import { HashMap } from 'script4j.base';
import { Iterator } from 'script4j.base';
import { EventType } from 'script4jfx.base';
import { EventHandler } from 'script4jfx.base';

export class EventHandlerCounter {
    
    private result: Map<EventType<any>, number> = new HashMap<EventType<any>, number>();
    
    public countAndAdd(eventHandlerManager: AbstractEventHandlerManager): void {
        //count multiple
        const eventHandlers: Map<EventType<any>, List<EventHandler<any>>> = 
                eventHandlerManager.getEventHandlersByType()
        if (eventHandlers !== null) {
            const iterator: Iterator<Map.Entry<EventType<any>, List<EventHandler<any>>>> = 
                    eventHandlers.entrySet().iterator();
            while (iterator.hasNext()) {
                const entry: Map.Entry<EventType<any>, List<EventHandler<any>>> = iterator.next();
                this.add(entry.getKey(), entry.getValue().size());
            }
        }
    }
    
    public getResult(): Map<EventType<any>, number> {
        return this.result;
    }
    
    private add(eventType:EventType<any>, value: number) {
        this.result.compute(eventType, BiFunction.lambda((k: EventType<any>, v: number)=>{
            if (v === null) {
                v = 0;
            }
            return v + value;
        }));
    }
    
    private subtract(eventType:EventType<any>, value: number) {
        this.result.compute(eventType, BiFunction.lambda((k: EventType<any>, v: number)=>{
            if (v === null) {
                v = 0;
            }
            let result = v - value;
            //for stability
            if (result < 0) {
                result = 0;
            }
            return result;
        }));
    }    
}    