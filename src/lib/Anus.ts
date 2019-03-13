/* Copyright (C) Michael Benjamin - All Rights Reserved
 * Written by Michael Benjamin <turbofoxwave@gmail.com>, August 2017
 */

import { ILog } from './ILog';
import { FartComponent } from './FartComponent';


export class Anus {

        private log: ILog = { info() {}, debug() {}, error() {}};
        private startTime!: number;
        private timeThreshold!: number;
        private queueThreshold!: number;
        private fartSpan!: number;
        private fartComponentQueue: FartComponent[] = [];


        constructor(opts) {
            this.init(opts);
        }
        public playHandler: Function = function() {};

        public fartRelease() {
            // release the build up in the anus.

            // catalog start time of 1st fart
            // start the fart updateTick
            const firstFart = this.fartComponentQueue[0];
            const lastFart = this.fartComponentQueue[this.fartComponentQueue.length - 1];

            const delta = lastFart.getStartTime() - firstFart.getStartTime();
            this.log.info('fartRelease: delta: ' + delta);

            while (this.fartComponentQueue.length > 0) {
                const fc = this.fartComponentQueue.pop()!;
                let delay = fc.getStartTime() - firstFart.getStartTime();
                this.log.info('Fartrelease: delay: ' + delay);
                if (delta > 0) {
                    delay = delay / delta;
                    delay *= this.fartSpan;
                }

                this.playHandler(fc, delay + 100);
            }

            // either use setTimeout
            // use passed in handler
            // or use angular?

        }

        public addFartComponent(fartComponent) {

            if (this.fartComponentQueue.length === 0) {
                this.startTime = fartComponent.getStartTime();
            }
            this.fartComponentQueue.push(fartComponent);
            const now = new Date().getTime();
            const age = now - this.startTime;
            if (this.fartComponentQueue.length >= this.queueThreshold || age >= this.timeThreshold) {
                this.fartRelease();
            }
            // check constraints.
            // release?

        }

        private init(opts) {
            if (!opts || !opts.playHandler) {
                // this.log.error("opts.playHandler not defined")
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


    }


