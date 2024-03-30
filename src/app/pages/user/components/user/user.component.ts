import { Component } from '@angular/core';
import * as data from './user.data';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  addUser(){
  }
}
