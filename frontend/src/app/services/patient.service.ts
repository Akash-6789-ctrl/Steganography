import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = 'http://localhost:8080/api/patients';

  constructor(private http: HttpClient) {}

  // GET ALL
  getAllPatients(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // GET BY ID
  getPatientById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // CREATE
  addPatient(patient: any): Observable<any> {
    return this.http.post(this.apiUrl, patient);
  }

  // UPDATE
  updatePatient(id: number, patient: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, patient);
  }

  // DELETE
  deletePatient(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  
}