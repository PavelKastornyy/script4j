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

import { Map } from './../../util/Map';
import { HashMap } from './../../util/HashMap';
import { Logger } from './Logger';
import { LoggingLevel } from './LoggingLevel';
import { System } from './../../lang/System';
import { PrintWriter } from './../../io/PrintWriter';

export class LoggerFactory {

    private static loggersByClass: Map<any, Logger> = new HashMap();

    public static getLogger(klass: any): Logger {
        let logger: Logger = LoggerFactory.loggersByClass.get(klass);
        if (logger == null) {
            let level: LoggingLevel = LoggingLevel.valueOf(System.getProperty(System.PropertyKey.LOGGING_LEVEL));
            logger = new LoggerFactory.DefaultLogger(klass, level, System.err);
            LoggerFactory.loggersByClass.put(klass, logger);
        }
        return logger;
    }
}

export namespace LoggerFactory {

    export class DefaultLogger<T> implements Logger {

        private readonly systemLevel: LoggingLevel;

        private readonly printWriter: PrintWriter;

        private readonly klass: any;

        constructor(klass: any, systemLevel: LoggingLevel, printWriter: PrintWriter) {
            this.klass = klass;
            this.systemLevel = systemLevel;
            this.printWriter = printWriter;
        }

        public debug(format: string, ...objects: Object[]):void {
            this.printMessage(LoggingLevel.DEBUG, format, objects);
        }

        public error(format: string, ...objects: Object[]):void {
            this.printMessage(LoggingLevel.ERROR, format, objects);
        }

        public info(format: string, ...objects: Object[]):void {
            this.printMessage(LoggingLevel.INFO, format, objects);
        }

        public trace(format: string, ...objects: Object[]):void {
            this.printMessage(LoggingLevel.TRACE, format, objects);
        }

        public warn(format: string, ...objects: Object[]):void {
            this.printMessage(LoggingLevel.WARN, format, objects);
        }

        public isDebugEnabled(): boolean {
            return this.isLevelEnabled(LoggingLevel.DEBUG);
        }

        public isErrorEnabled(): boolean {
            return this.isLevelEnabled(LoggingLevel.ERROR);
        }

        public isInfoEnabled(): boolean {
            return this.isLevelEnabled(LoggingLevel.INFO);
        }

        public isTraceEnabled(): boolean {
            return this.isLevelEnabled(LoggingLevel.TRACE);
        }

        public isWarnEnabled(): boolean {
            return this.isLevelEnabled(LoggingLevel.WARN);
        }

        private isLevelEnabled(level: LoggingLevel): boolean {
            if (this.systemLevel <= level) {
                return true;
            } else {
                return false;
            }
        }

        private printMessage(level: LoggingLevel, format: string, ...objects : Object[]): void {
            if (!this.isLevelEnabled(level)){
                return;
            }
            let printString: string = format;
            if (objects !== undefined) {
                printString = "";
                let formats: string[] = format.split("{}");
                for (let i: number = 0; i < objects.length; i++) {
                    printString += formats[i] + objects[i].toString();
                }
                if (formats.length > objects.length) {
                    let tail: string = formats[formats.length - 1];
                    if (tail.trim() !== "") {
                        printString += tail;
                    }
                }
            }
            var currentdate = new Date();
            var currentTime = currentdate.getHours() + ":"
                    + currentdate.getMinutes() + ":"
                    + currentdate.getSeconds();
            this.printWriter.println(
                currentTime
                + " "
                + LoggingLevel[level]
                + " "
                + (this.klass as any).name
                + " - " + printString
            );
        }
    }
}