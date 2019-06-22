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

    name: "script4jfx.controls",

    import: {
        modules: [
            "script4j.base",
	    "script4jfx.base",
            "script4jfx.graphics",
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
        "script4jfx.scene.control.Skinnable",
        "script4jfx.scene.control.Skin",
        "script4jfx.scene.control.SkinBase",
        "script4jfx.scene.control.Control",
        "script4jfx.scene.control.TextInputControl",
        "script4jfx.scene.control.skin.TextInputControlSkin",
        "script4jfx.scene.control.TextArea",
        "script4jfx.scene.control.skin.TextAreaSkin",
        "script4jfx.scene.control.TextField",
        "script4jfx.scene.control.skin.TextFieldSkin",
        "script4jfx.scene.control.Labeled",
        "script4jfx.scene.control.ButtonBase",
        "script4jfx.scene.control.Button",
        "script4jfx.scene.control.skin.LabeledSkinBase",
        "script4jfx.scene.control.skin.ButtonSkin",
        "script4jfx.scene.control.Label",
        "script4jfx.scene.control.skin.LabelSkin",
        "script4jfx.scene.control.SelectionModel",
        "script4jfx.scene.control.SingleSelectionModel",
        "script4jfx.scene.control.skin.ComboBoxBaseSkin",
        "script4jfx.scene.control.skin.ComboBoxPopupControl",
        "script4jfx.scene.control.skin.ComboBoxListViewSkin",
        "script4jfx.scene.control.ComboBoxBase",
        "script4jfx.scene.control.ComboBox",
        "script4jfx.internal.control.skin.SkinFactoryRegistrator",
    ],

    export: {
	packages: [
            "script4jfx.scene.control",
            "script4jfx.scene.control.skin",
	]
    }
};

