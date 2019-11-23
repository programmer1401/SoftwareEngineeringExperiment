import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { GradeService } from '@core/service/grade.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: []
})
export class AddComponent implements OnInit {
    addForm: FormGroup;

    constructor(private fb: FormBuilder,
                private message: NzMessageService,
                private locate: Location,
                private gradeService: GradeService,
              ) {
    }

    /**
     * 初始化表单数组
     */
    ngOnInit() {
        this.addForm = this.fb.group({
            name: [null, [Validators.required]],
            creditNeed: [null],
        });

    }

    /**
     * 确认表单
     */
    submitForm(): void {
        this.gradeService.save(this.addForm.value)
            .subscribe(() => {
                this.clear();
                this.message.success('保存成功');
            }, () => {
                this.message.error('保存失败');
            });
    }


    clear():void {
        this.addForm.reset();
    }

}
