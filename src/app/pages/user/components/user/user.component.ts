import { Component, ViewChild } from '@angular/core';
import * as data from './user.data';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { UsersService } from 'src/app/providers/admin/admin.service';
import { UserHelper } from './user.helper';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { CommonService } from 'src/app/providers/core/common.service';
import { RolesService } from 'src/app/providers/roles/roles.service';
import { HelperFunctionService } from 'src/app/shared/utils/helper/helper-function.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserHelper],
})
export class UserComponent {
  pageCount: any;
  totalCount = 0;
  currentPage = 0;
  pageSize = this.service.calculatePaginationVal();
  showOrHide = false;
  searchQuery = '';
  excel: boolean = false;
  excelData: any;
  constructor(
    private dialog: MatDialog,
    private adminService: UsersService,
    private userHelper: UserHelper,
    public service: CommonService,
    private _roleApiService: RolesService,
    private _helperFunctionService: HelperFunctionService
  ) {}
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  apiLoader = false;
  count = 0;
  userMenuPermissions: any;
  isDeleteEnabled = true;
  isWriteEnabled = true;
  ngOnInit() {
    this.getUser();
    this.triggerRoleAPI();
  }
  addUser() {
    this.dialog
      .open(AddUserComponent, {
        width: '500px',
        height: 'max-content',
        disableClose: true,
        panelClass: 'user-dialog-container',
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.postUser(res);
        }
      });
  }
  postUser(payload: any) {
    this.adminService.postRegiter(payload).subscribe({
      next: (res) => {
        this.service.showSnackbar('User Created Successfully');
        this.getUser();
      },
      error: (err) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {},
    });
  }
  updateUser(payload: any, id: any) {
    this.adminService.updateUser(id, payload).subscribe({
      next: (res) => {
        this.service.showSnackbar('User Updated Successfully');
        this.getUser();
      },
      error: (err) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {},
    });
  }
  getUser() {
    console.log('current page from get user------', this.currentPage);
    this.showOrHide = false;
    this.apiLoader = true;
    let query = `?pageSize=${this.pageSize}&page=${
      isNaN(this.currentPage) ? 1 : this.currentPage + 1
    }`;
    this.adminService.getUsers(query, this.searchQuery).subscribe({
      next: (res) => {
        !res.data.length && (this.showOrHide = true);
        this.apiLoader = false;
        this.tableValues = res.data;
        this.count = res.total;
        if (this.excel) {
          this.excelData = this.userHelper.exportJsonToExcel(res.data);
          this.service.exportToExcel(this.excelData, 'users', 'Sheet1');
          this.excel=false;
        }
      },
      error: (err) => {
        this.apiLoader = false;
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {},
    });
  }

  edit(data: any) {
    this.dialog
      .open(AddUserComponent, {
        width: '500px',
        height: 'max-content',
        disableClose: true,
        panelClass: 'user-dialog-container',
        data: data,
      })
      .afterClosed()
      .subscribe((result: any[]) => {
        if (result && result.length === 2) {
          const userDetails = result[0];
          const dataId = result[1];
          this.updateUser(userDetails, dataId);
        }
      });
  }

  delete(data: any) {
    this.dialog
      .open(DeleteComponent, {
        width: '500px',
        height: 'max-content',
        disableClose: true,
        panelClass: 'delete-dialog-container',
        data: data,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.deleteUser(res);
        }
      });
  }

  deleteUser(id: any) {
    this.adminService.deleteUser(id).subscribe({
      next: (res) => {
        this.service.showSnackbar('User Deleted Successfully');
        this.getUser();
      },
      error: (err) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {},
    });
  }

  pagination(event: any): void {
    this.currentPage = event;
    console.log('currentPage from pagination-------', this.currentPage);
    this.getUser();
  }

  searchBox(event: any) {
    console.log('133-----', event);
    this.searchQuery = `&firstName=${event}`;
    event && (this.currentPage = 0);
    this.currentPage = 0;
    this.getUser();
  }

  triggerRoleAPI() {
    // Role API
    let roleId: any = localStorage.getItem('role_id');
    this._roleApiService.getRoleById(roleId).subscribe({
      next: (res) => {
        this.userMenuPermissions =
          this._helperFunctionService.getMenuPermissions(
            res.menuAccess,
            'users'
          );
        this.isDeleteEnabled = this.userMenuPermissions.permissions.delete;
        this.isWriteEnabled = this.userMenuPermissions.permissions.write;
        // console.log('this.isWriteEnabled ', this.isWriteEnabled );
        if (!this.isDeleteEnabled && !this.isWriteEnabled) {
          this.tableHeaders =
            this._helperFunctionService.removeTableHeaderByKey(
              this.tableHeaders,
              'action'
            );
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  exportAsExcel(){
    this.excel=true;
    this.getUser();
  }
}
