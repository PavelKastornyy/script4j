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

import { Node } from './Node';
import { ObservableList } from 'script4jfx.base';
import { FXCollections } from 'script4jfx.base';
import { ListChangeListener } from 'script4jfx.base';
import { List } from 'script4j.base';
import { Consumer } from 'script4j.base';
import { EventHandlerCounter } from './../internal/scene/EventHandlerCounter';
import { NodeEventHandlerManager } from './../internal/scene/NodeEventHandlerManager';
import { NodeUnlocker } from './../internal/scene/NodeUnlocker';
import { SceneUnlocker } from './../internal/scene/SceneUnlocker';
import { HandlerEvent } from './../internal/scene/busevents/HandlerEvent';

export abstract class Parent extends Node {
    
    private readonly children: ObservableList<Node> = FXCollections.observableArrayList();

    public constructor() {
        super();
        this.children.addListener(ListChangeListener.fromFunc((change)=> {
            while (change.next()) {
                //after set method both added and removed are true
                if (change.wasRemoved()) {
                    this.workRemovedChildlen(change.getRemoved());
                }
                if (change.wasAdded()) {
                    this.workAddedChildren(change.getAddedSubList(), change.getFrom());
                }
            }
        }));
    }

    /**
     * Gets the list of children of this Parent.
     */    
    protected  getChildren(): ObservableList<Node> {
        return this.children;
    }

    /**
     * Gets the list of children of this Parent as a read-only list.
     */
    public getChildrenUnmodifiable(): ObservableList<Node> {
        return FXCollections.unmodifiableObservableList(this.children);
    }
    
    private workRemovedChildlen(nodes: List<Node>): void {
        let removedElements: HTMLElement[] = new Array();
        const counter: EventHandlerCounter = new EventHandlerCounter();
        const tConsumer: Consumer<Node> = Consumer.fromFunc((currentNode: Node) => {
                    (<NodeUnlocker><any>currentNode).setScene(null);
                    counter.countAndAdd((<NodeUnlocker><any>currentNode).getEventHandlerManager());
                });
        nodes.forEach(Consumer.fromFunc((node) => {
            removedElements.push(node.getSkin().getElement());
            (<NodeUnlocker><any>node).setParent(null);
            //null scene from removed node and its possible children
            if (this.getScene() !== null) {
                (<NodeUnlocker> <any> node).traverse(tConsumer);
            }
        }));
        if (!counter.getResult().isEmpty() && this.getScene() !== null) {
            const event: HandlerEvent = new HandlerEvent(this, HandlerEvent.HANDLER_REMOVED, counter.getResult());
            (<SceneUnlocker><any>this.getScene()).getEventBus().post(event);
        }
        $(removedElements).remove();
    }
    
    private workAddedChildren(nodes: List<Node>, fromPos: number): void {
        let addedElements: HTMLElement[] = new Array();
        const counter: EventHandlerCounter = new EventHandlerCounter();
        const tConsumer: Consumer<Node> = Consumer.fromFunc((currentNode: Node) => {
                    (<NodeUnlocker><any>currentNode).setScene(this.getScene());
                    counter.countAndAdd((<NodeUnlocker><any>currentNode).getEventHandlerManager());
                });
        nodes.forEach(Consumer.fromFunc((node)=> {
            (<NodeUnlocker><any>node).setParent(this);
            //add scene for added node and its possible children
            if (this.getScene() !== null) {
                (<NodeUnlocker> <any> node).traverse(tConsumer);
            }
            addedElements.push(node.getSkin().getElement());
        }));
        if (fromPos === 0) {
            $(this.getSkin().getElement()).prepend(addedElements);
        } else {
            let afterElement = $(this.getSkin().getElement()).children().eq(fromPos - 1)[0];
            $(afterElement).after(addedElements);
        }
        if (!counter.getResult().isEmpty() && this.getScene() !== null) {
            const event: HandlerEvent = new HandlerEvent(this, HandlerEvent.HANDLER_ADDED, counter.getResult());
            (<SceneUnlocker><any>this.getScene()).getEventBus().post(event);
        }
    }
}
