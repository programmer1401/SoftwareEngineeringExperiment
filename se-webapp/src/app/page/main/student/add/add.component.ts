import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { StudentService } from '@core/service/student.service';
import { CommonService } from '@core/service/common.service';
import { Klass } from '../../../../norm/entity/klass';
import { KlassService } from '@core/service/klass.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: []
})
export class AddComponent implements OnInit {
    addForm: FormGroup;
    klassOptions = new Array<Klass>();

    constructor(private fb: FormBuilder,
                private message: NzMessageService,
                private locate: Location,
                private studentService: StudentService,
                private commonService: CommonService,
                private klassService: KlassService) {
    }

    /**
     * 初始化表单数组
     */
    ngOnInit() {
        this.getAllKlass();
        this.addForm = this.fb.group({
            number: [null, [Validators.required], [this.studentService.getValidatorNumberExistFn()]],
            klass: [null],
            name: [null]
        });

    }

    /**
     * 确认表单
     */
    submitForm(): void {
        this.studentService.save(this.addForm.value)
            .subscribe(() => {

                this.clear();
                this.message.success('增加成功');
            }, () => {
                this.message.error('专业保存失败，请检查编号是否冲突');
            });
    }

    // 比较两个班级是否相等
    getCompareKlassEqual() {
        return this.commonService.compareEntityEqual;
    }


    trackByFn(index: number, item) {
        return item.id;
    }

    getAllKlass() {
        this.klassService.getAll().subscribe((klasses) => {
            this.klassOptions = klasses;
        })
    }

    clear(): void {
        this.addForm.reset();
    }

}
