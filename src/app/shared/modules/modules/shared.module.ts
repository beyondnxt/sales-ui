import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModule } from './mat-module';
import { SideNavComponent } from '../../components/side-nav/side-nav.component';
import { BodyComponent } from '../../components/body/body.component';
import { LayoutComponent } from '../../components/layout/layout.component';
import { HeaderComponent } from '../../components/header/header.component';
import { LoginComponent } from '../../components/login/login.component';
import { SalesTableComponent } from '../../components/sales-table/sales-table.component';
import { SearchComponent } from '../../components/search/search.component';
import { SalesBtnComponent } from '../../components/sales-btn/sales-btn.component';
import { SalesCancelBtnComponent } from '../../components/sales-cancel-btn/sales-cancel-btn.component';
import { DeleteComponent } from '../../components/delete/delete.component';
import { TableLoaderComponent } from '../../components/table-loader/table-loader.component';



@NgModule({
  declarations: [
    SideNavComponent,
    BodyComponent,
    LayoutComponent,
    HeaderComponent,
    LoginComponent,
    SalesTableComponent,
    SearchComponent,
    SalesBtnComponent,
    SalesCancelBtnComponent,
    DeleteComponent,
    TableLoaderComponent
  ],
  imports: [
    CommonModule,
    MatModule,
  ],
  exports: [MatModule,SideNavComponent,BodyComponent,LayoutComponent,HeaderComponent, SalesTableComponent,SearchComponent, SalesBtnComponent, SalesCancelBtnComponent,DeleteComponent, TableLoaderComponent]
})
export class SharedModule { }
