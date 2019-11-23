
import { User } from './user';
import { Course } from './course';
import { Klass } from './klass';

export class Teacher {
    id: number;
    name: string;
    checked: boolean;
    user: User;
    college: string;
    number: string;
    courseList: Array<Course>;
    klassList: Array<Klass>;
}
