import {Component, Input, OnInit} from '@angular/core';
import {Rate} from '../movie-detail/movie-detail.component';
import {MovieService} from '../../service/movie.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-movie-comment-board',
  templateUrl: './movie-comment-board.component.html',
  styleUrls: ['./movie-comment-board.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      // transition('void <=> *', animate(500)),
      transition(':enter', animate(800)),
    ]),
  ]
})
export class MovieCommentBoardComponent implements OnInit {
  constructor(private movieService: MovieService) { }
  private pageSize = 3;
  private pageNo = 0;
  @Input() private movieId: string;
  dataToShow: RateComment[] = [];
  showMoreBtn = true;
  ngOnInit() {
    // console.log(this.movieId);
  }

  loadData() {
    this.movieService.getRatingComment(this.movieId, this.pageNo.toString(), this.pageSize.toString(), new Date().toISOString())
      .subscribe(data => {
      console.log('data returned from server', data);
      if ( data.length < this.pageSize )  {
        this.showMoreBtn = false;
      }
      data.forEach(d => this.dataToShow.push(d));
      console.log('data in dataToShowr', this.dataToShow);
      this.pageNo++;
    }, error => {
      throw error;
    });
  }
}

export class RateComment {
  detailScore: RateScore[];
  username: string;
  timeStamp: string;
  comment: string;
}
export class RateScore {
  category: string;
  score: string;
}
