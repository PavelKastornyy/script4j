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
            "jquery"
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
        "script4jfx.scene.Node",
        "script4jfx.scene.Parent",
        "script4jfx.scene.layout.Region",
        "script4jfx.scene.layout.Pane",
    ],

    export: {
	packages: [
            "script4jfx.scene",
            "script4jfx.scene.input",
            "script4jfx.scene.layout",
	]
    }
};

