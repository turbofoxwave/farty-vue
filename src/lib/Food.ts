/**
 * Food which can be digested by the Gut to products Fart Components
 */
export class Food {
    public id: string;
    public name: string;
    public soundId: string;

    public solidBase: number;
    public fattyBase: number;
    public fiberBase: number;

    public solid: number;
    public fatty: number;
    public fiber: number;

    public digestionRate: number;

    constructor(name, id, sndId, solid, fatty, fiber, digestionRate) {
        this.id = id;
        this.name = name;
        this.soundId = sndId;
        this.solidBase = this.solid = solid;
        this.fattyBase = this.fatty = fatty;
        this.fiberBase = this.fiber = fiber;
        this.digestionRate = digestionRate;

    }


    public clampVal(val: number) {
        if (val < 0) { val = 0; }
        return val;
    }

    public isDigested() {
        if (this.solid === 0 && this.fatty === 0 && this.fiber === 0) { return true; }
    }

    public setSolid(val: number) {
        this.solid = this.clampVal(val);
    }

    public setFatty(val: number) {
        this.fatty = this.clampVal(val);
    }

    public setFiber(val: number) {
        this.fiber = this.clampVal(val);
    }

    public getSolid() {
        return this.solid;
    }

    public getFatty() {
        return this.fatty;
    }

    public getFiber() {
        return this.fiber;
    }

    public getSolidBase() {
        return this.solidBase;
    }

    public getFattyBase() {
        return this.fattyBase;
    }

    public getFiberBase() {
        return this.fiberBase;
    }

    public reset() {
        this.fiber = this.fiberBase;
        this.solid = this.solidBase;
        this.fatty = this.fattyBase;
    }

    public getDigestionRate() {
        return this.digestionRate;
    }

    public getClone() {
        return new Food(this.name, this.id, this.soundId, this.solid, this.fatty, this.fiber, this.digestionRate);
    }

}
