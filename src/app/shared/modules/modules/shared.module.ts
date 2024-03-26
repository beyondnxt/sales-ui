import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from './mat-module';
import { SideNavComponent } from '../../components/side-nav/side-nav.component';
import { BodyComponent } from '../../components/body/body.component';
import { LayoutComponent } from '../../components/layout/layout.component';
import { HeaderComponent } from '../../components/header/header.component';
import { LoginComponent } from '../../components/login/login.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { SalesTableComponent } from '../../components/sales-table/sales-table.component';
import { SearchComponent } from '../../components/search/search.component';



@NgModule({
  declarations: [
    SideNavComponent,
    BodyComponent,
    LayoutComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    SalesTableComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    MatModule,
  ],
  exports: [MatModule,SideNavComponent,BodyComponent,LayoutComponent,HeaderComponent, DashboardComponent, SalesTableComponent,SearchComponent]
})
export class SharedModule { }
