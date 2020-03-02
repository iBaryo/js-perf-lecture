import {measureRepeats} from "../measure";

interface Vector {
    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
}

function createWithInconsistentMapping(a: number, b: number, c: number) {
    const vec: Partial<Vector> = {};

    if (a) {
        vec.a = Math.random();
    }
    if (b) {
        vec.b = Math.random();
    }
    if (c) {
        vec.c = Math.random();
    }

    vec.d = Math.random();
    vec.e = Math.random();
}

function createWithConsistentMapping(a: number, b: number, c: number) {
    const vec: Partial<Vector> = {};
    vec.a = a ? Math.random() : undefined;
    vec.b = b ? Math.random() : undefined;
    vec.c = c ? Math.random() : undefined;
    vec.d = Math.random();
    vec.e = Math.random();
}

const iterations = 5000000;
(async () => {
    await measureRepeats('~~ consistent mapping', iterations, i =>
        createWithConsistentMapping(i % 3, i % 4, i % 5));

    await measureRepeats('~~ inconsistent mapping', iterations, i =>
        createWithInconsistentMapping(i % 3, i % 4, i % 5));
})();