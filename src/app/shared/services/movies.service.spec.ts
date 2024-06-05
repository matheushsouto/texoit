import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MoviesService } from './movies.service';
import { environment } from '../../../environments/environment';
import { YearsResponse } from '../../modules/movies/interfaces/year';
import { StudiosResponse } from '../../modules/movies/interfaces/studio';
import { WinIntervalProducersResponse } from '../../modules/movies/interfaces/producer';
import { Movie } from '../../modules/movies/interfaces/movie';

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
    const dummyResponse: YearsResponse = {
      years: [
        { year: 2000, winnerCount: 2 },
        { year: 2010, winnerCount: 3 }
      ]
    };
    service.getMoviesMultipleWins().subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });
    const req = httpMock.expectOne(`${moviesEndpoint}projection=years-with-multiple-winners`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should fetch studios with win count', () => {
    const dummyResponse: StudiosResponse = {
      studios: [
        { name: 'Studio 1', winCount: 10 },
        { name: 'Studio 2', winCount: 5 }
      ]
    };
    service.getStudiosWithWinCount().subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });
    const req = httpMock.expectOne(`${moviesEndpoint}projection=studios-with-win-count`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should fetch producers with max and min win intervals', () => {
    const dummyResponse: WinIntervalProducersResponse = {
      min: [
        { producer: 'Producer 1', interval: 1, previousWin: 2000, followingWin: 2001 },
        { producer: 'Producer 2', interval: 2, previousWin: 2001, followingWin: 2003 }
      ],
      max: [
        { producer: 'Producer 3', interval: 5, previousWin: 1995, followingWin: 2000 },
        { producer: 'Producer 4', interval: 6, previousWin: 1990, followingWin: 1996 }
      ]
    };
    service.getWinIntervalProducers().subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });
    const req = httpMock.expectOne(`${moviesEndpoint}projection=max-min-win-interval-for-producers`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should fetch movies per year', () => {
    const dummyResponse: Movie[] = [
      { id: 1, title: 'Movie 1', year: 2000, studios: ['Studio 1'], producers: ['Producer 1'], winner: true },
      { id: 2, title: 'Movie 2', year: 2000, studios: ['Studio 2'], producers: ['Producer 2'], winner: true }
    ];
    service.getMoviesPerYear(2000).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });
    const req = httpMock.expectOne(`${moviesEndpoint}winner=true&year=2000`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });
});
