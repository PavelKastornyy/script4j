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

export abstract class Parent extends Node {
    
    private readonly children: ObservableList<Node> = FXCollections.observableArrayList();

    public constructor() {
        super();
        this.children.addListener((change)=> {
            while (change.next()) {
                //after set method both added and removed are true
                if (change.wasRemoved()) {
                    let removedElements: HTMLElement[] = new Array();
                    change.getRemoved().forEach((node) => {
                        this.modifyRemovedChild(node);
                        removedElements.push(node.getElement());
                    });
                    $(removedElements).remove();
                }
                if (change.wasAdded()) {
                    let addedElements: HTMLElement[] = new Array();
                    change.getAddedSubList().forEach((node)=> {
                        this.modifyAddedChild(node);
                        addedElements.push(node.getElement());
                    });
                    if (change.getFrom() === 0) {
                        $(this.getElement()).prepend(addedElements);
                    } else {
                        let afterElement = $(this.getElement()).children().eq(change.getFrom() - 1)[0];
                        $(afterElement).after(addedElements);
                    }
                }
            }
        });
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
    
    private modifyRemovedChild(node: Node): void {
        (<any>node)._setParent(null);
        //null scene from removed node and its possible children
        if (this.getScene() !== null) {
            (<any>node)._setSceneRecursively(null);
        }
    }
    
    private modifyAddedChild(node: Node): void {
        (<any>node)._setParent(this);
        //add scene for added node and its possible children
        if (this.getScene() !== null) {
            (<any> node)._setSceneRecursively(this.getScene());
        }
    }
}

