import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GradeService } from '@core/service/grade.service';
import { KlassService } from '@core/service/klass.service';
import { Grade } from '../../../../norm/entity/grade';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: []
})
export class EditComponent implements OnInit {
    editFrom: FormGroup;
    grade: Grade;

    constructor(private fb: FormBuilder,
                private message: NzMessageService,
                private locate: Location,
                private route: ActivatedRoute,
                private gradeService: GradeService,
                private klassService: KlassService) {
    }

    /**
     * 初始化表单数组
     */
    ngOnInit() {
        this.editFrom = this.fb.group({
            name: [null, [Validators.required]],
            creditNeed: [null],
        });

        this.route.paramMap.subscribe(
            params => {
                this.gradeService.getById(+params.get('id')).subscribe(
                    grade => {
                        this.grade = grade;
                        this.editFrom.patchValue({
                            id: this.grade.id,
                            name: this.grade.name,
                            creditNeed: this.grade.creditNeed,
                        });
                    },
                    () => {
                        console.log('network error');
                    },
                );

            });
    }

    /**
     * 确认表单
     */
    submitForm(): void {
        this.gradeService.update(this.grade.id, this.editFrom.value)
            .subscribe(() => {
                this.locate.back();
            }, () => {
                this.message.error('老师信息保存失败');
            });
    }

}
