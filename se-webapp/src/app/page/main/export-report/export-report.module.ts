import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExportReportRoutingModule } from './export-report-routing.module';
import { KlassScoreComponent } from './klass-score/klass-score.component';
import { StudentScoreComponent } from './studnet-score/student-score.component';
import { NeedReStudyStudentComponent } from './need-re-study-student/need-re-study-student.component';
import { RepeatStudentComponent } from './repeat-student/repeat-student.component';
import { ShareModule } from '../../../share/share.module';


@NgModule({
  declarations: [KlassScoreComponent, StudentScoreComponent, NeedReStudyStudentComponent, RepeatStudentComponent],
    imports: [
        CommonModule,
        ExportReportRoutingModule,
        ShareModule,
    ],
})
export class ExportReportModule { }
