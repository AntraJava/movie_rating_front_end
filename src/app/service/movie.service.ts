import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MovieRatingResponse, Rate} from '../movie/movie-detail/movie-detail.component';
import {Observable} from 'rxjs';
import {RateComment} from '../movie/movie-comment-board/movie-comment-board.component';
import {environment} from '../../environments/environment';
import {Movie} from '../movie/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {
  }
  baseUrl = environment.baseUrl;
  getMovies(key: string) {
    const params = {title: key};
    return this.http.get(this.baseUrl + '/movie', { params });
  }

  getMoviesByType(t: string): any {
    const params = {type: t};
    return this.http.get(this.baseUrl + '/movie/popular', { params });
  }

  getMovieCharact(): any {
    return this.http.get(this.baseUrl + '/rating/characteristics');
  }

  submit(rate: Rate) {
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };

    return this.http.post(this.baseUrl + '/rating/', rate, options);
  }

  getMovieAverageScore(id: string): Observable<MovieRatingResponse> {
    const params = {movieId: id};
    return this.http.get<MovieRatingResponse>(this.baseUrl + '/rating/average', { params });
  }

  getMovieAverageScoreAndEnableRating(id: string): Observable<MovieRatingResponse> {
    const params = {movieId: id};
    return this.http.get<MovieRatingResponse>(this.baseUrl + '/rating/rateStatus', {params});
  }

  getRatingComment(movie: string, p: string, size: string, beforeTimeISO: string): Observable<RateComment[]> {
    const params = {movieId: movie, page: p, recordNo: size, fromTime: beforeTimeISO};
    return this.http.get<RateComment[]>(this.baseUrl + '/rating/ratingInfo', {params});
  }

  getRatingTotalByUserId(user: number) {
    const params = {userId: user.toString()};
    return this.http.get(this.baseUrl + '/ratingTotal', {params});
  }

  getAllRate(currentPage: number, user: number) {
    const params = {page: currentPage.toString(), recordNo: '10', userId: user.toString()};
    return this.http.get<RateComment[]>(this.baseUrl + '/rating/ratingByUser', {params});
  }

  deleteRate(rate: RateComment) {
    const params = {movieId: rate.movieId, username: rate.username};
    return this.http.delete<RateComment[]>(this.baseUrl + '/rating/ratingInfo', {params});
  }

  getMoviesAll() {
    const options = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<{movies: Movie[]}>(this.baseUrl + '/movie/all', options);
  }
}
