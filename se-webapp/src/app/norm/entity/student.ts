import { User } from './user';
import { Klass } from './klass';

export class Student {
    id: number; // id
    name: string; // 姓名
    user: User;
    number: string;
    klass: Klass;
    upgrade: boolean;
}
