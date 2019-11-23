import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GradeRoutingModule } from './grade-routing.module';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { ShareModule } from '../../../share/share.module';


@NgModule({
  declarations: [IndexComponent, EditComponent, AddComponent],
    imports: [
        CommonModule,
        GradeRoutingModule,
        ShareModule,
    ],
})
export class GradeModule { }
