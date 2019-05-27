import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {NotificationService} from '../notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {


  constructor(private injector: Injector) {
  }

  handleError(error) {
    console.log(error);
    const notifier = this.injector.get(NotificationService);
    if (error instanceof HttpErrorResponse) {
      const status = error.status;
      notifier.showError('Error: ' + status);
    }
  }
}
