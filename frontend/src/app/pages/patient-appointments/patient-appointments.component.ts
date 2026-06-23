import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-patient-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.css']
})
export class PatientAppointmentsComponent implements OnInit {

  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAppointmentsByPatient(4)
      .subscribe({
        next: (data) => {
          this.appointments = data;
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  cancelAppointment(id: number): void {
    this.appointmentService.cancelAppointment(id)
      .subscribe(() => {
        this.loadAppointments();
      });
  }
}