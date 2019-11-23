import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../norm/entity/user';
import { Observable, ReplaySubject } from 'rxjs';
import { CoreModule } from '../core.module';
import { Router } from '@angular/router';
import { Page } from '../../norm/target/page';
import { Pageable } from '../../norm/target/pageable';

/**
 * 用户service
 * @author poshichao
 */
@Injectable({
    providedIn: CoreModule,
})
export class UserService {

    private baseUrl = 'User';
    /**
     * 使用ReplaySubject，是为了处理刷新页面时，依然不影响界面的显示
     * 他会缓存一个过去的值，当现在没有通知的时候，会将上一个的值给订阅者
     */
    private currentUser = new ReplaySubject<User>(1);

    constructor(private http: HttpClient,
                private router: Router) {
        // 如果是主界面，再设置登陆用户，否则登陆页会显示登陆失败
        if (this.router.url.includes('main')) {
            this.setCurrentLoginUser();
        }
    }

    /**
     * 登录
     * @param user 登录用户
     */
    login(user: User): Observable<void> {
        const url: string = this.baseUrl + '/login';
        return this.http.post<void>(url, user);
    }

    /**
     * 用户注销
     */
    logout(): Observable<void> {
        const url: string = this.baseUrl + '/logout';
        return this.http.post<void>(url, null);
    }

    /**
     * 设置当前登录用户，用于通知全部订阅者，获取到了对象
     * @author poshichao
     */
    setCurrentLoginUser() {
        const url: string = this.baseUrl + '/currentLoginUser';
        this.http.get<User>(url).subscribe((data: User) => {
            this.currentUser.next(data);
        }, () => {
            console.log('network error');
        });
    }

    /**
     * 获取当前登录用户
     * @author poshichao
     */
    getCurrentLoginUser(): Observable<User> {
        return this.currentUser.asObservable();
    }

    /**
     * description:个人中心（修改用户名密码）
     * author: panjiaqi
     */
    public updatePasswordAndUsername(user: User): Observable<User> {
        return this.http.put<User>(this.baseUrl, user);
    }

    /**
     * description:验证原密码是否正确
     * author: panjiaqi
     */
    public checkPasswordIsRight(password): Observable<Object> {
        return this.http.post(`${this.baseUrl}/checkPasswordIsRight`, { password: password });
    }

    public getAllUserByPage(pageable: Pageable): Observable<Page<User>> {
        const params = {
            page: pageable.page.toString(),
            size: pageable.size.toString(),
        };

        return this.http.get<Page<User>>(`${this.baseUrl}/page`, { params: params });
    }

    public delete(id: number): Observable<void> {
        return this.http.delete<void>(this.baseUrl + '/' + id);
    }

    public getById(id: number): Observable<User> {
        return this.http.get<User>(this.baseUrl + '/' + id);
    }


}
