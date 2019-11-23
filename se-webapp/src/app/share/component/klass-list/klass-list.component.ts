import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommonService } from '@core/service/common.service';
import { Klass } from '../../../norm/entity/klass';
import { KlassService } from '@core/service/klass.service';

@Component({
    selector: 'app-klass-list',
    templateUrl: './klass-list.component.html',
    styleUrls: ['./klass-list.component.css'],
})
export class KlassListComponent implements OnInit {
    @Input() formGroup: FormGroup; // 归属的表单

    @Input() // 控件名
    controlName: string;

    options: Klass[]; // 所有选择数据

    constructor(
        private klassService: KlassService,
        private commonService: CommonService,
    ) {}

    // 请求所有的数据
    ngOnInit() {
        this.klassService.getAll().subscribe(
            res => {
                this.options = res;
            },
            () => {
                console.log('error');
            },
        );
    }

    // 比较两个班级是否相等
    getCompareKlassEqual() {
        return this.commonService.compareEntityEqual;
    }

    trackByFn(index: number, item) {
        return item.id;
    }
}
