import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { CourseRoutingModule } from './course-routing.module';
import { ShareModule } from '../../../share/share.module';
import { SetKlassComponent } from './set-klass/set-klass.component';



@NgModule({
    declarations: [IndexComponent, AddComponent, EditComponent, SetKlassComponent],
    imports: [
        CommonModule,
        CourseRoutingModule,
        ShareModule,
    ],
})
export class CourseModule { }
