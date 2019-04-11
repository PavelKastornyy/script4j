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

import { Person } from './application/Person';
import { PersonView } from './application/PersonView';
import { PersonViewModel } from './application/PersonViewModel';
import 'jquery';
 
export class Application {
    
    public static main(): void {
        const viewModel: PersonViewModel = new PersonViewModel();
        const view: PersonView = new PersonView();
        view.initialize(viewModel);
        $("body").append(view.getRootElement());
        
        const person: Person = new Person();
        viewModel.setModel(person);
        
        const resetButton= $('<button>Reset</button>').on("click", function () { 
            viewModel.reset();
        });
        $("body").append(resetButton);
        
        const saveButton= $('<button>Save</button>').on("click", function () { 
            viewModel.save();
        });
        $("body").append(saveButton);
        
        const readButton= $('<button>Read</button>').on("click", function () { 
            person.setFirstName("Nick");
            person.setLastName("Black");
            person.setAge(30);
            person.setResume("Good man");
            viewModel.read();
        });
        $("body").append(readButton);
        
        const printButton= $('<button>Print</button>').on("click", function () { 
            console.log(person.toString());
        });
        $("body").append(printButton);
    }
}