import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../../services/api.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
})
export class LoginPageComponent {
  username = "";
  password = "";
  error = "";

  constructor(
    private api: ApiService,
    private router: Router,
    private auth: AuthService,
  ) {}

  onSubmit() {
    this.error = "";
    this.api
      .login({ username: this.username, password: this.password })
      .subscribe({
        next: (res) => {
          this.auth.setUser(res);

          console.log("LOGIN RESPONSE =", res);
          this.router.navigate([this.auth.routeForRole(res.role)]);
        },
        error: (err) => {
          if (err.status === 403) {
            this.error = "Doctor account is waiting for admin approval";
          } else {
            this.error = "Invalid username or password";
          }
        },
      });
  }
}
