import { Component, OnInit } from '@angular/core';
import {UserAdminResponse, UserService} from '../service/user.service';
import {MovieService} from '../service/movie.service';
import {User} from '../user/User';
import {delay} from 'rxjs/operators';
import {NotificationService} from '../service/notification.service';
import {ProfileComponent} from '../profile/profile.component';
import {MatDialog} from '@angular/material';
import {AuthService} from '../user/service/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loading: boolean;
  usersInfo: UserAdminResponse;
  constructor(private userService: UserService,
              private movieService: MovieService,
              private notiService: NotificationService,
              private dialog: MatDialog,
              private authService: AuthService) { }

  ngOnInit() {
  }

  switchTab(tab: string) {
    this.usersInfo = null;
    this.loading = true;
    // setTimeout(() => {}, 2000);
    // this.loading = false;
    switch (tab) {
      case 'user':
        this.userService.getUsers().pipe(delay(1200)).subscribe(value => {
          this.usersInfo = value;
          this.loading = false;
          console.log(value);
        }, error => { this.loading = false;
                      console.log(error);
        });
        break;
      case 'movie':
        break;
      case 'rating':
        break;
      default:
    }
  }

  delete(user: User) {
    if (confirm('Are you sure to delete user ' + user.username + '?')) {
      this.notiService.showSuccess('Deleted!(actually not)');
    }
  }

  edit(user: User) {
    this.dialog.open(ProfileComponent, {
      data: {
        userId: user.id
      },
      panelClass: 'movie_detail_page',
      width: '90%',
      height: '90%'
    });
  }
}
