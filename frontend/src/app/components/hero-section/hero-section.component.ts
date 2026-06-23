import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent {
  searchText: string = "";

  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  onSearch() {
    const query = this.searchText.trim();

    if (query) {
      this.router.navigate(['/doctors'], {
        queryParams: { search: query }
      });
    } else {
      this.router.navigate(['/doctors']);
    }
  }

  goToBookAppointment() {
    const user = this.auth.getUser();

    if (!user) {
      alert('Please register or login as patient to book an appointment.');
      this.router.navigate(['/login']);
      return;
    }

    if (user.role !== 'PATIENT') {
      alert('Only patients can book appointments.');
      return;
    }

    this.router.navigate(['/book-appointment']);
  }

  goToVideoConsult() {
    const user = this.auth.getUser();

    if (!user) {
      alert('Please register or login as patient to use video consult.');
      this.router.navigate(['/login']);
      return;
    }

    if (user.role !== 'PATIENT') {
      alert('Only patients can use video consult.');
      return;
    }

    this.router.navigate(['/video-consult']);
  }
}