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

declare global {

    interface BooleanConstructor {

        of(num: boolean): Boolean;
    }

    interface Boolean {

        hashCode(): number;

        equals(obj: Object): boolean;

        toString(): string;
    }
}

Boolean.prototype.hashCode = function () {
    return this.valueOf() ? 1231 : 1237;
}

Boolean.prototype.equals = function(obj: Object): boolean {
    if (obj === null) {
        return false;
    };
    let thisBool = null;
    let thatBool = null;
    if (typeof this === "boolean") {
        thisBool = this;
    //it is a Number wrapper
    } else {
        thisBool = this.valueOf();
    }
    if (typeof obj === "boolean") {
        thatBool = obj;
    } else if (obj instanceof Boolean) {
        thatBool = obj.valueOf();
    } else {
        return false;
    }
    return thisBool === thatBool;
}

Boolean.prototype.toString = function(): string {
    let bool: boolean;
    if (typeof this === "boolean") {
        bool = this;
    //it is an Object
    } else {
        bool = this.valueOf();
    }
    return bool === true ? "true" : "false";
}

