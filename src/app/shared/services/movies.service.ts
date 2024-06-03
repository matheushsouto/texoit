import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private moviesMultipleWinUrl = 'api/moviesMultipleWinners';
  private studiosWithWinCount = 'api/studiosWithWinCount';
  private winIntervalProducers = 'api/winIntervalProducers';
  private moviesPerYear = 'api/moviePerYear';

  constructor(private _http: HttpClient) { }

  getMoviesMultipleWins(): Observable<any[]> {
    return this._http.get<any[]>(this.moviesMultipleWinUrl);
  }

  getStudiosWithWinCount() {
    return this._http.get<any[]>(this.studiosWithWinCount);
  }

  getWinIntervalProducers() {
    return this._http.get<any[]>(this.winIntervalProducers);
  }

  getMoviesPerYear() {
    return this._http.get<any[]>(this.moviesPerYear);
  }
}
