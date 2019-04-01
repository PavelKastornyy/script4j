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

import { DOMWindow } from 'jsdom';

//import { System } from 'script4j.base';
//import 'jquery';
//
//let jQuery = null;
//let $ = null;
//
//if (!System.isNodeJs()) {
//    //@ts-ignore
//    jQuery = $ = window.$;
//}
//export { jQuery, $ }
 
/**
 * Note, that the first letter is capital as it is class. So, it is not jQuery object.
 * This module and class is used only for Node.js. Although it is possible to use both
 * for browsers and Node.js it will cause double loading of jQuery on Node.js because
 * dynamic `imports` (for example import after condition) are not supported in ES6,
 * so it will be necessary to import jquery anytime.
 */
export class JQuery {
    
    public static setWindow(window: DOMWindow): void {
        //@ts-ignore
        global.$ = global.jQuery = require("jquery")(window);
    }
}

