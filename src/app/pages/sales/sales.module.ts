import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/modules/modules/shared.module';
import { SalesComponent } from './components/sales/sales.component';
import { SalesRoutingModule } from './sales-routing.module';



@NgModule({
  declarations: [SalesComponent],
  imports: [
    CommonModule,
    SharedModule,
    SalesRoutingModule
  ]
})
export class SalesModule { }