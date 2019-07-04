import { Injectable } from '@angular/core';
import { catchError, tap, map } from 'rxjs/operators';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import Loader from '@vicoders/support/services/Loader';
import Voucher from '../../models/Voucher';

@Injectable()
export class VoucherService extends BaseService {
  public url = '/api/v1/vouchers';
  public model = Voucher;

  getVouchers(data): Observable<any> {
    Loader.show();
    return this.http
      .post(this.apiUrl.getApiUrl(this.url), data)
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
