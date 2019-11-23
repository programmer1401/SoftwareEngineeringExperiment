import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Page } from '../../norm/target/page';
import { Teacher } from '../../norm/entity/teacher';
import { CoreModule } from '../core.module';
import { Pageable } from '../../norm/target/pageable';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: CoreModule
})
export class TeacherService {

    private baseUrl = 'Teacher';

    constructor(private httpClient: HttpClient) {
    }

    // 分页查询
    pageByName(name: string, pageable): Observable<Page<Teacher>> {
        const queryUrl = this.baseUrl + '/pageByName';
        // 初始化参数
        const params: { [key: string]: any } = {
            page: String(pageable.page - 1),
            size: String(pageable.size),
            name: String(name),
        };

        return this.httpClient.get<Page<Teacher>>(queryUrl, {params: params});
    }

    /**
     * 获取所有的教师
     */
    getAllTeacher(): Observable<Array<Teacher>> {
        return this.httpClient.get<Array<Teacher>>(this.baseUrl);
    }

    /**
     * 比较两个教师是否相等
     * @param teacher1 教师1
     * @param teacher2 教师2
     */
    compareTeacherEqual(teacher1: Teacher, teacher2: Teacher): boolean {
        return teacher1 && teacher2 ? teacher1.id === teacher2.id : false;
    }


    public page(pageable: Pageable): Observable<Page<Teacher>> {

        const params = {
            page: pageable.page.toString(),
            size: pageable.size.toString(),
        };

        return this.httpClient.get<Page<Teacher>>(this.baseUrl + '/page', { params: params });
    }

    public delete(id: number): Observable<void> {
        return this.httpClient.delete<void>(this.baseUrl + '/' + id);
    }

    public save(teacher: Teacher): Observable<void> {
        console.log(teacher);
        return this.httpClient.post<void>(this.baseUrl, teacher);
    }

    public update(id: number, newTeacher: Teacher): Observable<void> {
        console.log(newTeacher);
        return this.httpClient.put<void>(this.baseUrl + '/' + id, newTeacher);
    }

    public getById(id: number) :Observable<Teacher> {
        return this.httpClient.get<Teacher>(this.baseUrl + '/' + id);
    }

    getValidatorNumberExistFn(number?: string): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (number === control.value) {
                return of(null);
            } else {
                return this.existByNumber(control.value).pipe(
                    map(exist => (exist ? {exist: true} : null)),
                    catchError(() => null)
                );
            }
        };
    }

    existByNumber(number: string): Observable<boolean> {
        return this.httpClient.get<boolean>(this.baseUrl + '/existByNumber/' + number);
    }

}
