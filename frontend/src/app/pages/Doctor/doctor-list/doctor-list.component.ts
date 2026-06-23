import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DoctorService } from "src/app/services/doctor.service";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-doctor-list",
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./doctor-list.component.html",
  styleUrls: ["./doctor-list.component.css"],
})
export class DoctorListComponent implements OnInit {
  doctors: any[] = [];

  constructor(
    private doctorService: DoctorService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.doctorService.getAllDoctors().subscribe({
      next: (data) => {
        console.log(data);
        this.doctors = data;
      },
      error: (error) => {
        console.error("Error fetching doctors", error);
      },
    });
  }

  deleteDoctor(id: number): void {
    if (!this.isAdmin()) {
      alert("Only admin can delete doctors.");
      return;
    }

    this.doctorService.deleteDoctor(id).subscribe({
      next: () => {
        this.loadDoctors();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  searchDoctors(query: string) {
    this.doctorService.searchDoctors(query).subscribe({
      next: (data) => {
        this.doctors = data;
      },
      error: (err) => {
        console.error("Error searching doctors", err);
      },
    });
  }

  isAdmin(): boolean {
    return this.auth.getUser()?.role === "ADMIN";
  }

  editDoctor(id: number) {
    if (!this.isAdmin()) {
      alert("Only admin can edit doctor details.");
      return;
    }

    this.router.navigate(["/doctors/edit", id]);
  }
}