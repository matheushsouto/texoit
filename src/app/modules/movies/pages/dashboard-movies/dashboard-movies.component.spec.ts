import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { DashboardMoviesComponent } from './dashboard-movies.component';
import { MoviesService } from '../../../../shared/services/movies.service';
import { YearsResponse } from '../../interfaces/year';
import { StudiosResponse } from '../../interfaces/studio';
import { WinIntervalProducersResponse } from '../../interfaces/producer';
import { Movie } from '../../interfaces/movie';

describe('DashboardMoviesComponent', () => {
  let component: DashboardMoviesComponent;
  let fixture: ComponentFixture<DashboardMoviesComponent>;
  let moviesService: jasmine.SpyObj<MoviesService>;

  beforeEach(async () => {
    const moviesServiceSpy = jasmine.createSpyObj('MoviesService', [
      'getMoviesMultipleWins',
      'getStudiosWithWinCount',
      'getWinIntervalProducers',
      'getMoviesPerYear'
    ]);

    moviesServiceSpy.getMoviesMultipleWins.and.returnValue(of({ years: [] } as YearsResponse));
    moviesServiceSpy.getStudiosWithWinCount.and.returnValue(of({ studios: [] } as StudiosResponse));
    moviesServiceSpy.getWinIntervalProducers.and.returnValue(of({ min: [], max: [] } as WinIntervalProducersResponse));
    moviesServiceSpy.getMoviesPerYear.and.returnValue(of([] as Movie[]));

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        DashboardMoviesComponent
      ],
      providers: [
        { provide: MoviesService, useValue: moviesServiceSpy }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(DashboardMoviesComponent);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService) as jasmine.SpyObj<MoviesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load years with multiple winners on init', () => {
    const mockYearsResponse: YearsResponse = {
      years: [{ year: 2020, winnerCount: 0 }]
    };
    moviesService.getMoviesMultipleWins.and.returnValue(of(mockYearsResponse));
    component.ngOnInit();
    expect(moviesService.getMoviesMultipleWins).toHaveBeenCalled();
    expect(component.yearsWithMultipleWinners).toEqual(mockYearsResponse.years);
  });

  it('should load top three studios on init', () => {
    const mockStudiosResponse: StudiosResponse = {
      studios: [
        { name: 'Studio A', winCount: 10 },
        { name: 'Studio B', winCount: 8 },
        { name: 'Studio C', winCount: 6 },
        { name: 'Studio D', winCount: 4 }
      ]
    };
    moviesService.getStudiosWithWinCount.and.returnValue(of(mockStudiosResponse));
    component.ngOnInit();
    expect(moviesService.getStudiosWithWinCount).toHaveBeenCalled();
    expect(component.topThreeStudiosWithWinners.length).toBe(3);
    expect(component.topThreeStudiosWithWinners).toEqual(mockStudiosResponse.studios.slice(0, 3));
  });

  it('should load win interval producers on init', () => {
    const mockWinIntervalResponse: WinIntervalProducersResponse = {
      min: [{ producer: 'Producer A', interval: 1, previousWin: 2000, followingWin: 2001 }],
      max: [{ producer: 'Producer B', interval: 10, previousWin: 1990, followingWin: 2000 }]
    };
    moviesService.getWinIntervalProducers.and.returnValue(of(mockWinIntervalResponse));
    component.ngOnInit();
    expect(moviesService.getWinIntervalProducers).toHaveBeenCalled();
    expect(component.winMinIntervalProducers).toEqual(mockWinIntervalResponse.min);
    expect(component.winMaxIntervalProducers).toEqual(mockWinIntervalResponse.max);
  });

  it('should load movies per year', () => {
    const mockMovies: Movie[] = [{
      id: 1,
      title: 'Movie A',
      year: 2020,
      studios: ['Studio A'],
      producers: ['Producer A'],
      winner: false
    }];
    moviesService.getMoviesPerYear.and.returnValue(of(mockMovies));
    component.loadMoviePerYears(2020);
    expect(moviesService.getMoviesPerYear).toHaveBeenCalledWith(2020);
    expect(component.moviesPerYear).toEqual(mockMovies);
  });

  it('should unsubscribe from previous subscription', () => {
    const subscriptionSpy = jasmine.createSpyObj('Subscription', ['unsubscribe']);
    component.subscription = subscriptionSpy;
    component.loadMoviePerYears(2020);
    expect(subscriptionSpy.unsubscribe).toHaveBeenCalled();
  });
});
