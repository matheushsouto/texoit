import { Routes } from '@angular/router';
import { DashboardMoviesComponent } from './modules/movies/pages/dashboard-movies/dashboard-movies.component';
import { MoviesTableComponent } from './modules/movies/pages/movies-table/movies-table.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardMoviesComponent },
  { path: 'list', component: MoviesTableComponent },
];
