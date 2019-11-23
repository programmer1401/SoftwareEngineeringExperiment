import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/service/user.service';
import { Router } from '@angular/router';
import { User } from '../../../../norm/entity/user';
import { StudentService } from '@core/service/student.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.less'],
})
export class MenuComponent implements OnInit {
    currentLoginUser: any;

    constructor(private userService: UserService,
                private router: Router,
                private studentService: StudentService,
                private teacherService: StudentService) {
    }

    ngOnInit() {
        this.getCurrentLoginUser();
    }

    /**
     * 用户注销
     */
    logout() {
        this.userService.logout()
            .subscribe(() => {
                this.router.navigateByUrl('');
            }, () => {
                console.log('network error');
            });
    }

    /**
     * 获取当前登录用户
     */
    getCurrentLoginUser(): void {
        this.userService.getCurrentLoginUser().subscribe((user: User) => {
            if (user.role == 'admin') {
                this.currentLoginUser = user;
                this.currentLoginUser.name = user.username;
            } else if (user.role == 'teacher') {
                this.teacherService.getById(user.roleId).subscribe((teacher) => {
                    this.currentLoginUser = teacher;

                    console.log(this.currentLoginUser);

                });
            } else if (user.role == 'student') {
                this.studentService.getById(user.roleId).subscribe((student) => {
                    this.currentLoginUser = student;
                    console.log(this.currentLoginUser);

                });
            }

        });
    }
}
