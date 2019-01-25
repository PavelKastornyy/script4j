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

import { Class } from './Class';
import { Integer } from './../../../src/script4j/lang/Integer';

declare global {

    /**
    * Class {@code Object} is the root of the class hierarchy.
    * Every class has {@code Object} as a superclass. All objects,
    * including arrays, implement the methods of this class.
    *
    * @author  Pavel Kastornyy
    */
    interface Object {

        /**
        * Indicates whether some other object is "equal to" this one.
        *
        * @param   obj   the reference object with which to compare.
        * @return  {@code true} if this object is the same as the obj
        *          argument; {@code false} otherwise.
        */
        equals(object: Object): boolean;

        /**
         * Returns a hash code value for the object. This method is
         * supported for the benefit of hash tables such as those provided by
         * {@link java.util.HashMap}.
         *
         * @return  a hash code value for this object.
         */
        hashCode(): number;

        /**
         * Return the class. This method must be used when we need a class literal,
         * for example, MyClass.class().
         */
        class(): Class;

        /**
        * Returns the runtime class of this {@code Object}. The returned
        * {@code Class} object is the object that is locked by {@code
        * static synchronized} methods of the represented class.
        *
        *
        * @return The {@code Class} object that represents the runtime
        *         class of this object.
        */
        getClass(): Class;

        toString(): string;
    }
}

(Object as any).prototype.equals = function (obj: Object) {
    if (obj === this) {
        return true;
    } else {
        return false;
    }
};//semicolon!

(Object as any).prototype.hashCode = function () {
    if ('__hashCodeValue' in this) {
        return this.__hashCodeValue;
    } else {
        this.__hashCodeValue = Math.floor(Math.random() * Integer.MAX_VALUE);
        this.__hashCodeValue *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
        return this.__hashCodeValue;
    }
};

(Object as any).prototype.class = function () {
    return Class.forConstructor(this);
};

(Object as any).prototype.getClass = function () {
    return Class.forConstructor(this.constructor);
};

(Object as any).prototype.toString = function () {
    return this.getClass().getName() + "@" + Integer.toHexString(this.hashCode());
};