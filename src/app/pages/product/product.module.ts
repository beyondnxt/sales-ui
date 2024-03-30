import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { SharedModule } from 'src/app/shared/modules/modules/shared.module';
import { ProductRoutingModule } from './product-routing.module';



@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
