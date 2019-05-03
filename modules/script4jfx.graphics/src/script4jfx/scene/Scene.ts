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

import { EventTarget } from 'script4jfx.base';
import { EventDispatchChain } from 'script4jfx.base';
import { ObjectProperty } from 'script4jfx.base';
import { SimpleObjectProperty } from 'script4jfx.base';
import { Consumer } from 'script4j.base';
import { ObservableValue } from 'script4jfx.base';
import { Parent } from './Parent';
import { Node } from './Node';
import { EventType } from 'script4jfx.base';
import { SceneEventHandlerManager } from './../internal/scene/SceneEventHandlerManager';
import { NodeEventHandlerManager } from './../internal/scene/NodeEventHandlerManager';
import { HtmlEventListenerManager } from './../internal/scene/HtmlEventListenerManager';
import { EventHandlerCounter } from './../internal/scene/EventHandlerCounter';
import { EventHandler } from 'script4jfx.base';
import { KeyEvent } from './input/KeyEvent';
import { MouseEvent } from './input/MouseEvent';
import { Event } from 'script4jfx.base';
import { ChangeListener } from 'script4jfx.base';
import { EventDispatcher } from 'script4jfx.base';
import { EventBus } from './../internal/scene/eventbus/EventBus';
import { NodeUnlocker } from './../internal/scene/NodeUnlocker';
import { ParentUnlocker } from './../internal/scene/ParentUnlocker';
import { EventDispatcherImpl } from './../internal/scene/EventDispatcherImpl';


/**
 * Scene doesn't have element. All javascript event handlers are set to the root of the Scene.
 */
export class Scene implements EventTarget {

    /**
     * Defines the root Node of the scene graph.
     */    
    private readonly root: ObjectProperty<Parent> = new SimpleObjectProperty<Parent>();
    
    /**
     * This listener will be use by all EventHandlerManagers of all Nodes on this Scene and of this Scene.
     */
    //private readonly eventHandlerListener: EventHandlerListener = new Scene.EventHandlerListenerImpl(this);
    
    private readonly eventBus: EventBus = new EventBus();
    
    /**
     * The manager for event handlers of this Scene.
     */
    private readonly eventHandlerManager: SceneEventHandlerManager = new SceneEventHandlerManager(this);
    
    /**
     * Specifies the event dispatcher for this scene.
     */
    private readonly eventDispatcher: ObjectProperty<EventDispatcher> = new SimpleObjectProperty<EventDispatcher>();

    /**
     * This manager is created for every new root.
     */
    private htmlEventListenerManager: HtmlEventListenerManager = null;
    
    /**
     * Defines a function to be called when some Node of this Scene has input focus and a key has been pressed.
     */    
    private onKeyPressed: ObjectProperty<EventHandler<KeyEvent>> = null;

    /**
     * Defines a function to be called when some Node of this Scene has input focus and a key has been released.
     */
    private onKeyReleased: ObjectProperty<EventHandler<KeyEvent>> = null;
    
    /**
     * Defines a function to be called when some Node of this Scene has input focus and a key has been typed.
     */
    private onKeyTyped: ObjectProperty<EventHandler<KeyEvent>> = null;
    
    /**
     * Defines a function to be called when a mouse button has been clicked (pressed and released) on this Scene.
     */    
    private onMouseClicked: ObjectProperty<EventHandler<MouseEvent>> = null;

    /**
     * Defines a function to be called when a mouse button has been pressed on this Scene.
     */    
    private onMousePressed: ObjectProperty<EventHandler<MouseEvent>> = null;

    /**
     * Defines a function to be called when a mouse button has been released on this Scene.
     */    
    private onMouseReleased: ObjectProperty<EventHandler<MouseEvent>> = null;    

    /**
     * Creates a Scene for a specific root Node.
     */
    constructor​(root: Parent) {
        this.setEventDispatcher(new EventDispatcherImpl(this.eventHandlerManager));
        //root can be set via property that is not ReadOnlyProperty
        this.root.addListener(ChangeListener.fromFunc((observable: ObservableValue<Parent>, oldParent: Parent, newParent: Parent) => {
            if (oldParent !== null) {
                (<ParentUnlocker> <any> oldParent).traverse(Consumer.fromFunc((node: Node) => {
                    (<NodeUnlocker><any>node).setScene(null);
                }));
                this.htmlEventListenerManager.deinitialize();
            }
            if (newParent !== null) {
                this.htmlEventListenerManager = new HtmlEventListenerManager(newParent.getSkin().getElement(), this.eventBus);
                const counter: EventHandlerCounter = new EventHandlerCounter();
                (<ParentUnlocker><any>newParent).traverse(Consumer.fromFunc((node: Node) => {
                    (<NodeUnlocker><any>node).setScene(this);
                     counter.countAndAdd((<NodeUnlocker><any>node).getEventHandlerManager());
                }));
                counter.countAndAdd(this.eventHandlerManager);
                this.htmlEventListenerManager.initialize(counter.getResult());
            }
        }));
        this.setRoot(root);
    }
    
    /*
     * Gets the value of the property eventDispatcher.
     */
    public getEventDispatcher(): EventDispatcher {
        return this.eventDispatcher.get();
    }
    
    /**
     * Sets the value of the property eventDispatcher.
     */
    public setEventDispatcher​(value: EventDispatcher): void {
        this.eventDispatcher.set(value);
    }    

    /**
     * Specifies the event dispatcher for this scene.
     */    
    public eventDispatcherProperty(): ObjectProperty<EventDispatcher> {
        return this.eventDispatcher;
    }

    /**
     * Construct an event dispatch chain for this node.
     */
    public buildEventDispatchChain​(tail: EventDispatchChain): EventDispatchChain  {
        return tail.prepend(this.getEventDispatcher());
    }    

    /**
     * Gets the value of the property root.
     */    
    public getRoot(): Parent {
        return this.root.get();
    }

    /**
     * Sets the value of the property root.
     */    
    public setRoot​(value: Parent): void {
        this.root.set(value);
    }

    /**
     * Defines the root Node of the scene graph.
     */
    public rootProperty(): ObjectProperty<Parent> {
        return this.root;
    }
    
    /**
     * Defines a function to be called when some Node of this Scene has input focus and a key has been pressed.
     */    
    public onKeyPressedProperty(): ObjectProperty<EventHandler<KeyEvent>> {
        if (this.onKeyPressed === null) {
            this.onKeyPressed = this.eventHandlerManager.createEventProperty(KeyEvent.KEY_PRESSED);
        }
        return this.onKeyPressed;
    }

    /**
     * Gets the value of the property onKeyPressed.
     */    
    public getOnKeyPressed(): EventHandler<KeyEvent> {
        return this.onKeyPressed === null ? null : this.onKeyPressed.get();
    }

    /**
     * Sets the value of the property onKeyPressed.
     */
    public setOnKeyPressed​(value: EventHandler<KeyEvent>): void {
        this.onKeyPressedProperty().set(value);
    }

    /**
     * Defines a function to be called when some Node of this Scene has input focus and a key has been released.
     */
    public onKeyReleasedProperty(): ObjectProperty<EventHandler<KeyEvent>> {
        if (this.onKeyReleased === null) {
            this.onKeyReleased = this.eventHandlerManager.createEventProperty(KeyEvent.KEY_RELEASED);
        }
        return this.onKeyReleased;
    }

    /**
     * Gets the value of the property onKeyReleased.
     */    
    public getOnKeyReleased(): EventHandler<KeyEvent> {
        return this.onKeyReleased === null ? null : this.onKeyReleased.get();
    }

    /**
     * Sets the value of the property onKeyReleased.
     */
    public setOnKeyReleased(value: EventHandler<KeyEvent>): void {
        this.onKeyReleasedProperty().set(value);
    }

    /**
     * Defines a function to be called when some Node of this Scene has input focus and a key has been typed.
     */
    public onKeyTypedProperty(): ObjectProperty<EventHandler<KeyEvent>> {
        if (this.onKeyTyped === null) {
            this.onKeyTyped = this.eventHandlerManager.createEventProperty(KeyEvent.KEY_TYPED);
        }
        return this.onKeyTyped;
    }

    /**
     * Gets the value of the property onKeyTyped.
     */    
    public getOnKeyTyped(): EventHandler<KeyEvent> {
        return this.onKeyTyped === null ? null : this.onKeyTyped.get();
    }

    /**
     * Sets the value of the property onKeyTyped.
     */
    public setOnKeyTyped​(value: EventHandler<KeyEvent>): void {
        this.onKeyTypedProperty().set(value);
    }
    
    /**
     * Defines a function to be called when a mouse button has been clicked (pressed and released) on this Scene.
     */
    public onMouseClickedProperty(): ObjectProperty<EventHandler<MouseEvent>> {
        if (this.onMouseClicked === null) {
            this.onMouseClicked = this.eventHandlerManager.createEventProperty(MouseEvent.MOUSE_CLICKED);
        }
        return this.onMouseClicked;
    }

    /**
     * Gets the value of the property onMouseClicked.
     */    
    public getOnMouseClicked(): EventHandler<MouseEvent> {
        return this.onMouseClicked === null ? null : this.onMouseClicked.get();
    }
    
    /**
     * Sets the value of the property onMouseClicked.
     */
    public setOnMouseClicked(value: EventHandler<MouseEvent>): void {
        this.onMouseClickedProperty().set(value);
    }    

    /**
     * Defines a function to be called when a mouse button has been pressed on this Scene.
     */
    public onMousePressedProperty(): ObjectProperty<EventHandler<MouseEvent>> {
        if (this.onMousePressed === null) {
            this.onMousePressed = this.eventHandlerManager.createEventProperty(MouseEvent.MOUSE_PRESSED);
        }
        return this.onMousePressed;
    }

    /**
     * Gets the value of the property onMousePressed.
     */    
    public getOnMousePressed(): EventHandler<MouseEvent> {
        return this.onMousePressed === null ? null : this.onMousePressed.get();
    }
    
    /**
     * Sets the value of the property onMousePressed.
     */
    public setOnMousePressed(value: EventHandler<MouseEvent>): void {
        this.onMousePressedProperty().set(value);
    }  

    /**
     * Defines a function to be called when a mouse button has been released on this Scene.
     */
    public onMouseReleasedProperty(): ObjectProperty<EventHandler<MouseEvent>> {
        if (this.onMouseReleased === null) {
            this.onMouseReleased = this.eventHandlerManager.createEventProperty(MouseEvent.MOUSE_RELEASED);
        }
        return this.onMouseReleased;
    }

    /**
     * Gets the value of the property onMouseReleased.
     */    
    public getOnMouseReleased(): EventHandler<MouseEvent> {
        return this.onMouseReleased === null ? null : this.onMouseReleased.get();
    }
    
    /**
     * Sets the value of the property onMouseReleased.
     */
    public setOnMouseReleased(value: EventHandler<MouseEvent>): void {
        this.onMouseReleasedProperty().set(value);
    }    
    
    /**
     * Registers an event handler to this scene.
     */
    public addEventHandler<T extends Event>​(eventType: EventType<T>, eventHandler: EventHandler<T>): void {
        this.eventHandlerManager.addEventHandlerByType(eventType, eventHandler, true);
    }

    /**
     * Unregisters a previously registered event handler from this scene.
     */    
    public removeEventHandler​<T extends Event>(eventType: EventType<T>, eventHandler: EventHandler<T>): void {
        this.eventHandlerManager.removeEventHandlerByType(eventType, eventHandler);
    }  
    
    /**
     * Registers an event filter to this node.
     */
    public addEventFilter<T extends Event>(eventType: EventType<T>, eventFilter: EventHandler<T>): void {
        this.eventHandlerManager.addEventFilterByType(eventType, eventFilter);
    }
    
    /**
     * Unregisters a previously registered event filter from this node.
     */
    public removeEventFilter<T extends Event>(eventType: EventType<T>, eventFilter: EventHandler<T>): void {
        this.eventHandlerManager.removeEventFilterByType(eventType, eventFilter);
    }      
    
    /**
     * Use this method via SceneUnlocker.
     */
    private getEventBus(): EventBus {
        return this.eventBus;
    }
}

