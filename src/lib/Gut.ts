
import { Anus } from './Anus';
import { ILog } from './ILog';
import { FartComponent } from './FartComponent';
import { FartClassifier } from './FartClassifier';
import { Food } from './Food';
import { EventEmitter } from 'events';

/**
 * Digests Food objects which effect its internal state and potentially trigger a FartComponent to be queued for release.
 */
export class Gut extends EventEmitter {

  private anus!: Anus;
  private log: ILog = { info() { }, debug() { }, error() { } };
  private fartComponents!: FartComponent[];
  private fartClassifier!: FartClassifier;

  private solid!: number;
  private fatty!: number;
  private fiber!: number;

  private solidThreshold!: number;
  private fattyThreshold!: number;
  private fiberThreshold!: number;

  private foodQueue!: Food[];

  private loggingFrequency: number = 10;
  private digestionIterCount: number = 0;

  constructor(opts) {
    super();
    this.init(opts);
  }

  public eatFood(foodObj) {
    this.foodQueue.push(foodObj);
  }

  public async digestFood() {
    const self: Gut = this;

    // popfood and start digesting
    // if not digested we'll keep it in the gut for another digestion pass.
    if (this.foodQueue.length !== 0) {
      this.log.debug('digesting food: ' + this.foodQueue.length);
    }
    // list swap.. probably not the best approach. but should work.
    const temp: Food[] = [];

    this.reduceGutLevels(.1, .1, .1);

    while (self.foodQueue.length > 0) {
      const fd: Food = self.foodQueue.pop()!;

      let sld: number = fd.getDigestionRate() * fd.getSolid();
      let ftt: number = fd.getDigestionRate() * fd.getFatty();
      let fib: number = fd.getDigestionRate() * fd.getFiber();

      if (sld < .1) { sld = fd.getSolid(); }
      if (ftt < .1) { ftt = fd.getFatty(); }
      if (fib < .1) { fib = fd.getFiber(); }

      self.increaseGutLevels(sld, ftt, fib);

      fd.setSolid(fd.getSolid() - sld);
      fd.setFatty(fd.getFatty() - ftt);
      fd.setFiber(fd.getFiber() - fib);

      if (!fd.isDigested()) {
        temp.push(fd);
      }

    }

    if (this.solid !== 0 && this.fatty !== 0 && this.fiber !== 0) {
      this.log.debug('gut solid: ' + this.solid + ' fatty: ' + this.fatty + ' fiber: ' + this.fiber);
    }

    this.digestionIterCount++;

    self.foodQueue = temp;

    await self.checkGutThreholds();
  }

  public async checkGutThreholds() {
    try {
      const overSolid = this.solid > this.solidThreshold;
      const overFatty = this.fatty > this.fattyThreshold;
      const overFiber = this.fiber > this.fiberThreshold;

      if (!(overFatty || overFiber || overSolid)) {
        return;
      }

      this.log.info('gut threshold reached');

      // grab gut levels and create a fart component.
      // use the level to classify the type of fart component
      // queue the fart component into the anus for release.
      const fc = await this.classifyFartComponentAsync(this.solid, this.fatty, this.fiber);
      this.anus.addFartComponent(fc);

      // question: should we drop gut levels if we generate a fart component?
      // simulate gut relief of over bearing factors.
      let newFatty: number = this.fatty;
      let newSolid: number = this.solid;
      let newFiber: number = this.fiber;
      if (overFatty) { newFatty = this.fatty * .5; }
      if (overFiber) { newFiber = this.fiber * .5; }
      if (overSolid) { newSolid = this.solid * .5; }

      this.updateGutLevel(newSolid, newFatty, newFiber);


      return;

    } catch (err) {
      this.log.error(err);
      throw err;
    }
  }

  /**
   * Given a set of 3 food attributes, determine the FartComponent to use.
   * @param solid
   * @param fatty
   * @param fiber
   */
  public async classifyFartComponentAsync(solid: number, fatty: number, fiber: number): Promise<FartComponent> {
    const fartIndex: number = this.fartClassifier.classify([solid, fatty, fiber]);
    const _fc: FartComponent = this.fartComponents[fartIndex];
    // get a modifiable clone.
    const fc: FartComponent = _fc.getClone();
    // apply some tracking for future feature build out.
    fc.solid = solid;
    fc.fatty = fatty;
    fc.fiber = fiber;
    fc.setStartTime(new Date().getTime());
    return fc;
  }


  private init(opts: { anus: Anus, log?: ILog, fartComponents: FartComponent[] }) {
    if (!opts || !opts.anus || !opts.fartComponents) { throw new Error('opts, opts.anus and opts.fartComponents must be defined'); }

    if (opts.log) { this.log = opts.log; }

    this.fartComponents = opts.fartComponents;

    this.fartClassifier = new FartClassifier({ log: this.log });

    this.anus = opts.anus;
    this.foodQueue = [];

    this.solid = 0;
    this.fatty = 0;
    this.fiber = 0;

    this.solidThreshold = 20;
    this.fattyThreshold = 20;
    this.fiberThreshold = 20;

  }


  private reduceGutLevels(solid: number, fatty: number, fiber: number) {
    this.updateGutLevel(this.solid - solid, this.fatty - fatty, this.fiber - fiber);
  }

  private increaseGutLevels(solid: number, fatty: number, fiber: number) {
    this.updateGutLevel(this.solid + solid, this.fatty + fatty, this.fiber + fiber);
  }

  private updateGutLevel(solid: number, fatty: number, fiber: number) {

    const curSolid = this.solid;
    const curFatty = this.fatty;
    const curFiber = this.fiber;

    this.solid = solid;
    this.fatty = fatty;
    this.fiber = fiber;

    if (this.solid < 0) { this.solid = 0; }
    if (this.fatty < 0) { this.fatty = 0; }
    if (this.fiber < 0) { this.fiber = 0; }

    const different = this.solid !== curSolid || this.fatty !== curFatty || this.fiber !== curFiber;

    if (different) {
      this.emit('gut-change', { detail: { solid: this.solid, fatty: this.fatty, fiber: this.fiber } });
    }
  }

}
