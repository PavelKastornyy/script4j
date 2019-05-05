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

module.exports = {

    name: "script4jfx.graphics",

    import: {
        modules: [
            "script4j.base",
	    "script4jfx.base",
            "jquery",
            "reflect-metadata"
        ],
        forspecmap: {
            "jquery":"script4jfx.jquery"
        }
    },

    /**
     * Order matters!
     */
    classes: [
        "script4jfx.css.Styleable",
        "script4jfx.scene.input.InputEvent",
        "script4jfx.scene.input.KeyCode",
        "script4jfx.scene.input.KeyEvent",
        "script4jfx.scene.input.MouseButton",
        "script4jfx.scene.input.MouseEvent",
        "script4jfx.internal.scene.eventbus.BusEvent",
        "script4jfx.internal.scene.eventbus.BusEventListener",
        "script4jfx.internal.scene.eventbus.EventBus",
        "script4jfx.internal.scene.HandlerTree",
        "script4jfx.internal.scene.AbstractEventHandlerManager",
        "script4jfx.internal.scene.NodeEventHandlerManager",
        "script4jfx.internal.scene.SceneEventHandlerManager",
        "script4jfx.internal.scene.busevents.HandlerEvent",
        "script4jfx.internal.scene.EventHandlerCounter",
        "script4jfx.internal.html.JQueryDataKeys",
        "script4jfx.internal.html.HTMLKeyMapper",
        "script4jfx.internal.html.HTMLEventType",
        "script4jfx.internal.html.HTMLEventListenerManager",
        "script4jfx.internal.scene.SceneUnlocker",
        "script4jfx.internal.scene.NodeUnlocker",
        "script4jfx.internal.scene.ParentUnlocker",
        "script4jfx.internal.scene.EventDispatcherImpl",
        "script4jfx.html.HTML",
        "script4jfx.scene.Scene",
        "script4jfx.html.HTMLSkinnable",
        "script4jfx.scene.Node",
        "script4jfx.html.HTMLSkin",
        "script4jfx.html.HTMLSkinFactory",
        "script4jfx.html.HTMLSkinFactoryManager",
        "script4jfx.html.AbstractHTMLSkin",
        "script4jfx.scene.Parent",
        "script4jfx.scene.layout.Region",
        "script4jfx.scene.layout.Pane",
        "script4jfx.scene.layout.skin.PaneSkin",
        "script4jfx.internal.html.ModuleSkinFactoryRegistrator",
    ],

    export: {
	packages: [
            "script4jfx.scene",
            "script4jfx.scene.input",
            "script4jfx.scene.layout",
            "script4jfx.html",
	]
    }
};

