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

    name: "script4jfx.base",

    import: {
        modules: [
            "script4j.base"
        ]
    },

    /**
     * Order matters!
     */
    classes: [
        "script4jfx.beans.value.ChangeListener",
        "script4jfx.beans.value.ObservableBooleanValue",
        "script4jfx.beans.value.ObservableNumberValue",
        "script4jfx.beans.value.ObservableStringValue",
        "script4jfx.beans.value.ObservableValue",
        "script4jfx.beans.value.ObservableObjectValue",
        "script4jfx.beans.value.WritableBooleanValue",
        "script4jfx.beans.value.WritableNumberValue",
        "script4jfx.beans.value.WritableStringValue",
        "script4jfx.beans.value.WritableValue",
        "script4jfx.beans.value.WritableObjectValue",
        "script4jfx.beans.property.ReadOnlyProperty",
        "script4jfx.beans.property.Property",
        "script4jfx.util.StringConverter",
        "script4jfx.util.converter.NumberStringConverter",
        "script4jfx.internal.beans.property.PropertyDelegate",
        "script4jfx.beans.binding.Bindings",
        "script4jfx.beans.binding.StringExpression",
        "script4jfx.beans.binding.NumberExpression",
        "script4jfx.beans.binding.BooleanExpression",
        "script4jfx.beans.binding.ObjectExpression",
        "script4jfx.beans.property.ReadOnlyStringProperty",
        "script4jfx.beans.property.ReadOnlyStringPropertyBase",
        "script4jfx.beans.property.StringProperty",
        "script4jfx.beans.property.StringPropertyBase",
        "script4jfx.beans.property.SimpleStringProperty",
        "script4jfx.beans.property.ReadOnlyStringWrapper",
        "script4jfx.beans.property.ReadOnlyNumberProperty",
        "script4jfx.beans.property.ReadOnlyNumberPropertyBase",
        "script4jfx.beans.property.NumberProperty",
        "script4jfx.beans.property.NumberPropertyBase",
        "script4jfx.beans.property.SimpleNumberProperty",
        "script4jfx.beans.property.ReadOnlyNumberWrapper",
        "script4jfx.beans.property.ReadOnlyBooleanProperty",
        "script4jfx.beans.property.ReadOnlyBooleanPropertyBase",
        "script4jfx.beans.property.BooleanProperty",
        "script4jfx.beans.property.BooleanPropertyBase",
        "script4jfx.beans.property.SimpleBooleanProperty",
        "script4jfx.beans.property.ReadOnlyBooleanWrapper",
        "script4jfx.beans.property.ReadOnlyObjectProperty",
        "script4jfx.beans.property.ReadOnlyObjectPropertyBase",
        "script4jfx.beans.property.ObjectProperty",
        "script4jfx.beans.property.ObjectPropertyBase",
        "script4jfx.beans.property.SimpleObjectProperty",
        "script4jfx.beans.property.ReadOnlyObjectWrapper",
        "script4jfx.event.EventDispatchChain",
        "script4jfx.event.EventDispatcher",
        "script4jfx.event.EventHandler",
        "script4jfx.event.EventTarget",
        "script4jfx.event.EventType",        
        "script4jfx.event.Event",
        "script4jfx.internal.event.EventDispatchChainImpl",
        "script4jfx.collections.ListChangeListener",
        "script4jfx.collections.ObservableList",
        "script4jfx.collections.SetChangeListener",
        "script4jfx.collections.ObservableSet",
        "script4jfx.collections.MapChangeListener",
        "script4jfx.collections.ObservableMap",
        "script4jfx.internal.collections.ListChangeListenerChange",
        "script4jfx.internal.collections.AbstractObservableListBase",
        "script4jfx.internal.collections.ObservableArrayList",
        "script4jfx.internal.collections.SetChangeListenerChange",
        "script4jfx.internal.collections.AbstractObservableSetBase",
        "script4jfx.internal.collections.ObservableSetWrapper",
        "script4jfx.internal.collections.MapChangeListenerChange",
        "script4jfx.internal.collections.AbstractObservableMapBase",
        "script4jfx.internal.collections.ObservableMapWrapper",
        "script4jfx.internal.collections.UnmodifiableObservableMapWrapper",
        "script4jfx.internal.collections.UnmodifiableObservableListWrapper",
        "script4jfx.internal.collections.UnmodifiableObservableSetWrapper",
        "script4jfx.collections.FXCollections",
    ],

    export: {
	packages: [
	    "script4jfx.beans.property",
            "script4jfx.beans.binding",
            "script4jfx.beans.value",
            "script4jfx.collections",
            "script4jfx.event",
            "script4jfx.util",
            "script4jfx.util.converter",
	]
    }
};

