import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { CourseService } from '@core/service/course.service';
import { Klass } from '../../../../norm/entity/klass';
import { Teacher } from '../../../../norm/entity/teacher';
import { TeacherService } from '@core/service/teacher.service';
import { CommonService } from '@core/service/common.service';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styles: [],
})
export class AddComponent implements OnInit {
    addForm: FormGroup;
    teachers = new Array<Teacher>();
    teacherOptions = new Array<Teacher>();

    constructor(private fb: FormBuilder,
                private message: NzMessageService,
                private locate: Location,
                private courseService: CourseService,
                private teacherService: TeacherService,
                private commonService: CommonService,
    ) {
    }

    /**
     * 初始化表单数组
     */
    ngOnInit() {
        this.getAllTeachers();
        this.addForm = this.fb.group({
            name: [null, [Validators.required]],
            credit: [null, [Validators.required]],
            teacherList: [null],
        });

    }


    getAllTeachers() {
        this.teacherService.getAllTeacher().subscribe(teachers => {
            this.teacherOptions = teachers;
        });
    }


    /**
     * 确认表单
     */
    submitForm(): void {
        this.courseService.save(this.addForm.value)
            .subscribe(() => {
                this.clear();
                this.message.success('保存成功');
            }, () => {
                this.message.error('保存失败');
            });
    }

    clear(): void {
        this.addForm.reset();
    }

    getCompareTeacherEqual() {
        return this.commonService.compareEntityEqual;

    }
}
