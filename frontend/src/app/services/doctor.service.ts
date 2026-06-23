import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DoctorService {
  private apiUrl =
    "http://https://steganography-backend-mtqy.onrender.com/api/doctors";

  constructor(private http: HttpClient) {}

  // Get all doctors
  getAllDoctors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get doctor by id
  getDoctorById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Add doctor
  addDoctor(doctor: any): Observable<any> {
    return this.http.post(this.apiUrl, doctor);
  }

  // Update doctor
  updateDoctor(id: number, doctor: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, doctor);
  }

  // Delete doctor
  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Search doctors
  searchDoctors(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?query=${query}`);
  }
}
