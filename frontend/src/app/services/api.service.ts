import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/by-username/${encodeURIComponent(username)}`);
  }

  uploadReport(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/reports/upload`, formData);
  }

  getPatientReports(patientUserId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/reports/patient/${patientUserId}`);
  }

  decryptReport(reportId: number, secretKey: string): Observable<any> {
    const params = new URLSearchParams({ secretKey });
    return this.http.post(`${this.baseUrl}/reports/${reportId}/decrypt?${params.toString()}`, {});
  }
}

