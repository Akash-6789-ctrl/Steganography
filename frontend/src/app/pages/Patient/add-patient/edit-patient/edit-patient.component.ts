import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-edit-patient',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-patient.component.html'
})
export class EditPatientComponent implements OnInit {

  id!: number;

  patient: any = {
    username: '',
    fullName: '',
    password: '',
    medicalId: ''
  };

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.patientService.getPatientById(this.id).subscribe({
      next: (data) => {
        this.patient = {
          username: data.user.username,
          fullName: data.user.fullName,
          password: '',
          medicalId: data.medicalId
        };
      }
    });
  }

  updatePatient(): void {
    this.patientService.updatePatient(this.id, this.patient).subscribe({
      next: () => {
        alert('Patient updated successfully');
        this.router.navigate(['/patients']);
      }
    });
  }
}