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
import { ObservableList } from 'script4jfx.base';
import { EventType } from 'script4jfx.base';
import { Event } from 'script4jfx.base';
import { EventHandler } from 'script4jfx.base';
import { KeyEvent } from './../../../../src/script4jfx/scene/input/KeyEvent';
import { InputEvent } from './../../../../src/script4jfx/scene/input/InputEvent';
import { HandlerTree } from './../../../../src/script4jfx/internal/scene/HandlerTree';

describe('HandlerTreeTest', () => {

    it('addHandler_firstHandlerAsLeaf_branchIsBuilt', () => {
        const tree: HandlerTree = new HandlerTree();
        const handler: EventHandler<KeyEvent> = EventHandler.fromFunc((e: KeyEvent) => {});
        tree.addHandler(KeyEvent.KEY_PRESSED, handler, false);
        const root: HandlerTree.Node<Event> = tree.getRoot();
        assert.equal(root.getEventType(), Event.ANY);
        assert.equal(root
                .getChildren()
                .get(InputEvent.ANY)
                .getChildren()
                .get(KeyEvent.ANY)
                .getChildren()
                .get(KeyEvent.KEY_PRESSED)
                .getHandlers()
                .get(0), handler);
    });
    
    it('removeHandler_singularHandler_branchRemoved', () => {
        const tree: HandlerTree = new HandlerTree();
        const handler: EventHandler<KeyEvent> = EventHandler.fromFunc((e: KeyEvent) => {});
        tree.addHandler(KeyEvent.KEY_PRESSED, handler, false);
        tree.removeHandler(KeyEvent.KEY_PRESSED, handler);
        assert.equal(tree.getRoot(), null);
    });
    
    it('removeHandler_leafHandler_pieceOfBranchIsRemoved', () => {
        const tree: HandlerTree = new HandlerTree();
        const handler: EventHandler<KeyEvent> = EventHandler.fromFunc((e: KeyEvent) => {});
        tree.addHandler(KeyEvent.KEY_PRESSED, handler, false);
        tree.addHandler(InputEvent.ANY, handler, false);
        tree.removeHandler(KeyEvent.KEY_PRESSED, handler);
        const root: HandlerTree.Node<Event> = tree.getRoot();
        assert.equal(root.getEventType(), Event.ANY);
        assert.equal(root
                .getChildren()
                .get(InputEvent.ANY)
                .getChildren(), null);
        assert.equal(root
                .getChildren()
                .get(InputEvent.ANY)
                .getHandlers()
                .get(0), handler);
    });

});    



