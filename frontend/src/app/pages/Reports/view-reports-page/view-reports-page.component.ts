import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-view-reports-page',
  templateUrl: './view-reports-page.component.html'
})
export class ViewReportsPageComponent {
  reports: any[] = [];
  message = '';

  constructor(private api: ApiService, private auth: AuthService) {
    this.loadReports();
  }

  loadReports() {
    const user = this.auth.getUser();
    if (!user || user.role !== 'PATIENT') {
      this.message = 'Please login as Patient.';
      return;
    }
    this.api.getPatientReports(user.id).subscribe({
      next: (res) => {
        this.reports = res;
        this.message = this.reports.length ? '' : 'No reports found.';
      },
      error: () => this.message = 'Failed to load reports.'
    });
  }
}