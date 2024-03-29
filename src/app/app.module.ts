import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/modules/modules/shared.module';
import { RouterModule } from '@angular/router';
import { AttendenceConsoleComponent } from './pages/attendence/components/attendence-console/attendence-console.component';
import { MapComponent } from './pages/attendence/components/map/map.component';

// AIzaSyCuXnZqJGysDofEjDDR3xwiee_00Ep31GA

@NgModule({
  declarations: [
    AppComponent,
    AttendenceConsoleComponent,
    MapComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    RouterModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
