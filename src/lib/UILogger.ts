import { ILog } from './ILog';
import store from '../store';
import {LogLevel} from './LogLevel';
export type LogFunction = (msg: string) => any;



export class UILogger implements ILog {
  public logFunc: LogFunction;

  constructor(logFunc: LogFunction) {
    this.logFunc = logFunc;
  }

  public info(msg) {
    this.logMessage(LogLevel.INFO, msg);
  }

  public debug(msg) {
    this.logMessage(LogLevel.DEBUG, msg);
  }

  public error(msg) {
    this.logMessage(LogLevel.ERROR, msg);
  }

  public logMessage(level: number, msg: string) {
    if (store.state.logLevel < level) {
      return;
    }

    this.logFunc(msg);
  }

}
