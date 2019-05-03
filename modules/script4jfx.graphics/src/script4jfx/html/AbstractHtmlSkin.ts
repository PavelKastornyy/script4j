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

import { HtmlSkin } from './HtmlSkin';
import { HtmlSkinnable } from './HtmlSkinnable';
import { Node } from './../scene/Node';
import { Scene } from './../scene/Scene';
import { JQueryDataKeys } from './../internal/scene/JQueryDataKeys';
import { ChangeListener } from 'script4jfx.base';
import { ObservableValue } from 'script4jfx.base';
import 'jquery';

export abstract class AbstractHtmlSkin<T extends Node> implements HtmlSkin<T> {
    
    private readonly node: T;
    
    private readonly element: HTMLElement;
    
    private readonly sceneListener: ChangeListener<Scene>;
    
    public constructor(node: T) {
        this.node = node;
        this.element = this.createElement();
        //if Node is on Scene then there is link in jquery between the Node and the element.
        //if not, the link is removed.
        this.sceneListener = ChangeListener.fromFunc((observable: ObservableValue<Scene>, 
                oldScene: Scene, newScene: Scene) => {
            if (newScene !== null) {
                $(this.element).data(JQueryDataKeys.node, this);
            } else {
                $(this.element).removeData(JQueryDataKeys.node);
            }
        })
        this.node.sceneProperty().addListener(this.sceneListener);
    }
    
    public dispose(): void {
        this.node.sceneProperty().removeListener(this.sceneListener);
        if (this.node.getScene() !== null) {
            $(this.element).removeData(JQueryDataKeys.node);
        }
    }
    
    public setId(id: string): void {
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
    
    protected abstract createElement(): HTMLElement;
    
}
