import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRouteModule } from './app.route.module';
import { CoreModule } from '@core/core.module';
import { DatePipe, registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AppRouteModule,               // 导入路由模块
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,                   // 导入核心模块，全局单例
        HttpClientModule,
    ],
    providers: [
        DatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
