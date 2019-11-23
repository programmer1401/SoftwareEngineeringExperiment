import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { KlassDetailComponent } from './klass-detail/klass-detail.component';


const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
    },
    {
        path: 'klassDetail/:klassId',
        component: KlassDetailComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MyklassRoutingModule {
}
