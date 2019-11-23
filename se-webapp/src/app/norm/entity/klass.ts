import { Grade } from './grade';
import { Student } from './student';

export class Klass {
    id: number;
    name: string;
    grade: Grade;
    studentList: Array<Student>
}
