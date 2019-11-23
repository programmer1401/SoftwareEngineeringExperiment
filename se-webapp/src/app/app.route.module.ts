import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

/**
 * 定义路由信息
 */
const routes: Routes = [
    {
        path: '',
        loadChildren: './page/login/login.module#LoginModule',
    },
    {
        path: 'main',
        loadChildren: './page/main/main.module#MainModule'
    },
];

/**
 * 路由模块
 */
@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules
        })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouteModule {
}
