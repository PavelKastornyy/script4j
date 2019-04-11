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
import { Node } from './../../../src/script4jfx/scene/Node';
import { JQuery } from 'script4jfx.jquery';

describe('NodeTest', () => {

    const dom: JSDOM = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
    const window: DOMWindow = dom.window;
    JQuery.setWindow(window);
    
    class NodeImpl extends Node {
        
        protected buildElement(): HTMLElement {
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
        let node: NodeImpl = new NodeImpl();
        node.setId("TheId");
        assert.isTrue(node.getId().equals("TheId"));
        assert.isTrue($(node.getElement()).attr("id").equals("TheId"));
    });
});