import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../app.config';
import { Router } from '@angular/router';
import { UserService } from '@core/service/user.service';
import { User } from '../../../norm/entity/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./setup.component.less'],
})
export class LoginComponent implements OnInit {
    user: User = new User();

    onLineDate: Date;

    currentDate: Date;

    teamName: string;

    teamLink: string;

    /**
     * 注入Router服务
     * @param router 路由
     * @param userService   用户
     */
    constructor(private router: Router,
                private userService: UserService) {
    }

    ngOnInit() {
        this.onLineDate = AppConfig.onLineDate;
        this.currentDate = AppConfig.currentDate;
        this.teamName = AppConfig.teamName;
        this.teamLink = AppConfig.teamLink;
    }

    /**
     * 用户登录
     */
    login() {
        this.userService.login(this.user).subscribe(
            () => {
                this.userService.setCurrentLoginUser();
                this.userService.getCurrentLoginUser()
                    .subscribe((user) => {
                        if (user.role === 'student') {
                            this.router.navigateByUrl('main/student/score');
                        } else {
                            this.router.navigateByUrl('main');

                        }

                    });



            },
            () => {
                console.log('network error');
            },
        );
    }

}
