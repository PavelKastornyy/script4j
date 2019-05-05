/*
 * Copyright (c) 2018-2019 Pavel Kastornyy. All rights reserved.
 * The specified copyright does not cover application programming interface
 * (API) and the documentation for this API, which were taken from other
 * libraries. See NOTICE file for more information.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation. Copyright holder designates
 * this particular file as subject to the "Classpath" exception as provided
 * by copyright holder in the LICENSE file that accompanied this code.
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

import { Class } from 'script4j.base';
import { Map } from 'script4j.base';
import { HashMap } from 'script4j.base';
import { Node } from './../scene/Node';
import { HTMLSkinFactory } from './HTMLSkinFactory';

/**
 * This class is used for setting default skins for all nodes - it gives a full controll over html code that will
 * be created. If someone wants to change default html code he should create his own factory, skin and register
 * the factory in this manager.
 */
export class HTMLSkinFactoryManager {
    
    private static factoriesByClassMap: Map<Class<any>, HTMLSkinFactory<any>> = new HashMap();
    
    /**
     * There can be only one factory per class.
     */
    public static registerFactory<T extends Node>(nodeClass: Class<T>, factory: HTMLSkinFactory<T>): void {
        HTMLSkinFactoryManager.factoriesByClassMap.put(nodeClass, factory);
    }
    
    public static unregisterFactory<T extends Node>(nodeClass: Class<T>): void {
        HTMLSkinFactoryManager.factoriesByClassMap.remove(nodeClass);
    }
    
    public static getFactory<T extends Node>(nodeClass: Class<T>): HTMLSkinFactory<T> {
        return HTMLSkinFactoryManager.factoriesByClassMap.get(nodeClass);
    }
}