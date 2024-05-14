import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApproveRoutingModule } from './approve-routing.module';
import { ApproveComponent } from './components/approve/approve.component';
import { SharedModule } from 'src/app/shared/modules/modules/shared.module';


@NgModule({
  declarations: [
    ApproveComponent
  ],
  imports: [
    CommonModule,
    ApproveRoutingModule,
    SharedModule
  ]
})
export class ApproveModule { }
