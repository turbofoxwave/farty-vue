import { ILog } from './ILog';
import { FartComponent } from './FartComponent';

export type PlayHandlerFunction = (fartComponent: FartComponent, delay: number) => any;

export class Anus {

  private log: ILog = { info() { }, debug() { }, error() { } };
  private startTime!: number;
  private timeThreshold!: number;
  private queueThreshold!: number;
  private fartSpan!: number;
  private fartComponentQueue: FartComponent[] = [];


  constructor(opts: { log?: ILog, playHandler: PlayHandlerFunction }) {
    this.init(opts);
  }

  public playHandler: PlayHandlerFunction = function(fartComponent: FartComponent, delay: Number) { };


  /**
   * Add a fart component to the Anus's internal fart componenet queue.
   * Once the Anus is at critical mass this will trigger a release.
   * @param fartComponent
   */
  public addFartComponent(fartComponent: FartComponent) {

    if (this.fartComponentQueue.length === 0) {
      this.startTime = fartComponent.getStartTime();
    }
    this.fartComponentQueue.push(fartComponent);
    const now = new Date().getTime();
    const age = now - this.startTime;

    if (this.fartComponentQueue.length >= this.queueThreshold || age >= this.timeThreshold) {
      this.fartRelease();
    }
  }

  private init(opts: { playHandler: PlayHandlerFunction, log?: ILog }) {

    if (!opts || !opts.playHandler) {
      throw new Error('opts.playHandler not defined');
    }

    if (opts.log) { this.log = opts.log; }

    this.playHandler = opts.playHandler;

    this.fartComponentQueue = [];
    this.startTime = 0;
    this.timeThreshold = 2000;
    this.queueThreshold = 5;
    this.fartSpan = 2000;

  }


  // release the build up in the anus.
  private fartRelease() {
    // catalog start time of 1st fart
    // start the fart updateTick
    // we want to try to span out the farts..
    // to improve later we'll want to get metadata denoting the known length of the fart.
    // and have configurable fart overlaps.
    // for now when we release the fart we'll make an attempt to spread them out within the
    // defined fart span we have to work with.
    const firstFart = this.fartComponentQueue[0];
    const lastFart = this.fartComponentQueue[this.fartComponentQueue.length - 1];

    const delta = lastFart.getStartTime() - firstFart.getStartTime();
    this.log.info('fartRelease: delta: ' + delta);

    while (this.fartComponentQueue.length > 0) {
      const fc = this.fartComponentQueue.pop()!;
      let delay = fc.getStartTime() - firstFart.getStartTime();
      this.log.info('fartRelease: delay: ' + delay);
      if (delta > 0) {
        delay = delay / delta;
        delay *= this.fartSpan;
      }

      this.playHandler(fc, delay + 500);
    }

  }


}


