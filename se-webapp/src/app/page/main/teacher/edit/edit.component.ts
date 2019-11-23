import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { TeacherService } from '@core/service/teacher.service';
import { Location } from '@angular/common';
import { Teacher } from '../../../../norm/entity/teacher';
import { ActivatedRoute } from '@angular/router';
import { Klass } from '../../../../norm/entity/klass';
import { KlassService } from '@core/service/klass.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styles: [],
})
export class EditComponent implements OnInit {
    editFrom: FormGroup;
    teacher: Teacher;
    klasses = new Array<Klass>();
    klassOptions = new Array<Klass>();

    constructor(private fb: FormBuilder,
                private message: NzMessageService,
                private locate: Location,
                private route: ActivatedRoute,
                private teacherService: TeacherService,
                private klassService: KlassService) {
    }

    /**
     * 初始化表单数组
     */
    ngOnInit() {
        this.getAllKlass();
        this.editFrom = this.fb.group({
            name: [null, [Validators.required]],
            number: [null, [Validators.required], [this.teacherService.getValidatorNumberExistFn()]],
            college: [null],
            klassList: [null],
        });

        this.route.paramMap.subscribe(
            params => {
                this.teacherService.getById(+params.get('id')).subscribe(
                    teacher => {
                        this.teacher = teacher;
                        this.editFrom.patchValue({
                            id: this.teacher.id,
                            name: this.teacher.name,
                            college: this.teacher.college,
                            number: this.teacher.number,
                            klassList: this.teacher.klassList
                        });
                        this.editFrom.get('number').setAsyncValidators(this.teacherService.getValidatorNumberExistFn(teacher.number));
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
        this.teacherService.update(this.teacher.id, this.editFrom.value)
            .subscribe(() => {
                this.locate.back();
            }, () => {
                this.message.error('老师信息保存失败');
            });
    }

    // 比较两个班级是否相等
    getCompareKlassEqual() {
        return this.klassService.compareKlassEqual;
    }

    getAllKlass() {
        this.klassService.getAll().subscribe((klasses) => {
            this.klassOptions = klasses;
        })
    }

}
