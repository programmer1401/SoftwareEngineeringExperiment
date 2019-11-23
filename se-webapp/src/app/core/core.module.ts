import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { YunzhiInterceptor } from './interceptor/yunzhi.interceptor';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        NgZorroAntdModule,
        RouterModule,
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: YunzhiInterceptor, multi: true}
    ]
})
export class CoreModule {
}
