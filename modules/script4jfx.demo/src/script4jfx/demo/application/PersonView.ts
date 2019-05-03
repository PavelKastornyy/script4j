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
import { System } from 'script4j.base';
import { Node } from 'script4jfx.graphics';
import { Scene } from 'script4jfx.graphics';
import { ObservableList } from 'script4jfx.base';
import { Bindings } from 'script4jfx.base';
import { NumberStringConverter } from 'script4jfx.base';
import { EventHandler } from 'script4jfx.base';
import { KeyEvent } from 'script4jfx.graphics';
import { MouseEvent } from 'script4jfx.graphics';


export class PersonView implements View {

    private readonly scene: Scene;
    
    private readonly pane: Pane;    

    private readonly firstNameTextField: TextField = new TextField();
    
    private readonly lastNameTextField: TextField = new TextField();
    
    private readonly ageTextField: TextField = new TextField();
    
    //private readonly country...: ... = new ...();
    
    private readonly resumeTextArea: TextArea = new TextArea();
    
    constructor() {
        this.firstNameTextField.setOnKeyPressed(EventHandler.fromFunc((event: KeyEvent) => {
            console.log("KeyPressed event for firstNameTextField came:");
            console.log(event);
        }));
        this.firstNameTextField.setOnKeyReleased(EventHandler.fromFunc((event: KeyEvent) => {
            console.log("KeyReleased event for firstNameTextField came:");
            console.log(event);
        }));
//        this.firstNameTextField.setOnKeyTyped(EventHandler.fromFunc((event: KeyEvent) => {
//            console.log("KeyTyped event for firstNameTextField came:");
//            console.log(event);
//        }));
//        this.firstNameTextField.addEventHandler(KeyEvent.ANY, EventHandler.fromFunc((event: KeyEvent) => {
//            console.log("KeyEvent.ANY for firstNameTextField came:");
//            console.log(event);
//        }));
        this.pane = new Pane(
            this.firstNameTextField,
            this.lastNameTextField,
            this.ageTextField,
            this.resumeTextArea
        )
        this.scene = new Scene(this.pane);
        this.pane.setStyle("padding: 20px; background-color: yellow");
        this.pane.setOnMouseClicked(EventHandler.fromFunc((event: MouseEvent) => {
            console.log(event);
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
    
    public removeKeyReleased() {
        this.firstNameTextField.setOnKeyReleased(null);
    }
    
    public removeKeyPressed() {
        this.firstNameTextField.setOnKeyPressed(null);
    }
    
    public removeKeyTyped() {
        this.firstNameTextField.setOnKeyTyped(null);
    }
}




