import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grade } from '../../norm/entity/grade';
import { Page } from '../../norm/target/page';
import { Pageable } from '../../norm/target/pageable';
import { CoreModule } from '../core.module';

/**
 * @Description: 年级service
 * @author chenjie
 */
@Injectable({
    providedIn: CoreModule,
})
export class GradeService {

    private baseUrl = 'Grade';

    constructor(private httpClient: HttpClient) {
    }

    // 批量毕业
    batchGraduate(idList: Array<number>): Observable<void> {
        return this.httpClient.put<void>(`${this.baseUrl}/batchGraduate`, idList);
    }

    /**
     * 比较两个年级是否相等
     * @param grade1 年级1
     * @param grade2 年级2
     */
    compareGradeEqual(grade1: Grade, grade2: Grade): boolean {
        return grade1 && grade2 ? grade1.id === grade2.id : false;
    }

    // 批量删除
    deleteByList(gradeList: Array<Grade>): Observable<void> {
        return this.httpClient.request<void>(
            'delete',
            `${this.baseUrl}/deleteByList`,
            { body: gradeList },
        );
    }

    // 获取全部年级
    getAll(): Observable<Array<Grade>> {
        return this.httpClient.get<Array<Grade>>(this.baseUrl);
    }

    // 获取分页数据
    getAllByPage(pageable: Pageable): Observable<Page<Grade>> {
        // 初始化参数
        const params: { [key: string]: any } = {
            page: String(pageable.page - 1),
            size: String(pageable.size),
        };

        // 请求并返回
        return this.httpClient.get<Page<Grade>>(`${this.baseUrl}/page`, { params: params });
    }

    // 根据id获取年级
    getById(id: number): Observable<Grade> {
        return this.httpClient.get<Grade>(`${this.baseUrl}/${id}`);
    }

    // 分页查询
    pageByName(name: string, pageable): Observable<Page<Grade>> {
        // 初始化参数
        const params: { [key: string]: any } = {
            page: String(pageable.page - 1),
            size: String(pageable.size),
            name: String(name),
        };

        return this.httpClient.get<Page<Grade>>(`${this.baseUrl}/pageByName`, { params: params });
    }

    // 新增
    save(grade: Grade): Observable<Grade> {
        return this.httpClient.post<Grade>(this.baseUrl, grade);
    }

    // 更新
    update(id: number, grade: Grade): Observable<void> {
        return this.httpClient.put<void>(`${this.baseUrl}/${id}`, grade);
    }

    delete(id: number): Observable<void> {
        return this.httpClient.delete<void>(this.baseUrl + '/' + id);
    }
}
