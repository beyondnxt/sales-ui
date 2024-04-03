import { Component } from '@angular/core';
import * as data from './user.data';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { UsersService } from 'src/app/providers/admin/admin.service';
import { UserHelper } from './user.helper';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserHelper]
})
export class UserComponent {
  constructor(private dialog: MatDialog, private adminService: UsersService, private userHelper: UserHelper) { }
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  ngOnInit() {
    // this.getUser();
  }
  addUser() {
    this.dialog.open(AddUserComponent, {
      width: '500px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'user-dialog-container',
    }).afterClosed().subscribe((res: any) => {
      if (res) {
        console.log(res)
        this.postUser(res);
      }
    });
  }
  postUser(payload: any) {
    this.adminService.postRegiter(payload).subscribe({
      next: (res) => {
      }, error: (err) => {
      },
      complete: () => {
      }
    })
  }
  updateUser(payload: any) {
    this.adminService.updateUser('', payload).subscribe({
      next: (res) => {
      }, error: (err) => {
      },
      complete: () => {
      }
    })
  }
  getUser() {
    this.adminService.getUsers('').subscribe({
      next: (res) => {
        console.log(res)
      }, error: (err) => {
      },
      complete: () => {
      }
    })
  }
  edit() {
    this.dialog.open(AddUserComponent, {
      width: '500px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'user-dialog-container',
    }).afterClosed().subscribe((res: any) => {
      if (res) {
        console.log(res)
        this.updateUser(res);
      }
    });
  }
  delete() {
    this.dialog.open(DeleteComponent, {
      width: '500px',
      height: 'max-content',
      disableClose: true,
      panelClass: 'delete-dialog-container',
    }).afterClosed().subscribe((res: any) => {
      if (res) {
      }
    });
  }

}

