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

import './../../../src/script4j/lang/String';
import { assert } from 'chai';
import { describe } from 'mocha';
import { it } from 'mocha';

describe('StringTest', () => {

    it('hashCode_severalCalls_similarResult', () => {
        let s: String = new String("dfdfd");
        let firstHashCode = s.hashCode();
        let secondHashCode = s.hashCode();
        assert.isNotNaN(firstHashCode);
        assert.isNotNull(firstHashCode);
        assert.equal(firstHashCode, secondHashCode);
    });

    it('hashCode_inRange_correctResult', () => {
        let s: String = new String("This code is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; \n\
                without even the implied warranty of MERCHANTABILITY or * \n\
                FITNESS FOR A PARTICULAR PURPOSE. Такой подход!");
        let hash: number = s.hashCode();
        assert.isNotNaN(hash);
        assert.isNotNull(hash);
        assert.isAtLeast(hash, -2147483648);
        assert.isAtMost(hash, 2147483647);
    });

    it('equals_sameString_true', () => {
        assert.isTrue(new String("javascript").equals(new String("javascript")));
    });

    it('equals_differentString_false', () => {
        assert.isFalse(new String("javascript").equals(new String("typescript")));
    });
});