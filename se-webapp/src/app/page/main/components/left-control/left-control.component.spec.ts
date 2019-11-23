import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftControlComponent } from './left-control.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../../../core/service/user.service';
import { UserTestService } from '../../../../spec/user.test.service';
import { MenuService } from '../../../../core/service/menu.service';
import { MenuTestService } from '../../../../spec/menu.test.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareModule } from '../../../../share/share.module';


describe('LeftControlComponent', () => {
    let component: LeftControlComponent;
    let fixture: ComponentFixture<LeftControlComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LeftControlComponent],
            imports: [
                BrowserAnimationsModule,
                HttpClientTestingModule,
                RouterTestingModule,
                ShareModule
            ],
            providers: [
                {
                    provide: UserService,
                    useClass: UserTestService
                },
                {
                    provide: MenuService,
                    useClass: MenuTestService
                }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LeftControlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
