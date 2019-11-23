import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Grade } from '../../../norm/entity/grade';
import { GradeService } from '@core/service/grade.service';

@Component({
    selector: 'app-grade-list',
    templateUrl: './grade-list.component.html',
    styleUrls: ['./grade-list.component.css'],
})
export class GradeListComponent implements OnInit {
    @Input() ngModel: Grade; // 选中的值
    @Output() selected = new EventEmitter<number>(); // 输出属性
    datas: Grade[]; // 所有数据

    constructor(private gradeService: GradeService) {}

    // 请求所有的数据
    ngOnInit() {
        this.gradeService.getAll().subscribe(
            res => {
                this.datas = res;
            },
            () => {
                console.log('error');
            },
        );
    }

    // 当则内容更改时，将已选中对象的id弹射到父组件绑定的事件上
    dataChange() {
        this.selected.emit(this.ngModel != null ? this.ngModel.id : null);
    }
}
