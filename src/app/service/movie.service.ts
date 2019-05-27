import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Rate} from '../movie/movie-detail/movie-detail.component';

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
}
