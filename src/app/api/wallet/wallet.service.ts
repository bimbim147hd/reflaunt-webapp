import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import Loader from '@vicoders/support/services/Loader';
import { tap, catchError, map } from 'rxjs/operators';
import * as _ from 'lodash';
import Wallet from '../../models/Wallet';
import Product from '../../models/Product';

@Injectable()
export class WalletService extends BaseService {
  public url = '/api/v1/wallets';
  public model = Wallet;

  getUserWallet(): Observable<any> {
    Loader.show();
    return this.http.get(this.apiUrl.getApiUrl(this.url) + '/user-wallet').pipe(
      tap(result => {
        Loader.hide();
      }),
      map(result => new this.model((result as any).data)),
      catchError(error => {
        Loader.hide();
        throw error;
      })
    );
  }

  getPendingProducts(): Observable<any> {
    Loader.show();
    return this.http
      .get(this.apiUrl.getApiUrl(this.url) + '/products?status=pending')
      .pipe(
        tap(result => {
          Loader.hide();
        }),
        map(result => _.map((result as any).data, item => new Product(item))),
        catchError(error => {
          Loader.hide();
          throw error;
        })
      );
  }

  getHistoryTransactions(): Observable<any> {
    Loader.show();
    return this.http.get(this.apiUrl.getApiUrl(this.url) + '/history').pipe(
      tap(result => {
        Loader.hide();
      }),
      map(result => _.map((result as any).data, item => new Product(item))),
      catchError(error => {
        Loader.hide();
        throw error;
      })
    );
  }
}
