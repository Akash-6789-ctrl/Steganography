import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { DoctorDashboardComponent } from './pages/Doctor/doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './pages/Patient/add-patient/patient-dashboard/patient-dashboard.component';
import { UploadReportPageComponent } from './pages/Reports/upload-report-page/upload-report-page.component';
import { DecryptReportPageComponent } from './pages/Reports/decrypt-report-page/decrypt-report-page.component';
import { ViewReportsPageComponent } from './pages/Reports/view-reports-page/view-reports-page.component';

import { FooterComponent } from "./layout/footer/footer.component";

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AdminDashboardComponent,
    DoctorDashboardComponent,
    PatientDashboardComponent,
    UploadReportPageComponent,
    DecryptReportPageComponent,
    ViewReportsPageComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    FooterComponent   // ⚠️ only if Footer is standalone
  ],

  providers: [
    provideAnimationsAsync()
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }