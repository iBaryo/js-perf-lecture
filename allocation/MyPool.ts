export class MyPool<T> {
    private _pool: T[] = [];
    private _currIndex = -1;

    constructor(private _size: number,
                private _objCreator: () => T,
                private _objResetter?: (obj: T) => void) {
    }

    public getObj(): T {
        let nextObj = this._pool[++this._currIndex % this._size];

        if (nextObj) {
            // this._objResetter && this._objResetter(nextObj);
        }
        else {
            // console.log('creating');
            nextObj = this._objCreator();
            this._pool.push(nextObj);
        }

        return nextObj;
    }

    public release() {
        this._pool = [];
    }
}