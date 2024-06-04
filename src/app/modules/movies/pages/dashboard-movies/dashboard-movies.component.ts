import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ListMoviesYearsComponent } from '../../components/list-movies-years/list-movies-years.component';
import { ListProducersComponent } from '../../components/list-producers/list-producers.component';
import { ListWinnersComponent } from '../../components/list-winners/list-winners.component';
import { MoviesService } from '../../../../shared/services/movies.service';
import { Subscription, take } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ListStudiosYearsComponent } from '../../components/list-studios-years/list-studios-years.component';
import { StudioWinCount, StudiosResponse } from '../../interfaces/studio';
import { YearWithMultipleWinners, YearsResponse } from '../../interfaces/year';
import { ProducerWinInterval, WinIntervalProducersResponse } from '../../interfaces/producer';
import { Movie } from '../../interfaces/movie';

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
  public yearsWithMultipleWinners: YearWithMultipleWinners[] = [];
  public topThreeStudiosWithWinners: StudioWinCount[] = [];
  public winMinIntervalProducers: ProducerWinInterval[] = [];
  public winMaxIntervalProducers: ProducerWinInterval[] = [];
  public moviesPerYear!: Movie[];
  public subscription!: Subscription;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.loadMoviesWinners();
    this.loadTopThreeStudios();
    this.loadWinIntervalProducers();
  }

  private loadMoviesWinners(): void {
    this.moviesService
      .getMoviesMultipleWins()
      .pipe(take(1))
      .subscribe((response: YearsResponse) => {
        this.yearsWithMultipleWinners = response.years;
      });
  }

  private loadTopThreeStudios(): void {
    this.moviesService
      .getStudiosWithWinCount()
      .pipe(take(1))
      .subscribe((response: StudiosResponse) => {
        this.topThreeStudiosWithWinners = response.studios.slice(0, 3);
      });
  }

  private loadWinIntervalProducers(): void {
    this.moviesService
      .getWinIntervalProducers()
      .pipe(take(1))
      .subscribe((response: WinIntervalProducersResponse) => {
        this.winMinIntervalProducers = response.min;
        this.winMaxIntervalProducers = response.max;
      });
  }

  public loadMoviePerYears(yearId: number): void {
    this.unsubscribeFromPreviousSubscription();

    this.subscription = this.moviesService
      .getMoviesPerYear(yearId)
      .pipe(take(1))
      .subscribe((response: Movie[]) => {
        console.log(response);
        this.moviesPerYear = response;
      });
  }

  private unsubscribeFromPreviousSubscription(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
