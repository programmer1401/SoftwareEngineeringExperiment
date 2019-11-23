import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyklassRoutingModule } from './myklass-routing.module';
import { IndexComponent } from './index/index.component';
import { ShareModule } from '../../../share/share.module';
import { KlassDetailComponent } from './klass-detail/klass-detail.component';


@NgModule({
  declarations: [IndexComponent, KlassDetailComponent],
    imports: [
        CommonModule,
        MyklassRoutingModule,
        ShareModule,
    ],
})
export class MyklassModule { }
