import { Component } from '@angular/core';
import * as data from './approve.data';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss']
})
export class ApproveComponent {

  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  apiLoader = false;
  showOrHide = false;
  count = 0;

  approve(){

  }
  lateCheckin(){

  }
  earlyChecout(){

  }
  searchBox(event: any){

  }
}
