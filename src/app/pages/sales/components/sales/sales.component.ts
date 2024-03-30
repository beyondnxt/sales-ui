import { Component } from '@angular/core';
import * as data from './sales-data';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent {
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
}
