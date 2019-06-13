import { Component, OnInit } from '@angular/core';
import {MovieService} from '../service/movie.service';
import {AuthService} from '../user/service/auth.service';
import {MovieCharact} from '../movie/movie-detail/movie-detail.component';
import {RateComment} from '../movie/movie-comment-board/movie-comment-board.component';
import {NotificationService} from '../service/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cardFocus: string;
  totalRating: number;
  allRate: RateComment[] = [];
  currentPage = 0;
  movieCharacts: MovieCharact[] = [];
  constructor(private movieService: MovieService, private authService: AuthService, private notiService: NotificationService) { }

  ngOnInit() {
    this.totalRating = 0;
    this.movieService.getRatingTotalByUserId(this.authService.getCurrentUser().id).subscribe(value => {
      this.totalRating = value.hasOwnProperty('totalNo') ? value['totalNo'] : 0;
    });

    this.movieService.getAllRate(this.currentPage, this.authService.getCurrentUser().id).subscribe(value => {
      this.currentPage++;
      value.forEach(r => {
        this.allRate.push(r);
        r.detailScore.sort((a, b) => a.category.localeCompare(b.category) );
      });
    });

    this.movieService.getMovieCharact().subscribe( data => {
      this.movieCharacts = data.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  delete(rate: RateComment) {
    if (confirm('Are you sure to delete this rating ?')) {
      this.notiService.showSuccess('Deleted!(actually not)');
    }
  }
}
