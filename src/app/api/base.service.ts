import { ApiUrl } from './api-url.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import * as _ from 'lodash';
import LengthAwarePaginator from '../models/LengthAwarePaginator';
import Loader from '@vicoders/support/services/Loader';
import { AppInjector } from '../app-injector';

export class BaseService {
  public url = '';
  public model;
  public http;
  public apiUrl;
  public preloader;

  constructor() {
    this.http = AppInjector.get(HttpClient);
    this.apiUrl = AppInjector.get(ApiUrl);
  }
  /**
   * Get list of all resource with pagination
   *
   * @param Object Optinal
   *
   * @return Observable
   */
  get(params: {}): Observable<any> {
    Loader.show();
    const queryParams = new HttpParams({ fromObject: params });
    return this.http.get(this.apiUrl.getApiUrl(this.url), { params: queryParams }).pipe(
      tap(result => {
        Loader.hide();
      }),
      map(result =>
        _.assign(
          {},
          {
            items: (result as any).data.map(item => new this.model(item)),
            pagination: new LengthAwarePaginator((result as any).meta.pagination)
          }
        )
      ),
      catchError(error => {
        Loader.hide();
        throw error;
      })
    );
  }

  /**
   * Get list of all resource
   *
   * @param Object Optional
   *
   * @return Observable
   */
  list(params = {}): Observable<any> {
    Loader.show();
    return this.http.post(this.apiUrl.getApiUrl(`${this.url}/list`), params).pipe(
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

  /**
   * Update resource by given id
   *
   * @param Int Resource ID
   * @param Object Resource Data
   *
   * @return Observable
   */
  update(id, data): Observable<any> {
    Loader.show();
    return this.http.put(this.apiUrl.getApiUrl(this.url) + '/' + id, data).pipe(
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

  /**
   * Delete resource by given id
   *
   * @param Int Resource ID
   *
   * @return Observable
   */
  delete(id): Observable<any> {
    Loader.show();
    return this.http.delete(this.apiUrl.getApiUrl(this.url) + '/' + id).pipe(
      tap(result => {
        Loader.hide();
      }),
      catchError(error => {
        Loader.hide();
        throw error;
      })
    );
  }

  create(data): Observable<any> {
    Loader.show();
    return this.http.post(this.apiUrl.getApiUrl(this.url), data).pipe(
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

  /**
   * Get resource by given id
   *
   * @param Int Resource ID
   * @param Object Optional
   *
   * @return Observable
   */
  show(id, params?): Observable<any> {
    Loader.show();
    params = params || {};
    const queryParams = new HttpParams({ fromObject: params });
    return this.http.get(this.apiUrl.getApiUrl(this.url) + '/' + id, { params: queryParams }).pipe(
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
