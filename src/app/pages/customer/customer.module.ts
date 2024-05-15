import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './Components/customer/customer.component';
import { SharedModule } from 'src/app/shared/modules/modules/shared.module';
import { AddCustomerComponent } from './Components/add-customer/add-customer.component';


@NgModule({
  declarations: [
    CustomerComponent,
    AddCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
  ]
})
export class CustomerModule { }
