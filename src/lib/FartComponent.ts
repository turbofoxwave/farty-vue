export class FartComponent {
    public name: string;
    public solid: number;
    public fatty: number;
    public fiber: number;

    public soundIds: string[];
    public startTime: number;

    constructor(name, solid, fatty, fiber, soundIds) {
        if (! soundIds || !soundIds.length ) { throw new Error('soundIds is required'); }

        this.name = name;
        this.solid = solid;
        this.fatty = fatty;
        this.fiber = fiber;

        this.soundIds = [soundIds];

        this.startTime = 0;
    }


    public getClone() {
        return new FartComponent(this.name, this.solid, this.fatty, this.fiber, this.soundIds);
    }

    public setStartTime(startTime) {
        this.startTime = startTime;
    }

    public getStartTime() {
        return this.startTime;
    }


    public getSoundId() {
        const index = Math.round(Math.random() * this.soundIds.length) % this.soundIds.length;
        return  this.soundIds[index];
    }


}
