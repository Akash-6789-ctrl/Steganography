import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';   // ✅ ADD THIS
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctor-cards',
  standalone: true,
  imports: [CommonModule],   // ✅ FIX HERE
  templateUrl: './doctor-cards.component.html',
  styleUrl: './doctor-cards.component.css'
})
export class DoctorCardsComponent implements OnInit {

  doctors: any[] = [];

  doctorImages: string[] = [
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400',
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400',
    'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400',
    'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400'
  ];

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.doctorService.getAllDoctors()
      .subscribe(data => {
        this.doctors = data;
      });
  }
}