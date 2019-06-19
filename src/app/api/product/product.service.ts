import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import Product from '../../models/Product';
import { Observable } from 'rxjs';
import Loader from '@vicoders/support/services/Loader';
import { tap, catchError, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ProductService extends BaseService {
  public url = '/api/products';
  public model = Product;

  getProductBySlug(slug, params?): Observable<any> {
    Loader.show();
    params = params || {};
    const queryParams = new HttpParams({ fromObject: params });
    return this.http.get(this.apiUrl.getApiUrl(this.url) + '/slug/' + slug, { params: queryParams }).pipe(
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
}
