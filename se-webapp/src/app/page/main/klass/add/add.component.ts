import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { KlassService } from '@core/service/klass.service';
import { CommonService } from '@core/service/common.service';
import { GradeService } from '@core/service/grade.service';
import { Grade } from '../../../../norm/entity/grade';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: []
})
export class AddComponent implements OnInit {

    addForm: FormGroup;
    gradeOptions = new Array<Grade>();


    constructor(private fb: FormBuilder,
                private message: NzMessageService,
                private locate: Location,
                private klassService: KlassService,
                private commonService: CommonService,
                private gradeService: GradeService
    ) {
    }

    /**
     * 初始化表单数组
     */
    ngOnInit() {
        this.getAllGrade();
        this.addForm = this.fb.group({
            name: [null, [Validators.required]],
            grade: [null],
        });

    }

    /**
     * 确认表单
     */
    submitForm(): void {
        this.klassService.save(this.addForm.value)
            .subscribe(() => {
                this.clear();
                this.message.success("增加成功");
            }, () => {
                this.message.error('保存失败');
            });
    }


    getCompareGradeEqual() {
        return this.commonService.compareEntityEqual;

    }


    getAllGrade() {
        this.gradeService.getAll().subscribe(grades => {
            this.gradeOptions = grades;
        });
    }

    clear(): void {
        this.addForm.reset();
    }


}
