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

import './../../../src/script4j/lang/Number';
import { assert } from 'chai';
import { describe } from 'mocha';
import { it } from 'mocha';

describe('NumberTest', () => {

    it('hashCode_severalCalls_similarResult', () => {
        let n: Number = new Number(100);
        let firstHashCode: number = n.hashCode();
        let secondHashCode: number = n.hashCode();
        assert.isNotNaN(firstHashCode);
        assert.isNotNull(firstHashCode);
        assert.equal(firstHashCode, secondHashCode);
    });

    it('hashCode_maxValue_correctResult', () => {
        let n: Number = new Number(2147483650);
        assert.equal(n.hashCode(), 3);
    });

    it('hashCode_minValue_correctResult', () => {
        let n: Number = new Number(-2147483650);
        assert.equal(n.hashCode(), -2);
    });

    it('equals_sameNumber_true', () => {
        assert.isTrue(new Number(200.5).equals(new Number(200.5)));
    });

    it('equals_differentNumber_false', () => {
        assert.isFalse(new Number(200.5).equals(new Number(200.6)));
    });
});

