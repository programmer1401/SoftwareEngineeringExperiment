import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Course } from '../../../norm/entity/course';
import { CourseService } from '@core/service/course.service';
import { CommonService } from '@core/service/common.service';

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
    @Input() formGroup: FormGroup;

    @Input()
    controlName: string;


    options: Course[]; // 所有数据

    constructor(
        private courseService: CourseService,
        private commonService: CommonService,
    ) {}

    // 请求所有的数据
    ngOnInit() {
        this.courseService.getAll().subscribe(
            res => {
                this.options = res;
            },
            () => {
                console.log('error');
            },
        );
    }

    // 比较两个课程是否相等
    getCompareCourseEqual() {
        return this.commonService.compareEntityEqual;
    }

    trackByFn(index: number, item) {
        return item.id;
    }
}
