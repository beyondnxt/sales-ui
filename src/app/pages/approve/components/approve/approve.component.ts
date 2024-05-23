import { Component, ViewChild } from '@angular/core';
import * as data from './approve.data';
import { CommonService } from 'src/app/providers/core/common.service';
import { ApproveService } from 'src/app/providers/approve/approve.service';
import { SalesTableComponent } from 'src/app/shared/components/sales-table/sales-table.component';

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
  currentPage = 0;
  pageSize = this.service.calculatePaginationVal();
  searchQuery = '';
  isDeleteEnabled = true;
  isWriteEnabled = true;
  selectedIds: any = [];

  constructor(private service:CommonService, private approveService: ApproveService) {}
  @ViewChild('childRef') saledData!: SalesTableComponent;
  
  ngOnInit() {
    this.approvelList();
  }

  approvelList() {
    this.selectedIds = [];
    console.log('1st----', this.selectedIds);
    this.showOrHide = false;
    this.apiLoader = true;
    let query = `&pageSize=${this.pageSize}&page=${isNaN(this.currentPage) ? 1 : this.currentPage + 1}`
    this.approveService.getAllPendingApprovalList(this.searchQuery, query).subscribe({
      next: (res) => {
        !res.data.length && (this.showOrHide = true);
        this.apiLoader = false;
        this.count = res.fetchedCount;
        this.tableValues = res.data;
      }, error: (err) => {
        this.apiLoader = false;
      },
      complete: () => {
      }
    })
  }
  approveAttendance() {
    console.log('ids------', this.selectedIds);
    this.approveService.approveAttendance(this.selectedIds).subscribe({
      next: (res) => {
        this.service.showSnackbar('Approved Successfully');
        this.approvelList();
      },
      error: (err: any) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {},
    });
  }
  rejectAttendance() {
    this.approveService.rejectAttendance(this.selectedIds).subscribe({
      next: (res) => {
        this.service.showSnackbar('Rejected Successfully');
        this.approvelList();
      },
      error: (err: any) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {},
    });
  }
  searchBox(event: any) {
    this.searchQuery = `&userName=${event}`;
    event && (this.currentPage = 0);
    this.currentPage = 0;
    this.approvelList();
  }

  selectAll(data: any) {
    data.forEach((item: any) => {
      const index = this.selectedIds.indexOf(item);
      index === -1
        ? this.selectedIds.push(item)
        : this.selectedIds.splice(index, 1);
    });
  }
  getIds(ids: any) {
    const index = this.selectedIds.indexOf(ids);
    index === -1
      ? this.selectedIds.push(ids)
      : this.selectedIds.splice(index, 1);

    if (this.selectedIds.length == this.saledData.tableValues.length) {
      this.saledData.isSelectAll = true;
    } else {
      this.saledData.isSelectAll = false;
    }
  }

  pagination(event: any): void {
    this.currentPage = event;
    this.approvelList();
  }

}
