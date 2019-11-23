import { Component, OnInit } from '@angular/core';
import { SelectCourse } from '../../../../norm/entity/selectCourse';
import { FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '@core/service/common.service';
import { SelectCourseService } from '@core/service/select-course.service';
import { UserService } from '@core/service/user.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styles: [],
})
export class IndexComponent implements OnInit {

    selectCourseList: Array<SelectCourse>;

    constructor(private fb: FormBuilder,
                private message: NzMessageService,
                private locate: Location,
                private route: ActivatedRoute,
                private commonService: CommonService,
                private userService: UserService,
                private selectCourseService: SelectCourseService) {
    }

    /**
     * 初始化表单数组
     */
    ngOnInit() {
        this.userService.getCurrentLoginUser().subscribe(user => {
            this.selectCourseService.getAllByStudentId(user.roleId)
                .subscribe(data => {
                    this.selectCourseList = data;
                });
        }, () => {
            console.log('network error');
        });

    }
}
