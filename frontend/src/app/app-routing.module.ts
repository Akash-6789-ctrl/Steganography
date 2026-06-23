import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from "./pages/login-page/login-page.component";
import { RegisterPageComponent } from "./pages/register-page/register-page.component";
import { AdminDashboardComponent } from "./pages/admin-dashboard/admin-dashboard.component";
import { DoctorDashboardComponent } from "./pages/Doctor/doctor-dashboard/doctor-dashboard.component";
import { PatientDashboardComponent } from "./pages/Patient/add-patient/patient-dashboard/patient-dashboard.component";
import { UploadReportPageComponent } from "./pages/Reports/upload-report-page/upload-report-page.component";
import { DecryptReportPageComponent } from "./pages/Reports/decrypt-report-page/decrypt-report-page.component";
import { ViewReportsPageComponent } from "./pages/Reports/view-reports-page/view-reports-page.component";
import { AuthGuard } from "./guards/auth.guard";
import { RoleGuard } from "./guards/role.guard";
import { DoctorListComponent } from "./pages/Doctor/doctor-list/doctor-list.component";
import { DoctorAddComponent } from "./pages/Doctor/doctor-add/doctor-add.component";
import { DoctorEditComponent } from "./pages/Doctor/doctor-edit/doctor-edit.component";
import { PatientListComponent } from "./pages/Patient/add-patient/patient-list/patient-list.component";
import { AddPatientComponent } from "./pages/Patient/add-patient/add-patient.component";
import { EditPatientComponent } from "./pages/Patient/add-patient/edit-patient/edit-patient.component";
import { PatientAppointmentsComponent } from "./pages/patient-appointments/patient-appointments.component";
import { DoctorAppointmentsComponent } from "./pages/appointment/doctor-appointments/doctor-appointments.component";
import { BookAppointmentComponent } from "./pages/appointment/book-appointment/book-appointment.component";
import { HomeComponent } from "./pages/home/home.component";
import { PendingDoctorsComponent } from "./pages/pending-doctors/pending-doctors.component";
import { AboutComponent } from "./pages/about/about.component";
import { ContactComponent } from "./pages/contact/contact.component";
import { ClinicComponent } from "./pages/clinics/clinics.component";
import { VideoConsultComponent } from "./components/video-consult-component/video-consult-component.component";

const routes: Routes = [
  { path: "login", component: LoginPageComponent },
  { path: "register", component: RegisterPageComponent },
  {
    path: "admin",
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["ADMIN"] },
  },
  {
    path: "doctor",
    component: DoctorDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["DOCTOR"] },
  },
  {
    path: "doctor/upload",
    component: UploadReportPageComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["DOCTOR"] },
  },
  {
    path: "patient",
    component: PatientDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["PATIENT"] },
  },
  {
    path: "patient/reports",
    component: ViewReportsPageComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["PATIENT"] },
  },
  {
    path: "patient/decrypt",
    component: DecryptReportPageComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["PATIENT"] },
  },
  {
    path: "doctors",
    component: DoctorListComponent,
  },
  {
    path: "doctor/add",
    component: DoctorAddComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["ADMIN"] },
  },
  {
    path: "doctors/edit/:id",
    component: DoctorEditComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["ADMIN"] },
  },
  {
    path: "patients",
    component: PatientListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["ADMIN"] },
  },
  {
    path: "patients/add",
    component: AddPatientComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["ADMIN"] },
  },
  {
    path: "patients/edit/:id",
    component: EditPatientComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["ADMIN"] },
  },
  {
    path: "patient-appointments",
    loadComponent: () =>
      import("./pages/patient-appointments/patient-appointments.component").then(
        (m) => m.PatientAppointmentsComponent,
      ),
  },
  { path: "doctor-appointments", component: DoctorAppointmentsComponent },
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "about",
    component: AboutComponent,
  },
  {
    path: "contact",
    component: ContactComponent,
  },
  {
    path: "support",
    loadComponent: () =>
      import("./pages/support/support.component").then(
        (m) => m.SupportComponent,
      ),
  },
  {
    path: "privacy-policy",
    loadComponent: () =>
      import("./pages/privacy-policy/privacy-policy.component").then(
        (m) => m.PrivacyPolicyComponent,
      ),
  },
  {
    path: "clinics",
    component: ClinicComponent,
  },
  {
  path: "book-appointment",
  component: BookAppointmentComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: { roles: ["PATIENT"] },
},
{
  path: "video-consult",
  component: VideoConsultComponent,
  canActivate: [AuthGuard, RoleGuard],
  data: { roles: ["PATIENT"] },
},
{
  path: "patient-appointments",
  loadComponent: () =>
    import("./pages/patient-appointments/patient-appointments.component").then(
      (m) => m.PatientAppointmentsComponent
    ),
  canActivate: [AuthGuard, RoleGuard],
  data: { roles: ["PATIENT"] },
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
