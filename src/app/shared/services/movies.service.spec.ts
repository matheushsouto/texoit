import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch movies with multiple wins', () => {
    const mockResponse = [{ year: 2000, title: 'Movie 1' }, { year: 2001, title: 'Movie 2' }];

    service.getMoviesMultipleWins().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(service['moviesMultipleWinUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch studios with win count', () => {
    const mockResponse = [{ studio: 'Studio 1', wins: 5 }, { studio: 'Studio 2', wins: 3 }];

    service.getStudiosWithWinCount().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(service['studiosWithWinCount']);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch producers with win intervals', () => {
    const mockResponse = [{ producer: 'Producer 1', interval: 2 }, { producer: 'Producer 2', interval: 4 }];

    service.getWinIntervalProducers().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(service['winIntervalProducers']);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch movies per year', () => {
    const mockResponse = [{ year: 2000, movies: ['Movie 1', 'Movie 2'] }, { year: 2001, movies: ['Movie 3'] }];

    service.getMoviesPerYear().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(service['moviesPerYear']);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
