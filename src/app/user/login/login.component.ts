import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      // transition('void <=> *', animate(500)),
      transition(':enter', animate(500)),
    ]),
    ]

})
export class LoginComponent implements OnInit {
  password: string;
  usernameOrEmail: string;
  showSignin = true;
  signup: SignUpRequest = new SignUpRequest();
  msg: string[];
  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  login() {
    this.msg = [];
    this.authService.login(this.usernameOrEmail, this.password).subscribe(user => {
      console.log('Logged in: ', user);
      this.router.navigate(['movies']);

      }, error => {
      console.log(error);
      this.msg.push('Wrong Credentials.');
    });
  }

  switch() {
    this.showSignin = !this.showSignin;
    this.msg = [];
  }

  signupuser() {
    console.log(this.signup);
    this.authService.signup(this.signup).subscribe(data => {
      console.log('Signed up msg: ', data);
      this.usernameOrEmail = this.signup.username;
      this.password = this.signup.password;
      this.login();
      this.password = '';
      this.usernameOrEmail = '';

    }, errorResponse => {
      console.log(errorResponse);
      this.msg = [];
      if (errorResponse.error.errors) {
        errorResponse.error.errors.forEach( e => this.msg.push(e.field + ' ' + e.defaultMessage));
      } else if (errorResponse.error.message) {
        this.msg.push(errorResponse.error.message);
      }
    });
  }

}

export class SignUpRequest {
  constructor(public name?: string, public username?: string, public password?: string, public email?: string) {}
}
