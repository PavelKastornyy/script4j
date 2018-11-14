/*
 * Copyright (c) 2018 Pavel Kastornyy. All rights reserved.
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

    name: "script4j.base.tests",

    import: [
	{
	    classes: [
		"Class"
	    ],
            from: "./script4j.base.4tests-${PROJECT.VERSION}"
	},
        {
            classes: [
                "assert"
            ],
            from: "chai"
        },
        {
            classes: [
                "'mocha'"
            ]
        }
    ],

    /**
     * The order matters!
     */
    classes: [
        'script4j/lang/ClassTest.ts',
        'script4j/lang/ObjectTest.ts',
    ]
};