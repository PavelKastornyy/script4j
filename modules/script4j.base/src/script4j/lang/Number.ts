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

import './Object'
import { PrimitiveUsageError } from './PrimitiveUsageError';

declare global {

    interface NumberConstructor {

        of(num:number):Number;
    }

    interface Number {

        hashCode(): number;

        equals(obj: Object): boolean;

        toHash(): number;
    }
}

Number.prototype.hashCode = function () {
    if (typeof this === "number") {
        throw new PrimitiveUsageError("Number Primitive was used instead of Number Object");
    }
    if ('__hashCodeValue' in this) {
        return this.__hashCodeValue;
    } else {
        this.__hashCodeValue = Math.floor(this);//removes decimal
        this.__hashCodeValue = this.__hashCodeValue | 0;////convert to int
        return this.__hashCodeValue;
    }
}

Number.prototype.equals = function(obj: Object): boolean {
    if (typeof this === "number" || typeof obj === "number") {
        throw new PrimitiveUsageError("Number Primitive was used instead of Number Object");
    }
    if (obj === null) {
        return false;
    } else if (!(obj instanceof Number)) {
        return false;
    } else {
        let thatNumber: Number = <Number>obj;
        return this.valueOf() === thatNumber.valueOf();
    }
}