import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './components/role/role.component';
import { RoleRoutingModule } from './role-routing.module';
import { SharedModule } from 'src/app/shared/modules/modules/shared.module';



@NgModule({
  declarations: [
    RoleComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    SharedModule

  ]
})
export class RoleModule { }
