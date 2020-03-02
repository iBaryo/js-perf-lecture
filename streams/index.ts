function createSlowingStream(fn: (i: number) => void, prevNum = 0) {
    const num = prevNum + 10;
    setTimeout(() => {
        fn(num);
        num < 1000 && createSlowingStream(fn, num);
    }, num);
}

createSlowingStream(console.log);
// createSlowingStream(debounce(console.log, 300));
// createSlowingStream(throttle(console.log, 1000));


// as long as it continues to be invoked, it will not be triggered
function debounce (fn: Function, interval: number) {
    let timeout: number;
    return function (...args) {
        const later = () => {
            timeout = null;
            fn.apply(this, args); // the original 'this' is maintained due to arrow func
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, interval || 200);
    }
}

// as long as it continues to be invoked, raise on every interval
function throttle (fn: Function, interval: number) {
    let allowAccess = true;
    return (...args) => {
        const later = () => {
            allowAccess = true;
        };
        if (allowAccess) {
            fn.apply(this, args); // the original 'this' is maintained due to arrow func
            allowAccess = false;
            setTimeout(later, interval)
        }
    }
}