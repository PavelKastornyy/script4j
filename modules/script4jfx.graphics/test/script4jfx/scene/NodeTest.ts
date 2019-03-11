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
import { beforeEach} from 'mocha';
import { JSDOM } from 'jsdom';
import { DOMWindow } from 'jsdom';

import { Node } from './../../../src/script4jfx/scene/Node';
import {ArrayList} from 'script4j.base';
import { FXCollections } from 'script4jfx.base';

describe('NodeTest', () => {

    //const { JSDOM } = jsdom;
    let dom: JSDOM = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
    let window: DOMWindow = dom.window;

    beforeEach(function() {
        console.log("aaa");
    });

    it('test', () => {
        const document: Document = dom.window.document;
        const div: Element = document.createElement('div');
        document.body.appendChild(div);

        div.addEventListener('click', function (e) {
          console.log('I was clicked.');
          console.log(e);
        });

        const event: Event = document.createEvent('CustomEvent');
        event.initEvent('click', true, true);
        div.dispatchEvent(event);
    });
});