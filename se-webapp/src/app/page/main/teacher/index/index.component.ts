import { Component, OnInit } from '@angular/core';
import { Page } from '../../../../norm/target/page';
import { Pageable } from '../../../../norm/target/pageable';
import { Router } from '@angular/router';
import { SystemConfigService } from '@core/service/system-config.service';
import { NzMessageService } from 'ng-zorro-antd';
import { TeacherService } from '@core/service/teacher.service';
import { Teacher } from '../../../../norm/entity/teacher';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styles: [],
})
export class IndexComponent implements OnInit {
    private teacherPage: Page<Teacher>;
    private pageable: Pageable;
    searchForm: FormGroup;
    data: Array<Teacher>;

    constructor(private router: Router,
                private systemConfig: SystemConfigService,
                private msg: NzMessageService,
                private teacherService: TeacherService,
                private fb: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.teacherPage = new Page<Teacher>();
        this.pageable = new Pageable();
        this.pageable.page = 0;
        this.pageable.size = this.systemConfig.getPageSize();
        this.reloadData();
        this.initSearchForm();
    }

    reloadData() {
        this.teacherService.page(this.pageable).subscribe((teachers) => {
            this.teacherPage = teachers;
            this.data = teachers.content;
        });
    }

    delete(id: number) {
        this.teacherService.delete(id).subscribe(() => {
            this.msg.success('刪除成功');
            this.reloadData();
        }, () => {
            this.msg.error('刪除失敗');
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
            this.filterByCollegeName(this.searchForm.get('searchValue').value);
        }
    }

    filterByTeacherName(name: string) {
        this.teacherPage.content = this.data;
        this.teacherPage.content = this.teacherPage.content.filter(teacher => teacher.name.includes(name));
    }

    filterByCollegeName(name: string) {
        this.teacherPage.content = this.data;
        if (name) {
            this.teacherPage.content = this.teacherPage.content.filter(teacher => {
                if (teacher.college)
                    return teacher.college.includes(name);
            });
        }
    }
}
