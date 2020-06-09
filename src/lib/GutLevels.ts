/**Used to define a gut level tracking object and assist with informative displays */
export class GutLevels {
    public fatty: number = 0;
    public solid: number = 0;
    public fiber: number = 0;
    public timestamp: number = 0;

    constructor(fatty: number = 0, solid: number = 0, fiber: number = 0, timestamp: number = 0) {
        this.fatty = fatty;
        this.solid = solid;
        this.fiber = fiber;
        this.timestamp = timestamp === 0 ? (new Date()).getTime() : timestamp;
    }
}

