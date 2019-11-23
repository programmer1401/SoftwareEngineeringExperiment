import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ScoreComponent } from './score/score.component';
import { SetScoreComponent } from './set-score/set-score.component';


const routes: Routes = [
    {
        path: '',
        component: IndexComponent
    },
    {
        path: 'score/:courseId/:klassId',
        component: ScoreComponent
    },
    {
        path: 'setScore',
        component: SetScoreComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MycourseRoutingModule {
}
