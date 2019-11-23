import { Component, OnInit } from '@angular/core';
import { Page } from '../../../../norm/target/page';
import { Pageable } from '../../../../norm/target/pageable';
import { Router } from '@angular/router';
import { SystemConfigService } from '@core/service/system-config.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Klass } from '../../../../norm/entity/klass';
import { KlassService } from '@core/service/klass.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styles: [],
})
export class IndexComponent implements OnInit {
    private klassPage: Page<Klass>;
    private pageable: Pageable;
    searchForm: FormGroup;
    data: Array<Klass>;

    constructor(private router: Router,
                private systemConfig: SystemConfigService,
                private msg: NzMessageService,
                private klassService: KlassService,
                private fb: FormBuilder,
    ) {
    }

    ngOnInit() {
        this.klassPage = new Page<Klass>();
        this.pageable = new Pageable();
        this.pageable.page = 0;
        this.pageable.size = this.systemConfig.getPageSize();
        this.reloadData();
        this.initSearchForm();
    }

    reloadData() {
        this.klassService.page(this.pageable).subscribe((klasses) => {
            this.klassPage = klasses;
            this.data = klasses.content;
        });
    }

    delete(id: number) {
        this.klassService.delete(id)
            .subscribe(() => {
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
        if (this.searchForm.get('searchLabel').value === 'klassName') {
            this.filterByKlassName(this.searchForm.get('searchValue').value);
        } else {
            this.filterByGradeName(this.searchForm.get('searchValue').value);
        }
    }

    filterByKlassName(name: string) {
        this.klassPage.content = this.data;
        this.klassPage.content = this.klassPage.content.filter(klass => klass.name.includes(name));
    }

    filterByGradeName(name: string) {
        this.klassPage.content = this.data;
        console.log(this.data);
        if (name) {
            console.log(123123);
            this.klassPage.content = this.klassPage.content.filter(klass => {
                if (klass.grade)
                    return klass.grade.name.includes(name);
            });
        }
    }
}
