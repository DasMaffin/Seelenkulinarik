import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // TODO: read correct data from database
    if (username === 'admin' && password === 'admin') {
      sessionStorage.setItem('username', username);
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('username') !== null;
  }
}
