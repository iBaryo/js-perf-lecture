import {measureTime} from "../measure";

export abstract class Courses {
    protected constructor(protected _coursesNames: string[]) {}
    abstract completeCourse(index: number): void;
    abstract getCompletedCourses(): string[];
}

export class CompletedCourses extends Courses {
    private _state: boolean[];

    constructor(coursesNames: string[]) {
        super(coursesNames);
        this.init();
    }

    init() {
        this._state = new Array(this._coursesNames.length).fill(false);
    }

    completeCourse(index: number) {
        this._state[index] = true;
    }

    getCompletedCourses() {
        return this._coursesNames.filter((course, index) => this._state[index]);
    }
}


export class CompletedCoursesByBits extends Courses {
    private _state = 0;

    constructor(coursesNames: string[]) {
        super(coursesNames);
        this.init();
    }

    init() {
        this._state = 0;
    }

    completeCourse(index: number) {
        this._state = this._state | 1 << index;
    }

    getCompletedCourses() {
        return this._coursesNames.filter((course, index) => (this._state & 1 << index));
    }
}