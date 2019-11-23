import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private router: Router,
                private title: Title) {
    }

    ngOnInit(): void {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd),
                map(() => this.route),
                map((route) => {
                    while (route.firstChild) {
                        route = route.firstChild;
                    }
                    return route;
                }),
                mergeMap(route => route.data))
            .subscribe((data: Data) => {
                this.title.setTitle(data.title + ' -学生管理系统');
            });
    }
}
