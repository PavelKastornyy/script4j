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

import { TextArea } from './../../scene/control/TextArea';
import { TextAreaSkin } from './../../scene/control/skin/TextAreaSkin';
import { TextField } from './../../scene/control/TextField';
import { TextFieldSkin } from './../../scene/control/skin/TextFieldSkin';
import { Button } from './../../scene/control/Button';
import { ButtonSkin } from './../../scene/control/skin/ButtonSkin';
import { HTMLSkinFactoryManager } from 'script4jfx.graphics';
import { HTMLSkinFactory } from 'script4jfx.graphics';
import 'jquery';

export class ModuleSkinFactoryRegistrator {
    
    private static hasRegistered: boolean = ModuleSkinFactoryRegistrator.register();
    
    private static register(): boolean {
        HTMLSkinFactoryManager.registerFactory(TextArea.class(), 
                HTMLSkinFactory.fromFunc((control: TextArea, element: HTMLElement) => {
            return new TextAreaSkin(control, element);
        }));
        HTMLSkinFactoryManager.registerFactory(TextField.class(), 
                HTMLSkinFactory.fromFunc((control: TextField, element: HTMLElement) => {
            return new TextFieldSkin(control, element);
        }));
        HTMLSkinFactoryManager.registerFactory(Button.class(), 
                HTMLSkinFactory.fromFunc((control: Button, element: HTMLElement) => {
            return new ButtonSkin(control, element);
        }));
        return true;
    }
}    

