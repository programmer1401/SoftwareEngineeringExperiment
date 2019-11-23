import { Component, OnInit } from '@angular/core';
import { Page } from '../../../../norm/target/page';
import { Pageable } from '../../../../norm/target/pageable';
import { Router } from '@angular/router';
import { SystemConfigService } from '@core/service/system-config.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Course } from '../../../../norm/entity/course';
import { CourseService } from '@core/service/course.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styles: [],
})
export class IndexComponent implements OnInit {
    private coursePage: Page<Course>;
    private pageable: Pageable;
    searchForm: FormGroup;
    data: Array<Course>;

    constructor(private router: Router,
                private systemConfig: SystemConfigService,
                private msg: NzMessageService,
                private courseService: CourseService,
                private fb: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.coursePage = new Page<Course>();
        this.pageable = new Pageable();
        this.pageable.page = 0;
        this.pageable.size = this.systemConfig.getPageSize();
        this.reloadData();
        this.initSearchForm();
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
            this.filterByTeacherName(this.searchForm.get('searchValue').value);
        }
    }

    filterByCourseName(name: string) {
        this.coursePage.content = this.data;
        this.coursePage.content = this.coursePage.content.filter(course => course.name.includes(name));

    }

    filterByTeacherName(name: string) {
        this.coursePage.content = this.data;
        this.coursePage.content = this.coursePage.content.filter(course => {
            let flag = false;

            course.teacherList.forEach(teacher => {
                if (teacher.name.includes(name))
                    flag = true;
            });

            return flag;
        });
    }

    reloadData() {
        this.courseService.getAllByPage(this.pageable).subscribe((coursePage) => {
            console.log(coursePage);
            this.coursePage = coursePage;
            this.data = coursePage.content;
        });
    }

    delete(id: number) {
        this.courseService.deleteCourse(id)
            .subscribe(() => {
                this.msg.success('删除成功');
                this.reloadData();
            }, () => {
                this.msg.error('删除失败');
            });
    }

    cancel(message: string) {
        this.msg.info(message);
    }
}
