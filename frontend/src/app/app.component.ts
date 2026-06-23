import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService, AuthUser } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {

  title = 'MediCare';

  showFooter = true;

  constructor(
    private router: Router,
    public auth: AuthService
  ) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {

        const hiddenRoutes = ['/login', '/register'];

        this.showFooter =
          !hiddenRoutes.includes(event.urlAfterRedirects);
      }
    });

  }

  get user(): AuthUser | null {
    return this.auth.getUser();
  }
}