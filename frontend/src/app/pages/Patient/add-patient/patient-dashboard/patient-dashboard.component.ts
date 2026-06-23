import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html'
})
export class PatientDashboardComponent implements OnInit {

  notifications: any[] = [];

  appointments: any[] = [];

  constructor(
    private authService: AuthService,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {

    const user = this.authService.getUser();

    if (!user?.patientId) {
      return;
    }

    this.appointmentService
      .getAppointmentsByPatient(user.patientId)
      .subscribe({
        next: (data: any[]) => {

          this.appointments = data;

          data.forEach((a: any) => {

            const notificationKey =
              'appointment-notification-' + a.id;

            if (localStorage.getItem(notificationKey)) {
              return;
            }

            if (a.status === 'APPROVED') {

              this.notifications.push({
                id: a.id,
                message:
                  `Your appointment for "${a.reason}" with Dr. ${a.doctor.name} has been approved.`
              });
            }

            if (a.status === 'REJECTED') {

              this.notifications.push({
                id: a.id,
                message:
                  `Your appointment for "${a.reason}" with Dr. ${a.doctor.name} has been rejected.`
              });
            }
          });
        }
      });
  }

  dismissNotification(notification: any) {

    localStorage.setItem(
      'appointment-notification-' + notification.id,
      'read'
    );

    this.notifications =
      this.notifications.filter(
        n => n.id !== notification.id
      );
  }

  deleteAppointment(id: number): void {

  if (!confirm('Delete this appointment?')) {
    return;
  }

  this.appointmentService
    .deleteAppointment(id)
    .subscribe({
      next: () => {

        this.appointments =
          this.appointments.filter(
            a => a.id !== id
          );

      },
      error: err => {
        console.error(err);
      }
    });
}
}