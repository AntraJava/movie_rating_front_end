import {Component, Inject, OnInit} from '@angular/core';
import {MovieService} from '../../service/movie.service';
import {NotificationService} from '../../service/notification.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  rate: Rate = new Rate();
  movieCharacts: MovieCharact[];
  averageScore: number;
  enableRate: boolean;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private movieService: MovieService, private notiService: NotificationService) {}

  ngOnInit(): void {
    // console.log('test', this.data);
    this.movieService.getMovieAverageScoreAndEnableRating(this.data.movie.id).subscribe(
      rateResponse => {
        console.log('Rate Status Returned', rateResponse);
        this.averageScore = rateResponse.rating;
        if (!rateResponse.enableRate ) {
          this.enableRate = false;
          return;
        }
        if ( rateResponse.enableRate) {
          this.enableRate = true;
          this.movieService.getMovieCharact().subscribe( data => {
            this.movieCharacts = data.sort();
            this.movieCharacts.forEach(mc => {
              this.rate.rateStars[mc.id] = '';
            });
          }, error => {
            throw error;
          });
        } else {
          this.enableRate = false;
        }
      }
    );

  }

  submit() {
    this.rate.movieId = this.data.movie.id;
    console.log(this.data);
    this.movieService.submit(this.rate).subscribe(data => {
      console.log('data submitted, got return from server', data);
      this.notiService.showSuccess('Successfully Submit the rate!');
    }, error => {
      throw error;
    });
  }

}

export class Rate {
  movieId: string;
  rateStars: any = {};
  comment: string;
}

export class MovieCharact {
  id: number;
  name: string;
}

export class MovieRatingResponse {
  msg: string;
  rating: number;
  movieId: number;
  enableRate: boolean;
  userId: number;
}

