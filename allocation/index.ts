import {Data, DataCounter} from "./models";
import {measureRepeats} from "../measure";
import {MyPool} from "./MyPool";

function createData() {
    return {
        count: 0
    } as Data;
}

function createAndDestroy(data: Data) {
    const objs = [];
    for (let boom = 0; boom < 1000; boom++) {
        const counter = new DataCounter(data);
        objs.push(counter);
        counter.process();
    }
}


function createWithAPool(data: Data, poolSize: number) {
    const pool = new MyPool(poolSize,
        () => new DataCounter(data));

    for (let demo = 0; demo < 1000; demo++) {
        const counter = pool.getObj();
        counter.process();
    }
    // release all booms
    pool.release();
}

(async () => {
    const tests = [
        {
            name: '~~ create and destroy',
            fn: (data: Data) => createAndDestroy(data)
        },
        {
            name: '~~ pool',
            fn: (data: Data) => createWithAPool(data, 100)
        }
    ];

    for (let {name, fn} of tests) {
        const data = createData();
        await measureRepeats(name, 10000, () => fn(data));
        console.log(`data is ${data.count}`);
    }
})();