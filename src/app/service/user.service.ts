import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../user/User';
import {environment} from '../../environments/environment';
import {UserResponse} from '../admin/admin.component';

export class UserAdminResponse {
  page: number;
  size: number;
  users: User[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  baseUrl = environment.baseUrl;
  getUsers() {
    const params = {page: '0'};
    return this.http.get<UserAdminResponse>(this.baseUrl + '/users', { params });
  }

  getUserById(id: string) {
    return this.http.get<User>(this.baseUrl + `/users/${id}`);
  }

  updateUser(data: User) {
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };

    return this.http.post(this.baseUrl + '/users', data, options);
  }

  promoteAdmin(id: number) {
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.put<UserResponse>(this.baseUrl + `/users/admin/${id}`, null, options);
  }

  demoteAdmin(id: number) {
    return this.http.delete<UserResponse>(this.baseUrl + `/users/admin/${id}`);
  }
}
