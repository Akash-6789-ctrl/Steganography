import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-upload-report-page',
  templateUrl: './upload-report-page.component.html'
})
export class UploadReportPageComponent {
  patientUsername = '';
  title = '';
  secretKey = '';
  file: File | null = null;
  message = '';

  constructor(private api: ApiService, private auth: AuthService) {}

  onFileSelected(event: any) {
    this.file = event.target.files[0] ?? null;
  }

  onSubmit() {
    if (!this.file || !this.patientUsername || !this.title || !this.secretKey) {
      this.message = 'All fields are required.';
      return;
    }
    const user = this.auth.getUser();
    if (!user || user.role !== 'DOCTOR') {
      this.message = 'Please login as Doctor.';
      return;
    }
    const doctorUserId = user.id;

    this.message = 'Finding patient...';
    this.api.getUserByUsername(this.patientUsername.trim()).subscribe({
      next: (patient) => {
        if (patient.role !== 'PATIENT') {
          this.message = 'That username is not a Patient account.';
          return;
        }

        const formData = new FormData();
        formData.append('patientUserId', String(patient.id));
        formData.append('doctorUserId', String(doctorUserId));
        formData.append('title', this.title);
        formData.append('secretKey', this.secretKey);
        formData.append('file', this.file as File);

        this.api.uploadReport(formData).subscribe({
          next: () => this.message = 'Report uploaded and encrypted successfully.',
          error: (err) => this.message = err?.error?.message || 'Upload failed.'
        });
      },
      error: () => {
        this.message = 'Patient username not found.';
      }
    });
  }
}