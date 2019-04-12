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

import { View } from './../mvvm/View';
import { PersonViewModel } from './PersonViewModel';
import { TextField } from 'script4jfx.controls';
import { TextArea } from 'script4jfx.controls';
import { Pane } from 'script4jfx.graphics';
import { Node } from 'script4jfx.graphics';
import { ObservableList } from 'script4jfx.base';
import { Bindings } from 'script4jfx.base';
import { NumberStringConverter } from 'script4jfx.base';


export class PersonView implements View {

    private readonly pane: Pane = new Pane();    

    private readonly firstNameTextField: TextField = new TextField();
    
    private readonly lastNameTextField: TextField = new TextField();
    
    private readonly ageTextField: TextField = new TextField();
    
    //private readonly country...: ... = new ...();
    
    private readonly resumeTextArea: TextArea = new TextArea();
    
    constructor() {
        const paneNodes: ObservableList<Node> = this.pane.getChildren();
        paneNodes.add(this.firstNameTextField);
        paneNodes.add(this.lastNameTextField);
        paneNodes.add(this.ageTextField);
        paneNodes.add(this.resumeTextArea);
    }
    
    public getRootElement(): HTMLElement {
        return this.pane.getElement();
    }
    
    public initialize(viewModel: PersonViewModel) {
        this.firstNameTextField.textProperty().bindBidirectional(viewModel.firstNameProperty());
        this.lastNameTextField.textProperty().bindBidirectional(viewModel.lastNameProperty());
        Bindings.bindBidirectional(this.ageTextField.textProperty(), viewModel.ageProperty(), 
                new NumberStringConverter());
        this.resumeTextArea.textProperty().bindBidirectional(viewModel.resumeProperty());
    }
}



