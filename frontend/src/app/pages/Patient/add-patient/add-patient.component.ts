import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-add-patient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-patient.component.html'
})
export class AddPatientComponent {

  patient = {
    username: '',
    password: '',
    fullName: '',
    medicalId: ''
  };

  constructor(
    private patientService: PatientService,
    private router: Router
  ) {}

  savePatient(): void {
    this.patientService.addPatient(this.patient).subscribe({
      next: () => {
        alert('Patient created successfully');
        this.router.navigate(['/patients']);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
}