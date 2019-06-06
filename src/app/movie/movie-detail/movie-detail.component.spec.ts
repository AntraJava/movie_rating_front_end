import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailComponent } from './movie-detail.component';
import {AppComponent} from '../../app.component';
import {HeaderComponent} from '../../include/header/header.component';
import {FooterComponent} from '../../include/footer/footer.component';
import {MovieComponent} from '../movie.component';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {LoginComponent} from '../../user/login/login.component';
import {MovieCommentBoardComponent} from '../movie-comment-board/movie-comment-board.component';
import {AuthService} from '../../user/service/auth.service';
import {AuthGuardService} from '../../user/service/auth-guard.service';
import {MovieService} from '../../service/movie.service';
import {GlobalErrorHandler} from '../../service/error/global-error-handler.service';
import {ErrorHandler} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from '../../service/interceptor/jwt-interceptor.service';
import {ServerErrorInterceptor} from '../../service/interceptor/server-error-interceptor.service';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../../app-routing.module';
import {FormsModule} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef, MatProgressSpinnerModule, MatSnackBarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BarRatingModule} from 'ngx-bar-rating';
import {JwtModule} from '@auth0/angular-jwt';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent,
        HeaderComponent,
        FooterComponent,
        MovieComponent,
        DashboardComponent,
        MovieDetailComponent,
        LoginComponent,
        MovieCommentBoardComponent ],
      providers: [
        AuthService,
        AuthGuardService,
        MovieService,
        GlobalErrorHandler,
        { provide: ErrorHandler,
          useClass: GlobalErrorHandler},
        { provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true
        },
        { provide: HTTP_INTERCEPTORS,
          useClass: ServerErrorInterceptor,
          multi: true },
        {
            provide: MAT_DIALOG_DATA,
              useValue: {
                movie: {
                  averageRate: 0,
                  runtime: '138 min',
                  id: 1,
                  title: 'Flight',
                  year: '2012',
                  imdbId: 'tt1907668',
                  release: '02 Nov 2012',
                  genre: 'Drama, Thriller',
                  director: 'Robert Zemeckis',
                  poster: 'https://m.media-amazon.com/images/M/MV5BMTUxMjI1OTMxNl5BMl5BanBnXkFtZTcwNjc3NTY1OA@@._V1_SX300.jpg',
                  plot: 'Whip Whitaker is a commuter airline pilot.'
                } // Add any data you wish to test if it is passed/used correctly
              }
          }],
      imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatProgressSpinnerModule,
        BarRatingModule,
        JwtModule.forRoot({
          config: {
            tokenGetter: () =>  localStorage.getItem('accessToken'),
          }
        })
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
