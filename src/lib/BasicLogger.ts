/* Copyright (C) Michael Benjamin - All Rights Reserved
 * Written by Michael Benjamin <turbofoxwave@gmail.com>, March 2019
 */

import { ILog } from './ILog';

export class BasicLogger implements ILog {
    public info(msg) {
        console.log(msg);
    }
    public debug(msg) {
        this.info(msg);
    }
    public error(msg) {
        this.info(msg);
    }
}
