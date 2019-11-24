import { NgModule } from '@angular/core';
import { PipeModule } from './pipe/pipe.module';
import { ComponentModule } from './component/component.module';
import { RouterModule } from '@angular/router';
import { OnlyNumberDirective } from './directive/only-number.directive';
import { OnlyChineseDirective } from './directive/only-chinese.directive';

@NgModule({
    imports: [
        ComponentModule,
        PipeModule,
        RouterModule

    ],
    exports: [
        ComponentModule,
        PipeModule,
        RouterModule,
        OnlyNumberDirective,
        OnlyChineseDirective,
    ],
    declarations: [OnlyNumberDirective, OnlyChineseDirective]
})
export class ShareModule {
}
