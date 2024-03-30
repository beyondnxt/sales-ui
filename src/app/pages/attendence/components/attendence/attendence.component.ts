import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as data from './attendence.data';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.scss']
})
export class AttendenceComponent {
  constructor(public router: Router,) { }
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  openConsole() {
    this.router.navigate(['/attendence/attendence-console'])
  }
  addAttendence() {
  };
}
