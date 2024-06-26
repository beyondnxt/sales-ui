import { Component } from '@angular/core';
import * as data from './role-data';
import { MatDialog } from '@angular/material/dialog';
import { AddRoleComponent } from '../add-role/add-role.component';
import { RolesService } from 'src/app/providers/roles/roles.service';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {
  constructor(private dialog: MatDialog, private roleService: RolesService) { }
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;

  ngOnInit(){
    this.getRoles();
  }

  getRoles() {
    this.roleService.getRole().subscribe({
      next: (res) => {
        console.log('roles----',res);
        this.tableValues = res.roles;
      }, error: (err) => {
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
        this.getRoles();
      }, error: (err) => {
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
      if (res) {
        // this.createNewRole(res);
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
        this.deleteRole(res);
      }
    });
  }

  deleteRole(id: any){
    this.roleService.deleteRole(id).subscribe({
      next: (res) => {
        this.getRoles();
      }, error: (err) => {
      },
      complete: () => {
      }
    })
  }
}
