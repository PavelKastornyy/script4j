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
import { Button } from 'script4jfx.controls';
import { Pane } from 'script4jfx.graphics';
import { System } from 'script4j.base';
import { Node } from 'script4jfx.graphics';
import { Scene } from 'script4jfx.graphics';
import { ObservableList } from 'script4jfx.base';
import { Bindings } from 'script4jfx.base';
import { NumberStringConverter } from 'script4jfx.base';
import { EventHandler } from 'script4jfx.base';
import { KeyEvent } from 'script4jfx.graphics';
import { MouseEvent } from 'script4jfx.graphics';
import { Label } from 'script4jfx.controls';
import { HTML } from 'script4jfx.loader';
import { HTMLLoader } from 'script4jfx.loader';

import 'reflect-metadata';

export class PersonView implements View {

    private scene: Scene = null;
    
    @HTML
    private pane: Pane = null;    
    
    @HTML
    private firstNameTextField: TextField = null;
    
    @HTML
    private firstNameLabel: Label = null;
    
    @HTML
    private lastNameTextField: TextField = null;
    
    @HTML
    private ageTextField: TextField = null;
    
    //private readonly country...: ... = new ...();
    
    @HTML
    private readonly resumeTextArea: TextArea = null;
    
    @HTML
    private readonly createButton: Button = null;
    
    constructor(rootElement: HTMLElement) {
        const htmlLoader: HTMLLoader = new HTMLLoader(rootElement);
        htmlLoader.setController(this);
        htmlLoader.load();
        this.firstNameTextField.setOnKeyTyped(EventHandler.lambda((event: KeyEvent) => {
            console.log(event);
        }));
        this.scene = new Scene(this.pane);
        this.pane.setStyle("padding: 20px; background-color: yellow");
        this.pane.setOnMouseClicked(EventHandler.lambda((event: MouseEvent) => {
            console.log(event);
        }));
        this.createButton.setOnMouseClicked(EventHandler.lambda((event: MouseEvent) => {
            console.log("Button was clicked:" + this.createButton.getText());
        }));
    }
    
    public getScene(): Scene {
        return this.scene;
    }
    
    public initialize(viewModel: PersonViewModel) {
        this.firstNameTextField.textProperty().bindBidirectional(viewModel.firstNameProperty());
        this.lastNameTextField.textProperty().bindBidirectional(viewModel.lastNameProperty());
        Bindings.bindBidirectional(this.ageTextField.textProperty(), viewModel.ageProperty(), 
                new NumberStringConverter());
        this.resumeTextArea.textProperty().bindBidirectional(viewModel.resumeProperty());
    }
}