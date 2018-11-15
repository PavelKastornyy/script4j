/*
 * Copyright (c) 2018 Pavel Kastornyy. All rights reserved. The specified
 * copyright does not cover application programming interface (API) and
 * the documentation for this API, which were taken from other libraries.
 * See NOTICE file for more information.
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

declare global {

    interface StringConstructor {
        of(str:string):String;
    }

    interface String {
        hashCode(): number;
    }
}

/**
 * In JS there are primitive string and String object. Primitive can not have propeties ->
 * it can not have saved hashCode. In order not to create String every time we need hash
 * we use this class to keep hashCodes for literals. The same way java does, as it creates
 * one instance for every string literal.
 */
class LiteralStringHashCoder {

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
    let hashCode = LiteralStringHashCoder.getHashCode(this);
    if (hashCode === null) {
        hashCode = Math.floor(Math.random() * 4294967296);
        LiteralStringHashCoder.setHashCode(this, hashCode);
    }
    return hashCode;
 }
