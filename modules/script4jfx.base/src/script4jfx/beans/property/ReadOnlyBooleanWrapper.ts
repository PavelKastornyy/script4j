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

import { SimpleBooleanProperty } from './SimpleBooleanProperty';
import { ReadOnlyBooleanPropertyBase } from './ReadOnlyBooleanPropertyBase';
import { ReadOnlyBooleanProperty } from './ReadOnlyBooleanProperty';

export class ReadOnlyBooleanWrapper extends SimpleBooleanProperty {

    private readOnlyProperty: ReadOnlyBooleanPropertyBase;

    constructor(initialValue: boolean, bean: Object, name: string) {
        super(initialValue, bean, name);
    }

    public getReadOnlyProperty(): ReadOnlyBooleanProperty {
        if (this.readOnlyProperty == null) {
            this.readOnlyProperty = new ReadOnlyBooleanWrapper.ReadOnlyPropertyImpl(this);
        }
        return this.readOnlyProperty;
    }
}

export namespace ReadOnlyBooleanWrapper {

    export class ReadOnlyPropertyImpl extends ReadOnlyBooleanPropertyBase {

        private readonly wrapped: ReadOnlyBooleanWrapper;

        constructor(wrapped: ReadOnlyBooleanWrapper) {
            super();
            this.wrapped = wrapped;
        }

        public get(): boolean {
            return this.wrapped.get();
        }

        public getBean(): Object {
            return this.wrapped.getBean();
        }

        public getName(): string {
            return this.wrapped.getName();
        }
    };
}