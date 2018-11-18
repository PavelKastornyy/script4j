/*
 * Copyright (c) 2018 Pavel Kastornyy. All rights reserved.
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

    name: "script4jfx.base",

    import: {
        modules: [
            "script4j.base"
        ]
    },

    /**
     * The order matters!
     */
    classes: [
        "script4jfx.beans.value.ChangeListener",
        "script4jfx.beans.value.ObservableBooleanValue",
        "script4jfx.beans.value.ObservableNumberValue",
        "script4jfx.beans.value.ObservableStringValue",
        "script4jfx.beans.value.ObservableValue",
        "script4jfx.beans.value.WritableBooleanValue",
        "script4jfx.beans.value.WritableNumberValue",
        "script4jfx.beans.value.WritableStringValue",
        "script4jfx.beans.value.WritableValue",
        "script4jfx.beans.property.ReadOnlyProperty",
        "script4jfx.beans.property.Property",
        "script4jfx.beans.property.PropertyDelegate",
        "script4jfx.beans.property.ReadOnlyStringProperty",
        "script4jfx.beans.property.StringProperty",
        "script4jfx.beans.property.SimpleStringProperty",
        "script4jfx.beans.property.ReadOnlyNumberProperty",
        "script4jfx.beans.property.NumberProperty",
        "script4jfx.beans.property.SimpleNumberProperty",
        "script4jfx.beans.property.ReadOnlyBooleanProperty",
        "script4jfx.beans.property.BooleanProperty",
        "script4jfx.beans.property.SimpleBooleanProperty",
        "script4jfx.beans.property.ReadOnlyObjectProperty",
        "script4jfx.beans.property.ObjectProperty",
        "script4jfx.beans.property.SimpleObjectProperty",

    ],

    export: {
	packages: [
	    "script4jfx.beans.property",
            "script4jfx.beans.value",
	]
    }
};

