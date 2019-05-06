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
import { afterEach } from 'mocha';
import { JSDOM } from 'jsdom';
import { DOMWindow } from 'jsdom';
import { Button } from './../../../../src/script4jfx/scene/control/Button';
import { ButtonSkin } from './../../../../src/script4jfx/scene/control/skin/ButtonSkin';
import { JQuery } from 'script4jfx.jquery';

describe('ButtonTest', () => {

    const dom: JSDOM = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
    const window: DOMWindow = dom.window;
    JQuery.setWindow(window);
//    
//    afterEach(function() {
//        $(window.document.body).empty();
//    });
    
    it('setText_notNullText_textSetToElement', () => {
        let button: Button = new Button();
        button.setText("theText");
        assert.equal((<ButtonSkin> button.getSkin()).getText(), "theText");
    });
    
    it('getText_textExistsInElement_correctText', () => {
        const html = '<button type="button">theText</button>';
        const element: HTMLElement = <HTMLElement>$.parseHTML(html.trim())[0];
        let button: Button = new Button();
        const skin: ButtonSkin = new ButtonSkin(button, element);
        button.setSkin(skin);
        assert.equal(button.getText(), "theText");
    });
});



