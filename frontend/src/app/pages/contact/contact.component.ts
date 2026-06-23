import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";

@Component({
  selector: "contact",
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: "./contact.component.html",
  styleUrl: "./contact.component.css",
})
export class ContactComponent {
  constructor(private http: HttpClient) {}

  contact = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  sendMessage() {
    this.http
      .post(
        "http://https://steganography-backend-mtqy.onrender.com/api/contact",
        this.contact,
      )
      .subscribe({
        next: () => {
          alert("Message sent successfully!");

          this.contact = {
            name: "",
            email: "",
            subject: "",
            message: "",
          };
        },

        error: (err) => {
          console.error(err);
          alert("Failed to send message");
        },
      });
  }
}
