import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: '',
        children: [
          {
            path: 'lead',
            loadChildren: () =>
              import('./pages/sales/sales.module').then(m => m.SalesModule),
          },
          {
            path: 'attendence',
            loadChildren: () =>
              import('./pages/attendence/attendence.module').then(m => m.AttendenceModule),
          },
          {
            path: 'tasks',
            loadChildren: () =>
              import('./pages/tasks/tasks.module').then(m => m.TasksModule),
          },
          {
            path: 'feedback',
            loadChildren: () =>
              import('./pages/feedback/feedback.module').then(m => m.FeedbackModule),
          },
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
