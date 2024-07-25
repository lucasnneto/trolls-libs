import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
  {
    component: LoginComponent,
    path: 'login',
  },
  {
    component: DashboardComponent,
    path: 'dashboard',
  },
  {
    redirectTo: '',
    path: '*',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
