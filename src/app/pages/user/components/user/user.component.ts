import { Component } from '@angular/core';
import * as data from './user.data';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  constructor(private dialog: MatDialog) { }
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  addUser() {
    this.dialog.open(AddUserComponent, {
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

