import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeListComponent } from './grade-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzDividerModule, NzFormModule, NzSelectModule, NzTableModule } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GradeService } from '../../../../core/service/grade.service';
import { GradeTestService } from '../../../../spec/grade.test.service';

describe('GradeListComponent', () => {
    let component: GradeListComponent;
    let fixture: ComponentFixture<GradeListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GradeListComponent],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                NzFormModule,
                NzSelectModule,
                NzTableModule,
                NzDividerModule,
                NzSelectModule,
                HttpClientTestingModule,
                BrowserAnimationsModule
            ],
            providers: [
                {
                    provide: GradeService,
                    useClass: GradeTestService
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GradeListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
