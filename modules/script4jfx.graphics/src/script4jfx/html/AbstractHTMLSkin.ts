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

import { HTMLSkin } from './HTMLSkin';
import { HTMLSkinnable } from './HTMLSkinnable';
import { Node } from './../scene/Node';
import { Scene } from './../scene/Scene';
import { JQueryDataKeys } from './../internal/html/JQueryDataKeys';
import { ChangeListener } from 'script4jfx.base';
import { ObservableValue } from 'script4jfx.base';
import 'jquery';

export abstract class AbstractHTMLSkin<T extends Node> implements HTMLSkin<T> {
    
    private readonly node: T;
    
    private readonly element: HTMLElement;
    
    private sceneListener: ChangeListener<Scene> = null;
    
    /**
     * Important! When Node state changes it must change its Skin. However, Skin can also change Node
     * state. So, we get circular events. In order to prevent it Skin before calling Node setters
     * must change changeBlocked value to false and in ALL own setters checks its state.
     */
    private changeBlocked: boolean = false;
    
    public constructor(node: T, element: HTMLElement) {
        this.node = node;
        if (element !== null) {
            this.element = element;
            if (this.element.className === "") {
                this.element.className = this.getDefaultCssClass();
            } else {
                this.element.className = this.getDefaultCssClass() + " " + this.element.className;
            }
        } else {
            this.element = this.createDefaultElement();
        }
    }
    
    public initialize(): void {
        //if Node is on Scene then there is link in jquery between the Node and the element.
        //if not, the link is removed. Otherwise all created node will remain in memory.
        this.sceneListener = ChangeListener.fromFunc((observable: ObservableValue<Scene>, 
                oldScene: Scene, newScene: Scene) => {
            if (newScene !== null) {
                $(this.element).data(JQueryDataKeys.NODE, this.node);
            } else {
                $(this.element).removeData(JQueryDataKeys.NODE);
            }
        });
        this.node.sceneProperty().addListener(this.sceneListener);
        let id = this.getId();
        if (id !== null) {
            try {
                this.setChangeBlocked(true);
                this.node.setId(id);
            } finally {
                this.setChangeBlocked(false);
            }
        }
        let style = this.getStyle();
        if (style !== null) {
            try {
                this.setChangeBlocked(true);
                this.node.setStyle(style);
            } finally {
                this.setChangeBlocked(false);
            }
        }
    }
    
    public dispose(): void {
        this.node.sceneProperty().removeListener(this.sceneListener);
        this.sceneListener = null;
        if (this.node.getScene() !== null) {
            $(this.element).removeData(JQueryDataKeys.NODE);
        }
    }
    
    public setId(id: string): void {
        if (this.isChangeBlocked()) {
            return;
        }
        this.element.id = id;
    }
    
    public getId(): string {
        let id = this.element.id;
        if (id !== "") {
            return id;
        } else {
            return null;
        }
    }
    
    public setStyle(style: string): void {
        if (this.isChangeBlocked()) {
            return;
        }
        this.element.style.cssText = style;
    }
    
    public getStyle(): string {
        let style = this.element.style.cssText;
        if (style !== "") {
            return style;
        } else {
            return null;
        }
    }

    public getSkinnable(): T {
        return this.node;
    }
    
    public getElement(): HTMLElement {
        return this.element;
    }
    
    public abstract getDefaultCssClass(): string;
    
    protected isChangeBlocked(): boolean {
        return this.changeBlocked;
    }
    
    protected setChangeBlocked(changeBlocked: boolean): void {
        this.changeBlocked = changeBlocked;
    }
    
    protected abstract createDefaultElement(): HTMLElement;
}

