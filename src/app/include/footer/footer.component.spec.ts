import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import {AppComponent} from '../../app.component';
import {HeaderComponent} from '../header/header.component';
import {MovieComponent} from '../../movie/movie.component';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {MovieDetailComponent} from '../../movie/movie-detail/movie-detail.component';
import {LoginComponent} from '../../user/login/login.component';
import {MovieCommentBoardComponent} from '../../movie/movie-comment-board/movie-comment-board.component';
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
import {MatDialogModule, MatProgressSpinnerModule, MatSnackBarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BarRatingModule} from 'ngx-bar-rating';
import {JwtModule} from '@auth0/angular-jwt';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

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
          multi: true }],
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
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
