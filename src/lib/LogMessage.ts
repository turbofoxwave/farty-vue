export class LogMessage {
    public index!: number;
    public msg!: string;

    constructor(index: number, msg: string) {
        this.index = index;
        this.msg = msg;
    }
}
