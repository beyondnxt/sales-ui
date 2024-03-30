import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/user/user.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from 'src/app/shared/modules/modules/shared.module';



@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
