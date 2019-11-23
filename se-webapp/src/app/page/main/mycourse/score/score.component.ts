import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '@core/service/common.service';
import { SelectCourse } from '../../../../norm/entity/selectCourse';
import { SelectCourseService } from '@core/service/select-course.service';
import { saveAs } from 'file-saver';
import { Klass } from '../../../../norm/entity/klass';
import { KlassService } from '@core/service/klass.service';

@Component({
    selector: 'app-score',
    templateUrl: './score.component.html',
    styles: [],
})
export class ScoreComponent implements OnInit {

    selectCourseList: Array<SelectCourse>;
    klass: Klass;
    courseId: number;
    klassId: number;

    constructor(private fb: FormBuilder,
                private message: NzMessageService,
                private locate: Location,
                private route: ActivatedRoute,
                private commonService: CommonService,
                private klassService: KlassService,
                private selectCourseService: SelectCourseService) {
    }

    /**
     * 初始化表单数组
     */
    ngOnInit() {
        this.route.paramMap.subscribe(
            params => {
                this.courseId = +params.get('courseId');
                this.klassId = +params.get('klassId');

                this.selectCourseService
                    .getAllByCourseIdAndKlassId(this.courseId, this.klassId)
                    .subscribe(data => {
                        this.selectCourseList = data;
                    });

                this.klassService.getById(this.klassId)
                    .subscribe(klass => {
                        this.klass = klass;
                    })
            },
            () => {
                console.log('network error');
            },
        );

    }

    /**
     * 导出
     */
    exportScoreByKlassIdAndCourseId() {
        this.selectCourseService.exportScoreByKlassIdAndCourseId(this.klassId, this.courseId)
            .subscribe(data => {
            const blob = new Blob([data], {
                type:
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
            });
            saveAs(blob, this.klass.name + this.selectCourseList[0].course.name + '成绩' + '.xlsx');
        });
    }

}

