import { Component } from '@angular/core';
import * as data from './../product-data';
import { AddProductComponent } from '../add-product/add-product.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  constructor(private dialog: MatDialog) { }
  tableHeaders = data.tableHeaders;
  tableValues = data.tableValues;
  addProduct(){
    this.dialog.open(AddProductComponent, {
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
