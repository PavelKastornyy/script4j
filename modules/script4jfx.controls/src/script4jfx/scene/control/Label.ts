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

import { Labeled } from './Labeled';
import { ObjectProperty } from 'script4jfx.base';
import { ChangeListener } from 'script4jfx.base';
import { ObservableValue } from 'script4jfx.base';
import { SimpleObjectProperty } from 'script4jfx.base';
import { Node } from 'script4jfx.graphics';
import { LabelSkin } from './skin/LabelSkin';

export class Label extends Labeled {

    /**
     * A Label can act as a label for a different Control or Node.
     */    
    private labelFor: ObjectProperty<Node>;

    public constructor​(text?: string) {
        super(text);
        if (this.labelFor === undefined) {
            this.labelFor = null;
        }
    }
    
    /**
     * Gets the value of the property labelFor.
     */
    public getLabelFor(): Node {
        return this.labelFor === null ? null : this.labelFor.get();
    }

    /**
     * A Label can act as a label for a different Control or Node.
     */
    public labelForProperty(): ObjectProperty<Node> {
        if (this.labelFor === null || this.labelFor === undefined) {
            this.labelFor = new SimpleObjectProperty(null, this);
            this.labelFor.addListener(ChangeListener.fromFunc((observable: ObservableValue<Node>, 
                    oldValue: Node, newValue: Node) => {
                (<LabelSkin> this.getSkin()).setLabelFor(newValue.getId());
            }));
        }
        return this.labelFor;
    }

    /**
     * Sets the value of the property labelFor.
     */
    public setLabelFor​(value: Node): void {
        this.labelForProperty().set(value);
    }

}

