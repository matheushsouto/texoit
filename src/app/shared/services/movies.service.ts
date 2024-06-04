import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudiosResponse } from '../../modules/movies/interfaces/studio';
import { YearsResponse } from '../../modules/movies/interfaces/year';
import { WinIntervalProducersResponse } from '../../modules/movies/interfaces/producer';
import { Movie } from '../../modules/movies/interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private readonly api: string = environment.api;
  private readonly moviesEndpoint: string = this.api + 'movies?';

  constructor(private http: HttpClient) { }

  getMoviesMultipleWins(): Observable<YearsResponse> {
    return this.http.get<YearsResponse>(`${this.moviesEndpoint}projection=years-with-multiple-winners`);
  }

  getStudiosWithWinCount(): Observable<StudiosResponse> {
    return this.http.get<StudiosResponse>(`${this.moviesEndpoint}projection=studios-with-win-count`);
  }

  getWinIntervalProducers(): Observable<WinIntervalProducersResponse> {
    return this.http.get<WinIntervalProducersResponse>(`${this.moviesEndpoint}projection=max-min-win-interval-for-producers`);
  }

  getMoviesPerYear(id: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.moviesEndpoint}winner=true&year=${id}`);
  }
}
