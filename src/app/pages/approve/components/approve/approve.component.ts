import { Component } from '@angular/core';
import * as data from './approve.data';
import { CommonService } from 'src/app/providers/core/common.service';
import { ApproveService } from 'src/app/providers/approve/approve.service';

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
  pageSize = this.service.calculatePaginationVal();
  currentPage = 0;
  searchQuery = '';

  constructor(private service: CommonService, private approveService: ApproveService) {}

  ngOnInit(){
    this.approve();
  }

  approve(){
    this.showOrHide = false;
    this.apiLoader = true;
    let query = `?pageSize=${this.pageSize}&page=${isNaN(this.currentPage) ? 1 : this.currentPage + 1}`
    this.approveService.getApprovalList(this.searchQuery, query).subscribe({
      next: (res) => {
        !res.data.length && (this.showOrHide = true);
        this.apiLoader = false;
        this.count = res.totalCount;
        this.tableValues = res.data;
      }, error: (err) => {
        this.apiLoader = false;
      },
      complete: () => {
      }
    })
  }
  reject(){

  }
  searchBox(event: any){

  }
}
