import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { DashboardMoviesComponent } from './dashboard-movies.component';
import { MoviesService } from '../../../../shared/services/movies.service';
import { YearsResponse } from '../../interfaces/year';
import { StudiosResponse } from '../../interfaces/studio';
import { WinIntervalProducersResponse } from '../../interfaces/producer';
import { Movie } from '../../interfaces/movie';
import { mockYearsResponse } from '../../../../mock/years-response-mock';
import { mockStudiosResponse } from '../../../../mock/studios-response-mock';
import { mockWinIntervalResponse } from '../../../../mock/win-interval-response-mock';
import { mockMovies } from '../../../../mock/movies-mock';

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
    moviesService.getMoviesMultipleWins.and.returnValue(of(mockYearsResponse));
    component.ngOnInit();
    expect(moviesService.getMoviesMultipleWins).toHaveBeenCalled();
    expect(component.yearsWithMultipleWinners).toEqual(mockYearsResponse.years);
  });

  it('should load top three studios on init', () => {
    moviesService.getStudiosWithWinCount.and.returnValue(of(mockStudiosResponse));
    component.ngOnInit();
    expect(moviesService.getStudiosWithWinCount).toHaveBeenCalled();
    expect(component.topThreeStudiosWithWinners.length).toBe(3);
    expect(component.topThreeStudiosWithWinners).toEqual(mockStudiosResponse.studios.slice(0, 3));
  });

  it('should load win interval producers on init', () => {
    moviesService.getWinIntervalProducers.and.returnValue(of(mockWinIntervalResponse));
    component.ngOnInit();
    expect(moviesService.getWinIntervalProducers).toHaveBeenCalled();
    expect(component.winMinIntervalProducers).toEqual(mockWinIntervalResponse.min);
    expect(component.winMaxIntervalProducers).toEqual(mockWinIntervalResponse.max);
  });

  it('should load movies per year', () => {
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
