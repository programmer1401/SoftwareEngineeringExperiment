import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MycourseRoutingModule } from './mycourse-routing.module';
import { IndexComponent } from './index/index.component';
import { ShareModule } from '../../../share/share.module';
import { ScoreComponent } from './score/score.component';
import { SetScoreComponent } from './set-score/set-score.component';


@NgModule({
  declarations: [IndexComponent, ScoreComponent, SetScoreComponent],
    imports: [
        CommonModule,
        MycourseRoutingModule,
        ShareModule,
    ],
})
export class MycourseModule { }
