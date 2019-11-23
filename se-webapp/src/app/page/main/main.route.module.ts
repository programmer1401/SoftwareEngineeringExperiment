import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { MainComponent } from './components/main/main.component';

/**
 * 定制main模块路由信息
 */
const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                component: ContentComponent,
                data: {
                    title: '欢迎使用',
                },
            },
            {
              path: 'grade',
              loadChildren: './grade/grade.module#GradeModule'
            },
            {
              path: 'teacher',
              loadChildren: './teacher/teacher.module#TeacherModule'
            },
            {
                path: 'klass',
                loadChildren: './klass/klass.module#KlassModule',
            },
            {
                path: 'student',
                loadChildren: './student/student.module#StudentModule',
            },
            {
                path: 'course',
                loadChildren: './course/course.module#CourseModule',
            },
            {
                path: 'myCourse',
                loadChildren: './mycourse/mycourse.module#MycourseModule'
            },
            {
                path: 'myKlass',
                loadChildren: './myklass/myklass.module#MyklassModule'
            },
            {
                path: 'export',
                loadChildren: './export-report/export-report.module#ExportReportModule'
            }
        ],

    },
];

/**
 * 主页面路由模块
 */
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MainRouteModule {
}
