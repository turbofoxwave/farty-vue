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
