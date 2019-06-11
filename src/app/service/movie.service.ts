import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MovieRatingResponse, Rate} from '../movie/movie-detail/movie-detail.component';
import {Observable} from 'rxjs';
import {RateComment} from '../movie/movie-comment-board/movie-comment-board.component';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {
  }

  getMovies(key: string) {
    const params = {title: key};
    return this.http.get('http://localhost:8080/movie', { params });
  }

  getMoviesByType(t: string): any {
    const params = {type: t};
    return this.http.get('http://localhost:8080/movie/popular', { params });
  }

  getMovieCharact(): any {
    return this.http.get('http://localhost:8080/movie/characteristics');
  }

  submit(rate: Rate) {
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };

    return this.http.post('http://localhost:8080/movie/', rate, options);
  }

  getMovieAverageScore(id: string): Observable<MovieRatingResponse> {
    const params = {movieId: id};
    return this.http.get<MovieRatingResponse>('http://localhost:8080/movie/average', { params });
  }

  getMovieAverageScoreAndEnableRating(id: string): Observable<MovieRatingResponse> {
    const params = {movieId: id};
    return this.http.get<MovieRatingResponse>('http://localhost:8080/movie/rateStatus', {params});
  }

  getRatingComment(movie: string, p: string, size: string, beforeTimeISO: string): Observable<RateComment[]> {
    const params = {movieId: movie, page: p, recordNo: size, fromTime: beforeTimeISO};
    return this.http.get<RateComment[]>('http://localhost:8080/movie/ratingInfo', {params});
  }

  getRatingTotalByUserId(user: number) {
    const params = {userId: user.toString()};
    return this.http.get('http://localhost:8080/ratingTotal', {params});
  }

  getAllRate(currentPage: number, user: number) {
    const params = {page: currentPage.toString(), recordNo: '10', userId: user.toString()};
    return this.http.get<RateComment[]>('http://localhost:8080/movie/ratingByUser', {params});
  }

  deleteRate(rate: RateComment) {
    const params = {movieId: rate.movieId, username: rate.username};
    return this.http.delete<RateComment[]>('http://localhost:8080/movie/ratingInfo', {params});
  }
}
