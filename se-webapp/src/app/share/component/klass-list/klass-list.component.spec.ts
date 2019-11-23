import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KlassListComponent } from './klass-list.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KlassService } from '../../../../core/service/klass.service';
import { KlassTestService } from '../../../../spec/klass.test.service';
import { CommonService } from '../../../../core/service/common.service';
import { CommonTestService } from '../../../../spec/common.test.service';

describe('KlassListComponent', () => {
    let component: KlassListComponent;
    let fixture: ComponentFixture<KlassListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [KlassListComponent],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                NzSelectModule,
                HttpClientTestingModule,
                BrowserAnimationsModule
            ],
            providers: [
                {
                    provide: KlassService,
                    useClass: KlassTestService
                },
                {
                    provide: CommonService,
                    useClass: CommonTestService
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(KlassListComponent);
        component = fixture.componentInstance;

        // 初始化INPUT
        component.formGroup = new FormGroup({
            name: new FormControl()
        });
        component.controlName = 'name';

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
