import { Injectable } from '@angular/core';
import { catchError, tap, map } from 'rxjs/operators';
import User from '../../models/User';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';

@Injectable()
export class UserService extends BaseService {
  public url = '/api/users';
  public model = User;

  profile(params: {}): Observable<any> {
    const meUrl = '/api/me';
    return this.http.get(this.apiUrl.getApiUrl(meUrl), { params }).pipe(
      map(result => new User((result as any).data)),
      catchError(error => {
        throw error;
      })
    );
  }

  changeStatus(id, params): Observable<any> {
    return this.http.put(`${this.apiUrl.getApiUrl(this.url)}/${id}/status`, params).pipe(
      map(result => {
        return new User((result as any).data);
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  attachRoleToUser(userId, roleId): Observable<any> {
    return this.http
      .put(this.apiUrl.getApiUrl(this.url) + `/${userId}/role`, {
        role_id: roleId
      })
      .pipe(
        tap(result => {}),
        catchError(error => {
          throw error;
        })
      );
  }

  detachRoleFromUser(data): Observable<any> {
    return this.http.delete(this.apiUrl.getApiUrl(this.url) + `/${data.userId}/role/${data.roleId}`).pipe(
      tap(result => {}),
      catchError(error => {
        throw error;
      })
    );
  }

  saveRoleUser(userId, roles): Observable<any> {
    return this.http.put(this.apiUrl.getApiUrl(this.url) + `/${userId}/roles`, roles).pipe(
      tap(result => {}),
      catchError(error => {
        throw error;
      })
    );
  }
}
