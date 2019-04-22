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

/**
 * Functional interface.
 * 
 *  Type Parameters:
 *  T - the type of the first argument to the function
 *  U - the type of the second argument to the function
 *  R - the type of the result of the function 
 */
export interface BiFunction<T,​U,​R> {
    
    /**
     * Applies this function to the given arguments.
     */
    apply(t: T, u: U): R;

}

type BiBunfctionFunc<T, U, R> = (t: T, u: U) => R;

export namespace BiFunction {
    
    export function fromFunc<T, U, R>(func: BiBunfctionFunc<T, U, R>): BiFunction<T,​U,​R> {
        return new class implements BiFunction<T, U, R> {
            
            public apply(t: T, u: U): R {
                return func(t, u);
            }
        };
    }
    
    export abstract class AbstractDefault<T, U, R> implements BiFunction<T, U, R> {
        
        public test(): void {
            console.log("test");
        }
        
        public abstract apply(t: T, u: U): R;
    }
}