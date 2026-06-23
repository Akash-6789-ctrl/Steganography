import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pending-doctors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pending-doctors.component.html'
})
export class PendingDoctorsComponent implements OnInit {

  pendingDoctors: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
  this.http.get<any[]>(
    'http://localhost:8080/api/admin/pending-doctors'
  ).subscribe({
    next: (data) => {
      console.log('Doctors:', data);
      this.pendingDoctors = data;
    },
    error: (err) => {
      console.log('ERROR:', err);
    }
  });
}

  approve(id: number) {
    this.http.put(
      `http://localhost:8080/api/admin/approve-doctor/${id}`,
      {}
    ).subscribe(() => {
      this.loadDoctors();
    });
  }
}