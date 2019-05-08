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
import { Pane } from 'script4jfx.graphics';
import { Scene } from 'script4jfx.graphics';
import { HTML } from './../../../src/script4jfx/loader/HTML';
import { HTMLLoader } from './../../../src/script4jfx/loader/HTMLLoader';
import { JQuery } from 'script4jfx.jquery';


describe('HTMLLoaderTest', () => {

    const dom: JSDOM = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
    const window: DOMWindow = dom.window;
    JQuery.setWindow(window);
    
    const html = `
            <div data-fx-id="pane1" id="paneOne">
                <div data-fx-id="pane2" id="paneTwo">
                    <div data-fx-id="pane3" id="paneThree">
                    </div>
                </div>
                <div data-fx-id="pane4" id="paneFour">
                </div>
            </div>
        `;
    
    class Controller {

        @HTML
        private pane1: Pane = null;    

        @HTML
        private pane2: Pane = null;
        
        @HTML
        private pane3: Pane = null;
        
        @HTML
        private pane4: Pane = null;
        
        constructor() {
            
        }
        
        public getPane1(): Pane {
            return this.pane1;
        }
        
        public getPane2(): Pane {
            return this.pane2;
        }
        
        public getPane3(): Pane {
            return this.pane3;
        }
        
        public getPane4(): Pane {
            return this.pane4;
        }

    }
    
//    beforeEach(function() {
//        console.log("aaa");
//    });
//

    it('load_withControllerInstance_htmlIsLoaded', () => {
        const htmlLoader: HTMLLoader = new HTMLLoader();
        const ctrl: Controller = new Controller();
        htmlLoader.setController(ctrl);
        const rootPane: Pane = htmlLoader.load(<HTMLElement>$.parseHTML(html.trim())[0]);
        
        assert.equal(rootPane, ctrl.getPane1());
        assert.equal(ctrl.getPane1().getSkin().getElement().id, "paneOne");
        assert.equal(ctrl.getPane2().getSkin().getElement().id, "paneTwo");
        assert.equal(ctrl.getPane3().getSkin().getElement().id, "paneThree");
        assert.equal(ctrl.getPane4().getSkin().getElement().id, "paneFour");
        
        assert.equal(ctrl.getPane1().getChildren().get(0), ctrl.getPane2());
        assert.equal(ctrl.getPane2().getChildren().get(0), ctrl.getPane3());
        assert.equal(ctrl.getPane3().getChildren().size(), 0);
        assert.equal(ctrl.getPane1().getChildren().get(1), ctrl.getPane4());
        assert.equal(ctrl.getPane4().getChildren().size(), 0);
    });
});

