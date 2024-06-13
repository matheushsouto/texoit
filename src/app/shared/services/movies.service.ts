import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudiosResponse } from '../../modules/movies/interfaces/studio';
import { YearsResponse } from '../../modules/movies/interfaces/year';
import { WinIntervalProducersResponse } from '../../modules/movies/interfaces/producer';
import { Movie, MoviesResponse } from '../../modules/movies/interfaces/movie';
import { WinnerSelection } from '../../modules/movies/interfaces/select';

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

  getAllMovies(page: number, size: number, winner?: WinnerSelection, year?: number): Observable<MoviesResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    params = this.addOptionalParams(params, { winner, year });
    return this.http.get<MoviesResponse>(this.moviesEndpoint, { params });
  }

  private addOptionalParams(params: HttpParams, optionalParams: { [key: string]: any }): HttpParams {
    Object.keys(optionalParams).forEach(key => {
      if (optionalParams[key] !== undefined) {
        params = params.set(key, optionalParams[key].toString());
      }
    });
    return params;
  }
}
