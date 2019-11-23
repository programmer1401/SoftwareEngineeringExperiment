import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../../../norm/entity/course';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '@core/service/course.service';
import { Teacher } from '../../../../norm/entity/teacher';
import { TeacherService } from '@core/service/teacher.service';
import { CommonService } from '@core/service/common.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styles: [],
})
export class EditComponent implements OnInit {
    editFrom: FormGroup;
    course: Course;

    teacherOptions = new Array<Teacher>();

    constructor(private fb: FormBuilder,
                private message: NzMessageService,
                private locate: Location,
                private route: ActivatedRoute,
                private courseService: CourseService,
                private teacherService: TeacherService,
                private commonService: CommonService) {
    }

    /**
     * 初始化表单数组
     */
    ngOnInit() {

        this.getAllTeachers();

        this.editFrom = this.fb.group({
            name: [null, [Validators.required]],
            credit: [null, [Validators.required]],
            teacherList:[]
        });

        this.route.paramMap.subscribe(
            params => {
                this.courseService.getCourse(+params.get('id')).subscribe(
                    course => {
                        this.course = course;
                        this.editFrom.patchValue({
                            id: this.course.id,
                            name: this.course.name,
                            credit: course.credit,
                            teacherList: course.teacherList
                        });
                    },
                    () => {
                        console.log('network error');
                    },
                );

            });
    }

    /**
     * 确认表单
     */
    submitForm(): void {
        this.courseService.editCourse(this.course.id, this.editFrom.value)
            .subscribe(() => {
                this.locate.back();
                this.message.success('编辑成功');
            }, () => {
                this.message.error('编辑失败');
            });
    }

    getCompareTeacherEqual() {
        return this.commonService.compareEntityEqual;

    }


    getAllTeachers() {
        this.teacherService.getAllTeacher().subscribe(teachers => {
            this.teacherOptions = teachers;
        });
    }

}
