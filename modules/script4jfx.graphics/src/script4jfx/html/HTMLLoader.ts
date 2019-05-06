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

import 'reflect-metadata';

import { Node } from './../scene/Node';
import { Parent } from './../scene/Parent';
import { HTMLElementFXAttributes } from './HTMLElementFXAttributes';
import { LoadingElementQueue } from './../internal/html/LoadingElementQueue';
import { IllegalStateError } from 'script4j.base';
import { ParentUnlocker } from './../internal/scene/ParentUnlocker';
import "jquery";

export class HTMLLoader {
    
    private rootElement: HTMLElement = null;
    
    private root: Node = null;
    
    private controller: Object = null;
    
    private controllerHTMLFields: Object = null;
    
    public constructor(rootElement?: HTMLElement) {
        if (rootElement !== undefined) {
            this.rootElement = rootElement;
        }
    }
    
    public getRootElement(): HTMLElement {
        return this.rootElement;
    }
    
    public setRootElement(rootElement: HTMLElement) {
        this.rootElement = rootElement;
    }
    
    /**
     * Returns the root of the object hierarchy.
     */
    public getRoot<T>(): T {
        return <T><unknown>this.root;
    }
    
    /**
     * Sets the controller associated with the root object.
     */    
    setController​(controller: Object): void {
        this.controller = controller;
    }

    /**
     * Returns the controller associated with the root object.
     */
    public getController<T>(): T {
        return <T><unknown>this.controller;
    }
    
    /**
     * Loads an object hierarchy from a FXML document.
     */
    public load<T>(rootElement?: HTMLElement): T {
        if (rootElement !== undefined) {
            this.rootElement = rootElement;
        }
        if (this.rootElement === null) {
            throw new IllegalStateError("Root element is not set");
        }
        if (this.controller === null) {
            throw new IllegalStateError("Controller is not set");
        }
        this.controllerHTMLFields = this.getHTMLAnnotatedFields(this.controller);
        this.loadNodeAndElement(this.rootElement, null);
//        const selector: string = "[data-fx-id]";
//        let elements: HTMLElement[] = $(this.rootElement).find(selector).addBack(selector).toArray();
        return <T><unknown>this.root;
    }
    
    private getHTMLAnnotatedFields(controller: Object) {
        const properties: string[] = Reflect.getMetadata("HTML", controller);
        const result = {};
        properties.forEach(key => result[key] = controller[key]);
        return result;
    }
   
    private loadNodeAndElement(element: HTMLElement, parent: Parent): void {
        let newParent: Parent;
        if (element.hasAttribute(HTMLElementFXAttributes.ID)) {
            let fieldName: string = element.getAttribute(HTMLElementFXAttributes.ID);
            if (fieldName in this.controllerHTMLFields) {
                var klass = Reflect.getMetadata("design:type", this.controller, fieldName);
                LoadingElementQueue.addElement(element);
                let node: Node = new klass();
                newParent = <Parent>node;
                this.controller[fieldName] = node;
                if (parent === null) {
                    this.root = newParent;
                } else {
                    (<ParentUnlocker><unknown>parent).getChildren().add(node);
                }
            }
        }
        for (let i = 0; i < element.children.length; i++) {
            this.loadNodeAndElement(<HTMLElement>element.children[i], newParent);
        }
   }
}

