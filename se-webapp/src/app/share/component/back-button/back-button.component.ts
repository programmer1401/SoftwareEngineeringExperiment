import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-back-button',
    templateUrl: './back-button.component.html',
    styleUrls: ['./back-button.component.css'],
})
export class BackButtonComponent implements OnInit {

    constructor(private location: Location) {
    }

    ngOnInit() {
    }

    /**
     * @description  返回
     * @author htx
     * @date 下午7:30 19-5-7
     **/
    back() {
        this.location.back();
    }
}
