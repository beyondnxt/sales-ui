import { Component, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attendence-console',
  templateUrl: './attendence-console.component.html',
  styleUrls: ['./attendence-console.component.scss'],

})
export class AttendenceConsoleComponent {

  selectedUserId: any;
  constructor(private router: Router, private route: ActivatedRoute) {
    this.selectedUserId = this.router.getCurrentNavigation()?.extras?.state?.['data'];
  }
}
