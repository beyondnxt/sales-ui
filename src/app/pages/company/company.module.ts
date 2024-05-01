import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './components/company/company.component';
import { SharedModule } from 'src/app/shared/modules/modules/shared.module';
import { AddCompanyComponent } from './components/add-company/add-company.component';


@NgModule({
  declarations: [
    CompanyComponent,
    AddCompanyComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    SharedModule
  ]
})
export class CompanyModule { }
