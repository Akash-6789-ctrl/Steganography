import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DoctorService } from "src/app/services/doctor.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-doctor",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./doctor-add.component.html",
  styleUrls: ["./doctor-add.component.css"],
})
export class DoctorAddComponent {
  doctor = {
    name: "",
    email: "",
    specialization: "",
    qualification: "",
    experience: 0,
    availability: true,
  };

  constructor(
    private doctorService: DoctorService,
    private router: Router,
  ) {}

  saveDoctor(): void {
    this.doctorService.addDoctor(this.doctor).subscribe({
      next: () => {
        alert("Doctor added successfully");
        this.router.navigate(["/doctors"]);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
