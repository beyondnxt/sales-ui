import { Component } from '@angular/core';
import * as data from './role-data';
import { MatDialog } from '@angular/material/dialog';
import { AddRoleComponent } from '../add-role/add-role.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {
  constructor(private dialog: MatDialog) { }
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues
  addRole() {
    this.dialog.open(AddRoleComponent, {
      width: '500px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'user-dialog-container',
    }).afterClosed().subscribe((res: any) => {
      if (res) {
      }
    });
  }
}
