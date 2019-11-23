import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KlassRoutingModule } from './klass-routing.module';
import { IndexComponent } from './index/index.component';
import { ShareModule } from '../../../share/share.module';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [IndexComponent, AddComponent, EditComponent],
    imports: [
        CommonModule,
        KlassRoutingModule,
        ShareModule,
    ],
})
export class KlassModule { }
