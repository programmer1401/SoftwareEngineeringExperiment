/***
 * @Description: 课程实体
 * @author chenjie
 */
import { Teacher } from './teacher';

export class Course {
    id: number;                                       // id
    name: string;// 课程姓名
    credit: number;
    teacherList: Array<Teacher>;
}
