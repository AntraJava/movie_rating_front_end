import { Component, OnInit } from '@angular/core';
import {UserAdminResponse, UserService} from '../service/user.service';
import {MovieService} from '../service/movie.service';
import {User} from '../user/User';
import {delay} from 'rxjs/operators';
import {NotificationService} from '../service/notification.service';
import {ProfileComponent} from '../profile/profile.component';
import {MatDialog} from '@angular/material';
import {AuthService} from '../user/service/auth.service';
import {Movie} from '../movie/movie';
import {MovieDetailComponent} from '../movie/movie-detail/movie-detail.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loading: boolean;
  usersInfo: UserAdminResponse;
  movies: Movie[];
  constructor(private userService: UserService,
              private movieService: MovieService,
              private notiService: NotificationService,
              private dialog: MatDialog) { }

  ngOnInit() {
  }

  switchTab(tab: string) {
    this.usersInfo = null;
    this.movies = null;
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
        this.movieService.getMoviesAll().pipe(delay(1200)).subscribe(value => {
          this.movies = value.movies;
          this.loading = false;
          console.log(value);
        }, error => { this.loading = false; console.log(error); });
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

  upToAdmin(user: User) {
    this.userService.promoteAdmin(user.id).subscribe(value => {
      this.notiService.showSuccess(value.message);
      this.usersInfo.users.forEach(u => {
        if (u.id === user.id) {
          u.role = 'ROLE_USER,ROLE_ADMIN';
        }
      });
    });
  }

  downFromAdmin(user: User) {
    this.userService.demoteAdmin(user.id).subscribe(value => {
      this.notiService.showSuccess(value.message);
      this.usersInfo.users.forEach(u => {
        if (u.id === user.id) {
          u.role = 'ROLE_USER';
        }
      });
    });
  }

  deleteMovie(movie: Movie) {
    alert('Implement this.');
  }

  detail(movieInput) {
    this.dialog.open(MovieDetailComponent, {
      data: {
        movie: movieInput,
        enableRate: false
      },
      panelClass: 'movie_detail_page',
      // disableClose: true,
      width: '90%',
      height: '90%'
    });
  }
}

export class UserResponse {
  success: boolean;
  message: string;
}
