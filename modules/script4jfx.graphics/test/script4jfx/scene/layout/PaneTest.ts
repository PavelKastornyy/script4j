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
import { Pane } from './../../../../src/script4jfx/scene/layout/Pane';
import { Scene } from './../../../../src/script4jfx/scene/Scene';
import { JQuery } from 'script4jfx.jquery';


describe('PaneTest', () => {

    const dom: JSDOM = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
    const window: DOMWindow = dom.window;
    JQuery.setWindow(window);
    
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
        const pane: Pane = new Pane();
        pane.setId("TheId");
        assert.isTrue(pane.getId().equals("TheId"));
        assert.isTrue($(pane.getSkin().getElement()).attr("id").equals("TheId"));
    });
    
    it('setScene​_treeOfNodes_sceneIsSetToAll', () => {
        const parent1: Pane = new Pane();
        const parent2: Pane = new Pane();
        const pane: Pane = new Pane();
        parent2.getChildren().add(pane);
        parent1.getChildren().add(parent2);
        const scene: Scene = new Scene(parent1);
        assert.equal(scene, parent1.getScene());
        assert.equal(scene, parent2.getScene());
        assert.equal(scene, pane.getScene());
        scene.setRoot(null);
        assert.equal(null, parent1.getScene());
        assert.equal(null, parent2.getScene());
        assert.equal(null, pane.getScene());
        scene.setRoot(parent1);
        parent1.getChildren().clear();
        assert.equal(scene, parent1.getScene());
        assert.equal(null, parent2.getScene());
        assert.equal(null, pane.getScene());
    });
    
    it('constructor_addingChild_childIsAdded', () => {
        let child: Pane = new Pane();
        child.setId("Child");
        let parent: Pane = new Pane(child);
        parent.setId("Parent");
        assert.equal($(parent.getSkin().getElement()).children().length, 1);
        assert.isTrue($(parent.getSkin().getElement()).children().eq(0).attr("id").equals("Child"));
    });
    
    it('settingChildren_childrenOrder_childrenInCorrectOrder', () => {
        let parent: Pane = new Pane();
        parent.setId("Parent");
        let child0: Pane = new Pane();
        child0.setId("Child0");
        parent.getChildren().add(child0);
        
        let child1: Pane = new Pane();
        child1.setId("Child1");
        parent.getChildren().add(child1);
        
        let child2: Pane = new Pane();
        child2.setId("Child2");
        parent.getChildren().add(child2);
        
        let child3: Pane = new Pane();
        child3.setId("Child3");
        parent.getChildren().set(1, child3);
        
        let children = $(parent.getSkin().getElement()).children();
        assert.equal(children.length, 3);
        assert.isTrue(children.eq(0).attr("id").equals("Child0"));
        assert.isTrue(children.eq(1).attr("id").equals("Child3"));
        assert.isTrue(children.eq(2).attr("id").equals("Child2"));
    });    
});