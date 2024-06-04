import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudiosResponse } from '../../modules/movies/interfaces/studio';
import { YearsResponse } from '../../modules/movies/interfaces/year';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private moviesMultipleWinUrl = 'api/moviesMultipleWinners';
  private studiosWithWinCount = 'api/studiosWithWinCount';
  private winIntervalProducers = 'api/winIntervalProducers';
  private moviesPerYear = 'api/moviePerYear';
  private api: string = environment.api;

  constructor(private _http: HttpClient) { }

  getMoviesMultipleWins(): Observable<YearsResponse> {
    return this._http.get<YearsResponse>(this.api + 'movies?projection=years-with-multiple-winners');
  }

  getStudiosWithWinCount(): Observable<StudiosResponse> {
    return this._http.get<StudiosResponse>(this.api + 'movies?projection=studios-with-win-count');
  }

  getWinIntervalProducers() {
    return this._http.get<any[]>(this.winIntervalProducers);
  }

  getMoviesPerYear() {
    return this._http.get<any[]>(this.moviesPerYear);
  }
}
