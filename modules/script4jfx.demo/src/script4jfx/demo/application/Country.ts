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

import 'jquery';
import { Objects } from 'script4j.base';

export class Country {
    
    private name: string = null;
    
    private code: string = null;
    
    public constructor(name?: string, code?: string) {
        if (name !== undefined) {
            this.name = name;
        }
        if (code !== undefined) {
            this.code = code;
        }
    }
    
    public setName(name: string): void {
        this.name = name;
    }
    
    public getName(): string {
        return this.name;
    }
    
    public setCode(code: string): void {
        this.code = code;
    }
    
    public getCode(): string {
        return this.code;
    }
    
    public equals(o: Object): boolean {
        if (o === null) return false;
        if (o === this) return true;
        if (!(o instanceof Country)) {
            return false;
        }
        let that: Country = <Country> o;
        return Objects.equals(this.name, that.name) && Objects.equals(this.code, that.code);
    }

    public hashCode() {
        let result: number = 17;
        result = 31 * result + Objects.hashCode(this.name);
        result = 31 * result + Objects.hashCode(this.code);
        return result;
    }
    
    public toString(): string {
        return "{name:" + this.name + ", code:" + this.code + "}";
    }
}
