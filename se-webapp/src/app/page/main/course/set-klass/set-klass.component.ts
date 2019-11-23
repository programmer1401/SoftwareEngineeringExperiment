import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../../../../norm/entity/course';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '@core/service/course.service';
import { TeacherService } from '@core/service/teacher.service';
import { CommonService } from '@core/service/common.service';
import { Teacher } from '../../../../norm/entity/teacher';
import { SelectCourseService } from '@core/service/select-course.service';

@Component({
    selector: 'app-set-klass',
    templateUrl: './set-klass.component.html',
    styles: [],
})
export class SetKlassComponent implements OnInit {
    editFrom: FormGroup;
    course: Course;
    teacher: Teacher;
    courseId: number;
    teacherId: number;


    constructor(private fb: FormBuilder,
                private message: NzMessageService,
                private locate: Location,
                private route: ActivatedRoute,
                private courseService: CourseService,
                private teacherService: TeacherService,
                private commonService: CommonService,
                private selectCourseService: SelectCourseService) {
    }

    /**
     * 初始化表单数组
     */
    ngOnInit() {
        this.editFrom = this.fb.group({
            klassList: [[]],
        });

        this.route.paramMap.subscribe(
            params => {
                this.courseId = +params.get('courseId');
                this.teacherId = +params.get('teacherId');
            });
        this.getCourse();
        this.getTeacher();

    }


    initEditFrom() {
        this.getSelectedKlasses();
    }

    getCourse() {
        this.courseService.getCourse(this.courseId).subscribe(
            course => {
                this.course = course;
            },
            () => {
                console.log('network error');
            },
        );

    }

    /**
     * 确认表单
     */
    submitForm(): void {
        this.selectCourseService.setKlass(this.course.id, this.teacherId, this.editFrom.value)
            .subscribe(() => {
                this.locate.back();
                this.message.success('编辑成功');
            }, () => {
                this.message.error('信息保存失败');
            });
    }

    getCompareKlassEqual() {
        return this.commonService.compareEntityEqual;
    }


    getTeacher() {
        this.teacherService.getById(this.teacherId).subscribe((teacher) => {
            this.teacher = teacher;
            this.initEditFrom();
        });
    }

    getSelectedKlasses() {
        this.selectCourseService
            .findKlassesByTeacherAndCourse(this.teacherId, this.courseId)
            .subscribe(klasses => {
                console.log(klasses);
                this.editFrom.patchValue({
                    klassList: klasses,
                });
            });
    }
}
