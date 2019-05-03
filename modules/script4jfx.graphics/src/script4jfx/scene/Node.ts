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

import { Styleable } from './../css/Styleable';
import { EventTarget } from 'script4jfx.base';
import { EventDispatchChain } from 'script4jfx.base';
import { EventDispatcher } from 'script4jfx.base';
import { ObjectProperty } from 'script4jfx.base';
import { SimpleObjectProperty } from 'script4jfx.base';
import { ReadOnlyObjectProperty } from 'script4jfx.base';
import { ReadOnlyObjectWrapper } from 'script4jfx.base';
import { StringProperty } from 'script4jfx.base';
import { SimpleStringProperty } from 'script4jfx.base';
import { ObservableValue } from 'script4jfx.base';
import { EventHandler } from 'script4jfx.base';
import { KeyEvent } from './input/KeyEvent';
import { MouseEvent } from './input/MouseEvent';
import { Parent } from './Parent';
import { Scene } from './Scene';
import { NodeEventHandlerManager } from './../internal/scene/NodeEventHandlerManager';
import { EventType } from 'script4jfx.base';
import { Event } from 'script4jfx.base';
import { ObservableList } from 'script4jfx.base';
import { Consumer } from 'script4j.base';
import { Iterator } from 'script4j.base';
import { ParentUnlocker } from './../internal/scene/ParentUnlocker';
import { EventDispatcherImpl } from './../internal/scene/EventDispatcherImpl';
import { ChangeListener } from 'script4jfx.base';
import { HtmlSkinFactoryManager } from './../html/HtmlSkinFactoryManager';
import { HtmlSkinnable } from './../html/HtmlSkinnable';
import { HtmlSkin } from './../html/HtmlSkin';

export abstract class Node implements Styleable, EventTarget, HtmlSkinnable {

    /**
     * HtmlSkin
     */
    private readonly skin: ObjectProperty<HtmlSkin<Node>> = new SimpleObjectProperty<HtmlSkin<Node>>(null, this);
    
    /**
     * The parent of this Node.
     */
    private readonly parent: ReadOnlyObjectWrapper<Parent> = new ReadOnlyObjectWrapper<Parent>(null, this);
    
    /**
     * The Scene that this Node is part of.
     */
    private readonly scene: ReadOnlyObjectWrapper<Scene> = new ReadOnlyObjectWrapper<Scene>(null, this);
    
    /**
     * The manager of event handlers.
     */
    private readonly eventHandlerManager: NodeEventHandlerManager = new NodeEventHandlerManager(this);
    
    /**
     * Specifies the event dispatcher for this node.
     */
    private readonly eventDispatcher: ObjectProperty<EventDispatcher> = new SimpleObjectProperty<EventDispatcher>();
    
    /**
     * The id of this Node.
     */
    private id: StringProperty = null;

    /**
     * A string representation of the CSS style associated with this specific Node.
     */    
    private style: StringProperty = null;
    
    /**
     * Defines a function to be called when this Node or its child Node has input focus and a key has been pressed.
     */    
    private onKeyPressed: ObjectProperty<EventHandler<KeyEvent>> = null;

    /**
     * Defines a function to be called when this Node or its child Node has input focus and a key has been released.
     */
    private onKeyReleased: ObjectProperty<EventHandler<KeyEvent>> = null;
    
    /**
     * Defines a function to be called when this Node or its child Node has input focus and a key has been typed.
     */
    private onKeyTyped: ObjectProperty<EventHandler<KeyEvent>> = null;

    /**
     * Defines a function to be called when a mouse button has been clicked (pressed and released) on this Node.
     */    
    private onMouseClicked: ObjectProperty<EventHandler<MouseEvent>> = null;

    /**
     * Defines a function to be called when a mouse button has been pressed on this Node.
     */    
    private onMousePressed: ObjectProperty<EventHandler<MouseEvent>> = null;

    /**
     * Defines a function to be called when a mouse button has been released on this Node.
     */    
    private onMouseReleased: ObjectProperty<EventHandler<MouseEvent>> = null;
        
    /**
     * Sets the element, taken from buildHtmlElement().
     */
    constructor() {
        this.skin.addListener(ChangeListener.fromFunc((observable: ObservableValue<HtmlSkin<any>>, 
                oldSkin: HtmlSkin<any>, newSkin: HtmlSkin<any>) => {
            if (oldSkin !== null) {
                oldSkin.dispose();
            }
            if (newSkin !== null) {
                let id = newSkin.getId();
                if (id !== null) {
                    this.setId(id);
                }
                let style = newSkin.getStyle();
                if (style !== null) {
                    this.setStyle(style);
                }
            }
        }));
        this.setSkin(this.createDefaultSkin());
        this.setEventDispatcher(new EventDispatcherImpl(this.eventHandlerManager));
    }
    
    /**
     * Returns the html skin that renders this Node.
     */    
    public getSkin(): HtmlSkin<any> {
        return this.skin.get();
    }

    /**
     * Sets the html skin that will render this Node.
     */
    public setSkin​(value: HtmlSkin<any>): void {
        this.skin.set(value);
    }

    /**
     * Skin is responsible for rendering this Node.
     */
    public skinProperty(): ObjectProperty<HtmlSkin<any>> {
        return this.skin;
    }

    /**
     * The parent of this Node. If this Node has not been added to a scene graph, then parent will be null.
     */
    public parentProperty(): ReadOnlyObjectProperty<Parent> {
        return this.parent.getReadOnlyProperty();
    }

    /**
     * Gets the value of the property parent.
     */    
    public getParent(): Parent {
        return this.parent.get();
    }
    
    /**
     * Gets the value of the property scene.
     */
    public getScene(): Scene {
        return this.scene.get();
    }

    /**
     * The Scene that this Node is part of.
     */
    public sceneProperty(): ReadOnlyObjectProperty<Scene> {
        return this.scene.getReadOnlyProperty();
    }    
    
    /**
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
     * Specifies the event dispatcher for this node.
     */    
    public eventDispatcherProperty(): ObjectProperty<EventDispatcher> {
        return this.eventDispatcher;
    }    

    /**
     * Construct an event dispatch chain for this node.
     */
    public buildEventDispatchChain​(tail: EventDispatchChain): EventDispatchChain {
        tail.prepend(this.getEventDispatcher());
        const parent: Parent = this.getParent();
        if (parent !== null) {
            return parent.buildEventDispatchChain(tail);
        } else {
            const scene: Scene = this.getScene();
            if (scene !== null) {
                return scene.buildEventDispatchChain(tail);
            }
        }
        return tail;
    }
    
    /**
     * The id of this Node.
     */    
    public idProperty(): StringProperty {
        if (this.id === null) {
            this.id = new SimpleStringProperty(null, this);
            this.id.addListener(ChangeListener.fromFunc((observable: ObservableValue<string>, oldValue: string, 
                    newValue: string) => {
                this.getSkin().setId(newValue);
            }));
        }
        return this.id;
    }

    /**
     * Sets the value of the property id.
     */    
    public setId​(value: string): void {
        this.idProperty().set(value);
    }

    /**
     * The id of this Node.
     */    
    public getId(): string {
        return this.id === null ? null : this.id.get();
    }

    /**
     * A string representation of the CSS style associated with this specific Node. 
     * This is analogous to the "style" attribute of an HTML element. Note that, like the HTML 
     * style attribute, this variable contains style properties and values and not the selector 
     * portion of a style rule.
     */    
    public styleProperty(): StringProperty {
        if (this.style === null) {
            this.style = new SimpleStringProperty(null, this);
            this.style.addListener(ChangeListener.fromFunc((observable: ObservableValue<string>, 
                    oldValue: string, newValue: string) => {
                this.getSkin().setStyle(newValue);
            }));
        }
        return this.style;
    }
    
    /**
     *  A string representation of the CSS style associated with this specific Node.
     */
    public getStyle(): string {
        return this.style === null ? null : this.style.get();
    }

    /**
     * A string representation of the CSS style associated with this specific Node.
     */    
    public setStyle​(value: string): void {
        this.styleProperty().set(value);
    }

    /**
     * Defines a function to be called when this Node or its child Node has input focus and a key has been pressed.
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
     * Defines a function to be called when this Node or its child Node has input focus and a key has been released.
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
     * Defines a function to be called when this Node or its child Node has input focus and a key has been typed.
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
     * Defines a function to be called when a mouse button has been clicked (pressed and released) on this Node.
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
     * Defines a function to be called when a mouse button has been pressed on this Node.
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
     * Defines a function to be called when a mouse button has been released on this Node.
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
     * Registers an event handler to this node.
     */
    public addEventHandler<T extends Event>​(eventType: EventType<T>, eventHandler: EventHandler<T>): void {
        this.eventHandlerManager.addEventHandlerByType(eventType, eventHandler, true);
    }

    /**
     * Unregisters a previously registered event handler from this node.
     */    
    public removeEventHandler<T extends Event>(eventType: EventType<T>, eventHandler: EventHandler<T>): void {
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
     * Fires the specified event.
     */    
    public fireEvent(event: Event): void {
        Event.fireEvent(this, event);
    }
    
    /**
     * Creates a new instance of the default skin for this Node. By default factory from HtmlSkinFactoryManager
     * is used.
     */
    protected createDefaultSkin(): HtmlSkin<any> {
        return HtmlSkinFactoryManager.getFactory(this.getClass()).create(this);
    }
    
    /**
     * Use this method via NodeUnlocker.
     */
    private setParent(value: Parent): void {
        this.parent.set(value);
    }
    
    /**
     * Use this method via NodeUnlocker.
     */
    private setScene(scene: Scene): void {
        this.scene.set(scene);
    }
    
    /**
     * Use this method via NodeUnlocker.
     */
     private getEventHandlerManager(): NodeEventHandlerManager {
         return this.eventHandlerManager;
     }
     
    /**
     * Use this method via NodeUnlocker.
     */
    private traverse(consumer: Consumer<Node>) {
        consumer.accept(this);
        if (this instanceof Parent) {
            const children: ObservableList<Node> = (<ParentUnlocker><any>this).getChildren();
            const iterator: Iterator<Node> = children.iterator();
            while (iterator.hasNext()) {
                iterator.next().traverse(consumer);
            }
        }
    }
}