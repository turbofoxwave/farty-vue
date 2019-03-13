/////
// Gut -
// purpose: to take in food items and digest them. based on digestion effects on the gut fart components are produced and formulate
// a fart.
import { Anus } from './Anus';
import { ILog } from './ILog';
import { FartComponent } from './FartComponent';
import { FartClassifier } from './FartClassifier';
import { Food } from './Food';

export class Gut {

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

    constructor(opts) {
        this.init(opts);
    }

    public eatFood(foodObj) {
        this.foodQueue.push(foodObj);
    }

    public async digestFood() {
        const self: Gut = this;

        // popfood and start digesting
        // this.log.info("digesting food: "+this.foodQueue.length);
        // list swap.. probably not the best approach. but should work.
        const temp: Food[] = [];

        self.solid -= .1;
        self.fatty -= .1;
        self.fiber -= .1;

        if (self.solid < 0) { self.solid = 0; }
        if (self.fatty < 0) { self.fatty = 0; }
        if (self.fiber < 0) { self.fiber = 0; }


        while (self.foodQueue.length > 0) {
            const fd: Food = self.foodQueue.pop()!;

            let sld: number = fd.getDigestionRate() * fd.getSolid();
            let ftt: number = fd.getDigestionRate() * fd.getFatty();
            let fib: number = fd.getDigestionRate() * fd.getFiber();

            if (sld < .1) { sld = fd.getSolid(); }
            if (ftt < .1) { ftt = fd.getFatty(); }
            if (fib < .1) { fib = fd.getFiber(); }

            self.solid += sld;
            self.fatty += ftt;
            self.fiber += fib;

            fd.setSolid(fd.getSolid() - sld);
            fd.setFatty(fd.getFatty() - ftt);
            fd.setFiber(fd.getFiber() - fib);

            if (!fd.isDigested()) {
                temp.push(fd);
            }

        }

        // this.log.info("gut solid: "+ this.solid + " fatty: "+ this.fatty+ " fiber: "+ this.fiber);
        // this.log.info("gut fatty: "+ this.fatty);
        // this.log.info("gut fiber: "+ this.fiber);

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

            // this.log.info("gut threshold reached");

            // grab gut levels and create a fart component.
            // use the level to classify the type of fart component
            // queue the fart component into the anus for release.
            const fc = await this.classifyFartComponentAsync({ input: [this.solid, this.fatty, this.fiber] });
            this.anus.addFartComponent(fc);

            // question: should we drop gut levels if we generate a fart component?
            // simulate gut relief of over bearing factors.
            if (overFatty) { this.fatty = this.fatty * .5; }
            if (overFiber) { this.fiber = this.fiber * .5; }
            if (overSolid) { this.solid = this.solid * .5; }

            return;

        } catch (err) {
            this.log.error(err);
            throw err;
        }
    }

    public async classifyFartComponentAsync(obj) {
        const fartIndex: number = this.fartClassifier.classify(obj.input)[0];
        const _fc: FartComponent = this.fartComponents[fartIndex];
        // get a modifyable clone.
        const fc: FartComponent = _fc.getClone();
        fc.setStartTime(new Date().getTime());
        return fc;
    }

    private init(opts) {
        if (!opts || !opts.anus || !opts.fartComponents) { throw new Error('opts, opts.anus and opts.fartComponents must be defined'); }

        if (opts.log) { this.log = opts.log; }

        this.fartComponents = opts.fartComponents;

        this.fartClassifier = new FartClassifier({ log: this.log });

        this.anus = opts.anus;
        this.foodQueue = [];

        this.solid = 0;
        this.fatty = 0;
        this.fiber = 0;

        this.solidThreshold = 10;
        this.fattyThreshold = 10;
        this.fiberThreshold = 10;

    }
}
