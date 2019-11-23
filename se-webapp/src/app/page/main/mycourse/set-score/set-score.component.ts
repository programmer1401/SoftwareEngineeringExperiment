import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { SelectCourseService } from '@core/service/select-course.service';
import { User } from '../../../../norm/entity/user';
import { Klass } from '../../../../norm/entity/klass';
import { Course } from '../../../../norm/entity/course';
import { UserService } from '@core/service/user.service';
import { KlassService } from '@core/service/klass.service';
import { CourseService } from '@core/service/course.service';
import { TeacherService } from '@core/service/teacher.service';
import { CommonService } from '@core/service/common.service';
import { SelectCourse } from '../../../../norm/entity/selectCourse';
import { Teacher } from '../../../../norm/entity/teacher';

@Component({
    selector: 'app-set-score',
    templateUrl: './set-score.component.html',
    styles: [],
})
export class SetScoreComponent implements OnInit {
    setScoreForm: FormGroup;
    user: User;
    klassOptions: Array<Klass>;
    courseOptions: Array<Course>;
    selectCourseList: Array<SelectCourse>;
    selectCourseOptions: Array<SelectCourse>;
    teacher: Teacher;

    constructor(private fb: FormBuilder,
                private message: NzMessageService,
                private locate: Location,
                private selectCourseService: SelectCourseService,
                private userService: UserService,
                private klassService: KlassService,
                private courseService: CourseService,
                private teacherService: TeacherService,
                private commonService: CommonService,
    ) {
    }


    getSelectCourseByKlass() {
        this.selectCourseService.getByKlass(this.setScoreForm.get('klass').value)
            .subscribe((data) => {
                this.selectCourseList = data;
                console.log(data);
                data.forEach(selectCourse => {
                    if (!this.courseExistOnList(this.courseOptions, selectCourse.course))
                        this.courseOptions.push(selectCourse.course);
                });
            }, (error) => {
            });
    }


    filterSelectCourseByCourse() {
        this.selectCourseOptions = this.selectCourseList
            .filter(selectCourse => selectCourse.course === this.setScoreForm.get('course').value);
    }

    courseExistOnList(courseList: Array<Course>, course: Course) {
        let flag = false;

        courseList.forEach(
            course => {
                if (course.id === course.id) {
                    flag = true;
                    return;
                }
            },
        );

        return flag;
    }

    /**
     * 初始化表单数组
     */
    ngOnInit() {
        this.courseOptions = new Array<Course>();
        this.setScoreForm = this.fb.group({
            id: [null],
            klass: [null, [Validators.required]],
            course: [null, [Validators.required]],
            selectCourse: [null, [Validators.required]],
            score: [null, [Validators.required]],
        });
        this.getKlass();
    }

    getKlass() {
        this.userService.getCurrentLoginUser()
            .subscribe(user => {
                this.teacherService.getById(user.roleId)
                    .subscribe((data) => {
                        this.klassOptions = data.klassList;
                        this.teacher = data;
                    });
            });
    }

    /**
     * 确认表单
     */
    submitForm(): void {
        let selectCourse = this.setScoreForm.get('selectCourse').value;
        selectCourse.score = this.setScoreForm.get('score').value;
        this.selectCourseService.update(selectCourse.id, selectCourse)
            .subscribe(() => {
                this.message.success("录入成功");
            }, (error) => {
                console.log(error);
                this.message.error("录入失败");
            });
    }


    // 比较两个班级是否相等
    compare() {
        return this.commonService.compareEntityEqual;
    }
}
