import { NgModule } from '@angular/core';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { ShareModule } from '../../../share/share.module';
import { CommonModule } from '@angular/common';
import { ComponentModule } from '../../../share/component/component.module';


@NgModule({
    declarations: [IndexComponent, AddComponent, EditComponent],
    imports: [
        TeacherRoutingModule,
        CommonModule,
        ShareModule,
        ComponentModule
    ],
})
export class TeacherModule {
}
