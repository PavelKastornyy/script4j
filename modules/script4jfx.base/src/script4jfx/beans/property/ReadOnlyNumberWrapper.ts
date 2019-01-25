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

import { SimpleNumberProperty } from './SimpleNumberProperty';
import { ReadOnlyNumberPropertyBase } from './ReadOnlyNumberPropertyBase';
import { ReadOnlyNumberProperty } from './ReadOnlyNumberProperty';

export class ReadOnlyNumberWrapper extends SimpleNumberProperty {

    private readOnlyProperty: ReadOnlyNumberPropertyBase;

    constructor(initialValue: number, bean: Object, name: string) {
        super(initialValue, bean, name);
    }

    public getReadOnlyProperty(): ReadOnlyNumberProperty {
        if (this.readOnlyProperty == null) {
            this.readOnlyProperty = new ReadOnlyNumberWrapper.ReadOnlyPropertyImpl(this);
        }
        return this.readOnlyProperty;
    }
}

export namespace ReadOnlyNumberWrapper {

    export class ReadOnlyPropertyImpl extends ReadOnlyNumberPropertyBase {

        private readonly wrapped: ReadOnlyNumberWrapper;

        constructor(wrapped: ReadOnlyNumberWrapper) {
            super();
            this.wrapped = wrapped;
        }

        public get(): number {
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
