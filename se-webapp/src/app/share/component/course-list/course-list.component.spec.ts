import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseListComponent } from './course-list.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule, NzGridModule, NzSelectModule } from 'ng-zorro-antd';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CourseService } from '../../../../core/service/course.service';
import { CourseTestService } from '../../../../spec/course.test.service';
import { CommonService } from '../../../../core/service/common.service';
import { CommonTestService } from '../../../../spec/common.test.service';

describe('CourseListComponent', () => {
    let component: CourseListComponent;
    let fixture: ComponentFixture<CourseListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CourseListComponent],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                NzGridModule,
                RouterTestingModule,
                NzSelectModule,
                NzFormModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
                CommonModule
            ],
            providers: [
                {
                    provide: CourseService,
                    useClass: CourseTestService
                },
                {
                    provide: CommonService,
                    useClass: CommonTestService
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseListComponent);
        component = fixture.componentInstance;
        component.formGroup = new FormGroup(
            {name: new FormControl()}
        );
        component.controlName = 'name';
        fixture.detectChanges();

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
