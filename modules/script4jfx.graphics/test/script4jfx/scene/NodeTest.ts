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

import { assert } from 'chai';
import { describe } from 'mocha';
import { it } from 'mocha';
import { beforeEach } from 'mocha';
import { JSDOM } from 'jsdom';
import { DOMWindow } from 'jsdom';
import { ObservableList } from 'script4jfx.base';
import { Node } from './../../../src/script4jfx/scene/Node';
import { Parent } from './../../../src/script4jfx/scene/Parent';
import { Scene } from './../../../src/script4jfx/scene/Scene';
import { JQuery } from 'script4jfx.jquery';


describe('NodeTest', () => {

    const dom: JSDOM = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
    const window: DOMWindow = dom.window;
    JQuery.setWindow(window);
    
    class NodeImpl extends Node {
        
        protected createElement(): HTMLElement {
            return $('<div/>')[0];
        }
    }
    
    class ParentImpl extends Parent {
        
        public getChildren(): ObservableList<Node> {
            return super.getChildren();
        }
        
        protected createElement(): HTMLElement {
            return $('<div/>')[0];
        }
    }

//    beforeEach(function() {
//        console.log("aaa");
//    });
//
//    it('testMouseEvent', () => {
//        const document: Document = dom.window.document;
//        const div: Element = document.createElement('div');
//        document.body.appendChild(div);
//
//        div.addEventListener('click', function (e) {
//          console.log('I was clicked.');
//          console.log(e);
//        });
//
//        const event: Event = document.createEvent('CustomEvent');
//        event.initEvent('click', true, true);
//        div.dispatchEvent(event);
//    });
//    
//    it('testKeyboardEvent', () => {
//        const document: Document = dom.window.document;
//        const div: Element = document.createElement('div');
//        document.body.appendChild(div);
//
//        div.addEventListener('keydown', function (e: KeyboardEvent) {
//          console.log('I was keydown.');
//          console.log(e);
//          console.log(e.keyCode);
//        });
//        
//        div.addEventListener('keypress', function (e: KeyboardEvent) {
//          console.log('I was pressed.');
//          console.log(e);
//          console.log(e.keyCode);
//        });
//
//        var event1 = new window.KeyboardEvent("keydown", {key: "z", char: "z", keyCode: 90} as any);
//        var event2 = new window.KeyboardEvent("keypress", {key: "z", char: "z", keyCode: 90} as any);
//        //document.dispatchEvent(event);
//        div.dispatchEvent(event1);
//        div.dispatchEvent(event2);
//    });  
    
    it('setId​_notNullableId_idIsSet', () => {
        const node: NodeImpl = new NodeImpl();
        node.setId("TheId");
        assert.isTrue(node.getId().equals("TheId"));
        assert.isTrue($(node.getElement()).attr("id").equals("TheId"));
    });
    
    /**
     * integration test, must be redone.
     */
    it('setScene​_treeOfNodes_sceneIsSetToAll', () => {
        const parent1: ParentImpl = new ParentImpl();
        const parent2: ParentImpl = new ParentImpl();
        const node: Node = new NodeImpl();
        parent2.getChildren().add(node);
        parent1.getChildren().add(parent2);
        const scene: Scene = new Scene(parent1);
        assert.equal(scene, parent1.getScene());
        assert.equal(scene, parent2.getScene());
        assert.equal(scene, node.getScene());
        scene.setRoot(null);
        assert.equal(null, parent1.getScene());
        assert.equal(null, parent2.getScene());
        assert.equal(null, node.getScene());
        scene.setRoot(parent1);
        parent1.getChildren().clear();
        assert.equal(scene, parent1.getScene());
        assert.equal(null, parent2.getScene());
        assert.equal(null, node.getScene());
    });
});