import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as data from './attendence.data';
import { CommonService } from 'src/app/providers/core/common.service';
import { AttendanceService } from 'src/app/providers/attendance/attendance.service';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.scss']
})
export class AttendenceComponent {
  constructor(private dialog: MatDialog, public router: Router,private service:CommonService, private attendance:AttendanceService) { }
  @ViewChild('fromDateInput') fromDateInput!: ElementRef<HTMLInputElement>;
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  date = '';
  count = 0;
  openConsole() {
    this.router.navigate(['/attendence/attendence-console'])
  }
  addAttendence() {
  };

  ngOnInit(){
    this.getTodayAttendance();
  }

  getTodayAttendance(){
    this.attendance.getTodayAttendance(this.date).subscribe({
      next: (res) => {
        console.log('29:::::', res.data);
        this.tableValues = res.data;
        this.count = res.total;
      }, error: (err) => {
      },
      complete: () => {
      }
    })
  }
  
  delete(data: any) {
    this.dialog.open(DeleteComponent, {
      width: '500px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'delete-dialog-container',
      data: data,
    }).afterClosed().subscribe((res: any) => {
      if (res) {
        this.deleteUser(res);
      }
    });
  }

  deleteUser(id: any){
    this.attendance.deleteAttendance(id).subscribe({
      next: (res) => {
        this.service.showSnackbar("Attendance Deleted Successfully");
        this.getTodayAttendance();
      }, error: (err) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {
      }
    })
  }
  edit(data: any){

  }

  onFromDateChange(event: any){
    this.date = this.dateFormat(event.value);
    this.getTodayAttendance();
  }

  dateFormat(date: any) {
    if (date != null) {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }
    else {
      return date;
    }
  }
}
