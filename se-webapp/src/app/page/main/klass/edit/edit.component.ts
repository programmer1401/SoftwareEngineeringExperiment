import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Klass } from '../../../../norm/entity/klass';
import { KlassService } from '@core/service/klass.service';
import { Grade } from '../../../../norm/entity/grade';
import { CommonService } from '@core/service/common.service';
import { GradeService } from '@core/service/grade.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styles: [],
})
export class EditComponent implements OnInit {
    editFrom: FormGroup;
    klass: Klass;
    gradeOptions = new Array<Grade>();


    constructor(private fb: FormBuilder,
                private message: NzMessageService,
                private locate: Location,
                private route: ActivatedRoute,
                private klassService: KlassService,
                private commonService: CommonService,
                private gradeService: GradeService) {
    }

    /**
     * 初始化表单数组
     */
    ngOnInit() {
        this.getAllGrade();
        this.editFrom = this.fb.group({
            id: [null],
            name: [null, [Validators.required]],
            grade: [null, [Validators.required]],
        });

        this.route.paramMap.subscribe(
            params => {
                this.klassService.getById(+params.get('id')).subscribe(
                    teacher => {
                        this.klass = teacher;
                        this.editFrom.patchValue({
                            id: this.klass.id,
                            name: this.klass.name,
                            grade: this.klass.grade,
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
        this.klassService.update(this.klass.id, this.editFrom.value)
            .subscribe(() => {
                this.locate.back();
            }, () => {
                this.message.error('老师信息保存失败');
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
}
