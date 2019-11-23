import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { MenuComponent } from '../menu/menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LeftControlComponent } from '../left-control/left-control.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ShareModule } from '../../../../share/share.module';
import { UserService } from '../../../../core/service/user.service';
import { UserTestService } from '../../../../spec/user.test.service';
import { MenuService } from '../../../../core/service/menu.service';
import { MenuTestService } from '../../../../spec/menu.test.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MainComponent', () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MainComponent,
                MenuComponent,
                LeftControlComponent],
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
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
