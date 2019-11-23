import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeListComponent } from './college-list.component';
import { NzFormModule, NzGridModule, NzSelectModule, NzTableModule } from 'ng-zorro-antd';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CollegeService } from '../../../../core/service/college.service';
import { CollegeTestService } from '../../../../spec/college.test.service';

describe('CollegeListComponent', () => {
    let component: CollegeListComponent;
    let fixture: ComponentFixture<CollegeListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CollegeListComponent],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                NzGridModule,
                NzTableModule,
                RouterTestingModule,
                NzSelectModule,
                NzFormModule,
                HttpClientTestingModule,
                BrowserAnimationsModule,
            ],
            providers: [
                {
                    provide: CollegeService,
                    useClass: CollegeTestService
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CollegeListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
