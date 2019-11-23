import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { IndexComponent } from './index/index.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ShareModule } from '../../../share/share.module';
import { ScoreComponent } from './score/score.component';


@NgModule({
    declarations: [IndexComponent, AddComponent, EditComponent, ScoreComponent],
    imports: [
        CommonModule,
        StudentRoutingModule,
        ShareModule,
    ],
})
export class StudentModule {
}
