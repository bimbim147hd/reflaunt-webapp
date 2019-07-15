import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import Notification from '../../models/Notification';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import Loader from '@vicoders/support/services/Loader';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable()
export class NotificationService extends BaseService {
  public url = '/api/v1/notifications';
  public model = Notification;
  private socket = io(environment.apiUrl, {
    transports: ['websocket', 'polling', 'flashsocket']
  });

  newNotificationReceived() {
    const observable = new Observable<any>(observer => {
      this.socket.on('rf_return_notification', data => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });

    return observable;
  }

  getNoUnreadNotification(): Observable<any> {
    Loader.show();
    return this.http
      .get(this.apiUrl.getApiUrl(`${this.url}/unread/count`))
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

  getMaskAsNotification(data): Observable<any> {
    Loader.show();
    return this.http
      .post(this.apiUrl.getApiUrl(this.url) + '/unread/mask-as-read', {
        ids: data
      })
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
