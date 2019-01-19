/*
 * Copyright (c) 2018-2019 Pavel Kastornyy. All rights reserved.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.
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

module.exports = {

    name: "script4j.base",

    /**
     * The order matters!
     */
    classes: [
        'script4j.lang.Class',
        'script4j.lang.Object',
        'script4j.lang.LooseObject',
        'script4j.lang.String',
        'script4j.util.Locale',
        'script4j.util.function.Consumer',
        'script4j.io.PrintWriter',
        'script4j.lang.AbstractError',
        'script4j.lang.IllegalArgumentError',
        'script4j.lang.IllegalStateError',
        'script4j.lang.IndexOutOfBoundsError',
        'script4j.util.NoSuchElementError',
        'script4j.lang.UnsupportedOperationError',
        'script4j.util.Iterator',
        'script4j.util.Iterable',
        'script4j.util.Collection',
        'script4j.util.Set',
        'script4j.util.HashSet',
        'script4j.util.List',
        'script4j.util.ArrayList',
        'script4j.util.Map',
        'script4j.util.HashMap',
        'script4j.internal.logging.LoggingLevel',
        'script4j.internal.logging.Logger',
        'script4j.internal.logging.LoggerFactory',
        'script4j.lang.System'

    ],

    export: {
	packages: [
	    'script4j.io',
            'script4j.lang',
            'script4j.util',
            'script4j.util.function',
            'script4j.internal.logging'
	],
        exclude: [
            'script4j.lang.Object',
            'script4j.lang.String'
        ]
    }
};