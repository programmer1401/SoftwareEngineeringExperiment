import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '@core/service/common.service';
import { KlassService } from '@core/service/klass.service';
import { SelectCourseService } from '@core/service/select-course.service';
import { SelectCourse } from '../../../../norm/entity/selectCourse';
import { UserService } from '@core/service/user.service';
import { User } from '../../../../norm/entity/user';

@Component({
    selector: 'app-score',
    templateUrl: './score.component.html',
    styles: [],
})
export class ScoreComponent implements OnInit {
    selectCourseList: Array<SelectCourse>;
    user: User;
    studentId: number;


    constructor(private fb: FormBuilder,
                private message: NzMessageService,
                private locate: Location,
                private route: ActivatedRoute,
                private commonService: CommonService,
                private klassService: KlassService,
                private userService: UserService,
                private selectCourseService: SelectCourseService,
    ) {
    }

    ngOnInit() {
        this.userService.getCurrentLoginUser().subscribe(user => {
            this.user = user;
            this.setId();
            this.getStudentAllCourse();
        });
    }

    setId() {
        if (this.user.role === "student") {
            this.studentId = this.user.roleId
        } else {
            this.route.paramMap.subscribe(
                params => {
                    this.studentId = +params.get('id');
                });
        }
    }

    getStudentAllCourse() {
        this.selectCourseService.getAllByStudentId(this.studentId).subscribe(
            data => {
                this.selectCourseList = data;
            },
            () => {
                console.log('network error');
            },
        );

    }
}
