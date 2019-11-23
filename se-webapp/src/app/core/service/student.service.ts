import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Student } from '../../norm/entity/student';
import { Page } from '../../norm/target/page';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { CoreModule } from '../core.module';
import { Pageable } from '../../norm/target/pageable';

@Injectable({
    providedIn: CoreModule,
})
export class StudentService {

    private baseUrl = 'Student';

    constructor(private http: HttpClient) {
    }

    /**
     * 增加学生
     * @param student 学生
     */
    save(student: Student): Observable<void> {
        console.log(student, 'qweqweqwe');
        return this.http.post<void>(this.baseUrl, student);
    }

    /**
     * 删除学生
     * @param id 学生id
     */
    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    /**
     * 通过id获取学生
     * @param id 学生id
     */
    getById(id: number): Observable<Student> {
        return this.http.get<Student>(`${this.baseUrl}/${id}`);
    }

    /**
     * 更新学生
     * @param student 学生
     */
    update(student: Student): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${student.id}`, student);
    }

    /**
     * 验证学生学号是否重复验证器
     * @param string studentNumber 学生学号，编辑时传入
     * @returns AsyncValidatorFn 异步验证器
     */
    getValidatorNumberExistFn(studentNumber?: string): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (control.value === studentNumber) {
                return of(null);
            } else {
                return this.existByStudentNumber(control.value).pipe(
                    map(exist => (exist ? { exist: true } : null)),
                    catchError(() => null),
                );
            }
        };
    }

    /**
     * 是否存在该学号的学生
     * @param string studentNumber 学生学号
     * @returns Observable<boolean> 查询结果true：存在，false：不存在
     */
    existByStudentNumber(studentNumber: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.baseUrl}/existByNumber/${studentNumber}`);
    }


    public page(pageable: Pageable): Observable<Page<Student>> {

        const params = {
            page: pageable.page.toString(),
            size: pageable.size.toString(),
        };

        return this.http.get<Page<Student>>(this.baseUrl + '/page', { params: params });
    };

    exportNeedRestudyStudent(gradeId: number) {
        return this.http
            .get(this.baseUrl + '/exportNeedRestudyStudent/' + gradeId, {
                responseType: 'blob',
            });
    }

    exportRepeatStudent(gradeId: number) {
        return this.http
            .get(this.baseUrl + '/exportRepeatStudent/' + gradeId, {
                responseType: 'blob',
            });
    }
}
