import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import Notification from '../../models/Notification';

@Injectable()
export class NotificationService extends BaseService {
  public url = '/api/v1/notifications';
  public model = Notification;

}
