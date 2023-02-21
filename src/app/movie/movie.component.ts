import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MovieService} from '../service/movie.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MovieDetailComponent} from './movie-detail/movie-detail.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  result: HTMLElement;

  constructor(private movieService: MovieService,
              public dialog: MatDialog) { }

  movies: any[]
  searchKey: string;
  loading: boolean;

  ngOnInit() {
    //this.movieService.getMovies()
    this.loading=false;
    this.result = document.getElementById('result');
  }

  search() {
    this.loading=true;
    this.movieService.getMovies(this.searchKey)
      .subscribe(data => {
        this.movies = data["movies"];
        this.movies.forEach(movie=>{
          if(!movie['poster'] || movie['poster'] === 'N/A'){
            movie['poster'] = 'assets/resources/no_poster.jpg';
          }
        });
        this.loading=false;
        this.scroll();
        }
      , error => {
        this.loading=false;
        this.movies =[];
        throw error;
      });
  }

  showRating(movie) {
      this.dialog.open(MovieDetailComponent, {
        data: {
          movie: movie
        },
        panelClass:"movie_detail_page",
        // disableClose: true,
        width: "90%",
        height:"90%"
      });
  }

  popular() {
    this.getMovieByType('popular');
  }

  action() {
    this.getMovieByType('action');
  }

  cartoon() {
    this.getMovieByType('cartoon');
  }

  private getMovieByType(type: string){
    this.loading=true;
    this.movieService.getMoviesByType(type)
      .subscribe(data => {
          this.movies = data["movies"];
          this.movies.forEach(movie=>{
            if(!movie['poster'] || movie['poster'] === 'N/A'){
              movie['poster'] = 'assets/resources/no_poster.jpg';
            }
          });
          this.loading=false;
          this.scroll();
          }
        , error => {
          this.loading=false;
          this.movies =[];
          throw error;
        });
  }

  private scroll() {
    setTimeout(
      function(){
        this.result.scrollIntoView({ block: 'nearest',  behavior: 'smooth' });
        },500
    )
  }
}

