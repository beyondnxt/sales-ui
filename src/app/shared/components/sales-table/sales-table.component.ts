import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-sales-table',
  templateUrl: './sales-table.component.html',
  styleUrls: ['./sales-table.component.scss']
})
export class SalesTableComponent {
  @Output() openConsole = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() map = new EventEmitter();
  @Output() emitIds = new EventEmitter();
  @Output() checkBoxes = new EventEmitter();
  @Input() tableHeaders: any = [];
  @Input() tableValues: any = [];
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent: PageEvent | undefined;
  isSelectAll: boolean = false;
  handlePageEvent(e: PageEvent) {
  }
  handleStatusColor(status: string) {
    switch (status) {
      case 'new':
        return 'rgb(116 206 116)';
      case 'Unassigned':
        return 'rgb(255 89 89)';
      case 'Assigned':
        return 'rgb(111 119 228)';
      case 'Low':
        return 'rgb(228 21 21)';
      case 'Completed':
        return 'rgb(75 185 47 / 88%)';
      case 'verified':
        return 'rgb(147 18 222 / 88%)';
      default:
        return '#000000';
    }
  }
  selectAllValues(event: any){
    this.tableValues.forEach((obj: any) => {
      obj.checked = event.checked ? true : false;
    });
    // console.log(this.tableValues);
    const idArray = this.tableValues.map((item: any) => item.id);
    this.checkBoxes.emit(idArray);
  }
  onCheckboxChange(event: any, key: string, ids: string) {
    const index = this.tableValues.findIndex((item:any) => item.id === ids);
    if (index !== -1) {
      this.tableValues[index].checked = !this.tableValues[index].checked;
    }
    this.emitIds.emit(ids);
  }
}
