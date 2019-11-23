import { Component, OnInit } from '@angular/core';
import { Page } from '../../../../norm/target/page';
import { Pageable } from '../../../../norm/target/pageable';
import { Router } from '@angular/router';
import { SystemConfigService } from '@core/service/system-config.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Student } from '../../../../norm/entity/student';
import { StudentService } from '@core/service/student.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styles: [],
})
export class IndexComponent implements OnInit {
    private studentPage: Page<Student>;
    private pageable: Pageable;
    searchForm: FormGroup;
    data: Array<Student>;

    constructor(private router: Router,
                private systemConfig: SystemConfigService,
                private msg: NzMessageService,
                private studentService: StudentService,
                private fb: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.studentPage = new Page<Student>();
        this.pageable = new Pageable();
        this.pageable.page = 0;
        this.pageable.size = this.systemConfig.getPageSize();
        this.reloadData();
        this.initSearchForm();
    }

    reloadData() {
        this.studentService.page(this.pageable).subscribe((studentPage) => {
            this.studentPage = studentPage;
            this.data = studentPage.content;
        });
    }

    delete(id: number) {
        this.studentService.delete(id).subscribe(() => {
            this.msg.success('刪除成功');
            this.reloadData();
        }, () => {
            this.msg.error('刪除失敗');
        });
    }

    initSearchForm() {
        this.searchForm = this.fb.group({
            searchLabel: [null],
            searchValue: [null],
        });
    }

    search() {
        if (this.searchForm.get('searchLabel').value === 'studentName') {
            this.filterByStudentName(this.searchForm.get('searchValue').value);
        } else {
            this.filterByKlassName(this.searchForm.get('searchValue').value);
        }
    }

    filterByStudentName(name: string) {
        this.studentPage.content = this.data;
        this.studentPage.content = this.studentPage.content.filter(student => student.name.includes(name));
    }

    filterByKlassName(name: string) {
        this.studentPage.content = this.data;
        this.studentPage.content = this.studentPage.content.filter(student => student.klass.name.includes(name));
    }

    cancel(message: string) {
        this.msg.info(message);
    }

}
