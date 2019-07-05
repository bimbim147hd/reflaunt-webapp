import { Injectable } from '@angular/core';
import { catchError, tap, map } from 'rxjs/operators';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import Loader from '@vicoders/support/services/Loader';
import Voucher from '../../models/Voucher';
import * as _ from 'lodash';

@Injectable()
export class VoucherService extends BaseService {
  public url = '/api/v1/vouchers';
  public model = Voucher;

  list(): Observable<any> {
    Loader.show();
    return this.http.get(this.apiUrl.getApiUrl(`${this.url}/list`)).pipe(
      tap(result => {
        Loader.hide();
      }),
      map(result => _.map((result as any).data, item => new this.model(item))),
      catchError(error => {
        Loader.hide();
        throw error;
      })
    );
  }

  getVouchers(data): Observable<any> {
    Loader.show();
    return this.http.post(this.apiUrl.getApiUrl(this.url), data).pipe(
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

  markAsRedeem(id): Observable<any> {
    Loader.show();
    return this.http
      .post(
        this.apiUrl.getApiUrl(this.url) + '/' + id + '/mark-as-redeemed',
        {}
      )
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
