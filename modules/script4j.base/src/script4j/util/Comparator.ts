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

import { Comparable } from './../lang/Comparable';
import { Collections } from './Collections';

type ComparatorFunc<T> = (o1: T, o2: T) => number;

export abstract class Comparator<T> {
    
    public static fromFunc<T>(func: ComparatorFunc<T>): Comparator<T> {
        return new class extends Comparator<T> {
            
            public compare(o1: T, o2: T): number {
                return func(o1, o2);
            }
        };
    }

    /**
     * Returns a comparator that compares Comparable objects in natural order.
     */    
    public static naturalOrder<T extends Comparable<T>>(): Comparator<T> {
        return Comparator.NATURAL_ORDER_COMPARATOR;
    }
    
    /**
     * Returns a comparator that imposes the reverse of the natural ordering.
     */    
    public static reverseOrder<T extends Comparable<T>>(): Comparator<T> {
        return Collections.reverseOrder();
    }
    
    /**
     * This is direct order for those classes that implements Comparable.
     */
    private static readonly NATURAL_ORDER_COMPARATOR: Comparator<Comparable<Object>> = 
            Comparator.fromFunc<Comparable<Object>>((o1: Comparable<Object>, o2: Comparable<Object>): number => {
                return o1.compareTo(o2);
            });    
    
    /**
     * Compares its two arguments for order.
     */
    public abstract compare(o1: T, o2: T): number;
    
    /**
     * Indicates whether some other object is "equal to" this comparator.
     */
    //equals(obj: Object): boolean;

    /**
     * Returns a comparator that imposes the reverse ordering of this comparator.
     */     
    public reversed(): Comparator<T> {
        return Collections.reverseOrder(this);
    }

}



