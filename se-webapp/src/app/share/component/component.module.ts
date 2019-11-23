import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BackButtonComponent } from './back-button/back-button.component';
import { CollegeListComponent } from './college-list/college-list.component';
import { CourseListComponent } from './course-list/course-list.component';
import { GradeListComponent } from './grade-list/grade-list.component';
import { KlassListComponent } from './klass-list/klass-list.component';

@NgModule({
    declarations: [
        BackButtonComponent,
        CollegeListComponent,
        CourseListComponent,
        GradeListComponent,
        KlassListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
        ReactiveFormsModule
    ],
    exports: [
        BackButtonComponent,
        CollegeListComponent,
        CourseListComponent,
        GradeListComponent,
        KlassListComponent,
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
        ReactiveFormsModule
    ]
})
export class ComponentModule {
}
