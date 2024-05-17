import { Component } from '@angular/core';
import * as data from './../product-data';
import { AddProductComponent } from '../add-product/add-product.component';
import { MatDialog } from '@angular/material/dialog';
import { RolesService } from 'src/app/providers/roles/roles.service';
import { HelperFunctionService } from 'src/app/shared/utils/helper/helper-function.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  userMenuPermissions: any;
  isDeleteEnabled = true;
  isWriteEnabled = true;
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  constructor(
    private dialog: MatDialog,
    private _roleApiService: RolesService,
    private _helperFunctionService: HelperFunctionService
  ) {}

  ngOnInit(): void {
    this.triggerRoleAPI();
  }

  addProduct() {
    this.dialog
      .open(AddProductComponent, {
        width: '500px',
        height: 'max-content',
        disableClose: true,
        panelClass: 'user-dialog-container',
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
        }
      });
  }

  triggerRoleAPI() {
    // Role API
    let roleId: any = localStorage.getItem('role_id');
    this._roleApiService.getRoleById(roleId).subscribe({
      next: (res) => {
        this.userMenuPermissions =
          this._helperFunctionService.getMenuPermissions(
            res.menuAccess,
            'product'
          );
        this.isDeleteEnabled = this.userMenuPermissions.permissions.delete;
        this.isWriteEnabled = this.userMenuPermissions.permissions.write;
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
}
