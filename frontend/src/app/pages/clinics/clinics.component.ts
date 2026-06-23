import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ClinicService } from "src/app/services/clinic.service";

@Component({
  selector: "clinics",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./clinics.component.html",
  styleUrl: "./clinics.component.css",
})
export class ClinicComponent implements OnInit {
  location = "";

  clinics: any[] = [];

  constructor(private clinicService: ClinicService) {}
  ngOnInit(): void {
    console.log("clinics component intialized");
  }

  search() {
    console.log("Searching for:", this.location);

    this.clinicService.search(this.location).subscribe({
      next: (data) => {
        console.log(data);
        this.clinics = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
