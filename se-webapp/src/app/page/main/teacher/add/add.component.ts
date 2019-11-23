import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { TeacherService } from '@core/service/teacher.service';
import { Location } from '@angular/common';
import { KlassService } from '@core/service/klass.service';
import { Klass } from '../../../../norm/entity/klass';
import { CommonService } from '@core/service/common.service';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styles: [],
})
export class AddComponent implements OnInit {

    addForm: FormGroup;
    klasses = new Array<Klass>();
    klassOptions = new Array<Klass>();


    constructor(private fb: FormBuilder,
                private message: NzMessageService,
                private locate: Location,
                private teacherService: TeacherService,
                private klassService: KlassService,
                private commonService: CommonService) {
    }

    /**
     * 初始化表单数组
     */
    ngOnInit() {
        this.getAllKlasses();
        this.addForm = this.fb.group({
            number: [null, [Validators.required], [this.teacherService.getValidatorNumberExistFn()]],
            name: [null, [Validators.required]],
            college: [null],
            klassList: [null],
        });

    }


    /**
     * 确认表单
     */
    submitForm(): void {
        this.teacherService.save(this.addForm.value)
            .subscribe(() => {
                this.clear();
                this.message.success("录入成功")

            }, () => {
                this.message.error('录入失败');
            });
    }


    getAllKlasses() {
        this.klassService.getAll().subscribe(klasses => {
            this.klassOptions = klasses;
        });
    }

    getCompareKlassEqual() {
        return this.commonService.compareEntityEqual;
    }

    clear(): void {
        this.addForm.reset();
    }

}
