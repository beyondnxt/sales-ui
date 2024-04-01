import { Component } from '@angular/core';
import * as data from './dashboard-data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
}
