import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-sales-table',
  templateUrl: './sales-table.component.html',
  styleUrls: ['./sales-table.component.scss']
})
export class SalesTableComponent {
  @Output() openConsole = new EventEmitter();
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

  handlePageEvent(e: PageEvent) {
  }
  handleStatusColor(status: string) {
    switch (status) {
      case 'Present':
        return 'rgb(116 206 116)';
      case 'Absent':
        return 'rgb(255 89 89)';
      case 'Request':
        return 'rgb(111 119 228)';
      case 'Low':
        return 'rgb(228 21 21)';
      case 'High':
        return 'rgb(75 185 47 / 88%)';
      case 'Medium':
        return 'rgb(147 18 222 / 88%)';
      default:
        return '#000000';
    }
  }
}
