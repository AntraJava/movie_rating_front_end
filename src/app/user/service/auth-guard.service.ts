import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';
import {NotificationService} from '../../service/notification.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router, private notification: NotificationService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const token = this.auth.jwtHelper.tokenGetter();
    const tokenPayload = token ? decode(token) : {};
    console.log(tokenPayload);
    if (tokenPayload.role !== expectedRole) {
      this.notification.showError('Please log in with a proper role.');
    }
    if (!this.auth.isAuthenticated() || tokenPayload.role !== expectedRole) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
