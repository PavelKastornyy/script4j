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

import { ObjectProperty } from 'script4jfx.base';
import { StringProperty } from 'script4jfx.base';
import { NumberProperty } from 'script4jfx.base';
import { BooleanProperty } from 'script4jfx.base';
import { SimpleObjectProperty } from 'script4jfx.base';
import { SimpleStringProperty } from 'script4jfx.base';
import { SimpleNumberProperty } from 'script4jfx.base';
import { SimpleBooleanProperty } from 'script4jfx.base';
import { List } from 'script4j.base';
import { Iterator } from 'script4j.base';
import { ArrayList } from 'script4j.base';

export class ModelWrapper<T> {
    
    private readonly fields: List<ModelWrapper.Field<any>> = new ArrayList<ModelWrapper.Field<any>>();
    
    private model: T;
    
    public setModel(model: T): void {
        this.model = model;
    }
    
    public getModel(): T {
        return this.model;
    }
    
    public stringField(getter: Function, setter: Function, defaultValue: string): StringProperty {
        const prop: StringProperty = new SimpleStringProperty();
        const field: ModelWrapper.Field<string> = new ModelWrapper.Field<string>(prop, getter, setter, defaultValue);
        this.fields.add(field);
        return prop;
    }
    
    public numberField(getter: Function, setter: Function, defaultValue: number): NumberProperty {
        const prop: NumberProperty = new SimpleNumberProperty();
        const field: ModelWrapper.Field<number> = new ModelWrapper.Field<number>(prop, getter, setter, defaultValue);
        this.fields.add(field);
        return prop;
    }
    
    public booleanField(getter: Function, setter: Function, defaultValue: boolean): BooleanProperty {
        const prop: BooleanProperty = new SimpleBooleanProperty();
        const field: ModelWrapper.Field<boolean> = new ModelWrapper.Field<boolean>(prop, getter, setter, defaultValue);
        this.fields.add(field);
        return prop;
    }
    
    public objectField(getter: Function, setter: Function, defaultValue: Object): ObjectProperty<any> {
        const prop: ObjectProperty<any> = new SimpleObjectProperty();
        const field: ModelWrapper.Field<Object> = new ModelWrapper.Field<Object>(prop, getter, setter, defaultValue);
        this.fields.add(field);
        return prop;
    }
    
    public read(): void {
        let iterator: Iterator<ModelWrapper.Field<any>> = this.fields.iterator();
        while (iterator.hasNext()) {
            const field: ModelWrapper.Field<any> = iterator.next();
            field.getProperty().set(field.getGetter().call(this.model));
        }
    }
    
    public save(): void {
        let iterator: Iterator<ModelWrapper.Field<any>> = this.fields.iterator();
        while (iterator.hasNext()) {
            const field: ModelWrapper.Field<any> = iterator.next();
            field.getSetter().call(this.model, field.getProperty().get());
        }
    }
    
    public reset() {
        let iterator: Iterator<ModelWrapper.Field<any>> = this.fields.iterator();
        while (iterator.hasNext()) {
            const field: ModelWrapper.Field<any> = iterator.next();
            field.getSetter().call(this.model, field.getDefaultValue());
            field.getProperty().set(field.getDefaultValue());
        }
    }
}

export namespace ModelWrapper {

    export class Field<S> {

        private readonly property: ObjectProperty<S>;
        
        private readonly getter: Function;
        
        private readonly setter: Function;
        
        private readonly defaultValue: S;
        
        constructor(property: ObjectProperty<S>, getter: Function, setter: Function, defaultValue: S) {
            this.property = property;
            this.getter = getter;
            this.setter = setter;
            this.defaultValue = defaultValue;
        }
        
        public getProperty(): ObjectProperty<S> {
            return this.property;
        }
        
        public getGetter(): Function {
            return this.getter;
        }
        
        public getSetter(): Function {
            return this.setter;
        }
        
        public getDefaultValue(): S {
            return this.defaultValue;
        }
    }
}