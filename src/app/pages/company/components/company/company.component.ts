import { Component } from '@angular/core';
import { CompanyService } from 'src/app/providers/company/company.service';
import * as data from './company.data';
import { CommonService } from 'src/app/providers/core/common.service';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent {
  companyList: any;
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  count = 0;
  searchQuery = '';
  pageSize = this.service.calculatePaginationVal();
  currentPage = 0;
  showOrHide = false;
  apiLoader = false;
  constructor(private dialog: MatDialog, private companyService: CompanyService, public service:CommonService) { }
  ngOnInit() {
    this.getAllCompany();
  }
  getAllCompany() {
    this.showOrHide = false;
    this.apiLoader = true;
    let query = `?pageSize=${this.pageSize}&page=${isNaN(this.currentPage) ? 1 : this.currentPage + 1}`
    this.companyService.getCompanyList(this.searchQuery, query).subscribe({
      next: (res) => {
        !res.company.length && (this.showOrHide = true);
        this.apiLoader = false;
        this.tableValues = res.company;
        this.count = res.total;
        // console.log(this.companyList);
      }, error: (err) => {
        this.apiLoader = false;
      },
      complete: () => {
      }
    })
  }
  searchBox(event: any){
    this.searchQuery = `&userName=${event}`;
    (event) && ( this.currentPage = 0);
    this.currentPage = 0;
    this.getAllCompany();
  }

  addCompany(){

  }
  pagination(event: any): void {
    this.currentPage = event;
    this.getAllCompany();
  }

  delete(data: any) {
    this.dialog.open(DeleteComponent, {
      width: '500px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'delete-dialog-container',
      data:data,
    }).afterClosed().subscribe((res: any) => {
      if (res) {
        this.deleteUser(res);
      }
    });
  }

  deleteUser(id: any){
    this.companyService.deleteCompany(id).subscribe({
      next: (res) => {
        this.service.showSnackbar("Company Deleted Successfully");
        this.getAllCompany();
      }, error: (err) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {
      }
    })
  }
  edit(data: any) {
    // this.dialog.open(AddUserComponent, {
    //   width: '500px',
    //   height: 'max-content',
    //   disableClose: true,
    //   panelClass: 'user-dialog-container',
    //   data:data,
    // }).afterClosed().subscribe((result: any[]) => {
    //   if (result && result.length === 2) {
    //     const userDetails = result[0];
    //     const dataId = result[1];
    //     this.updateUser(userDetails, dataId);
    //   }
    // });
  }
}
