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

import { LooseObject } from './LooseObject';
import { PrimitiveUsageError } from './PrimitiveUsageError';
import './Object'

/**
 * In JS there are primitive string and String object.
 * A string primitive is parsed to a v8::String object. Hence, methods can be invoked directly on it.
 * A String object, in the other hand, is parsed to a v8::StringObject which extends Object and, apart from being
 * a full fledged object, serves as a wrapper for v8::String.
 * See details here : https://stackoverflow.com/a/17256419/5057736
 * That's why:
 * typeof "abc"; //"string"
 * typeof String("abc"); //"string"
 * typeof new String("abc"); //"object"
 * typeof (new String("abc")).valueOf(); //"string"
 * The same is about Number, Boolean.
 */
declare global {

    interface StringConstructor {
        of(str:string):String;
    }

    interface String {
        hashCode(): number;

        equals(obj: Object): boolean;
    }
}

/**
 * Primitive can not have propeties -> it can not have saved hashCode. So we can have only non primitive, as
 * in Java.
 */

String.prototype.hashCode = function () {
    if (typeof this === "string") {
        throw new PrimitiveUsageError("String Primitive was used instead of String Object");
    }
    if ('__hashCodeValue' in this) {
        return this.__hashCodeValue;
    } else {
        if (this.length === 0){
            this.__hashCodeValue = 0;
        } else {
            let hashCode = 0;
            for (let i: number = 0; i < this.length; i++) {
                 hashCode = 31 * hashCode + this.charCodeAt(i);
                if (hashCode > 2147483647) {
                    hashCode = hashCode % 2147483647;
                }
                hashCode *= this.charCodeAt(i) % 2 == 0 ? 1: -1;
            }
            this.__hashCodeValue= hashCode;
        }
        return this.__hashCodeValue;
    }
}

String.prototype.equals = function(obj: Object): boolean {
    if (typeof this === "string" || typeof obj === "string") {
        throw new PrimitiveUsageError("String Primitive was used instead of String Object");
    }
    if (obj === null) {
        return false;
    } else if (obj.getClass() !== this.getClass()) {
        return false;
    } else {
        let thatStr: String = <String>obj;
        return this.valueOf() === thatStr.valueOf();
    }
}