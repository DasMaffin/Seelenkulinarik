import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiServerUrl = 'http://www.seelenkulinarik.at:8080';

  constructor(private router: Router, private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiServerUrl}/user/getUserLogin/${username}/${password}`).pipe(
      map((result: boolean) => {
        if (username === 'admin' && result) {
          sessionStorage.setItem('username', username);
          return true;
        } else {
          return false;
        }
      }),
      catchError((error) => {
        console.error('Error fetching login result:', error);
        return of(false); // In case of an error, return false
      })
    );
  }

  logout(): void {
    sessionStorage.removeItem('username');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('username') !== null;
  }
}
