import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.scss']
})
export class AttendenceComponent {
  constructor(public router: Router,) { }
  openConsole() {
    this.router.navigate(['/attendence/attendence-console'])
  }
}
