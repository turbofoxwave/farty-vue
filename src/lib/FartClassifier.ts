import { ILog } from './ILog';
import * as convnetjs from 'convnetjs';
import netData from '../data/net.json';

export class FartClassifier {

  private log: ILog = { info() { }, debug() { }, error() { } };
  private net: any;
  private targets: number[][] = [];
  private targetRanges: number[][] = [];
  private trainer: any;

  constructor(opts: { log?: ILog }) {
    this.init(opts);
  }

  public classify(input: [number, number, number]) {
    if (input.length !== 3) { throw Error('input not length of 3'); }
    const vol = new convnetjs.Vol(input);

    const prediction = this.net.forward(vol).w[0];
    let targ = this.targets[0];

    for (let t = 0; t < this.targets.length; t++) {
      const temp = this.targets[t];
      const range = this.targetRanges[t];
      if (prediction > range[0] && prediction < range[1]) {
        targ = temp;
        break;
      }
    }
    this.log.info('FartClassifier.classify fixed out: ' + targ + ' out: ' + prediction + '  in: ' + input);
    return targ;
  }

  public getNetConfig() {
    return netData;
  }

  private init(opts?: { log?: ILog }) {
    if (!opts) { opts = {}; }
    if (opts.log) { this.log = opts.log; }

    this.net = new convnetjs.Net();
    this.net.fromJSON(this.getNetConfig());

    this.targets = [
      [0], [1], [2], [3], [4], [5], [6],
    ];

    this.targetRanges = [
      [0, .20], [.20, .30], [.30, .45], [.45, .58], [.58, .70], [.70, .85], [.85, 1],
    ];

  }
}
