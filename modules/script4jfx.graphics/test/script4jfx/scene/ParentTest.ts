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
import { Parent } from './../../../src/script4jfx/scene/Parent';
import { Node } from './../../../src/script4jfx/scene/Node';
import { JQuery } from 'script4jfx.jquery';
import { ObservableList } from 'script4jfx.base';

describe('ParentTest', () => {

    const dom: JSDOM = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
    const window: DOMWindow = dom.window;
    JQuery.setWindow(window);
    
    class ParentImpl extends Parent {
        
        protected buildElement(): HTMLElement {
            return $('<div/>', {})[0];
        }
        
        public getChildren(): ObservableList<Node> {
            return super.getChildren();
        }
    }

    it('constructor_addingChild_childIsAdded', () => {
        let parent: ParentImpl = new ParentImpl();
        parent.setId("Parent");
        let child: Parent = new ParentImpl();
        child.setId("Child");
        parent.getChildren().add(child);
        assert.equal($(parent.getElement()).children().length, 1);
        assert.isTrue($(parent.getElement()).children().eq(0).attr("id").equals("Child"));
    });
    
    it('constructor_settingChild_childIsSet', () => {
        let parent: ParentImpl = new ParentImpl();
        parent.setId("Parent");
        let child0: Parent = new ParentImpl();
        child0.setId("Child0");
        parent.getChildren().add(child0);
        
        let child1: Parent = new ParentImpl();
        child1.setId("Child1");
        parent.getChildren().add(child1);
        
        let child2: Parent = new ParentImpl();
        child2.setId("Child2");
        parent.getChildren().add(child2);
        
        let child3: Parent = new ParentImpl();
        child3.setId("Child3");
        parent.getChildren().set(1, child3);
        
        assert.equal($(parent.getElement()).children().length, 3);
        assert.isTrue($(parent.getElement()).children().eq(0).attr("id").equals("Child0"));
        assert.isTrue($(parent.getElement()).children().eq(1).attr("id").equals("Child3"));
        assert.isTrue($(parent.getElement()).children().eq(2).attr("id").equals("Child2"));
        
        
//        let children: ParentImpl[] = [];
//        children[0] = new ParentImpl();
//        children[0].setId("id0");
//        children[1] = new ParentImpl();
//        children[1].setId("id1");
//        parent.getChildren().
    });
});    

