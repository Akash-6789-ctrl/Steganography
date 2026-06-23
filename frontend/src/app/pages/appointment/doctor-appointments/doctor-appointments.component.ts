import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-doctor-appointments",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./doctor-appointments.component.html",
})
export class DoctorAppointmentsComponent {
  appointments: any[] = [];

  constructor(
    private http: HttpClient,
    private auth: AuthService, // ✅ FIXED
  ) {}

  ngOnInit() {
    const user = this.auth.getUser();

    console.log("USER FROM STORAGE =", user);

    const doctorId = user?.doctorId;

    if (!doctorId) {
      console.error("Doctor ID not found in user object");
      return;
    }

    this.loadAppointments(doctorId);
  }

  loadAppointments(id: number) {
    this.http
      .get(`http://https://steganography-backend-mtqy.onrender.com/appointments/doctor/${id}`)
      .subscribe((res: any) => (this.appointments = res));
  }

 approve(id: number) {
  this.http
    .put(`https://steganography-backend-mtqy.onrender.com/appointments/approve/${id}`, {})
    .subscribe(() => this.ngOnInit());
}

reject(id: number) {
  this.http
    ..put(`https://steganography-backend-mtqy.onrender.com/appointments/${id}/reject`, {})
    .subscribe(() => this.ngOnInit());
}
}
