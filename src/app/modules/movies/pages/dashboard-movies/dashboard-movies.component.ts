import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ListMoviesYearsComponent } from '../../components/list-movies-years/list-movies-years.component';
import { ListProducersComponent } from '../../components/list-producers/list-producers.component';
import { ListWinnersComponent } from '../../components/list-winners/list-winners.component';
import { MoviesService } from '../../../../shared/services/movies.service';
import { take } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ListStudiosYearsComponent } from '../../components/list-studios-years/list-studios-years.component';

@Component({
  selector: 'app-dashboard-movies',
  standalone: true,
  imports: [
    MatTableModule,
    ListMoviesYearsComponent,
    ListStudiosYearsComponent,
    ListProducersComponent,
    ListWinnersComponent,
    HttpClientModule,
  ],
  templateUrl: './dashboard-movies.component.html',
  styleUrl: './dashboard-movies.component.scss',
})
export class DashboardMoviesComponent implements OnInit {
  public yearsWithMultipleWinners = [];
  public topThreeStudiosWithWinners = [];
  public winMinIntervalProducers = [];
  public winMaxIntervalProducers = [];
  public moviesPerYear = [];

  constructor(private _moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getMoviesWinners();
    this.getTopThreeStudios();
    this.getWinIntervalProducers();
    this.getMoviePerYears();
  }

  private getMoviesWinners() {
    this._moviesService
      .getMoviesMultipleWins()
      .pipe(take(1))
      .subscribe((resp) => {
        this.yearsWithMultipleWinners = resp[0].years;
      });
  }

  private getTopThreeStudios() {
    this._moviesService
      .getStudiosWithWinCount()
      .pipe(take(1))
      .subscribe((resp) => {
        this.topThreeStudiosWithWinners = resp[0].studios;
      });
  }

  private getWinIntervalProducers() {
    this._moviesService
      .getWinIntervalProducers()
      .pipe(take(1))
      .subscribe((resp) => {
        this.winMinIntervalProducers = resp[0].min;
        this.winMaxIntervalProducers = resp[0].max;
      });
  }

  private getMoviePerYears() {
    this._moviesService
      .getMoviesPerYear()
      .pipe(take(1))
      .subscribe((resp) => {
        this.moviesPerYear = resp[0].movies;
      });
  }
}
