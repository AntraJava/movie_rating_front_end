import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../user/service/auth.service';
import {User} from '../../user/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private currentUser: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser);
  }

  getUsername() {
    return this.getUser() ? this.getUser().name : '';
  }
  getUserEmail() {
    return this.getUser() ? this.getUser().email : '';
  }
  getUser() {
    if (this.currentUser) {
      return this.currentUser;
    } else if ( this.authService.getCurrentUser() ) {
      this.currentUser = this.authService.getCurrentUser();
      return this.currentUser;
    }
  }

  logout() {
    this.authService.logout();
    this.currentUser = null;
    this.router.navigate(['login']);
  }
}
