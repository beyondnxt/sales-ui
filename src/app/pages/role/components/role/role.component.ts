import { Component } from '@angular/core';
import * as data from './role-data';
import { MatDialog } from '@angular/material/dialog';
import { AddRoleComponent } from '../add-role/add-role.component';
import { RolesService } from 'src/app/providers/roles/roles.service';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { CommonService } from 'src/app/providers/core/common.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {
  pageCount: any;
  totalCount = 0;
  currentPage = 0;
  apiLoader = false;
  pageSize = this.service.calculatePaginationVal();
  showOrHide = false;
  searchQuery = '';
  constructor(private dialog: MatDialog, private roleService: RolesService, public service:CommonService) { }
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  count = 0;
  ngOnInit(){
    this.getRoles();
  }

  getRoles() {
    this.showOrHide = false;
    this.apiLoader = true;
    let query = `?pageSize=${this.pageSize}&page=${isNaN(this.currentPage) ? 1 : this.currentPage + 1}`
    this.roleService.getRole(query, this.searchQuery).subscribe({
      next: (res) => {
        !res.roles.length && (this.showOrHide = true);
        this.apiLoader = false;
        this.tableValues = res.roles;
        this.count = res.total;
      }, error: (err) => {
        this.apiLoader = false;
      },
      complete: () => {
      }
    })
  }

  addRole() {
    this.dialog.open(AddRoleComponent, {
      width: '500px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'user-dialog-container',
    }).afterClosed().subscribe((res: any) => {
      if (res) {
        this.createNewRole(res);
      }
    });
  }

  createNewRole(payload: any){
    this.roleService.postRoleData(payload).subscribe({
      next: (res) => {
        this.service.showSnackbar("Role Created Successfully");
        this.getRoles();
      }, error: (err) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {
      }
    })
  }

  edit(payload: any){
    console.log('payload----', payload);
    this.dialog.open(AddRoleComponent, {
      width: '500px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'user-dialog-container',
      data:payload,
    }).afterClosed().subscribe((res: any) => {
      if (res && res.length === 2) {
        const userDetails = res[0];
        const dataId = res[1];
        this.updateRole(userDetails, dataId);
      }
    });
  }

  updateRole(payload: any, id: any){
    this.roleService.updateRole(id, payload).subscribe({
      next: (res) => {
        this.service.showSnackbar("Role Updated Successfully");
        this.getRoles();
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
      data:data,
    }).afterClosed().subscribe((res: any) => {
      if (res) {
        this.deleteRole(res);
      }
    });
  }

  deleteRole(id: any){
    this.roleService.deleteRole(id).subscribe({
      next: (res) => {
        this.service.showSnackbar("Role Deleted Successfully");
        this.getRoles();
      }, error: (err) => {
        this.service.showSnackbar(err.error.message);
      },
      complete: () => {
      }
    })
  }
  pagination(event: any): void {
    this.currentPage = event;
    this.getRoles();
  }

  searchBox(event: any){
    this.searchQuery = `&role=${event}`;
    (event) && ( this.currentPage = 0);
    this.currentPage = 0;
    this.getRoles();
  }
}
