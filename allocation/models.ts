export interface Data {
    count: number;
}

export class DataCounter {
    constructor(private _data: Data) {
    }

    process() {
        this._data.count++;
    }
}