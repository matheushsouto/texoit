import { Component } from '@angular/core';
import { ListMoviesComponent } from '../../components/list-movies/list-movies.component';

@Component({
  selector: 'app-movies-table',
  standalone: true,
  imports: [ListMoviesComponent],
  templateUrl: './movies-table.component.html',
  styleUrl: './movies-table.component.scss'
})
export class MoviesTableComponent {

}
