import {Component, Input, OnInit} from '@angular/core';
import {Rate} from '../movie-detail/movie-detail.component';

@Component({
  selector: 'app-movie-comment-board',
  templateUrl: './movie-comment-board.component.html',
  styleUrls: ['./movie-comment-board.component.css']
})
export class MovieCommentBoardComponent implements OnInit {
  constructor() { }
  @Input() private movieId: string;
  dataToShow: RateComment[] = [];
  ngOnInit() {
    console.log(this.movieId);
  }

  loadData() {
    // console.log(this.dataToShow)
    const r1 = new RateComment();
    r1.rate = {comment: 'buhaokan'};
    r1.userName = 'Teresa';
    r1.timeStamp = '2019/4/5';
    this.dataToShow.push(r1);
    console.log(this.dataToShow);
    console.log(new Date().toISOString());
  }
}

export class RateComment {
  rate: any = {};
  userName: string;
  timeStamp: string;
}
