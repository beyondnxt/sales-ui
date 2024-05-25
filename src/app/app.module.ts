import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/modules/modules/shared.module';
import { RouterModule } from '@angular/router';
import { AttendenceConsoleComponent } from './pages/attendence/components/attendence-console/attendence-console.component';
import { MapComponent } from './pages/attendence/components/map/map.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { BarChartComponent } from './shared/components/bar-chart/bar-chart.component';
import { DashboardComponent } from './shared/components/dashboard/dashboard.component';
import { PieChartComponent } from './shared/components/pie-chart/pie-chart.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './providers/httpinterceptor/http-interceptor.service';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AttendenceConsoleComponent,
    MapComponent,
    BarChartComponent,
    DashboardComponent,
    PieChartComponent,
    
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    RouterModule,
    NgApexchartsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {
    let hostName: any = window.location.hostname;
    if (['117.221.69.35'].includes(hostName)) {
      environment.BASE_URL = 'http://117.221.69.35:8080';
    } else if (['localhost', '192.168.1.21'].includes(hostName)) {
      environment.BASE_URL = 'http://192.168.1.21:8080';
    }
  }
}
