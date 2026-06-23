import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { Component } from "@angular/core";

@Component({
  selector: "app-book-appointment",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./book-appointment.component.html",
})
export class BookAppointmentComponent {
  doctors: any[] = [];
  selectedDoctorId!: number;
  date!: string;
  reason!: string;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get("http://https://steganography-backend-mtqy.onrender.com/api/doctors")
      .subscribe((res: any) => (this.doctors = res));
  }

  book() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const body = {
      patientId: user.patientId, // 👈 FIXED
      doctorId: this.selectedDoctorId,
      appointmentDate: this.date,
      appointmentTime: "10:00:00",
      reason: this.reason,
    };

    console.log(body);

    this.http
      .post(
        "http://https://steganography-backend-mtqy.onrender.com/appointments/book",
        body,
      )
      .subscribe({
        next: () => alert("Appointment booked!"),
        error: (err) => console.log(err),
      });
  }
}
