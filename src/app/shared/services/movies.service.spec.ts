import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MoviesService } from './movies.service';
import { environment } from '../../../environments/environment';
import { mockYearsResponse } from '../../mock/years-response-mock';
import { mockStudiosResponse } from '../../mock/studios-response-mock';
import { mockWinIntervalResponse } from '../../mock/win-interval-response-mock';
import { mockMovies } from '../../mock/movies-mock';
import { MoviesResponse } from '../../modules/movies/interfaces/movie';
import { HttpParams } from '@angular/common/http';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;
  const api = environment.api;
  const moviesEndpoint = `${api}movies?`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [{ provide: 'BASE_URL', useValue: 'api/' }]
    });
    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch years with multiple winners', () => {
    service.getMoviesMultipleWins().subscribe(response => {
      expect(response).toEqual(mockYearsResponse);
    });
    const req = httpMock.expectOne(`${moviesEndpoint}projection=years-with-multiple-winners`);
    expect(req.request.method).toBe('GET');
    req.flush(mockYearsResponse);
  });

  it('should fetch studios with win count', () => {
    service.getStudiosWithWinCount().subscribe(response => {
      expect(response).toEqual(mockStudiosResponse);
    });
    const req = httpMock.expectOne(`${moviesEndpoint}projection=studios-with-win-count`);
    expect(req.request.method).toBe('GET');
    req.flush(mockStudiosResponse);
  });

  it('should fetch producers with max and min win intervals', () => {
    service.getWinIntervalProducers().subscribe(response => {
      expect(response).toEqual(mockWinIntervalResponse);
    });
    const req = httpMock.expectOne(`${moviesEndpoint}projection=max-min-win-interval-for-producers`);
    expect(req.request.method).toBe('GET');
    req.flush(mockWinIntervalResponse);
  });

  it('should fetch movies per year', () => {
    service.getMoviesPerYear(2000).subscribe(response => {
      expect(response).toEqual(mockMovies);
    });
    const req = httpMock.expectOne(`${moviesEndpoint}winner=true&year=2000`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('should add optional parameters if provided', () => {
    let params = new HttpParams().set('page', '1').set('size', '10');
    params = service['addOptionalParams'](params, { winner: true, year: 2020 });
    expect(params.get('winner')).toBe('true');
    expect(params.get('year')).toBe('2020');
  });

  it('should not add optional parameters if not provided', () => {
    let params = new HttpParams().set('page', '1').set('size', '10');
    params = service['addOptionalParams'](params, { winner: undefined, year: undefined });
    expect(params.has('winner')).toBe(false);
    expect(params.has('year')).toBe(false);
  });
});
