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

import './Object';

/**
 * Instances of the class {@code Class} represent classes and interfaces
 * in a running Java application. An enum type is a kind of class and an
 * annotation type is a kind of interface. Every array also
 * belongs to a class that is reflected as a {@code Class} object
 * that is shared by all arrays with the same element type and number
 * of dimensions.  The primitive Java types ({@code boolean},
 * {@code byte}, {@code char}, {@code short},
 * {@code int}, {@code long}, {@code float}, and
 * {@code double}), and the keyword {@code void} are also
 * represented as {@code Class} objects.
 *
 *
 * @author  Pavel Kastornyy
 */

import { Constructor } from './Constructor';

export class Class<T> {

    private static constructors: Constructor<any>[] = new Array();

    private static createdClasses: Class<any>[] = new Array();

    private construc: Constructor<T> = null;

    private constructor(construc: any) {
        this.construc = construc;
    }

    public static forConstructor<S extends Object>(construc: { new (...args: any[]): S }): Class<S> {
        let index = Class.constructors.indexOf(construc);
        let klass: Class<S> = null;
        if (index === -1) {
            Class.constructors.push(construc);
            klass = new Class(construc);
            Class.createdClasses.push(klass);
        } else {
            klass = Class.createdClasses[index];
        }
        return klass;
    }

    /**
     * Returns the  name of the entity (class, interface, array class,
     * primitive type, or void) represented by this {@code Class} object,
     * as a {@code String}.
     *
     * @return  the name of the class or interface
     *          represented by this object.
     */
    public getName(): string {
        return (<any>this.construc).name;
    }
}