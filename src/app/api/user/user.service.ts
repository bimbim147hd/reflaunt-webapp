import { Injectable } from '@angular/core';
import { catchError, tap, map } from 'rxjs/operators';
import User from '../../models/User';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import PaymentAccount from '../../models/PaymentAccount';
import Loader from '@vicoders/support/services/Loader';
import Address from '../../models/Address';
import Voucher from '../../models/Voucher';

@Injectable()
export class UserService extends BaseService {
  public url = '/api/v1/users';
  public addressUrl = '/api/v1/addresses';
  public voucherUrl = '/api/v1/vouchers';
  public model = User;

  profile(params: {}): Observable<any> {
    const meUrl = '/api/v1/me';
    return this.http
      .get(this.apiUrl.getApiUrl(meUrl) + '/profile', { params })
      .pipe(
        map(result => new User((result as any).data)),
        catchError(error => {
          throw error;
        })
      );
  }

  changeStatus(id, params): Observable<any> {
    return this.http
      .put(`${this.apiUrl.getApiUrl(this.url)}/${id}/status`, params)
      .pipe(
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
    return this.http
      .delete(
        this.apiUrl.getApiUrl(this.url) + `/${data.userId}/role/${data.roleId}`
      )
      .pipe(
        tap(result => {}),
        catchError(error => {
          throw error;
        })
      );
  }

  saveRoleUser(userId, roles): Observable<any> {
    return this.http
      .put(this.apiUrl.getApiUrl(this.url) + `/${userId}/roles`, roles)
      .pipe(
        tap(result => {}),
        catchError(error => {
          throw error;
        })
      );
  }

  getBankAccount(id): Observable<any> {
    Loader.show();
    return this.http
      .get(this.apiUrl.getApiUrl(this.url) + '/' + id + '/payment-account')
      .pipe(
        tap(result => {
          Loader.hide();
        }),
        map(result => {
          return new PaymentAccount((result as any).data);
        }),
        catchError(error => {
          Loader.hide();
          throw error;
        })
      );
  }

  createAccountPayment(userId, data): Observable<any> {
    Loader.show();
    return this.http
      .post(
        this.apiUrl.getApiUrl(this.url) + `/${userId}/payment-account`,
        data
      )
      .pipe(
        tap(result => {
          Loader.hide();
        }),
        map(result => new PaymentAccount((result as any).data)),
        catchError(error => {
          Loader.hide();

          throw error;
        })
      );
  }

  updateAccountPayment(userId, data): Observable<any> {
    Loader.show();
    return this.http
      .put(this.apiUrl.getApiUrl(this.url) + `/${userId}/payment-account`, data)
      .pipe(
        tap(result => {
          Loader.hide();
        }),
        map(result => new PaymentAccount((result as any).data)),
        catchError(error => {
          Loader.hide();

          throw error;
        })
      );
  }

  getDefaultAddress(id): Observable<any> {
    Loader.show();
    return this.http
      .get(this.apiUrl.getApiUrl(this.url) + '/' + id + '/default-address')
      .pipe(
        tap(result => {
          Loader.hide();
        }),
        map(result => new Address((result as any).data)),
        catchError(error => {
          Loader.hide();
          throw error;
        })
      );
  }

  saveAddress(data): Observable<any> {
    Loader.show();
    return this.http
      .post(this.apiUrl.getApiUrl(this.addressUrl) + `/me/save`, data)
      .pipe(
        tap(result => {
          Loader.hide();
        }),
        map(result => new Address((result as any).data)),
        catchError(error => {
          Loader.hide();

          throw error;
        })
      );
  }

  getVouchers(data): Observable<any> {
    Loader.show();
    return this.http
      .post(this.apiUrl.getApiUrl(this.voucherUrl), data)
      .pipe(
        tap(result => {
          Loader.hide();
        }),
        map(result => new Voucher((result as any).data)),
        catchError(error => {
          Loader.hide();

          throw error;
        })
      );
  }
}
