import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import Product from '../../models/Product';
import { Observable } from 'rxjs';
import Loader from '@vicoders/support/services/Loader';
import { tap, catchError, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { HttpParams } from '@angular/common/http';
import Shipment from '../../models/Shipment';

@Injectable()
export class ShipmentService extends BaseService {
  public url = '/api/v1/shipments';
  public model = Shipment;

  sendShippingLabelToEmail(data): Observable<any> {
    Loader.show();
    return this.http
      .post(this.apiUrl.getApiUrl(this.url) + '/shipping-url', data)
      .pipe(
        tap(result => {
          Loader.hide();
        }),
        catchError(error => {
          Loader.hide();
          throw error;
        })
      );
  }
}
