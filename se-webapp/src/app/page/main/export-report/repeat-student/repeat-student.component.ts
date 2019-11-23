import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../../norm/entity/user';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { SelectCourseService } from '@core/service/select-course.service';
import { UserService } from '@core/service/user.service';
import { TeacherService } from '@core/service/teacher.service';
import { StudentService } from '@core/service/student.service';
import { CommonService } from '@core/service/common.service';
import { saveAs } from 'file-saver';
import { GradeService } from '@core/service/grade.service';
import { Grade } from '../../../../norm/entity/grade';

@Component({
    selector: 'app-repeat-student',
    templateUrl: './repeat-student.component.html',
    styles: [],
})
export class RepeatStudentComponent implements OnInit {

    exportForm: FormGroup;
    user: User;
    gradeOptions: Array<Grade>;

    constructor(private fb: FormBuilder,
                private message: NzMessageService,
                private locate: Location,
                private selectCourseService: SelectCourseService,
                private userService: UserService,
                private teacherService: TeacherService,
                private studentService: StudentService,
                private commonService: CommonService,
                private gradeService: GradeService,
    ) {
    }

    /**
     * 初始化表单数组
     */
    ngOnInit() {
        this.exportForm = this.fb.group({
            grade: [null, [Validators.required]],
        });

        this.getAllGrade();
    }

    /**
     * 确认表单
     */
    submitForm(): void {
        this.exportRepeatStudent();
    }

    getAllGrade(): void {
        this.gradeService.getAll().subscribe((data) => {
            this.gradeOptions = data;
        } );
    }

    /**
     * 导出
     */
    exportRepeatStudent() {
        const grade = this.exportForm.get('grade').value;
        this.studentService.exportRepeatStudent(grade.id)
            .subscribe(data => {
                const blob = new Blob([data], {
                    type:
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
                });
                saveAs(blob, '留级名单' + '.xlsx');
            }, () => {
                this.message.info("该年级无学生");
            });

    }

    // 比较两个班级是否相等
    compare() {
        return this.commonService.compareEntityEqual;
    }
}
