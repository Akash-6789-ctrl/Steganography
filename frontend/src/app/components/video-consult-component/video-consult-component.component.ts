import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-consult',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-consult-component.component.html',
  styleUrls: ['./video-consult-component.component.css']
})
export class VideoConsultComponent implements OnInit {

  doctors: any[] = [];

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors() {
    this.doctorService.getAllDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        console.log('Doctors loaded:', data);
      },
      error: (err) => {
        console.error('Error loading doctors', err);
      }
    });
  }

  requestVideoConsult(doctor: any) {
    alert(`Video consultation request sent to Dr. ${doctor.name}`);
  }
}