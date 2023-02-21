import {Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import decode from 'jwt-decode';
import {User} from '../User';
import {SignUpRequest} from '../login/login.component';
import {environment} from '../../../environments/environment';

@Injectable()
export class AuthService {
  private currentUser: User;
  baseUrl = environment.baseUrl;
  constructor(public jwtHelper: JwtHelperService, private http: HttpClient) {}
  // ...
  public isAuthenticated(): boolean {
    // const token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired();
  }

  login(username: string, password: string) {
    const body = new LoginRequest(username, password);
    return this.http.post<any>(this.baseUrl + '/api/auth/signin', body)
      .pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data && data.accessToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('accessToken', data.accessToken);
          // this.currentUserSubject.next(user);
          const tokenPayload = data.accessToken ? decode(data.accessToken) : {};
          // let propValue;
          // for ( const propName in tokenPayload) {
          //   propValue = tokenPayload[propName]
          //   console.log(propName,propValue);
          // }
          this.currentUser = new User(tokenPayload.sub, tokenPayload.username, tokenPayload.name,
            tokenPayload.email, tokenPayload.role, data.accessToken);
          return this.currentUser;
        }

        return null;
      }));
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.currentUser = null;
  }

  getCurrentUser() {
    if (this.currentUser) {
      return this.currentUser;
    } else if (!this.jwtHelper.isTokenExpired()) {
      const token = this.jwtHelper.tokenGetter();
      const tokenPayload = decode(token);
      this.currentUser = new User(tokenPayload.sub, tokenPayload.username, tokenPayload.name,
        tokenPayload.email, tokenPayload.role, token.toString());
      return this.currentUser;
    }
  }

  signup(signup: SignUpRequest) {
    const body = signup;
    return this.http.post<any>('http://localhost:8080/api/auth/signup', body)
      .pipe(map(data => {
        console.log(data);
        if (data && data.success) {
          return data;
        }
      }));
  }
}
export class LoginRequest {
  usernameOrEmail: string;
  password: string;

  constructor(usernameOrEmail: string, password: string) {
    this.usernameOrEmail = usernameOrEmail;
    this.password = password;
  }
}
