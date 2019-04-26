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

import { Event } from 'script4jfx.base';
import { EventHandler } from 'script4jfx.base';
import { EventType } from 'script4jfx.base';
import { List } from 'script4j.base';
import { ArrayList } from 'script4j.base';
import { Iterator } from 'script4j.base';
import { Map } from 'script4j.base';
import { HashMap } from 'script4j.base';
import { IllegalArgumentError } from 'script4j.base';
import { IllegalStateError } from 'script4j.base';

export class HandlerTree {
    
    private root: HandlerTree.Node<Event> = null;
    
    private nodesByType: Map<EventType<Event>, HandlerTree.Node<Event>> = null;
    
    public addHandler<T extends Event>(eventType: EventType<T>, handler: EventHandler<T>, asFirst: boolean): void {
        if (eventType === null || handler === null) {
            throw new IllegalArgumentError();
        }
        let node: HandlerTree.Node<T> = null;
        if (this.nodesByType !== null) {
            node = this.nodesByType.get(eventType);
        }
        if (node === null) {
            node = this.createNode(eventType);
        }
        node.addHandler(handler, asFirst);
    }
    
    public removeHandler<T extends Event>(eventType: EventType<T>, handler: EventHandler<T>): void {
        if (eventType === null || handler === null) {
            throw new IllegalArgumentError();
        }
        if (this.root === null || this.nodesByType === null) {
            return;
        }
        const node: HandlerTree.Node<T> = this.nodesByType.get(eventType);
        if (node === null) {
            return;
        }
        node.removeHandler(handler);
        if (this.isNodeEmpty(node)) {
            this.removeEmptyNodes(node);
        }
    }
    
    /**
     * More specific handlers are first. For example, a filter/handler for the MouseEvent.MOUSE_PRESSED is before 
     * the filter/handler for the InputEvent.ANY event.
     */
    public getHandlers<T extends Event>(eventType: EventType<T>): List<EventHandler<T>>{
        const handlers: List<EventHandler<T>> = new ArrayList();
        if (this.root !== null) {
            const node: HandlerTree.Node<T> = this.nodesByType.get(eventType);
            //firstly we try to get from leaf
            if (node !== null) {
                this.collectUp(node, handlers);
            } else {
                //otherwise from root
                const types: List<EventType<T>> = this.getTypes(eventType);
                this.collectDown(this.root, handlers, types, 0);
            }
        }
        return handlers;
    }
    
    public getRoot(): HandlerTree.Node<Event> {
        return this.root;
    }
    
    public isEmpty(): boolean {
        return this.root === null ? true : false;
    }
    
    public getEventHandlerByType(): Map<EventType<Event>, List<EventHandler<Event>>> {
        if (this.root === null) {
            return null;
        }
        const result: Map<EventType<Event>, List<EventHandler<Event>>> = new HashMap();
        const iterator: Iterator<Map.Entry<EventType<Event>, HandlerTree.Node<Event>>> = 
                this.nodesByType.entrySet().iterator();
        while (iterator.hasNext()) {
            const entry: Map.Entry<EventType<any>, HandlerTree.Node<Event>> = iterator.next();
            if (entry.getValue().getHandlers() === null) {
                continue;
            }
            let handlers: List<EventHandler<Event>> = result.get(entry.getKey());
            if (handlers === null) {
                result.put(entry.getKey(), entry.getValue().getHandlers());
            } else {
                handlers.addAll(entry.getValue().getHandlers());
            }
        }
        return result;
    }
    
    private collectUp<T extends Event>(node: HandlerTree.Node<T>, handlers: List<EventHandler<T>>) {
        if (node.getHandlers() !== null) {
            handlers.addAll(node.getHandlers());
        }
        if (node.getParent() !== null) {
            this.collectUp(node.getParent(), handlers);
        }
    }
    
    private collectDown<T extends Event>(node: HandlerTree.Node<T>, handlers: List<EventHandler<T>>, 
            types: List<EventType<T>>, typeIndex: number) {
        if (node.getHandlers() !== null) {
            handlers.addAllByIndex(0, node.getHandlers());
        }
        typeIndex++;
        if (types.size() < typeIndex && node.getChildren() !== null) {
            const child: HandlerTree.Node<T> = node.getChildren().get(types.get(typeIndex));
            if (child !== null) {
                this.collectDown(child, handlers, types, typeIndex);
            }
        }
    }
    
    /**
     * Creates nodes and all its parent if needed.
     */
    private createNode<T extends Event>(eventType: EventType<T>): HandlerTree.Node<T> {
        const types: List<EventType<T>> = this.getTypes(eventType);
        let currentNode: HandlerTree.Node<T> = null;
        let previousNode: HandlerTree.Node<T> = null;
        if (this.nodesByType === null) {
            this.nodesByType = new HashMap();
        }
        for (let i: number = 0; i < types.size(); i++) {
            let currentType: EventType<T> = types.get(i);
            currentNode = this.nodesByType.get(currentType);
            if (currentNode === null) {
                currentNode = new HandlerTree.Node<T>(currentType);
                this.nodesByType.put(currentType, currentNode);
                if (currentType === Event.ANY) {
                    this.root = currentNode;
                } else {
                    previousNode.addChild(currentNode);
                }
            }
            previousNode = currentNode;
        }
        return currentNode;
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
    
    /**
     * Checks recursively the node and its children. True only if all don't have handlers.
     */
    private isNodeEmpty<T extends Event>(node: HandlerTree.Node<T>): boolean {
        if (node.getHandlers() !== null) {
            return false;
        } else {
            if (node.getChildren() === null) {
                return true;
            } else {
                const iterator: Iterator<Map.Entry<EventType<T>, HandlerTree.Node<T>>> = 
                        node.getChildren().entrySet().iterator();
                while (iterator.hasNext()) {
                    if (!this.isNodeEmpty(iterator.next().getValue())) {
                        return false;
                    }
                }
                return true;
            }
        }
    }
    
    /**
     * Removes node and all empty parents. Doesn't check if node is empty.
     */
    private removeEmptyNodes<T extends Event>(startNode: HandlerTree.Node<T>): void {
        if (startNode === null) {
            return;
        }
        if (this.nodesByType.remove(startNode.getEventType()) === null) {
            return;
        }
        const parent: HandlerTree.Node<T> = startNode.getParent();
        if (parent === null) {
            this.root = null;
            this.nodesByType = null;
        } else {
            parent.removeChild(startNode);
            if (parent.getHandlers() === null && parent.getChildren() === null) {
                this.removeEmptyNodes(parent);
            }
        }
   }
} 

export namespace HandlerTree {
    
    export class Node<T extends Event> {
        
        private childrenByType: Map<EventType<T>, Node<T>> = null;
    
        private parent: Node<T> = null;

        private handlers: List<EventHandler<T>> = null;

        private readonly eventType: EventType<T>;

        constructor(eventType: EventType<T>) {
            this.eventType = eventType;
        }

        public getParent(): Node<T> {
            return this.parent;
        }

        public getChildren(): Map<EventType<T>, Node<T>> {
            return this.childrenByType;
        }
        
        public getChild(eventType: EventType<T>): Node<T> {
            if (this.childrenByType === null) {
                return null;
            } else {
                return this.childrenByType.get(eventType);
            }
        }

        public getEventType(): EventType<T> {
            return this.eventType;
        }    

        public addChild(child: Node<T>): void {
            if (child === null) {
                throw new IllegalArgumentError("Child can not be null");
            }
            child.parent = this;
            if (this.childrenByType === null) {
                this.childrenByType = new HashMap();
            }
            this.childrenByType.put(child.getEventType(), child);
        }

        public removeChild(child: Node<T>): void {
            if (this.childrenByType === null) {
                throw new IllegalArgumentError("Child can not be null");
            }
            if (this.childrenByType === null) {
                return;
            }
            if (this.childrenByType.remove(child.getEventType()) !== null) {
                child.parent = null;
                if (this.childrenByType.isEmpty()) {
                    this.childrenByType = null;
                }
            }
        }

        public addHandler(handler: EventHandler<T>, asFirst: boolean): void {
            if (handler === null) {
                throw new IllegalArgumentError("Handler can not be null");
            }
            if (this.handlers === null) {
                this.handlers = new ArrayList();
            }
            if (this.handlers.isEmpty()) {
                this.handlers.add(handler);
            } else {
                if (asFirst) {
                    this.handlers.addByIndex(0, handler);
                } else {
                    this.handlers.add(handler);
                }
            }
        }

        public removeHandler(handler: EventHandler<T>): void {
            if (handler === null) {
                throw new IllegalArgumentError("Handler can not be null");
            }
            if (this.handlers === null) {
                return;
            }
            if (this.handlers.remove(handler)) {
                if (this.handlers.isEmpty()) {
                    this.handlers = null;
                }
            }
        }

        public getHandlers(): List<EventHandler<T>> {
            return this.handlers;
        }
    }
}