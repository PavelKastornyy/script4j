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

import { Pane } from './../../scene/layout/Pane';
import { PaneSkin } from './../../scene/layout/skin/PaneSkin';
import { HTMLSkinFactoryManager } from './../../html/HTMLSkinFactoryManager';
import { HTMLSkinFactory } from './../../html/HTMLSkinFactory';
import 'jquery';

export class ModuleSkinFactoryRegistrator {
    
    private static hasRegistered: boolean = ModuleSkinFactoryRegistrator.register();
    
    private static register(): boolean {
        HTMLSkinFactoryManager.registerFactory(Pane.class(), HTMLSkinFactory.fromFunc((pane: Pane, element: HTMLElement) => {
            return new PaneSkin(pane, element);
        }));
        return true;
    }
}    

