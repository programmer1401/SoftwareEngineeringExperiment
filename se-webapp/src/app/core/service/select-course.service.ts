import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Klass } from '../../norm/entity/klass';
import { Observable } from 'rxjs';
import { SelectCourse } from '../../norm/entity/selectCourse';
import { Course } from '../../norm/entity/course';

@Injectable({
    providedIn: 'root',
})
export class SelectCourseService {
    baseUrl = 'SelectCourse';

    constructor(private http: HttpClient) {
    }

    public setKlass(courseId: number, teacherId: number, klassList: Array<Klass>): Observable<void> {
        return this.http.post<void>(this.baseUrl + '/setKlass/' + courseId + '/' + teacherId, klassList);
    }

    public findKlassesByTeacherAndCourse(teacherId: number, courseId: number): Observable<Array<Klass>> {
        return this.http.get<Array<Klass>>(this.baseUrl + '/findKlassesByTeacherAndCourse/' + teacherId + '/' + courseId);
    }

    public getAllByStudentId(id: number): Observable<Array<SelectCourse>> {
        return this.http.get<Array<SelectCourse>>(this.baseUrl + '/getAllByStudentId/' + id);
    }

    public getAllByCourseIdAndKlassId(courseId: number, klassId: number): Observable<Array<SelectCourse>> {
        return this.http.get<Array<SelectCourse>>(this.baseUrl + '/getAllByCourseIdAndKlassId/' + courseId + '/' + klassId);
    }

    public getById(id: number): Observable<SelectCourse> {
        return this.http.get<SelectCourse>(this.baseUrl + '/' + id);
    }

    public update(id: number, selectCourse: SelectCourse): Observable<void> {
        return this.http.put<void>(this.baseUrl + '/setScore/' + id, selectCourse);
    }

    public exportScoreByKlassIdAndCourseId(klassId, courseId) {
        return this.http
            .get(this.baseUrl + '/exportScoreByKlassIdAndCourseId/' + klassId + '/' + courseId, {
                responseType: 'blob',
            });
    }

    public exportAllStudentScore() {
        return this.http
            .get(this.baseUrl + '/exportAllStudentScore', {
                responseType: 'blob',
            });
    }

    public getByKlass(klass): Observable<Array<SelectCourse>> {
        return this.http.get<Array<SelectCourse>>(this.baseUrl + '/getByKlassId/' + klass.id);
    }



    public getCoursesByKlassId(klassId: number): Observable<Array<Course>> {
        return this.http.get<Array<Course>>(this.baseUrl + '/getCoursesByKlassId/' + klassId);
    }
}
