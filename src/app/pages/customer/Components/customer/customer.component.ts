import { Component } from '@angular/core';
import * as data from './customer.data';
import { CommonService } from 'src/app/providers/core/common.service';
import { CustomerService } from 'src/app/providers/customers/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  apiLoader = false;
  showOrHide = false;
  pageSize = this.service.calculatePaginationVal();
  count = 0;
  currentPage = 0;
  searchQuery = '';

  constructor(private service: CommonService, private customerService: CustomerService) { }
  ngOnInit() {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.showOrHide = false;
    this.apiLoader = true;
    let query = `?pageSize=${this.pageSize}&page=${isNaN(this.currentPage) ? 1 : this.currentPage + 1}`
    this.customerService.getCustomers(this.searchQuery).subscribe({
      next: (res) => {
        console.log('35-----', res.data);
        !res.data.length && (this.showOrHide = true);
        this.apiLoader = false;
        this.count = res.totalCount;
        console.log("38------", this.tableValues);
        this.tableValues = res.data;
      }, error: (err) => {
        this.apiLoader = false;
      },
      complete: () => {
      }
    })
  }

  pagination(event: any): void {
    this.currentPage = event;
    this.getAllCustomers();
  }

  newCustomer() {

  }
  searchBox(event: any) {

  }

}
