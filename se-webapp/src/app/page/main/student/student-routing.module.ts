import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { ScoreComponent } from './score/score.component';


const routes: Routes = [
    { path: '', component: IndexComponent },
    { path: 'edit/:id', component: EditComponent },
    { path: 'add', component: AddComponent },
    { path: 'score/:id', component: ScoreComponent },
    { path: 'score', component: ScoreComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class StudentRoutingModule {
}
