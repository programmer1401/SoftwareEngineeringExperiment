import { Component, OnInit } from '@angular/core';
import { SelectCourseService } from '@core/service/select-course.service';
import { saveAs } from 'file-saver';
import { NzMessageService } from 'ng-zorro-antd';


@Component({
  selector: 'app-studnet-score',
  templateUrl: './student-score.component.html',
  styles: []
})
export class StudentScoreComponent implements OnInit {

  constructor(private selectCourseService: SelectCourseService,
              private message: NzMessageService) { }

  ngOnInit() {
  }


    /**
     * 导出
     */
    exportAllStudentScore() {
        this.selectCourseService.exportAllStudentScore()
            .subscribe(data => {
                const blob = new Blob([data], {
                    type:
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
                });
                saveAs(blob,'成绩汇总' + '.xlsx');
            },() => {
                this.message.info("该年级没有学生");
            });
    }
}
