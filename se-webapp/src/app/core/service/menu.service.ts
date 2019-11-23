import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../../norm/entity/menu';
import { Observable, of, ReplaySubject } from 'rxjs';
import { CoreModule } from '../core.module';
import { UserService } from '@core/service/user.service';

/**
 * 菜单
 */
@Injectable({
    providedIn: CoreModule,
})
export class MenuService {

    private teacherMenu: Array<Menu>;
    private adminMenu: Array<Menu>;
    private studentMenu: Array<Menu>;
    private: Array<Menu>;

    private currentMenu = new ReplaySubject<Array<Menu>>(1);

    constructor(private http: HttpClient,
                private userService: UserService) {
        this.adminMenu = [
            { id: 1, name: '教师管理', iconType: 'team', router: 'teacher', _checked: null, _selected: null },
            { id: 2, name: '年级管理', iconType: 'dashboard', router: 'grade', _checked: null, _selected: null },
            { id: 3, name: '班级管理', iconType: 'idcard', router: 'klass', _checked: null, _selected: null },
            { id: 4, name: '学生管理', iconType: 'database', router: 'student', _checked: null, _selected: null },
            { id: 5, name: '课程管理', iconType: 'book', router: 'course', _checked: null, _selected: null },
        ];
        this.teacherMenu =  [
            { id: 1, name: '我的班级', iconType: 'crown', router: 'myKlass', _checked: null, _selected: null },
            { id: 2, name: '我的课程', iconType: 'schedule', router: 'myCourse', _checked: null, _selected: null },
        ];;
        this.studentMenu =  [
            { id: 1, name: '我的成绩', iconType: 'schedule', router: 'student/score', _checked: null, _selected: null },
        ];
        this.setMenuList();


    }
    /**
     * 设置当前菜单列表
     */
    private setMenuList(): void {
        this.userService.getCurrentLoginUser().subscribe((user) => {
            if (user.role === 'teacher') {
                this.currentMenu.next(this.teacherMenu);
            }

            if (user.role === 'admin') {
                this.currentMenu.next(this.adminMenu);
            }

            if (user.role === 'student') {
                this.currentMenu.next(this.studentMenu);


            }
        });
    }

    /**
     * 获取菜单列表
     */
    getMenuList(): Observable<Array<Menu>> {
        return this.currentMenu.asObservable();

        return ;

    }

}
