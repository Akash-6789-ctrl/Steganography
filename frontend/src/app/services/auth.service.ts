import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export type UserRole = 'ADMIN' | 'DOCTOR' | 'PATIENT';

export interface AuthUser {
  id: number;
  username: string;
  fullName: string;
  role: UserRole;

  doctorId?: number;
  patientId?: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storageKey = 'user';

  constructor(private router: Router) {}

  setUser(user: AuthUser) {
    localStorage.setItem(this.storageKey, JSON.stringify(user));
  }

  getUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem(this.storageKey);
      if (!raw) return null;
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  hasRole(role: UserRole): boolean {
    const u = this.getUser();
    return !!u && u.role === role;
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
  }

  routeForRole(role: UserRole): string {
    if (role === 'ADMIN') return '/admin';
    if (role === 'DOCTOR') return '/doctor';
    return '/patient';
  }
}

