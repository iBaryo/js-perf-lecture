import {measure, measureRepeats} from "../measure";

class Point {
    public x: number;
    public y: number;
    constructor(public id: number) {}
}

const ROWS = 1000;
const COLS = 1000;

function createArray() {
    return new Array(ROWS * COLS).fill(0).map((a, i) => new Point(i));
}

function localAccess(arr: Point[]) {
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            arr[i * ROWS + j].x = 0;
        }
    }
}

function farAccess(arr: Point[]) {
    for (let i = 0; i < COLS; i++) {
        for (let j = 0; j < ROWS; j++) {
            arr[j * ROWS + i].x = 0;
        }
    }
}

const iterations = 100;
(async() => {
    const arr = await measure('# create array', () => createArray());
    await measureRepeats('~~ local Access', iterations, () => localAccess(arr));
    await measureRepeats('~~ far Access', iterations, () => farAccess(arr));

    const transposedArr = await measure('# transposing', () => transpose(arr));
    await measureRepeats('~~ far Access - sorted', iterations, () => farAccess(transposedArr));
})();


function transpose(arr: Point[]) {
    const diffArr = new Array(ROWS * COLS).fill(0);
    for (let col = 0; col < COLS; col++) {
        for (let row = 0; row < ROWS; row++) {
            diffArr[row * ROWS + col] = arr[col * COLS + row];
        }
    }
    return diffArr as Point[];
}