import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KlassScoreComponent } from './klass-score/klass-score.component';
import { NeedReStudyStudentComponent } from './need-re-study-student/need-re-study-student.component';
import { StudentScoreComponent } from './studnet-score/student-score.component';
import { RepeatStudentComponent } from './repeat-student/repeat-student.component';


const routes: Routes = [
    {
        path: 'klassScore',
        component: KlassScoreComponent,
    },
    {
        path: 'needRestudyStudent',
        component: NeedReStudyStudentComponent
    },
    {
        path: 'studentScore',
        component: StudentScoreComponent
    },
    {
        path: 'repeatStudent',
        component: RepeatStudentComponent
    }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExportReportRoutingModule { }
