import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
<<<<<<< HEAD
import { AuthGuardService } from './providers/auth-guard/auth-guard.service';
=======
import { AuthGuard } from './shared/guards/auth.guard.ts/auth.guard';
>>>>>>> 13bf8ba5c95a3954860b6e5b065c1c47ce2b8c92

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
        component: DashboardComponent,
<<<<<<< HEAD
        canActivate: [AuthGuardService]
=======
        canActivate:[AuthGuard]
>>>>>>> 13bf8ba5c95a3954860b6e5b065c1c47ce2b8c92
      },
      {
        path: '',
        children: [
          {
            path: 'role',
            loadChildren: () =>
              import('./pages/role/role.module').then(m => m.RoleModule),
            canActivate: [AuthGuardService]
          },
          {
            path: 'user',
            loadChildren: () =>
              import('./pages/user/user.module').then(m => m.UserModule),
            canActivate: [AuthGuardService]
          },
          {
            path: 'product',
            loadChildren: () =>
              import('./pages/product/product.module').then(m => m.ProductModule),
            canActivate: [AuthGuardService]
          },
          {
            path: 'lead',
            loadChildren: () =>
              import('./pages/sales/sales.module').then(m => m.SalesModule),
            canActivate: [AuthGuardService]
          },
          {
            path: 'attendence',
            loadChildren: () =>
              import('./pages/attendence/attendence.module').then(m => m.AttendenceModule),
            canActivate: [AuthGuardService]
          },
          {
            path: 'tasks',
            loadChildren: () =>
              import('./pages/tasks/tasks.module').then(m => m.TasksModule),
            canActivate: [AuthGuardService]
          },
          {
            path: 'feedback',
            loadChildren: () =>
              import('./pages/feedback/feedback.module').then(m => m.FeedbackModule),
            canActivate: [AuthGuardService]
          }, {
            path: 'company',
            loadChildren: () =>
              import('./pages/company/company.module').then(m => m.CompanyModule),
            canActivate: [AuthGuardService]
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
