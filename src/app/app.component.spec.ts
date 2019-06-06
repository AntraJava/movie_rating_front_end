import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {HeaderComponent} from './include/header/header.component';
import {FooterComponent} from './include/footer/footer.component';
import {MovieComponent} from './movie/movie.component';
import {MovieDetailComponent} from './movie/movie-detail/movie-detail.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './user/login/login.component';
import {MovieCommentBoardComponent} from './movie/movie-comment-board/movie-comment-board.component';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MatDialogModule, MatProgressSpinnerModule, MatSnackBarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BarRatingModule} from 'ngx-bar-rating';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthService} from './user/service/auth.service';
import {AuthGuardService} from './user/service/auth-guard.service';
import {MovieService} from './service/movie.service';
import {GlobalErrorHandler} from './service/error/global-error-handler.service';
import {ErrorHandler} from '@angular/core';
import {JwtInterceptor} from './service/interceptor/jwt-interceptor.service';
import {ServerErrorInterceptor} from './service/interceptor/server-error-interceptor.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        MovieComponent,
        DashboardComponent,
        MovieDetailComponent,
        LoginComponent,
        MovieCommentBoardComponent
      ],
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
            // whitelistedDomains: ['http://localhost:8080'],
            // blacklistedRoutes: ['http://localhost:8080/api/auth/signup', 'http://localhost:8080/api/auth/signin']
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
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'rating'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('rating');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('ANTRA•');
  });
});
