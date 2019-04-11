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
import { TextInputControl } from './../../../../src/script4jfx/scene/control/TextInputControl';
import { JQuery } from 'script4jfx.jquery';

describe('TextInputControlTest', () => {

    const dom: JSDOM = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
    const window: DOMWindow = dom.window;
    JQuery.setWindow(window);
    
    class TextInputControlImpl extends TextInputControl {
        
        protected buildElement(): HTMLElement {
            return $('<textarea/>')[0];
        }
    }
    
    afterEach(function() {
        $(window.document.body).empty();
    });
    
    it('constructor_textChanged_eventIsFired', () => {
        let control: TextInputControlImpl = new TextInputControlImpl();
        const document: Document = dom.window.document;
        document.body.appendChild(control.getElement());
        control.getElement().focus();
        var event = new window.KeyboardEvent("keypress", {key: "z"} as any);
        
        document.dispatchEvent(event);
        console.log(dom.serialize());
        console.log((<HTMLInputElement>control.getElement()).value);
    });
});

