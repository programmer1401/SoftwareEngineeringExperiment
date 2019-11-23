import { Component, OnInit } from '@angular/core';
import { Page } from '../../../../norm/target/page';
import { Pageable } from '../../../../norm/target/pageable';
import { Router } from '@angular/router';
import { SystemConfigService } from '@core/service/system-config.service';
import { NzMessageService } from 'ng-zorro-antd';
import { GradeService } from '@core/service/grade.service';
import { Grade } from '../../../../norm/entity/grade';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Course } from '../../../../norm/entity/course';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styles: [],
})
export class IndexComponent implements OnInit {
    private gradePage: Page<Grade>;
    private pageable: Pageable;
    searchForm: FormGroup;
    data: Array<Grade>;

    constructor(private router: Router,
                private systemConfig: SystemConfigService,
                private msg: NzMessageService,
                private gradeService: GradeService,
                private fb: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.gradePage = new Page<Grade>();
        this.pageable = new Pageable();
        this.pageable.page = 0;
        this.pageable.size = this.systemConfig.getPageSize();
        this.reloadData();
        this.initSearchForm();
    }

    reloadData() {
        this.gradeService.getAllByPage(this.pageable).subscribe((grades) => {
            this.gradePage = grades;
            this.data = grades.content;
        });
    }

    delete(id: number) {
        this.gradeService.delete(id).subscribe(() => {
            this.msg.success('删除成功');
            this.reloadData();
        }, () => {
            this.msg.error('删除失败');
        });
    }

    cancel(message: string) {
        this.msg.info(message);
    }


    initSearchForm() {
        this.searchForm = this.fb.group({
            searchLabel: [null],
            searchValue: [null],
        });
    }

    search() {
        if (this.searchForm.get('searchLabel').value === 'teacherName') {
            this.filterByTeacherName(this.searchForm.get('searchValue').value);
        } else {
            // this.filterByCollegeName(this.searchForm.get('searchValue').value);
        }
    }

    filterByTeacherName(name: string) {
        this.gradePage.content = this.data;
        this.gradePage.content = this.gradePage.content.filter(klass => klass.name.includes(name));
    }

}
