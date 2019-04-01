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

import { assert } from 'chai';
import { describe } from 'mocha';
import { it } from 'mocha';
import { beforeEach } from 'mocha';
import { JSDOM } from 'jsdom';
import { DOMWindow } from 'jsdom';

import { KeyCode } from './../../../../src/script4jfx/scene/input/KeyCode';

describe('KeyCodeTest', () => {

    it('getKeyCode_existingCodeByString_correctCode', () => {
        assert.isTrue(KeyCode.getKeyCode("L") === KeyCode.L);
    });
    
    it('getKeyCode_existingCodeByNumber_correctCode', () => {
        assert.isTrue(KeyCode.getKeyCode(76) === KeyCode.L);
    });
    
    it('isLetterKey_lettterKey_true', () => {
        assert.isTrue(KeyCode.L.isLetterKey());
    });
    
    it('isNavigationKey_lettterKey_false', () => {
        assert.isFalse(KeyCode.L.isNavigationKey());
    });
    
    it('getChar_lettterKey_correctChar', () => {
        assert.equal(KeyCode.L.getChar(), "L");
    });
});
