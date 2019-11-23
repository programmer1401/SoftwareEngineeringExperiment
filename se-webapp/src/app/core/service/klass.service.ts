import { Injectable } from '@angular/core';
import { Klass } from '../../norm/entity/klass';
import { HttpClient } from '@angular/common/http';
import { Pageable } from '../../norm/target/pageable';
import { Observable } from 'rxjs';
import { Page } from '../../norm/target/page';
import { Student } from '../../norm/entity/student';
import { CoreModule } from '../core.module';
import { Teacher } from '../../norm/entity/teacher';

@Injectable({
    providedIn: CoreModule,
})
export class KlassService {

    private baseUrl = 'Klass';

    constructor(private httpClient: HttpClient) {
    }

    // 批量冻结
    batchFreeze(idList: Array<number>): Observable<void> {
        return this.httpClient.post<void>(`${this.baseUrl}/freeze`, idList);
    }

    /**
     * @Description: 批量解冻
     * @author liyiheng
     * @date 19-3-25
     */
    batchThaw(idList: Array<number>) {
        const batchThawUrl = this.baseUrl + '/thaw';
        return this.httpClient.post(batchThawUrl, idList);
    }

    // 获取分页数据
    getAllByPage(pageable: Pageable): Observable<Page<Klass>> {
        // 声明路由
        const getUrl = this.baseUrl + '/page';

        // 初始化参数
        const params: { [key: string]: any } = {
            page: String(pageable.page - 1),
            size: String(pageable.size),
        };

        // 请求并返回
        return this.httpClient.get<Page<Klass>>(getUrl, { params: params });
    }

    // 根据id获取班级
    getById(id: number): Observable<Klass> {
        // 声明路由
        const getUrl = this.baseUrl + '/' + id;
        // 请求并返回
        return this.httpClient.get<Klass>(getUrl);
    }

    // 新增
    save(klass: Klass): Observable<Klass> {
        console.log(klass);
        return this.httpClient.post<Klass>(this.baseUrl, klass);
    }

    // 查询
    search(queryCondition, pageable: Pageable): Observable<Page<Klass>> {
        // 声明路由
        const url = this.baseUrl + '/pageBySpecification';

        // 初始化参数
        queryCondition.page = String(pageable.page - 1);
        queryCondition.size = String(pageable.size);
        return this.httpClient.get<Page<Klass>>(url, { params: queryCondition });
    }

    // 更新
    update(id: number, klass: Klass): Observable<void> {
        const url = this.baseUrl + '/' + id;
        return this.httpClient.put<void>(url, klass);
    }

    /**
     * 获取所有班级
     */
    getAll(): Observable<Array<Klass>> {
        return this.httpClient.get<Array<Klass>>(this.baseUrl + '/getAll');
    }

    /**
     * 获取班级所有学生
     */
    getStudents(id: number): Observable<Array<Student>> {
        return this.httpClient.get<Array<Student>>(this.baseUrl + '/getStudents/' + id);
    }

    /*
     * 获取当前登陆用户的班级
     */
    getByLoginUser(): Observable<Array<Klass>> {
        return this.httpClient.get<Array<Klass>>(this.baseUrl + '/getByLoginUser');
    }

    /**
     * 在每次需要获取教师的当前班级的人数之前重新统计一次当前班级的人数，防止因为学生数据变动导致的班级人数错误
     * @returns void
     */
    updateKlassStudentCountByLoginUser(): Observable<void> {
        return this.httpClient.get<void>(`${this.baseUrl}/updateKlassStudentCountByLoginUser`);
    }


    /**
     * 比较班级
     */
    compareKlassEqual(klass1: Klass, klass2: Klass): boolean {
        return klass1 && klass2 ? klass1.id === klass2.id : false;
    }

    public page(pageable: Pageable): Observable<Page<Klass>> {

        const params = {
            page: pageable.page.toString(),
            size: pageable.size.toString(),
        };

        return this.httpClient.get<Page<Klass>>(this.baseUrl + '/page', { params: params });
    }

    public delete(id: number): Observable<void> {
        return this.httpClient.delete<void>(this.baseUrl + '/' + id);
    }

}
