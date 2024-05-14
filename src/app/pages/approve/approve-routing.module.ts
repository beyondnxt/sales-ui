import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveComponent } from './components/approve/approve.component';

const routes: Routes = [
  {
    path:'',
    component:ApproveComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApproveRoutingModule { }
