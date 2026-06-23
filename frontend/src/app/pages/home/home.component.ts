import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DoctorCardsComponent } from "src/app/components/doctor-cards/doctor-cards.component";
import { HeroSectionComponent } from "src/app/components/hero-section/hero-section.component";
import { SpecialtyGridComponent } from "src/app/components/specialty-grid/specialty-grid.component";
import { TrustSectionComponent } from "src/app/components/trust-section/trust-section.component";
import { FooterComponent } from "src/app/layout/footer/footer.component";
import { NavbarComponent } from "src/app/layout/navbar/navbar.component";

@Component({
  selector: "home",
  standalone: true,
  imports: [
    NavbarComponent,
    HeroSectionComponent,
    SpecialtyGridComponent,
    DoctorCardsComponent,
    TrustSectionComponent,
    FooterComponent,
    FormsModule,
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  
}
