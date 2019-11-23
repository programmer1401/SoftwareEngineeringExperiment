import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Course } from '../../norm/entity/course';
import { Page } from '../../norm/target/page';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { CoreModule } from '../core.module';
import { Pageable } from '../../norm/target/pageable';
import { Klass } from '../../norm/entity/klass';

@Injectable({
    providedIn: CoreModule,
})
export class CourseService {

    private baseUrl = 'Course';

    constructor(private http: HttpClient) {
    }

    /**
     * 删除课程
     * @param courseId 课程id
     */
    deleteCourse(courseId: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${courseId}`);
    }


    /***
     * @Description: 获取所有课程
     * @author chenjie
     * @date 19-3-14
     */
    getAll(): Observable<Array<Course>> {
        return this.http.get<Array<Course>>(`${this.baseUrl}/getAll`);
    }

    /**
     * 通过id获取课程
     * @param courseId 课程id
     */
    getCourse(courseId: number): Observable<Course> {
        return this.http.get<Course>(`${this.baseUrl}/${courseId}`);
    }

    /**
     * 编辑课程
     * @param courseId 课程id
     * @param course 新课程
     */
    editCourse(courseId: number, course: Course): Observable<void> {
        return this.http.put<void>(`${this.baseUrl}/${courseId}`, course);
    }

    /**
     * 验证课程编号是否重复验证器
     * @param string Number 课程编号
     * @returns AsyncValidatorFn 异步验证器
     * @author panjiaqi
     */
    public getValidatorCourseNumberExistFn(Number?: string): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (control.value === Number) {
                return of(null);
            } else {
                return this.existByCourseNumber(control.value).pipe(
                    map(exist => (exist ? { exist: true } : null)),
                    catchError(() => null),
                );
            }
        };
    }

    /**
     * 是否存在该课程编号
     * @param string Number 课程编号
     * @returns 查询结果true：存在，false：不存在
     * @author panjiaqi
     */
    public existByCourseNumber(Number: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.baseUrl}/existsByNumber/${Number}`);
    }

    public getAllByPage(pageable: Pageable): Observable<Page<Course>> {
        const params = {
            page: pageable.page.toString(),
            size: pageable.size.toString(),
        };
        return this.http.get<Page<Course>>(`${this.baseUrl}/page`, { params: params });
    }

    public save(course: Course): Observable<Course> {
        return this.http.post<Course>(this.baseUrl, course);
    }



}
