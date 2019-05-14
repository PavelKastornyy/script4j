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

import { Comparator } from './Comparator';
import { Comparable } from './../lang/Comparable';

export class Collections {
    
    /**
     * This is reverse order for those classes that implements Comparable.
     */
    private static readonly REVERSE_ORDER_COMPARATOR: Comparator<Comparable<Object>> = 
            Comparator.lambda<Comparable<Object>>((o1: Comparable<Object>, o2: Comparable<Object>): number => {
                return o2.compareTo(o1);
            });
            
    
    /**
     * If cmp is not passed. Returns a comparator that imposes the reverse of the natural ordering on a collection of 
     * objects that implement the Comparable interface.
     * 
     * If cmp is passed. Returns a comparator that imposes the reverse ordering of the specified comparator.
     */
    public static reverseOrder<T>​(comparator?: Comparator<T>): Comparator<T> {
        if (comparator === undefined) {
            return <Comparator<T>><any>Collections.REVERSE_ORDER_COMPARATOR;
        } else {
            if (comparator === <Comparator<T>><any>Comparator.naturalOrder()) {
                return <Comparator<T>><any>Collections.REVERSE_ORDER_COMPARATOR;
            } else if (comparator === <Comparator<T>><any>Collections.REVERSE_ORDER_COMPARATOR) {
                return <Comparator<T>><any>Comparator.naturalOrder();
            } else {
                return Comparator.lambda<T>((o1: T, o2: T): number => {
                    return comparator.compare(o2, o1);
                });
            }
        }
    }
}


