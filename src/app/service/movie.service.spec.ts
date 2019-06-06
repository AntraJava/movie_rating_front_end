import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from '../app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MatDialogModule, MatProgressSpinnerModule, MatSnackBarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BarRatingModule} from 'ngx-bar-rating';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthService} from '../user/service/auth.service';
import {AuthGuardService} from '../user/service/auth-guard.service';
import {GlobalErrorHandler} from './error/global-error-handler.service';
import {ErrorHandler} from '@angular/core';
import {JwtInterceptor} from './interceptor/jwt-interceptor.service';
import {ServerErrorInterceptor} from './interceptor/server-error-interceptor.service';
import {AppComponent} from '../app.component';
import {HeaderComponent} from '../include/header/header.component';
import {FooterComponent} from '../include/footer/footer.component';
import {MovieComponent} from '../movie/movie.component';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {MovieDetailComponent} from '../movie/movie-detail/movie-detail.component';
import {LoginComponent} from '../user/login/login.component';
import {MovieCommentBoardComponent} from '../movie/movie-comment-board/movie-comment-board.component';

describe('MovieService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [ AppComponent,
      HeaderComponent,
      FooterComponent,
      MovieComponent,
      DashboardComponent,
      MovieDetailComponent,
      LoginComponent,
      MovieCommentBoardComponent ],
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
        multi: true }],
  }));

  it('should be created', () => {
    const service: MovieService = TestBed.get(MovieService);
    expect(service).toBeTruthy();
  });
});
