import { Component } from '@angular/core';
import * as data from './customer.data';
import { CommonService } from 'src/app/providers/core/common.service';
import { CustomerService } from 'src/app/providers/customers/customer.service';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';

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
  isDeleteEnabled = true;
  isWriteEnabled = true;

  constructor(private service: CommonService, private customerService: CustomerService, private dialog: MatDialog) { }
  ngOnInit() {
    this.getAllCustomers();
  }

  getAllCustomers() {
    this.showOrHide = false;
    this.apiLoader = true;
    let query = `?pageSize=${this.pageSize}&page=${isNaN(this.currentPage) ? 1 : this.currentPage + 1}`
    this.customerService.getCustomers(this.searchQuery, query).subscribe({
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

  pagination(event: any): void {
    this.currentPage = event;
    this.getAllCustomers();
  }

  newCustomer() {
    this.dialog.open(AddCustomerComponent, {
      width: '700px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'user-dialog-container',
    }).afterClosed().subscribe((res: any) => {
      if (res) {
        this.createNewCustomer(res);
      }
    });
  }

  createNewCustomer(payload: any){
    console.log('phone------', payload);
    this.customerService.newCustomerCreation(payload).subscribe({
      next: (res) => {
        this.service.showSnackbar("Customer Created Successfully");
        this.getAllCustomers();
      }, error: (err) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {
      }
    })
  }

  searchBox(event: any) {
    this.searchQuery = `&name=${event}`;
    (event) && (this.currentPage = 0);
    this.currentPage = 0;
    this.getAllCustomers();
  }

  edit(data: any){
    this.dialog.open(AddCustomerComponent, {
      width: '700px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'user-dialog-container',
      data:data,
    }).afterClosed().subscribe((result: any[]) => {
      if (result && result.length === 2) {
        const customerDetails = result[0];
        const customerId = result[1];
        this.editCustomer(customerDetails, customerId);
      }
    });
  }

  editCustomer(customerDetails: any, customerId: any){
    this.customerService.updateCustomer(customerId, customerDetails).subscribe({
      next: (res) => {
        this.service.showSnackbar("Customer Updated Successfully");
        this.getAllCustomers();
      }, error: (err) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {
      }
    })
  }

  delete(data: any) {
    this.dialog.open(DeleteComponent, {
      width: '500px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'delete-dialog-container',
      data: data,
    }).afterClosed().subscribe((res: any) => {
      if (res) {
        this.deleteCustomer(res);
      }
    });
  }

  deleteCustomer(id: any) {
    this.customerService.deleteCustomer(id).subscribe({
      next: (res) => {
        this.service.showSnackbar("Customer Deleted Successfully");
        this.getAllCustomers();
      }, error: (err) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {
      }
    })
  }

}
