import { Component, OnInit } from '@angular/core';
import { UserService } from '@core/service/user.service';
import { User } from '../../../../norm/entity/user';

@Component({
    selector: 'app-left-control',
    templateUrl: './left-control.component.html',
    styleUrls: ['./left-control.component.css']
})
export class LeftControlComponent implements OnInit {

    user: User;


    constructor(private userService: UserService) {
    }

    ngOnInit() {
       this.userService.getCurrentLoginUser()
           .subscribe((user) => {
               this.user = user;
           });
    }

}
