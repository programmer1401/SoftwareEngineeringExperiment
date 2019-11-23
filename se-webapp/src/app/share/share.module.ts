import { NgModule } from '@angular/core';
import { PipeModule } from './pipe/pipe.module';
import { ComponentModule } from './component/component.module';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        ComponentModule,
        PipeModule,
        RouterModule

    ],
    exports: [
        ComponentModule,
        PipeModule,
        RouterModule
    ]
})
export class ShareModule {
}
