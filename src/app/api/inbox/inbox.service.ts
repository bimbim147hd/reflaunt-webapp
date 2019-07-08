import { Injectable } from '@angular/core';
import { catchError, tap, map } from 'rxjs/operators';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import Loader from '@vicoders/support/services/Loader';
import * as _ from 'lodash';
import Message from '../../models/Message';

@Injectable()
export class InboxService extends BaseService {
  public url = '/api/v1/inbox';
  public model = Message;

  getMessageByMe(): Observable<any> {
    Loader.show();
    return this.http.get(this.apiUrl.getApiUrl(`${this.url}/me/messages`)).pipe(
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

  replyMessage(conversationId, data): Observable<any> {
    Loader.show();
    return this.http
      .post(
        this.apiUrl.getApiUrl(this.url) +
          '/conversations/' +
          conversationId +
          '/messages',
        data
      )
      .pipe(
        tap(result => {
          Loader.hide();
        }),
        map(result => new Message((result as any).data)),
        catchError(error => {
          Loader.hide();

          throw error;
        })
      );
  }
}
