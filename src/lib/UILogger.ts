/* Copyright (C) Michael Benjamin - All Rights Reserved
 * Written by Michael Benjamin <turbofoxwave@gmail.com>, March 2019
 */

import { ILog } from './ILog';

export class UILogger implements ILog {

    public logFunc: any;

    public info(msg) {
        if (this.logFunc) {
            this.logFunc(msg);
        }
    }
    public debug(msg) {
        this.info(msg);
    }
    public error(msg) {
        this.info(msg);
    }
}
