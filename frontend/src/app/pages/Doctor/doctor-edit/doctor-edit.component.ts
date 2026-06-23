import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DoctorService } from "src/app/services/doctor.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-edit-doctor",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./doctor-edit.component.html",
  styleUrls: ["./doctor-edit.component.css"],
})
export class DoctorEditComponent implements OnInit {
  id!: number;

  doctor: any = {
    name: "",
    email: "",
    specialization: "",
    qualification: "",
    experience: 0,
    availability: true,
  };

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    // 1) Allow only admin
    const user = this.auth.getUser();

    if (!user || user.role !== "ADMIN") {
      alert("Access denied. Only admin can edit doctor details.");
      this.router.navigate(["/doctors"]);
      return;
    }

    // 2) Get doctor id from URL
    this.id = Number(this.route.snapshot.paramMap.get("id"));

    if (!this.id) {
      alert("Invalid doctor id");
      this.router.navigate(["/doctors"]);
      return;
    }

    // 3) Load doctor data
    this.doctorService.getDoctorById(this.id).subscribe({
      next: (data) => {
        this.doctor = data;
      },
      error: (err) => {
        console.error("Error loading doctor details", err);
        alert("Doctor details could not be loaded.");
        this.router.navigate(["/doctors"]);
      },
    });
  }

  updateDoctor(): void {
    // extra safety
    const user = this.auth.getUser();
    if (!user || user.role !== "ADMIN") {
      alert("Only admin can update doctor details.");
      this.router.navigate(["/doctors"]);
      return;
    }

    this.doctorService.updateDoctor(this.id, this.doctor).subscribe({
      next: () => {
        alert("Doctor details updated successfully.");
        this.router.navigate(["/doctors"]);
      },
      error: (err) => {
        console.error("Error updating doctor", err);
        alert("Failed to update doctor.");
      },
    });
  }
}