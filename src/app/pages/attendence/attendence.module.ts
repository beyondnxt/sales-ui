import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendenceComponent } from './components/attendence/attendence.component';
import { SharedModule } from 'src/app/shared/modules/modules/shared.module';
import { AttendenceRoutingModule } from './attendence-routing.module';

@NgModule({
  declarations: [
    AttendenceComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AttendenceRoutingModule,
    
  ],
})
export class AttendenceModule { }
