import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MainRouteModule } from './main.route.module';
import { ContentComponent } from './components/content/content.component';
import { LeftControlComponent } from './components/left-control/left-control.component';
import { MainComponent } from './components/main/main.component';
import { MenuComponent } from './components/menu/menu.component';
import { ShareModule } from '../../share/share.module';
import { TeacherModule } from './teacher/teacher.module';


@NgModule({
    declarations: [
        ContentComponent,
        LeftControlComponent,
        MainComponent,
        MenuComponent
    ],
    imports: [
        MainRouteModule,
        ShareModule,
        TeacherModule
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainModule {
}
