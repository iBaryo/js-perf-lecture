import {Student} from "./Student";
import {CompletedCourses, CompletedCoursesByBits, Courses} from "./Courses";
import {measureRepeats} from "../measure";

const COURSES = [
    'English',
    'Chemistry',
    'Physics',
    'Literature',
    'Arts',
    'Algabra',
    'Infi',
    'Algorithms',
    'DataStructures',
    'Complexity'
];

const studentNumber = 10000;

function testFor(coursesType: new(courses: string[]) => Courses) {
    const students = [] as Student[];
    for (let i = 0; i < studentNumber; i++) {
        students.push({name: 'Baryo', courses: new coursesType(COURSES)});
    }

    for (let i = 0; i < studentNumber; i++) {
        const student = students[i];
        COURSES.forEach((course, index) => index & 1 ? student.courses.completeCourse(index) : '')
    }

    // log
    const list = [];

    for (let i = 0; i < studentNumber; i++) {
        const student = students[i];
        list.push(student.courses.getCompletedCourses());
    }
}

const iterations = 10000;
(async () => {
    await measureRepeats(`~~~ with booleans:`, iterations, () =>
                testFor(CompletedCourses));

    await measureRepeats(`~~~ with bits:`, iterations, () =>
            testFor(CompletedCoursesByBits));

    console.log('! done');
})();