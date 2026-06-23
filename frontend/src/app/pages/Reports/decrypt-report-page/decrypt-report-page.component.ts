import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-decrypt-report-page',
  templateUrl: './decrypt-report-page.component.html'
})
export class DecryptReportPageComponent {
  reportId!: number;
  secretKey = '';
  decryptedContent = '';
  message = '';

  constructor(private api: ApiService, private auth: AuthService) {}

  onSubmit() {
    if (!this.reportId || !this.secretKey) {
      this.message = 'Report ID and secret key are required.';
      return;
    }
    const user = this.auth.getUser();
    if (!user || user.role !== 'PATIENT') {
      this.message = 'Please login as Patient.';
      return;
    }
    this.api.decryptReport(this.reportId, this.secretKey).subscribe({
      next: (res) => {
        this.decryptedContent = res.content;
        this.message = 'Decryption successful.';
      },
      error: () => {
        this.message = 'Decryption failed. Check secret key.';
        this.decryptedContent = '';
      }
    });
  }
}