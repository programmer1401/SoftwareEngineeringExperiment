import { Component, OnInit } from '@angular/core';
import { Page } from '../../../../norm/target/page';
import { Course } from '../../../../norm/entity/course';
import { Pageable } from '../../../../norm/target/pageable';
import { Router } from '@angular/router';
import { SystemConfigService } from '@core/service/system-config.service';
import { NzMessageService } from 'ng-zorro-antd';
import { CourseService } from '@core/service/course.service';
import { UserService } from '@core/service/user.service';
import { TeacherService } from '@core/service/teacher.service';
import { Teacher } from '../../../../norm/entity/teacher';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styles: []
})
export class IndexComponent implements OnInit {

    teacher: Teacher;

    constructor(private router: Router,
                private systemConfig: SystemConfigService,
                private msg: NzMessageService,
                private userService: UserService,
                private teacherService: TeacherService
    ) {
    }

    ngOnInit() {
        this.userService.getCurrentLoginUser().subscribe(user => {
            this.teacherService.getById(user.roleId).subscribe((teacher) => {
                this.teacher = teacher;
            })
        })
    }


}
