import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { CommonService } from '@core/service/common.service';
import { KlassService } from '@core/service/klass.service';
import { Klass } from '../../../../norm/entity/klass';

@Component({
  selector: 'app-klass-detail',
  templateUrl: './klass-detail.component.html',
  styles: []
})
export class KlassDetailComponent implements OnInit {
    klass: Klass;

    constructor(private fb: FormBuilder,
                private message: NzMessageService,
                private locate: Location,
                private route: ActivatedRoute,
                private commonService: CommonService,
                private klassService: KlassService
                ) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(
            params => {
                this.klassService.getById(+params.get('klassId')).subscribe(
                    klass => {
                        this.klass = klass;
                    },
                    () => {
                        console.log('network error');
                    },
                );

            });
    }

}
