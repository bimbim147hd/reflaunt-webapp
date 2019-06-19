import { ErrorHandler } from '@angular/core';
import Notification from '@vicoders/support/services/Notification';

export class AppErrorHandler implements ErrorHandler {
  handleError(error) {
    const message = (<Error>error).message;
    console.error(error);
    Notification.show('warning', message, 3000);
  }
}
