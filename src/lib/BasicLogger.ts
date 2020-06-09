import { ILog } from './ILog';

/** BasicLogger interfaces with native console api */
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
