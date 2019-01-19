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

import {PrintWriter} from './../io/PrintWriter';
import { Map } from './../util/Map';
import { HashMap } from './../util/HashMap';

export class System {

    private static properties: Map<String, String> = new HashMap();

    private static defaultPrintWriter: PrintWriter = new PrintWriter();//default

    public static out: PrintWriter = System.defaultPrintWriter;

    public static err: PrintWriter = System.defaultPrintWriter;

    public static setOut(out: PrintWriter): void {
        System.out = out;
    }

    public static setErr(err: PrintWriter): void {
        System.err = err;
    }

    public static setProperty(key:String, value:String): String {
        let previousValue = System.properties.get(key);
        System.properties.put(key, value);
        return previousValue;
    }

    public static getProperty(key: String) {
        return System.properties.get(key);
    }

}

export namespace System {

    export class PropertyKey {

        public static readonly LOCALE: String = "script4j.util.Locale";

        public static readonly LOGGING_LEVEL: String = "script4j.internal.logging.LoggingLevel";

    }

    //initialization block

    System.setProperty(System.PropertyKey.LOGGING_LEVEL, 'debug');
    System.setProperty(System.PropertyKey.LOCALE, 'en_US');
}
