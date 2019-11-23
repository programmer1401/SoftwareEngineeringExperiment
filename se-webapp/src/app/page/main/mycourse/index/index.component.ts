import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../../../norm/entity/teacher';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemConfigService } from '@core/service/system-config.service';
import { NzMessageService } from 'ng-zorro-antd';
import { UserService } from '@core/service/user.service';
import { TeacherService } from '@core/service/teacher.service';
import { SelectCourseService } from '@core/service/select-course.service';
import { Klass } from '../../../../norm/entity/klass';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from '../../../../norm/entity/course';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styles: [],
})
export class IndexComponent implements OnInit {

    searchForm: FormGroup;
    teacher: Teacher;
    courseList: Array<Course>;
    klassListList = new Array<Array<Klass>>();

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private systemConfig: SystemConfigService,
        private msg: NzMessageService,
        private route: ActivatedRoute,
        private userService: UserService,
        private teacherService: TeacherService,
        private selectCourseService: SelectCourseService,
    ) {
    }

    ngOnInit() {
        this.userService.getCurrentLoginUser()
            .subscribe(user => {
                this.teacherService.getById(user.roleId)
                    .subscribe((teacher) => {
                        this.teacher = teacher;
                        this.courseList = this.teacher.courseList;
                        this.getKlassListList(null);

                    });
            });

        this.initSearchForm();
    }

    getKlassListList(klassName: string) {
        if (this.teacher.courseList) {
            for (let i = 0; i < this.teacher.courseList.length; i++) {
                this.selectCourseService
                    .findKlassesByTeacherAndCourse(this.teacher.id, this.teacher.courseList[i].id)
                    .subscribe(klassList => {
                        if (klassName) {
                            let flag = false;
                            for (let i = 0; i++; i < klassList.length) {
                                if (klassList[i].name === klassName)
                                    flag = true;
                            }

                            if (flag)
                                this.klassListList.push(klassList);
                            else {
                                const index = this.teacher.courseList.indexOf(this.teacher.courseList[i]);
                                this.teacher.courseList.splice(index, 1);
                            }
                        } else {
                            this.klassListList.push(klassList);
                        }
                    });
            }


        }

    }

    initSearchForm() {
        this.searchForm = this.fb.group({
            searchLabel: [null],
            searchValue: [null],
        });
    }

    search() {
        if (this.searchForm.get('searchLabel').value === 'courseName') {
            this.filterByCourseName(this.searchForm.get('searchValue').value);
        } else {
            this.filterByKlassName(this.searchForm.get('searchValue').value)
        }
    }



    filterByCourseName(name: string) {
        this.courseList = this.teacher.courseList.filter(course => course.name.includes(name));
    }

    filterByKlassName(name: string) {
        this.getKlassListList(name);
    }

}
