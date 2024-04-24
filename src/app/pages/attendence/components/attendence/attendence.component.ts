import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as data from './attendence.data';
import { CommonService } from 'src/app/providers/core/common.service';
import { AttendanceService } from 'src/app/providers/attendance/attendance.service';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.scss']
})
export class AttendenceComponent {
  constructor(public router: Router,private service:CommonService, private attendance:AttendanceService) { }
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  openConsole() {
    this.router.navigate(['/attendence/attendence-console'])
  }
  addAttendence() {
  };

  ngOnInit(){
    this.getTodayAttendance();
  }

  getTodayAttendance(){
    this.attendance.getTodayAttendance().subscribe({
      next: (res) => {
        this.tableValues = res.data;
      }, error: (err) => {
      },
      complete: () => {
      }
    })
  }
}
