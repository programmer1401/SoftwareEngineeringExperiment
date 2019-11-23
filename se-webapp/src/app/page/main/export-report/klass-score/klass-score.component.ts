import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { SelectCourseService } from '@core/service/select-course.service';
import { saveAs } from 'file-saver';
import { User } from '../../../../norm/entity/user';
import { UserService } from '@core/service/user.service';
import { KlassService } from '@core/service/klass.service';
import { CourseService } from '@core/service/course.service';
import { Klass } from '../../../../norm/entity/klass';
import { Course } from '../../../../norm/entity/course';
import { TeacherService } from '@core/service/teacher.service';
import { CommonService } from '@core/service/common.service';

@Component({
    selector: 'app-klass-score',
    templateUrl: './klass-score.component.html',
    styles: [],
})
export class KlassScoreComponent implements OnInit {
    exportForm: FormGroup;
    user: User;
    klassOptions: Array<Klass>;
    courseOptions: Array<Course>;

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

    /**
     * 初始化表单数组
     */
    ngOnInit() {
        this.exportForm = this.fb.group({
            klass: [null, [Validators.required]],
            course: [null, [Validators.required]],
        });

        this.userService.getCurrentLoginUser()
            .subscribe((user) => {
                this.user = user;

                if (this.user.role === 'admin') {
                    this.getAllKlass();
                } else {

                    this.teacherService.getById(user.roleId).subscribe(
                        data => {
                            this.klassOptions = data.klassList;
                            this.courseOptions = data.courseList;
                        },
                    );
                }

            });

    }

    getAllKlass() {
        this.klassService.getAll().subscribe((data) => {
            this.klassOptions = data;
        });
    }


    /**
     * 确认表单
     */
    submitForm(): void {
        this.exportScoreByKlassIdAndCourseId();
    }

    /**
     * 导出
     */
    exportScoreByKlassIdAndCourseId() {
        const klass = this.exportForm.get('klass').value;
        const course = this.exportForm.get('course').value;
        this.selectCourseService.exportScoreByKlassIdAndCourseId(klass.id, course.id)
            .subscribe(data => {
                const blob = new Blob([data], {
                    type:
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
                });


                saveAs(blob, klass.name + course.name +  '成绩' + '.xlsx');
            });
    }

    klassChange() {
         const klass = this.exportForm.get("klass").value;

         console.log(klass);
         this.selectCourseService.getCoursesByKlassId(klass.id)
             .subscribe(data => {
                 this.courseOptions = data;
                 console.log(data);
             });
    }


    // 比较两个班级是否相等
    compare() {
        return this.commonService.compareEntityEqual;
    }

}
