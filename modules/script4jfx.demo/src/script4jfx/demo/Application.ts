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

import { Pane } from 'script4jfx.graphics';
import 'jquery';
 
export class Application {
    
    public static main(): void {
        let parent: Pane = new Pane();
        parent.setId("pane1");
        parent.setStyle("width: 200px; height:200px; background-color:green; padding:10px;");
        let child: Pane = new Pane();
        child.setId("pane2");
        child.setStyle("width: 100%; height:100%; background-color:yellow;");
        parent.getChildren().add(child);
        
        $("body").append(parent.getElement());
    }
}

