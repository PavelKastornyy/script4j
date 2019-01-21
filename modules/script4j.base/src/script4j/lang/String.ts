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
 *
 */
declare global {

    interface StringConstructor {
        of(str:string):String;
    }

    interface String {
        hashCode(): number;
    }
}

/**
 * Primitive can not have propeties ->
 * it can not have saved hashCode. In order not to create String every time we need hash
 * we use this class to keep hashCodes for literals. The same way java does, as it creates
 * one instance for every string literal.
 */
class StringHashCodeKeeper {

    private static hashCodesByString: LooseObject<number> = {};

    public static setHashCode(str: string, int: number) {
        this.hashCodesByString[str] = int;
    }

    public static getHashCode(str: string): number {
        if (str in this.hashCodesByString) {
            return this.hashCodesByString[str];
        } else {
            return null;
        }
    }
}

String.prototype.hashCode = function () {
    let hashCode = StringHashCodeKeeper.getHashCode(this);
    if (hashCode === null) {
        hashCode = 0;
        if (this.length === 0){
            return hashCode;//don't save.
        } else {
            for (let i: number = 0; i < this.length; i++) {
                hashCode = 31 * hashCode + this.charCodeAt(i);
                if (hashCode > 2147483647) {
                    hashCode = hashCode % 2147483647;
                }
            }
            StringHashCodeKeeper.setHashCode(this, hashCode);
        }
    }
    return hashCode;
}
