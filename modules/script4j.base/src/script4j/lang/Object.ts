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
import { Integer } from './Integer';

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
        class<T>(): Class<T>;

        /**
        * Returns the runtime class of this {@code Object}. The returned
        * {@code Class} object is the object that is locked by {@code
        * static synchronized} methods of the represented class.
        *
        *
        * @return The {@code Class} object that represents the runtime
        *         class of this object.
        */
        getClass<T>(): Class<T>;

        toString(): string;
    }
}

const defineObjectPrototype = (name, value) => {
    Object.defineProperty(Object.prototype, name, {
        value,
        writable: true,
        configurable: true,
        enumerable: false
    });
}

defineObjectPrototype("equals", function (obj: Object) {
    if (obj === this) {
        return true;
    } else {
        return false;
    }
});

defineObjectPrototype("hashCode", function () {
    if ('__hashCodeValue' in this) {
        return this.__hashCodeValue;
    } else {
        this.__hashCodeValue = Math.floor(Math.random() * Integer.MAX_VALUE);
        this.__hashCodeValue *= Math.random() >= 0.5 ? 1 : -1;
        return this.__hashCodeValue;
    }
});

//we save this function as other libraries will need this variant istead of ours
const objectPrototypeToString = Object.prototype.toString;

defineObjectPrototype("toString", function () {
    if (this.getClass().getName() === "Function") {
        return objectPrototypeToString.call(this);
    } else {
        return this.getClass().getName() + "@" + Integer.toHexString(this.hashCode());
    }
});

defineObjectPrototype("class", function () {
    return Class.forConstructor(this);
});

defineObjectPrototype("getClass", function () {
    return Class.forConstructor(this.constructor);
});

