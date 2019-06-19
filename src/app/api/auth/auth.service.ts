import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUrl } from '../api-url.service';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
  protected url = '/api';

  constructor(private http: HttpClient, private apiUrl: ApiUrl) {}

  login(data): Observable<any> {
    return this.http.post(this.apiUrl.getApiUrl(this.url) + '/login', data).pipe(
      tap(result => {}),
      catchError(error => {
        throw error;
      })
    );
  }

  /**
   * Register new account
   *
   * @param data New user information
   *
   * @result Object
   */

  register(data): Observable<any> {
    return this.http.post(this.apiUrl.getApiUrl(this.url) + '/register', data).pipe(
      tap(result => {}),
      catchError(error => {
        throw error;
      })
    );
  }

  create(data): Observable<any> {
    return this.http.post(this.apiUrl.getApiUrl(this.url) + '/register', data).pipe(
      tap(result => {}),
      catchError(error => {
        throw error;
      })
    );
  }

  resetPassword(data): Observable<any> {
    return this.http.post(this.apiUrl.getApiUrl(this.url) + '/reset-password', data).pipe(
      tap(result => {}),
      catchError(error => {
        throw error;
      })
    );
  }

  forgotPassword(data): Observable<any> {
    return this.http.post(this.apiUrl.getApiUrl(this.url) + '/forgot-password', data).pipe(
      tap(result => {}),
      catchError(error => {
        throw error;
      })
    );
  }

  updateAvatar(data): Observable<any> {
    return this.http.post(this.apiUrl.getApiUrl('/api/v1/me/images'), data).pipe(
      tap(result => {}),
      catchError(error => {
        throw error;
      })
    );
  }

  updateProfile(data): Observable<any> {
    return this.http.put(this.apiUrl.getApiUrl('/api/v1/me/profile'), data).pipe(
      tap(result => {}),
      catchError(error => {
        throw error;
      })
    );
  }

  checkPassword(data): Observable<any> {
    return this.http.put(this.apiUrl.getApiUrl('/api/v1/me/check-password'), data).pipe(
      tap(result => {}),
      catchError(error => {
        throw error;
      })
    );
  }

  changePassword(data): Observable<any> {
    return this.http.put(this.apiUrl.getApiUrl('/api/v1/me/password'), data).pipe(
      tap(result => {}),
      catchError(error => {
        throw error;
      })
    );
  }
}
