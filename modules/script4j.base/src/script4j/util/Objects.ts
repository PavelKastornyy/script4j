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

import './../lang/Object';

export class Objects {

    /**
     * Returns the hash code of a non-null argument and 0 for a null argument.
     */
    public static hashCode​(obj: Object): number {
        if (obj === null) {
            return 0;
        } else {
            return obj.hashCode();
        }
    }

    /**
     * Returns true if the arguments are equal to each other and false otherwise. Consequently, if both arguments
     * are null, true is returned and if exactly one argument is null, false is returned. Otherwise, equality is
     * determined by using the equals method of the first argument.
     */

    public static equals​(a: Object, b: Object): boolean {
        if (a === null) {
            if (b === null) {
                return true;
            } else {
                return false;
            }
        } else {
            if (b === null) {
                return false;
            } else {
                return a.equals(b);
            }
        }
    }
}


