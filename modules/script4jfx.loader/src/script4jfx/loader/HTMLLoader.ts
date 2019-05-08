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

import { Node } from 'script4jfx.graphics';
import { Pane } from 'script4jfx.graphics';
import { AbstractHTMLSkin } from 'script4jfx.graphics';
import { LabelSkin } from 'script4jfx.controls';
import { Label } from 'script4jfx.controls';
import { LoadedHTMLElementQueue } from 'script4jfx.graphics';
import { IllegalStateError } from 'script4j.base';
import { Map } from 'script4j.base';
import { HashMap } from 'script4j.base';
import { List } from 'script4j.base';
import { ArrayList } from 'script4j.base';
import { BuilderFactory } from 'script4jfx.base';
import { Builder } from 'script4jfx.base';
import { Script4JFXBuilderFactory } from './Script4JFXBuilderFactory';
import { Class } from 'script4j.base';
import "jquery";

export class HTMLLoader {
    
    public static readonly FX_ID_ATTRIBUTE: string = "data-fx-id";

    private static readonly DEFAULT_BUILDER_FACTORY: BuilderFactory = new Script4JFXBuilderFactory();
    
    private rootElement: HTMLElement = null;
    
    private root: Node = null;
    
    private controller: Object = null;
    
    private controllerHTMLFields: Object = null;
    
    private builderFactory: BuilderFactory = null;
    
    private loadedNodesById: Map<string, Node> = new HashMap();
    
    private loadedLabels: List<Label> = new ArrayList<Label>();
    
    public constructor(rootElement?: HTMLElement, builderFactory?: BuilderFactory) {
        if (rootElement !== undefined) {
            this.rootElement = rootElement;
        }
        if (builderFactory !== undefined) {
            this.builderFactory = builderFactory;
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
        this.bindLabels();
        this.loadedNodesById.clear();
        this.loadedLabels.clear();
//        const selector: string = "[data-fx-id]";
//        let elements: HTMLElement[] = $(this.rootElement).find(selector).addBack(selector).toArray();
        return <T><unknown>this.root;
    }

    /**
     * Returns the builder factory used by this loader.
     */    
    public getBuilderFactory() {
        return this.builderFactory;
    }	

    /**
     * Sets the builder factory used by this loader.
     */    
    public setBuilderFactory​(builderFactory: BuilderFactory): void {
        this.builderFactory = builderFactory;
    }
    
    private getHTMLAnnotatedFields(controller: Object) {
        const properties: string[] = Reflect.getMetadata("HTML", controller);
        const result = {};
        properties.forEach(key => result[key] = controller[key]);
        return result;
    }
   
    private loadNodeAndElement(element: HTMLElement, parent: Node): void {
        let node: Node = null;
        if (element.hasAttribute(HTMLLoader.FX_ID_ATTRIBUTE)) {
            let fieldName: string = element.getAttribute(HTMLLoader.FX_ID_ATTRIBUTE);
            if (fieldName in this.controllerHTMLFields) {
                let construc = Reflect.getMetadata("design:type", this.controller, fieldName);
                const klass: Class<any> = Class.forConstructor(construc);
                LoadedHTMLElementQueue.addElement(element);
                let builder: Builder<Node> = null;
                if (this.builderFactory !== null) {
                    builder = <Builder<Node>>this.builderFactory.getBuilder(klass);
                }
                if (builder === null) {
                    builder = <Builder<Node>> HTMLLoader.DEFAULT_BUILDER_FACTORY.getBuilder(klass);
                }
                if (builder !== null) {
                    node = builder.build();
                } else {
                    throw new Error("Could not find builder for Node of " + klass.getName());
                }
                this.controller[fieldName] = node;
                if (node.getId() !== null) {
                    this.loadedNodesById.put(node.getId(), node);
                }
                if (node instanceof Label) {
                    this.loadedLabels.add(node);
                }
                if (parent === null) {
                    this.root = node;
                } else {
                    if (parent instanceof Pane) {
                        (<Pane>parent).getChildren().add(node);
                    }
                }
            }
        }
        for (let i = 0; i < element.children.length; i++) {
            this.loadNodeAndElement(<HTMLElement>element.children[i], node);
        }
   }
   
   private bindLabels(): void {
       for (let i: number = 0; i < this.loadedLabels.size(); i++) {
           const label: Label = this.loadedLabels.get(0);
           const node: Node = this.loadedNodesById.get((<LabelSkin> label.getSkin()).getLabelFor());
           if (node !== null) {
               label.setLabelFor(node);
           }
       }
   }
}

