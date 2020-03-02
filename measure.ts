type RepeatedFn = (i?: number) => void;

export function measureRepeats(name: string, iterations: number, fn: RepeatedFn, context?: any, args?: any[]) {
    return measure(name, repeat(iterations, fn), context, args);
}

export async function measure(name: string, fn: RepeatedFn, context?: any, args?: any[]) {
    console.log(name);
    const timerName = fn.name || 'function';
    console.time(timerName);
    const result = await fn.apply(context, args);
    console.timeEnd(timerName);
    return result;
}

export function measureTime(name: string) {
    return (
        target: Object,
        propertyName: string,
        propertyDesciptor: PropertyDescriptor) => {

        const originFn = propertyDesciptor.value as RepeatedFn;

        propertyDesciptor.value = function (...args: any[]) {
            return measure(name, originFn, this, args);
        };
        return propertyDesciptor;
    };
}

export function repeat(iterations: number, cb: RepeatedFn) {
    return async () => {
        for (let i = 0; i < iterations; i++) {
            await cb(i);
        }
    };
}
