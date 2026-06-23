import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService, UserRole } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const roles = (route.data['roles'] as UserRole[] | undefined) ?? [];
    const user = this.auth.getUser();
    if (!user) return this.router.parseUrl('/login');
    if (roles.length === 0) return true;
    if (roles.includes(user.role)) return true;
    return this.router.parseUrl(this.auth.routeForRole(user.role));
  }
}

