import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppointmentService {
  private apiUrl =
    "http://https://steganography-backend-mtqy.onrender.com/appointments";

  constructor(private http: HttpClient) {}

  // Book Appointment
  bookAppointment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/book`, data);
  }

  // Get Appointments By Patient
  getAppointmentsByPatient(patientId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/patient/${patientId}`);
  }

  // Get Appointments By Doctor
  getAppointmentsByDoctor(doctorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctor/${doctorId}`);
  }

  // Approve Appointment
  approveAppointment(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/approve`, {});
  }

  // Reject Appointment
  rejectAppointment(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/reject`, {});
  }

  // Cancel Appointment
  cancelAppointment(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/cancel`, {});
  }

  deleteAppointment(id: number) {
    return this.http.delete(
      `http://https://steganography-backend-mtqy.onrender.com/appointments/${id}`,
    );
  }
}
