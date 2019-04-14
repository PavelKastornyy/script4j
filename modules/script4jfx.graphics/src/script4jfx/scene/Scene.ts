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
import { ObservableValue } from 'script4jfx.base';
import { Parent } from './Parent';
import { Node } from './Node';
import { EventType } from 'script4jfx.base';
import { SceneEventHandlerManager } from './../internal/scene/SceneEventHandlerManager';
import { EventHandlerListener } from './../internal/scene/EventHandlerListener';
import { AbstractEventHandlerManager } from './../internal/scene/AbstractEventHandlerManager';
import { EventHandler } from 'script4jfx.base';
import { KeyEvent } from './input/KeyEvent';
import { Event } from 'script4jfx.base';

/**
 * Scene doesn't have element.
 */
export class Scene implements EventTarget {

    private static EventHandlerListenerImpl = class implements EventHandlerListener {
        
        private readonly scene: Scene;
        
        constructor(scene: Scene) {
            this.scene = scene;
        }
        
        public handlerWasAdded(eventType: EventType<any>, manager: AbstractEventHandlerManager): void {
            console.log("Hadnler was added, type:" + eventType + ", manager:" + manager);
        }
    
        public handlerWasRemoved(eventType: EventType<any>, manager: AbstractEventHandlerManager): void {
            console.log("Hadnler was removed, type:" + eventType + ", manager:" + manager);
        }
    };

    /**
     * Defines the root Node of the scene graph.
     */    
    private readonly root: ObjectProperty<Parent> = new SimpleObjectProperty<Parent>();
    
    /**
     * This listener will be use by all EventHandlerManagers of all Nodes on this Scene and of this Scene.
     */
    private readonly eventHandlerListener: EventHandlerListener = new Scene.EventHandlerListenerImpl(this);
    
    /**
     * The manager of event handlers.
     */
    private readonly eventHandlerManager: SceneEventHandlerManager = 
            new SceneEventHandlerManager(this, this.eventHandlerListener);    
    
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
     * Creates a Scene for a specific root Node.
     */
    constructor​(root: Parent) {
        this.root.addListener((observable: ObservableValue<Parent>, oldParent: Parent, newParent: Parent) => {
            if (oldParent !== null) {
                (<any>oldParent).setSceneRecursively(null);
            }
            if (newParent !== null) {
                (<any> newParent).setSceneRecursively(this);
            }
        });
        this.setRoot(root);
    }

    public buildEventDispatchChain​(tail: EventDispatchChain): EventDispatchChain  {
        throw new Error();
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
            this.onKeyPressed = this.eventHandlerManager.createOnKeyPressed();
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
            this.onKeyReleased = this.eventHandlerManager.createOnKeyReleased();
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
            this.onKeyTyped = this.eventHandlerManager.createOnKeyTyped();
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
     * Registers an event handler to this scene.
     */
    public addEventHandler<T extends Event>​(eventType: EventType<T>, eventHandler: EventHandler<T>): void {
        this.eventHandlerManager.addMultipleEventHandlerByType(eventType, eventHandler);
    }

    /**
     * Unregisters a previously registered event handler from this scene.
     */    
    public removeEventHandler​<T extends Event>(eventType: EventType<T>, eventHandler: EventHandler<T>): void {
        this.eventHandlerManager.removeMultipleEventHandlerByType(eventType, eventHandler);
    }    
    
    /**
     * This method is private, but it is used in Node, as there is no package access in TS.
     */
    private getHandlerListener(): EventHandlerListener {
        return this.eventHandlerListener;
    }
   
}

