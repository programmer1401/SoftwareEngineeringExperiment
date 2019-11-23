import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Klass } from '../../../../norm/entity/klass';
import { Student } from '../../../../norm/entity/student';
import { StudentService } from '@core/service/student.service';
import { KlassService } from '@core/service/klass.service';
import { CommonService } from '@core/service/common.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: []
})
export class EditComponent implements OnInit {
    editFrom: FormGroup;
    klassOptions = new Array<Klass>();

    student: Student;

    constructor(private fb: FormBuilder,
                private message: NzMessageService,
                private locate: Location,
                private route: ActivatedRoute,
                private studentService: StudentService,
                private klassService: KlassService,
                private commonService: CommonService
                ) {
    }

    /**
     * 初始化表单数组
     */
    ngOnInit() {
        this.getAllKlass();
        this.editFrom = this.fb.group({
            name: [null, [Validators.required]],
            number: [null, [Validators.required], [this.studentService.getValidatorNumberExistFn()]],
            id: [null],
            klass: [null]
        });

        this.route.paramMap.subscribe(
            params => {
                this.studentService.getById(+params.get('id')).subscribe(
                    student => {
                        this.student = student;
                        this.editFrom.patchValue({
                            id: this.student.id,
                            name: this.student.name,
                            number: this.student.number,
                            klass: this.student.klass
                        });
                        this.editFrom.get('number').setAsyncValidators(this.studentService.getValidatorNumberExistFn(student.number));
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
        this.studentService.update(this.editFrom.value)
            .subscribe(() => {
                this.locate.back();
                this.message.success('编辑成功');
            }, () => {
                this.message.error('老师信息保存失败');
            });
    }

    trackByFn(index: number, item) {
        return item.id;
    }

    getAllKlass() {
        this.klassService.getAll().subscribe((klasses) => {
            this.klassOptions = klasses;
        })
    }

    // 比较两个班级是否相等
    getCompareKlassEqual() {
        return this.commonService.compareEntityEqual;
    }
}
