import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendenceComponent } from './components/attendence/attendence.component';
import { AttendenceConsoleComponent } from './components/attendence-console/attendence-console.component';
const routes: Routes = [
    {
        path: '',
        component:AttendenceComponent
      },
    {
        path: 'attendence-console',
        component:AttendenceConsoleComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendenceRoutingModule { }