import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import { ApiUrl } from '../api-url.service';
import { Observable } from 'rxjs';
import { AppInjector } from '../../app-injector';

import { map } from 'rxjs/operators';

@Injectable()
export class FileService {
  private url = '/api/v1/upload';
  http: HttpClient;
  apiUrl: ApiUrl;

  constructor() {
    this.http = AppInjector.get(HttpClient);
    this.apiUrl = AppInjector.get(ApiUrl);
  }

  upload(params): Observable<any> {
    const formData: FormData = new FormData();
    // tslint:disable-next-line:forin
    for (const key in params) {
      formData.append(key, params[key]);
    }
    return this.http.post(this.apiUrl.getApiUrl(this.url), formData).pipe(map((response: Response) => response));
  }

  delete(params): Observable<any> {
    const formData: FormData = new FormData();
    // tslint:disable-next-line:forin
    for (const key in params) {
      formData.append(key, params[key]);
    }

    return this.http.post(this.apiUrl.getApiUrl(this.url), formData).pipe(map((response: Response) => response));
  }
}
