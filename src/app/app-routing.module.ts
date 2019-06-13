import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { MovieComponent} from './movie/movie.component';
import {DashboardComponent} from './dashboard/dashboard.component';

import { AuthGuardService as AuthGuard} from './user/service/auth-guard.service';
import {LoginComponent} from './user/login/login.component';
import {AdminComponent} from './admin/admin.component';

const routes: Routes = [
   {
    path: 'movies',
    component: MovieComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'ROLE_USER'
    }
   },
  { path: '',
    redirectTo: 'movies',
    pathMatch: 'full'
  },
  { path: 'dashboard', component: DashboardComponent ,
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'ROLE_USER'
          }},
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'admin', component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'ROLE_ADMIN'
    }
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
