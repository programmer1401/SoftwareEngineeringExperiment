import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyscoreRoutingModule } from './myscore-routing.module';
import { IndexComponent } from './index/index.component';
import { ShareModule } from '../../../share/share.module';


@NgModule({
  declarations: [IndexComponent],
    imports: [
        CommonModule,
        MyscoreRoutingModule,
        ShareModule,
    ],
})
export class MyscoreModule { }
