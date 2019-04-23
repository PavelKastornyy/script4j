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

import { Map } from 'script4j.base';
import { HashMap } from 'script4j.base';

export class KeyCode {
     
     // Need to bundle this in another class to avoid "forward reference" compiler error
    private static KeyCodeClass = class {
        
        private constructor() {};

        public static readonly FUNCTION: number = 1;
        public static readonly NAVIGATION: number = 1 << 1;
        public static readonly ARROW: number = 1 << 2;
        public static readonly MODIFIER: number = 1 << 3;
        public static readonly LETTER: number = 1 << 4;
        public static readonly DIGIT: number = 1 << 5;
        public static readonly KEYPAD: number = 1 << 6;
        public static readonly WHITESPACE: number = 1 << 7;
        public static readonly MEDIA: number = 1 << 8;
    }

    /**
     * Constant for the {@code Enter} key.
     */
    public static readonly ENTER: KeyCode = new KeyCode(0x0A, "Enter", KeyCode.KeyCodeClass.WHITESPACE);

    /**
     * Constant for the {@code Backspace} key.
     */
    public static readonly BACK_SPACE: KeyCode = new KeyCode(0x08, "Backspace");

    /**
     * Constant for the {@code Tab} key.
     */
    public static readonly TAB: KeyCode = new KeyCode(0x09, "Tab", KeyCode.KeyCodeClass.WHITESPACE);

    /**
     * Constant for the {@code Cancel} key.
     */
    public static readonly CANCEL: KeyCode = new KeyCode(0x03, "Cancel");

    /**
     * Constant for the {@code Clear} key.
     */
    public static readonly CLEAR: KeyCode = new KeyCode(0x0C, "Clear");

    /**
     * Constant for the {@code Shift} key.
     */
    public static readonly SHIFT: KeyCode = new KeyCode(0x10, "Shift", KeyCode.KeyCodeClass.MODIFIER);

    /**
     * Constant for the {@code Ctrl} key.
     */
    public static readonly CONTROL: KeyCode = new KeyCode(0x11, "Ctrl", KeyCode.KeyCodeClass.MODIFIER);

    /**
     * Constant for the {@code Alt} key.
     */
    public static readonly ALT: KeyCode = new KeyCode(0x12, "Alt", KeyCode.KeyCodeClass.MODIFIER);

    /**
     * Constant for the {@code Pause} key.
     */
    public static readonly PAUSE: KeyCode = new KeyCode(0x13, "Pause");

    /**
     * Constant for the {@code Caps Lock} key.
     */
    public static readonly CAPS: KeyCode = new KeyCode(0x14, "Caps Lock");

    /**
     * Constant for the {@code Esc} key.
     */
    public static readonly ESCAPE: KeyCode = new KeyCode(0x1B, "Esc");

    /**
     * Constant for the {@code Space} key.
     */
    public static readonly SPACE: KeyCode = new KeyCode(0x20, "Space", KeyCode.KeyCodeClass.WHITESPACE);

    /**
     * Constant for the {@code Page Up} key.
     */
    public static readonly PAGE_UP: KeyCode = new KeyCode(0x21, "Page Up", KeyCode.KeyCodeClass.NAVIGATION);

    /**
     * Constant for the {@code Page Down} key.
     */
    public static readonly PAGE_DOWN: KeyCode = new KeyCode(0x22, "Page Down", KeyCode.KeyCodeClass.NAVIGATION);

    /**
     * Constant for the {@code End} key.
     */
    public static readonly END: KeyCode = new KeyCode(0x23, "End", KeyCode.KeyCodeClass.NAVIGATION);

    /**
     * Constant for the {@code Home} key.
     */
    public static readonly HOME: KeyCode =  new KeyCode(0x24, "Home", KeyCode.KeyCodeClass.NAVIGATION);

    /**
     * Constant for the non-numpad <b>left</b> arrow key.
     */
    public static readonly LEFT: KeyCode =  new KeyCode(0x25, "Left", KeyCode.KeyCodeClass.ARROW | KeyCode.KeyCodeClass.NAVIGATION);

    /**
     * Constant for the non-numpad <b>up</b> arrow key.
     */
    public static readonly UP: KeyCode =  new KeyCode(0x26, "Up", KeyCode.KeyCodeClass.ARROW | KeyCode.KeyCodeClass.NAVIGATION);

    /**
     * Constant for the non-numpad <b>right</b> arrow key.
     */
    public static readonly RIGHT: KeyCode =  new KeyCode(0x27, "Right", KeyCode.KeyCodeClass.ARROW | KeyCode.KeyCodeClass.NAVIGATION);

    /**
     * Constant for the non-numpad <b>down</b> arrow key.
     */
    public static readonly DOWN: KeyCode =  new KeyCode(0x28, "Down", KeyCode.KeyCodeClass.ARROW | KeyCode.KeyCodeClass.NAVIGATION);

    /**
     * Constant for the comma key, ","
     */
    public static readonly COMMA: KeyCode =  new KeyCode(0x2C, "Comma");

    /**
     * Constant for the minus key, "-"
     */
    public static readonly MINUS: KeyCode =  new KeyCode(0x2D, "Minus");

    /**
     * Constant for the period key, "."
     */
    public static readonly PERIOD: KeyCode =  new KeyCode(0x2E, "Period");

    /**
     * Constant for the forward slash key, "/"
     */
    public static readonly SLASH: KeyCode =  new KeyCode(0x2F, "Slash");

    /**
     * Constant for the {@code 0} key.
     */
    public static readonly DIGIT0: KeyCode =  new KeyCode(0x30, "0", KeyCode.KeyCodeClass.DIGIT);

    /**
     * Constant for the {@code 1} key.
     */
    public static readonly DIGIT1: KeyCode =  new KeyCode(0x31, "1", KeyCode.KeyCodeClass.DIGIT);

    /**
     * Constant for the {@code 2} key.
     */
    public static readonly DIGIT2: KeyCode =  new KeyCode(0x32, "2", KeyCode.KeyCodeClass.DIGIT);

    /**
     * Constant for the {@code 3} key.
     */
    public static readonly DIGIT3: KeyCode =  new KeyCode(0x33, "3", KeyCode.KeyCodeClass.DIGIT);

    /**
     * Constant for the {@code 4} key.
     */
    public static readonly DIGIT4: KeyCode =  new KeyCode(0x34, "4", KeyCode.KeyCodeClass.DIGIT);

    /**
     * Constant for the {@code 5} key.
     */
    public static readonly DIGIT5: KeyCode =  new KeyCode(0x35, "5", KeyCode.KeyCodeClass.DIGIT);

    /**
     * Constant for the {@code 6} key.
     */
    public static readonly DIGIT6: KeyCode =  new KeyCode(0x36, "6", KeyCode.KeyCodeClass.DIGIT);

    /**
     * Constant for the {@code 7} key.
     */
    public static readonly DIGIT7: KeyCode =  new KeyCode(0x37, "7", KeyCode.KeyCodeClass.DIGIT);

    /**
     * Constant for the {@code 8} key.
     */
    public static readonly DIGIT8: KeyCode =  new KeyCode(0x38, "8", KeyCode.KeyCodeClass.DIGIT);

    /**
     * Constant for the {@code 9} key.
     */
    public static readonly DIGIT9: KeyCode =  new KeyCode(0x39, "9", KeyCode.KeyCodeClass.DIGIT);

    /**
     * Constant for the semicolon key, ";"
     */
    public static readonly SEMICOLON: KeyCode =  new KeyCode(0x3B, "Semicolon");

    /**
     * Constant for the equals key, "="
     */
    public static readonly EQUALS: KeyCode =  new KeyCode(0x3D, "Equals");

    /**
     * Constant for the {@code A} key.
     */
    public static readonly A: KeyCode =  new KeyCode(0x41, "A", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code B} key.
     */
    public static readonly B: KeyCode =  new KeyCode(0x42, "B", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code C} key.
     */
    public static readonly C: KeyCode =  new KeyCode(0x43, "C", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code D} key.
     */
    public static readonly D: KeyCode =  new KeyCode(0x44, "D", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code E} key.
     */
    public static readonly E: KeyCode =  new KeyCode(0x45, "E", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code F} key.
     */
    public static readonly F: KeyCode =  new KeyCode(0x46, "F", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code G} key.
     */
    public static readonly G: KeyCode =  new KeyCode(0x47, "G", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code H} key.
     */
    public static readonly H: KeyCode =  new KeyCode(0x48, "H", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code I} key.
     */
    public static readonly I: KeyCode =  new KeyCode(0x49, "I", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code J} key.
     */
    public static readonly J: KeyCode =  new KeyCode(0x4A, "J", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code K} key.
     */
    public static readonly K: KeyCode =  new KeyCode(0x4B, "K", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code L} key.
     */
    public static readonly L: KeyCode =  new KeyCode(0x4C, "L", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code M} key.
     */
    public static readonly M: KeyCode =  new KeyCode(0x4D, "M", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code N} key.
     */
    public static readonly N: KeyCode =  new KeyCode(0x4E, "N", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code O} key.
     */
    public static readonly O: KeyCode =  new KeyCode(0x4F, "O", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code P} key.
     */
    public static readonly P: KeyCode =  new KeyCode(0x50, "P", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code Q} key.
     */
    public static readonly Q: KeyCode =  new KeyCode(0x51, "Q", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code R} key.
     */
    public static readonly R: KeyCode =  new KeyCode(0x52, "R", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code S} key.
     */
    public static readonly S: KeyCode =  new KeyCode(0x53, "S", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code T} key.
     */
    public static readonly T: KeyCode =  new KeyCode(0x54, "T", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code U} key.
     */
    public static readonly U: KeyCode =  new KeyCode(0x55, "U", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code V} key.
     */
    public static readonly V: KeyCode =  new KeyCode(0x56, "V", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code W} key.
     */
    public static readonly W: KeyCode =  new KeyCode(0x57, "W", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code X} key.
     */
    public static readonly X: KeyCode =  new KeyCode(0x58, "X", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code Y} key.
     */
    public static readonly Y: KeyCode =  new KeyCode(0x59, "Y", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the {@code Z} key.
     */
    public static readonly Z: KeyCode =  new KeyCode(0x5A, "Z", KeyCode.KeyCodeClass.LETTER);

    /**
     * Constant for the open bracket key, "["
     */
    public static readonly OPEN_BRACKET: KeyCode =  new KeyCode(0x5B, "Open Bracket");

    /**
     * Constant for the back slash key, "\"
     */
    public static readonly BACK_SLASH: KeyCode =  new KeyCode(0x5C, "Back Slash");

    /**
     * Constant for the close bracket key, "]"
     */
    public static readonly CLOSE_BRACKET: KeyCode =  new KeyCode(0x5D, "Close Bracket");

    /**
     * Constant for the {@code Numpad 0} key.
     */
    public static readonly NUMPAD0: KeyCode =  new KeyCode(0x60, "Numpad 0", KeyCode.KeyCodeClass.DIGIT | KeyCode.KeyCodeClass.KEYPAD);

    /**
     * Constant for the {@code Numpad 1} key.
     */
    public static readonly NUMPAD1: KeyCode =  new KeyCode(0x61, "Numpad 1", KeyCode.KeyCodeClass.DIGIT | KeyCode.KeyCodeClass.KEYPAD);

    /**
     * Constant for the {@code Numpad 2} key.
     */
    public static readonly NUMPAD2: KeyCode =  new KeyCode(0x62, "Numpad 2", KeyCode.KeyCodeClass.DIGIT | KeyCode.KeyCodeClass.KEYPAD);

    /**
     * Constant for the {@code Numpad 3} key.
     */
    public static readonly NUMPAD3: KeyCode =  new KeyCode(0x63, "Numpad 3", KeyCode.KeyCodeClass.DIGIT | KeyCode.KeyCodeClass.KEYPAD);

    /**
     * Constant for the {@code Numpad 4} key.
     */
    public static readonly NUMPAD4: KeyCode =  new KeyCode(0x64, "Numpad 4", KeyCode.KeyCodeClass.DIGIT | KeyCode.KeyCodeClass.KEYPAD);

    /**
     * Constant for the {@code Numpad 5} key.
     */
    public static readonly NUMPAD5: KeyCode =  new KeyCode(0x65, "Numpad 5", KeyCode.KeyCodeClass.DIGIT | KeyCode.KeyCodeClass.KEYPAD);

    /**
     * Constant for the {@code Numpad 6} key.
     */
    public static readonly NUMPAD6: KeyCode =  new KeyCode(0x66, "Numpad 6", KeyCode.KeyCodeClass.DIGIT | KeyCode.KeyCodeClass.KEYPAD);

    /**
     * Constant for the {@code Numpad 7} key.
     */
    public static readonly NUMPAD7: KeyCode =  new KeyCode(0x67, "Numpad 7", KeyCode.KeyCodeClass.DIGIT | KeyCode.KeyCodeClass.KEYPAD);

    /**
     * Constant for the {@code Numpad 8} key.
     */
    public static readonly NUMPAD8: KeyCode =  new KeyCode(0x68, "Numpad 8", KeyCode.KeyCodeClass.DIGIT | KeyCode.KeyCodeClass.KEYPAD);

    /**
     * Constant for the {@code Numpad 9} key.
     */
    public static readonly NUMPAD9: KeyCode =  new KeyCode(0x69, "Numpad 9", KeyCode.KeyCodeClass.DIGIT | KeyCode.KeyCodeClass.KEYPAD);

    /**
     * Constant for the {@code Multiply} key.
     */
    public static readonly MULTIPLY: KeyCode =  new KeyCode(0x6A, "Multiply");

    /**
     * Constant for the {@code Add} key.
     */
    public static readonly ADD: KeyCode =  new KeyCode(0x6B, "Add");

    /**
     * Constant for the Numpad Separator key.
     */
    public static readonly SEPARATOR: KeyCode =  new KeyCode(0x6C, "Separator");

    /**
     * Constant for the {@code Subtract} key.
     */
    public static readonly SUBTRACT: KeyCode =  new KeyCode(0x6D, "Subtract");

    /**
     * Constant for the {@code Decimal} key.
     */
    public static readonly DECIMAL: KeyCode =  new KeyCode(0x6E, "Decimal");

    /**
     * Constant for the {@code Divide} key.
     */
    public static readonly DIVIDE: KeyCode =  new KeyCode(0x6F, "Divide");

    /**
     * Constant for the {@code Delete} key.
     */
    public static readonly DELETE: KeyCode =  new KeyCode(0x7F, "Delete"); /* ASCII:Integer   DEL */

    /**
     * Constant for the {@code Num Lock} key.
     */
    public static readonly NUM_LOCK: KeyCode =  new KeyCode(0x90, "Num Lock");

    /**
     * Constant for the {@code Scroll Lock} key.
     */
    public static readonly SCROLL_LOCK: KeyCode =  new KeyCode(0x91, "Scroll Lock");

    /**
     * Constant for the F1 function key.
     */
    public static readonly F1: KeyCode =  new KeyCode(0x70, "F1", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the F2 function key.
     */
    public static readonly F2: KeyCode =  new KeyCode(0x71, "F2", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the F3 function key.
     */
    public static readonly F3: KeyCode =  new KeyCode(0x72, "F3", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the F4 function key.
     */
    public static readonly F4: KeyCode =  new KeyCode(0x73, "F4", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the F5 function key.
     */
    public static readonly F5: KeyCode =  new KeyCode(0x74, "F5", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the F6 function key.
     */
    public static readonly F6: KeyCode =  new KeyCode(0x75, "F6", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the F7 function key.
     */
    public static readonly F7: KeyCode =  new KeyCode(0x76, "F7", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the F8 function key.
     */
    public static readonly F8: KeyCode =  new KeyCode(0x77, "F8", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the F9 function key.
     */
    public static readonly F9: KeyCode =  new KeyCode(0x78, "F9", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the F10 function key.
     */
    public static readonly F10: KeyCode =  new KeyCode(0x79, "F10", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the F11 function key.
     */
    public static readonly F11: KeyCode =  new KeyCode(0x7A, "F11", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the F12 function key.
     */
    public static readonly F12: KeyCode =  new KeyCode(0x7B, "F12", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the F13 function key.
     */
    public static readonly F13: KeyCode =  new KeyCode(0xF000, "F13", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the F14 function key.
     */
    public static readonly F14: KeyCode =  new KeyCode(0xF001, "F14", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the F15 function key.
     */
    public static readonly F15: KeyCode =  new KeyCode(0xF002, "F15", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the F16 function key.
     */
    public static readonly F16: KeyCode =  new KeyCode(0xF003, "F16", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the F17 function key.
     */
    public static readonly F17: KeyCode =  new KeyCode(0xF004, "F17", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the F18 function key.
     */
    public static readonly F18: KeyCode =  new KeyCode(0xF005, "F18", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the F19 function key.
     */
    public static readonly F19: KeyCode =  new KeyCode(0xF006, "F19", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the F20 function key.
     */
    public static readonly F20: KeyCode =  new KeyCode(0xF007, "F20", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the F21 function key.
     */
    public static readonly F21: KeyCode =  new KeyCode(0xF008, "F21", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the F22 function key.
     */
    public static readonly F22: KeyCode =  new KeyCode(0xF009, "F22", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the F23 function key.
     */
    public static readonly F23: KeyCode =  new KeyCode(0xF00A, "F23", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the F24 function key.
     */
    public static readonly F24: KeyCode =  new KeyCode(0xF00B, "F24", KeyCode.KeyCodeClass.FUNCTION);

    /**
     * Constant for the {@code Print Screen} key.
     */
    public static readonly PRINTSCREEN: KeyCode =  new KeyCode(0x9A, "Print Screen");

    /**
     * Constant for the {@code Insert} key.
     */
    public static readonly INSERT: KeyCode =  new KeyCode(0x9B, "Insert");

    /**
     * Constant for the {@code Help} key.
     */
    public static readonly HELP: KeyCode =  new KeyCode(0x9C, "Help");

    /**
     * Constant for the {@code Meta} key.
     */
    public static readonly META: KeyCode =  new KeyCode(0x9D, "Meta", KeyCode.KeyCodeClass.MODIFIER);

    /**
     * Constant for the {@code Back Quote} key.
     */
    public static readonly BACK_QUOTE: KeyCode =  new KeyCode(0xC0, "Back Quote");

    /**
     * Constant for the {@code Quote} key.
     */
    public static readonly QUOTE: KeyCode =  new KeyCode(0xDE, "Quote");

    /**
     * Constant for the numeric keypad <b>up</b> arrow key.
     */
    public static readonly KP_UP: KeyCode =  new KeyCode(0xE0, "Numpad Up", KeyCode.KeyCodeClass.ARROW | KeyCode.KeyCodeClass.NAVIGATION | KeyCode.KeyCodeClass.KEYPAD);

    /**
     * Constant for the numeric keypad <b>down</b> arrow key.
     */
    public static readonly KP_DOWN: KeyCode =  new KeyCode(0xE1, "Numpad Down", KeyCode.KeyCodeClass.ARROW | KeyCode.KeyCodeClass.NAVIGATION | KeyCode.KeyCodeClass.KEYPAD);

    /**
     * Constant for the numeric keypad <b>left</b> arrow key.
     */
    public static readonly KP_LEFT: KeyCode =  new KeyCode(0xE2, "Numpad Left", KeyCode.KeyCodeClass.ARROW | KeyCode.KeyCodeClass.NAVIGATION | KeyCode.KeyCodeClass.KEYPAD);

    /**
     * Constant for the numeric keypad <b>right</b> arrow key.
     */
    public static readonly KP_RIGHT: KeyCode =  new KeyCode(0xE3, "Numpad Right", KeyCode.KeyCodeClass.ARROW | KeyCode.KeyCodeClass.NAVIGATION | KeyCode.KeyCodeClass.KEYPAD);

    /**
     * Constant for the {@code Dead Grave} key.
     */
    public static readonly DEAD_GRAVE: KeyCode =  new KeyCode(0x80, "Dead Grave");

    /**
     * Constant for the {@code Dead Acute} key.
     */
    public static readonly DEAD_ACUTE: KeyCode =  new KeyCode(0x81, "Dead Acute");

    /**
     * Constant for the {@code Dead Circumflex} key.
     */
    public static readonly DEAD_CIRCUMFLEX: KeyCode =  new KeyCode(0x82, "Dead Circumflex");

    /**
     * Constant for the {@code Dead Tilde} key.
     */
    public static readonly DEAD_TILDE: KeyCode =  new KeyCode(0x83, "Dead Tilde");

    /**
     * Constant for the {@code Dead Macron} key.
     */
    public static readonly DEAD_MACRON: KeyCode =  new KeyCode(0x84, "Dead Macron");

    /**
     * Constant for the {@code Dead Breve} key.
     */
    public static readonly DEAD_BREVE: KeyCode =  new KeyCode(0x85, "Dead Breve");

    /**
     * Constant for the {@code Dead Abovedot} key.
     */
    public static readonly DEAD_ABOVEDOT: KeyCode =  new KeyCode(0x86, "Dead Abovedot");

    /**
     * Constant for the {@code Dead Diaeresis} key.
     */
    public static readonly DEAD_DIAERESIS: KeyCode =  new KeyCode(0x87, "Dead Diaeresis");

    /**
     * Constant for the {@code Dead Abovering} key.
     */
    public static readonly DEAD_ABOVERING: KeyCode =  new KeyCode(0x88, "Dead Abovering");

    /**
     * Constant for the {@code Dead Doubleacute} key.
     */
    public static readonly DEAD_DOUBLEACUTE: KeyCode =  new KeyCode(0x89, "Dead Doubleacute");

    /**
     * Constant for the {@code Dead Caron} key.
     */
    public static readonly DEAD_CARON: KeyCode =  new KeyCode(0x8a, "Dead Caron");

    /**
     * Constant for the {@code Dead Cedilla} key.
     */
    public static readonly DEAD_CEDILLA: KeyCode =  new KeyCode(0x8b, "Dead Cedilla");

    /**
     * Constant for the {@code Dead Ogonek} key.
     */
    public static readonly DEAD_OGONEK: KeyCode =  new KeyCode(0x8c, "Dead Ogonek");

    /**
     * Constant for the {@code Dead Iota} key.
     */
    public static readonly DEAD_IOTA: KeyCode =  new KeyCode(0x8d, "Dead Iota");

    /**
     * Constant for the {@code Dead Voiced Sound} key.
     */
    public static readonly DEAD_VOICED_SOUND: KeyCode =  new KeyCode(0x8e, "Dead Voiced Sound");

    /**
     * Constant for the {@code Dead Semivoiced Sound} key.
     */
    public static readonly DEAD_SEMIVOICED_SOUND: KeyCode =  new KeyCode(0x8f, "Dead Semivoiced Sound");

    /**
     * Constant for the {@code Ampersand} key.
     */
    public static readonly AMPERSAND: KeyCode =  new KeyCode(0x96, "Ampersand");

    /**
     * Constant for the {@code Asterisk} key.
     */
    public static readonly ASTERISK: KeyCode =  new KeyCode(0x97, "Asterisk");

    /**
     * Constant for the {@code Double Quote} key.
     */
    public static readonly QUOTEDBL: KeyCode =  new KeyCode(0x98, "Double Quote");

    /**
     * Constant for the {@code Less} key.
     */
    public static readonly LESS: KeyCode =  new KeyCode(0x99, "Less");

    /**
     * Constant for the {@code Greater} key.
     */
    public static readonly GREATER: KeyCode =  new KeyCode(0xa0, "Greater");

    /**
     * Constant for the {@code Left Brace} key.
     */
    public static readonly BRACELEFT: KeyCode =  new KeyCode(0xa1, "Left Brace");

    /**
     * Constant for the {@code Right Brace} key.
     */
    public static readonly BRACERIGHT: KeyCode =  new KeyCode(0xa2, "Right Brace");

    /**
     * Constant for the "@" key.
     */
    public static readonly AT: KeyCode =  new KeyCode(0x0200, "At");

    /**
     * Constant for the ":" key.
     */
    public static readonly COLON: KeyCode =  new KeyCode(0x0201, "Colon");

    /**
     * Constant for the "^" key.
     */
    public static readonly CIRCUMFLEX: KeyCode =  new KeyCode(0x0202, "Circumflex");

    /**
     * Constant for the "$" key.
     */
    public static readonly DOLLAR: KeyCode =  new KeyCode(0x0203, "Dollar");

    /**
     * Constant for the Euro currency sign key.
     */
    public static readonly EURO_SIGN: KeyCode =  new KeyCode(0x0204, "Euro Sign");

    /**
     * Constant for the "!" key.
     */
    public static readonly EXCLAMATION_MARK: KeyCode =  new KeyCode(0x0205, "Exclamation Mark");

    /**
     * Constant for the inverted exclamation mark key.
     */
    public static readonly INVERTED_EXCLAMATION_MARK: KeyCode =  new KeyCode(0x0206, "Inverted Exclamation Mark");

    /**
     * Constant for the ": KeyCode =  new KeyCode(" key.
     */
    public static readonly LEFT_PARENTHESIS: KeyCode =  new KeyCode(0x0207, "Left Parenthesis");

    /**
     * Constant for the "#" key.
     */
    public static readonly NUMBER_SIGN: KeyCode =  new KeyCode(0x0208, "Number Sign");

    /**
     * Constant for the "+" key.
     */
    public static readonly PLUS: KeyCode =  new KeyCode(0x0209, "Plus");

    /**
     * Constant for the ")" key.
     */
    public static readonly RIGHT_PARENTHESIS: KeyCode =  new KeyCode(0x020A, "Right Parenthesis");

    /**
     * Constant for the "_" key.
     */
    public static readonly UNDERSCORE: KeyCode =  new KeyCode(0x020B, "Underscore");

    /**
     * Constant for the Microsoft Windows "Windows" key.
     * It is used for both the left and right version of the key.
     */
    public static readonly WINDOWS: KeyCode =  new KeyCode(0x020C, "Windows", KeyCode.KeyCodeClass.MODIFIER);

    /**
     * Constant for the Microsoft Windows Context Menu key.
     */
    public static readonly CONTEXT_MENU: KeyCode =  new KeyCode(0x020D, "Context Menu");

    /**
     * Constant for input method support on Asian Keyboards.
     */
    public static readonly FINAL: KeyCode =  new KeyCode(0x0018, "Final");

    /**
     * Constant for the Convert function key.
     */
    public static readonly CONVERT: KeyCode =  new KeyCode(0x001C, "Convert");

    /**
     * Constant for the Don't Convert function key.
     */
    public static readonly NONCONVERT: KeyCode =  new KeyCode(0x001D, "Nonconvert");

    /**
     * Constant for the Accept or Commit function key.
     */
    public static readonly ACCEPT: KeyCode =  new KeyCode(0x001E, "Accept");

    /**
     * Constant for the {@code Mode Change} key.
     */
    public static readonly MODECHANGE: KeyCode =  new KeyCode(0x001F, "Mode Change");
    /**
     * Constant for the {@code Kana} key.
     */
    public static readonly KANA: KeyCode =  new KeyCode(0x0015, "Kana");
    /**
     * Constant for the {@code Kanji} key.
     */
    public static readonly KANJI: KeyCode =  new KeyCode(0x0019, "Kanji");

    /**
     * Constant for the Alphanumeric function key.
     */
    public static readonly ALPHANUMERIC: KeyCode =  new KeyCode(0x00F0, "Alphanumeric");

    /**
     * Constant for the Katakana function key.
     */
    public static readonly KATAKANA: KeyCode =  new KeyCode(0x00F1, "Katakana");

    /**
     * Constant for the Hiragana function key.
     */
    public static readonly HIRAGANA: KeyCode =  new KeyCode(0x00F2, "Hiragana");

    /**
     * Constant for the Full-Width Characters function key.
     */
    public static readonly FULL_WIDTH: KeyCode =  new KeyCode(0x00F3, "Full Width");

    /**
     * Constant for the Half-Width Characters function key.
     */
    public static readonly HALF_WIDTH: KeyCode =  new KeyCode(0x00F4, "Half Width");

    /**
     * Constant for the Roman Characters function key.
     */
    public static readonly ROMAN_CHARACTERS: KeyCode =  new KeyCode(0x00F5, "Roman Characters");

    /**
     * Constant for the All Candidates function key.
     */
    public static readonly ALL_CANDIDATES: KeyCode =  new KeyCode(0x0100, "All Candidates");

    /**
     * Constant for the Previous Candidate function key.
     */
    public static readonly PREVIOUS_CANDIDATE: KeyCode =  new KeyCode(0x0101, "Previous Candidate");

    /**
     * Constant for the Code Input function key.
     */
    public static readonly CODE_INPUT: KeyCode =  new KeyCode(0x0102, "Code Input");

    /**
     * Constant for the Japanese-Katakana function key.
     * This key switches to a Japanese input method and selects its Katakana input mode.
     */
    public static readonly JAPANESE_KATAKANA: KeyCode =  new KeyCode(0x0103, "Japanese Katakana");

    /**
     * Constant for the Japanese-Hiragana function key.
     * This key switches to a Japanese input method and selects its Hiragana input mode.
     */
    public static readonly JAPANESE_HIRAGANA: KeyCode =  new KeyCode(0x0104, "Japanese Hiragana");

    /**
     * Constant for the Japanese-Roman function key.
     * This key switches to a Japanese input method and selects its Roman-Direct input mode.
     */
    public static readonly JAPANESE_ROMAN: KeyCode =  new KeyCode(0x0105, "Japanese Roman");

    /**
     * Constant for the locking Kana function key.
     * This key locks the keyboard into a Kana layout.
     */
    public static readonly KANA_LOCK: KeyCode =  new KeyCode(0x0106, "Kana Lock");

    /**
     * Constant for the input method on/off key.
     */
    public static readonly INPUT_METHOD_ON_OFF: KeyCode =  new KeyCode(0x0107, "Input Method On/Off");

    /**
     * Constant for the {@code Cut} key.
     */
    public static readonly CUT: KeyCode =  new KeyCode(0xFFD1, "Cut");

    /**
     * Constant for the {@code Copy} key.
     */
    public static readonly COPY: KeyCode =  new KeyCode(0xFFCD, "Copy");

    /**
     * Constant for the {@code Paste} key.
     */
    public static readonly PASTE: KeyCode =  new KeyCode(0xFFCF, "Paste");

    /**
     * Constant for the {@code Undo} key.
     */
    public static readonly UNDO: KeyCode =  new KeyCode(0xFFCB, "Undo");

    /**
     * Constant for the {@code Again} key.
     */
    public static readonly AGAIN: KeyCode =  new KeyCode(0xFFC9, "Again");

    /**
     * Constant for the {@code Find} key.
     */
    public static readonly FIND: KeyCode =  new KeyCode(0xFFD0, "Find");

    /**
     * Constant for the {@code Properties} key.
     */
    public static readonly PROPS: KeyCode =  new KeyCode(0xFFCA, "Properties");

    /**
     * Constant for the {@code Stop} key.
     */
    public static readonly STOP: KeyCode =  new KeyCode(0xFFC8, "Stop");

    /**
     * Constant for the input method on/off key.
     */
    public static readonly COMPOSE: KeyCode =  new KeyCode(0xFF20, "Compose");

    /**
     * Constant for the AltGraph function key.
     */
    public static readonly ALT_GRAPH: KeyCode =  new KeyCode(0xFF7E, "Alt Graph", KeyCode.KeyCodeClass.MODIFIER);

    /**
     * Constant for the Begin key.
     */
    public static readonly BEGIN: KeyCode =  new KeyCode(0xFF58, "Begin");

    /**
     * This value is used to indicate that the keyCode is unknown.
     * Key typed events do not have a keyCode value; this value
     * is used instead.
     */
    public static readonly UNDEFINED: KeyCode =  new KeyCode(0x0, "Undefined");


    //--------------------------------------------------------------
    //
    // Mobile and Embedded Specific Key Codes
    //
    //--------------------------------------------------------------

    /**
     * Constant for the {@code Softkey 0} key.
     */
    public static readonly SOFTKEY_0: KeyCode =  new KeyCode(0x1000, "Softkey 0");

    /**
     * Constant for the {@code Softkey 1} key.
     */
    public static readonly SOFTKEY_1: KeyCode =  new KeyCode(0x1001, "Softkey 1");

    /**
     * Constant for the {@code Softkey 2} key.
     */
    public static readonly SOFTKEY_2: KeyCode =  new KeyCode(0x1002, "Softkey 2");

    /**
     * Constant for the {@code Softkey 3} key.
     */
    public static readonly SOFTKEY_3: KeyCode =  new KeyCode(0x1003, "Softkey 3");

    /**
     * Constant for the {@code Softkey 4} key.
     */
    public static readonly SOFTKEY_4: KeyCode =  new KeyCode(0x1004, "Softkey 4");

    /**
     * Constant for the {@code Softkey 5} key.
     */
    public static readonly SOFTKEY_5: KeyCode =  new KeyCode(0x1005, "Softkey 5");

    /**
     * Constant for the {@code Softkey 6} key.
     */
    public static readonly SOFTKEY_6: KeyCode =  new KeyCode(0x1006, "Softkey 6");

    /**
     * Constant for the {@code Softkey 7} key.
     */
    public static readonly SOFTKEY_7: KeyCode =  new KeyCode(0x1007, "Softkey 7");

    /**
     * Constant for the {@code Softkey 8} key.
     */
    public static readonly SOFTKEY_8: KeyCode =  new KeyCode(0x1008, "Softkey 8");

    /**
     * Constant for the {@code Softkey 9} key.
     */
    public static readonly SOFTKEY_9: KeyCode =  new KeyCode(0x1009, "Softkey 9");

    /**
     * Constant for the {@code Game A} key.
     */
    public static readonly GAME_A: KeyCode =  new KeyCode(0x100A, "Game A");

    /**
     * Constant for the {@code Game B} key.
     */
    public static readonly GAME_B: KeyCode =  new KeyCode(0x100B, "Game B");

    /**
     * Constant for the {@code Game C} key.
     */
    public static readonly GAME_C: KeyCode =  new KeyCode(0x100C, "Game C");

    /**
     * Constant for the {@code Game D} key.
     */
    public static readonly GAME_D: KeyCode =  new KeyCode(0x100D, "Game D");

    /**
     * Constant for the {@code Star} key.
     */
    public static readonly STAR: KeyCode =  new KeyCode(0x100E, "Star");

    /**
     * Constant for the {@code Pound} key.
     */
    public static readonly POUND: KeyCode =  new KeyCode(0x100F, "Pound");

    /**
     * Constant for the {@code Power} key.
     */
    public static readonly POWER: KeyCode =  new KeyCode(0x199, "Power");

    /**
     * Constant for the {@code Info} key.
     */
    public static readonly INFO: KeyCode =  new KeyCode(0x1C9, "Info");

    /**
     * Constant for the {@code Colored Key 0} key.
     */
    public static readonly COLORED_KEY_0: KeyCode =  new KeyCode(0x193, "Colored Key 0");

    /**
     * Constant for the {@code Colored Key 1} key.
     */
    public static readonly COLORED_KEY_1: KeyCode =  new KeyCode(0x194, "Colored Key 1");

    /**
     * Constant for the {@code Colored Key 2} key.
     */
    public static readonly COLORED_KEY_2: KeyCode =  new KeyCode(0x195, "Colored Key 2");

    /**
     * Constant for the {@code Colored Key 3} key.
     */
    public static readonly COLORED_KEY_3: KeyCode =  new KeyCode(0x196, "Colored Key 3");

    /**
     * Constant for the {@code Eject} key.
     */
    public static readonly EJECT_TOGGLE: KeyCode =  new KeyCode(0x19E, "Eject", KeyCode.KeyCodeClass.MEDIA);

    /**
     * Constant for the {@code Play} key.
     */
    public static readonly PLAY: KeyCode =  new KeyCode(0x19F, "Play", KeyCode.KeyCodeClass.MEDIA);

    /**
     * Constant for the {@code Record} key.
     */
    public static readonly RECORD: KeyCode =  new KeyCode(0x1A0, "Record", KeyCode.KeyCodeClass.MEDIA);

    /**
     * Constant for the {@code Fast Forward} key.
     */
    public static readonly FAST_FWD: KeyCode =  new KeyCode(0x1A1, "Fast Forward", KeyCode.KeyCodeClass.MEDIA);

    /**
     * Constant for the {@code Rewind} key.
     */
    public static readonly REWIND: KeyCode =  new KeyCode(0x19C, "Rewind", KeyCode.KeyCodeClass.MEDIA);

    /**
     * Constant for the {@code Previous Track} key.
     */
    public static readonly TRACK_PREV: KeyCode =  new KeyCode(0x1A8, "Previous Track", KeyCode.KeyCodeClass.MEDIA);

    /**
     * Constant for the {@code Next Track} key.
     */
    public static readonly TRACK_NEXT: KeyCode =  new KeyCode(0x1A9, "Next Track", KeyCode.KeyCodeClass.MEDIA);

    /**
     * Constant for the {@code Channel Up} key.
     */
    public static readonly CHANNEL_UP: KeyCode =  new KeyCode(0x1AB, "Channel Up", KeyCode.KeyCodeClass.MEDIA);

    /**
     * Constant for the {@code Channel Down} key.
     */
    public static readonly CHANNEL_DOWN: KeyCode =  new KeyCode(0x1AC, "Channel Down", KeyCode.KeyCodeClass.MEDIA);

    /**
     * Constant for the {@code Volume Up} key.
     */
    public static readonly VOLUME_UP: KeyCode =  new KeyCode(0x1bf, "Volume Up", KeyCode.KeyCodeClass.MEDIA);

    /**
     * Constant for the {@code Volume Down} key.
     */
    public static readonly VOLUME_DOWN: KeyCode =  new KeyCode(0x1C0, "Volume Down", KeyCode.KeyCodeClass.MEDIA);

    /**
     * Constant for the {@code Mute} key.
     */
    public static readonly MUTE: KeyCode =  new KeyCode(0x1C1, "Mute", KeyCode.KeyCodeClass.MEDIA);

    /**
     * Constant for the Apple {@code Command} key.
     * @since JavaFX 2.1
     */
    public static readonly COMMAND: KeyCode =  new KeyCode(0x300, "Command", KeyCode.KeyCodeClass.MODIFIER);

    /**
     * Constant for the {@code Shortcut} key.
     */
    public static readonly SHORTCUT: KeyCode =  new KeyCode(-1, "Shortcut");

    private readonly code: number;
    private readonly ch: string;
    private readonly name: string;
    private mask: number;

    private constructor(code: number, name: string, mask?: number) {
        this.code = code;
        this.name = name;
        this.mask = mask;
        this.ch = String.fromCharCode(code);
    }

    /**
     * Function keys like F1, F2, etc...
     * @return true if this key code corresponds to a functional key
     * @since JavaFX 2.2
     */
    public isFunctionKey(): boolean {
        return (this.mask & KeyCode.KeyCodeClass.FUNCTION) !== 0;
    }

    /**
     * Navigation keys are arrow keys and Page Down, Page Up, Home, End
     * (including keypad keys)
     * @return true if this key code corresponds to a navigation key
     * @since JavaFX 2.2
     */
    public isNavigationKey(): boolean {
        return (this.mask & KeyCode.KeyCodeClass.NAVIGATION) !== 0;
    }

    /**
     * Left, right, up, down keys (including the keypad arrows)
     * @return true if this key code corresponds to an arrow key
     * @since JavaFX 2.2
     */
    public isArrowKey(): boolean {
        return (this.mask & KeyCode.KeyCodeClass.ARROW) !== 0;
    }

    /**
     * Keys that could act as a modifier
     * @return true if this key code corresponds to a modifier key
     * @since JavaFX 2.2
     */
    public isModifierKey(): boolean {
        return (this.mask & KeyCode.KeyCodeClass.MODIFIER) !== 0;
    }

    /**
     * All keys with letters
     * @return true if this key code corresponds to a letter key
     * @since JavaFX 2.2
     */
    public isLetterKey(): boolean {
        return (this.mask & KeyCode.KeyCodeClass.LETTER) !== 0;
    }

    /**
     * All Digit keys (including the keypad digits)
     * @return true if this key code corresponds to a digit key
     * @since JavaFX 2.2
     */
    public isDigitKey(): boolean {
        return (this.mask & KeyCode.KeyCodeClass.DIGIT) !== 0;
    }

    /**
     * All keys on the keypad
     * @return true if this key code corresponds to a keypad key
     * @since JavaFX 2.2
     */
    public isKeypadKey(): boolean {
        return (this.mask & KeyCode.KeyCodeClass.KEYPAD) !== 0;
    }

    /**
     * Space, tab and enter
     * @return true if this key code corresponds to a whitespace key
     * @since JavaFX 2.2
     */
    public isWhitespaceKey(): boolean {
        return (this.mask & KeyCode.KeyCodeClass.WHITESPACE) !== 0;
    }

    /**
     * All multimedia keys (channel up/down, volume control, etc...)
     * @return true if this key code corresponds to a media key
     * @since JavaFX 2.2
     */
    public isMediaKey(): boolean {
        return (this.mask & KeyCode.KeyCodeClass.MEDIA) !== 0;
    }

    /**
     * Gets name of this key code.
     * @return Name of this key code
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Returns the character element of this key code, which is simply a mapping of the underlying platform code
     * returned by {@link #getCode()}.
     *
     * @return the character element of this key code
     * @since 9
     */
    public getChar(): string {
        return this.ch;
    }

    /**
     * Returns the underlying platform code used to represent the {@link #getChar() character} in the key code.
     *
     * @return the underlying platform code used to represent the {@link #getChar() character} in the key code
     * @since 9
     */
    public getCode(): number {
        return this.code;
    }


    private static nameMap: Map<string, KeyCode> = KeyCode.initMaps();
    
    private static initMaps(): Map<string, KeyCode> {
        const map: Map<string, KeyCode> = new HashMap<string, KeyCode>(32)
        let fields: string[] = Object.getOwnPropertyNames( KeyCode );
        //to take only static fields of the class we use regex
        let pattern = new RegExp('^[A-Z0-9_]+$');
        for (let i: number = 0; i < fields.length; i++) {
            if (fields[i].match(pattern)) {
                let code: KeyCode = KeyCode[fields[i]];
                KeyCode.nameMap.put(code.getName(), code);
            }
        }
        return map;
    }

    /**
     * Parses textual representation of a key.
     */
    public static getKeyCode(name: string): KeyCode {
        return KeyCode.nameMap.get(name);
    }

}
