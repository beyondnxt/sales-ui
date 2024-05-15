import { Component, ViewChild } from '@angular/core';
import * as data from './user.data';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { UsersService } from 'src/app/providers/admin/admin.service';
import { UserHelper } from './user.helper';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { CommonService } from 'src/app/providers/core/common.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserHelper]
})
export class UserComponent {
  pageCount: any;
  totalCount = 0;
  currentPage = 0;
  pageSize = this.service.calculatePaginationVal();
  showOrHide = false;
  searchQuery = '';
  constructor(private dialog: MatDialog, private adminService: UsersService, private userHelper: UserHelper, public service:CommonService) { }
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  apiLoader = false;
  count = 0;
  ngOnInit() {
    this.getUser();
  }
  addUser() {
    this.dialog.open(AddUserComponent, {
      width: '500px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'user-dialog-container',
    }).afterClosed().subscribe((res: any) => {
      if (res) {
        this.postUser(res);
      }
    });
  }
  postUser(payload: any) {
    this.adminService.postRegiter(payload).subscribe({
      next: (res) => {
        this.service.showSnackbar("User Created Successfully");
        this.getUser();
      }, error: (err) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {
      }
    })
  }
  updateUser(payload: any, id: any) {
    this.adminService.updateUser(id, payload).subscribe({
      next: (res) => {
        this.service.showSnackbar("User Updated Successfully");
        this.getUser();
      }, error: (err) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {
      }
    })
  }
  getUser() {
    this.showOrHide = false;
    this.apiLoader = true;
    let query = `?pageSize=${this.pageSize}&page=${isNaN(this.currentPage) ? 1 : this.currentPage + 1}`
    this.adminService.getUsers(query, this.searchQuery).subscribe({
      next: (res) => {
        !res.data.length && (this.showOrHide = true);
        this.apiLoader = false;
        this.tableValues = res.data;
        this.count = res.total;
      }, error: (err) => {
        this.apiLoader = false;
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {
      }
    })
  }
  edit(data: any) {
    this.dialog.open(AddUserComponent, {
      width: '500px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'user-dialog-container',
      data:data,
    }).afterClosed().subscribe((result: any[]) => {
      if (result && result.length === 2) {
        const userDetails = result[0];
        const dataId = result[1];
        this.updateUser(userDetails, dataId);
      }
    });
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
    this.adminService.deleteUser(id).subscribe({
      next: (res) => {
        this.service.showSnackbar("User Deleted Successfully");
        this.getUser();
      }, error: (err) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {
      }
    })
  }

  pagination(event: any): void {
    this.currentPage = event;
    this.getUser();
  }

  searchBox(event: any){
    console.log('133-----', event);
    this.searchQuery = `&firstName=${event}`;
    (event) && ( this.currentPage = 0);
    this.currentPage = 0;
    this.getUser();
  }
}

