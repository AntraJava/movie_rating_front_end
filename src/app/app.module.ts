import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './include/header/header.component';
import { FooterComponent } from './include/footer/footer.component';
import { MovieComponent } from './movie/movie.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MovieService} from './service/movie.service';
import {FormsModule} from '@angular/forms';
import {ServerErrorInterceptor} from './service/interceptor/server-error-interceptor.service';
import {GlobalErrorHandler} from './service/error/global-error-handler.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MovieDetailComponent} from './movie/movie-detail/movie-detail.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BarRatingModule } from 'ngx-bar-rating';
import {AuthGuardService} from './user/service/auth-guard.service';
import {AuthService} from './user/service/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './user/login/login.component';
import {JwtInterceptor} from './service/interceptor/jwt-interceptor.service';
import { MovieCommentBoardComponent } from './movie/movie-comment-board/movie-comment-board.component';
import { AdminComponent } from './admin/admin.component';
import {MatTabsModule} from '@angular/material/tabs';
import {UserService} from './service/user.service';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MovieComponent,
    DashboardComponent,
    MovieDetailComponent,
    LoginComponent,
    MovieCommentBoardComponent,
    AdminComponent,
    ProfileComponent
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
    MatTabsModule,
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
    UserService,
    { provide: ErrorHandler,
      useClass: GlobalErrorHandler},
    { provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true }],
  entryComponents: [
    MovieDetailComponent,
    ProfileComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
