import { AuthStatus } from './../interfaces/auth-status';
import { Injectable, computed, inject, signal } from '@angular/core';
import { API } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private _currentUser = signal<any | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  private setAuthentication(user: any, token: string): boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('access_token', token);

    return true;
  }

  login(auth: any): Observable<boolean> {
    return this.http.post<any>(API + 'user/login', auth).pipe(
      map(({ user, access_token }) =>
        this.setAuthentication(user, access_token)
      ),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  checkAuthStatus(): Observable<boolean> {
    const token = this.getToken();

    if (!token) {
      this.logout();
      return of(false);
    }

    return this.http.get<any>(API + 'user/profile').pipe(
      map((user) => this.setAuthentication(user, token)),
      catchError(() => {
        this._authStatus.set(AuthStatus.notAuthenticated);
        return of(false);
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);
    this.router.navigate(['/login']);
  }
}
