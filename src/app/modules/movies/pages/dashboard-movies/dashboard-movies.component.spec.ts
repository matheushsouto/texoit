import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardMoviesComponent } from './dashboard-movies.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MoviesService } from '../../../../shared/services/movies.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DashboardMoviesComponent', () => {
  let component: DashboardMoviesComponent;
  let fixture: ComponentFixture<DashboardMoviesComponent>;
  let service: MoviesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        DashboardMoviesComponent
      ],
      providers: [MoviesService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMoviesComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(MoviesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get movies winners on init', () => {
    const response = { years: [2000, 2001] };
    spyOn(service, 'getMoviesMultipleWins').and.returnValue(of([response]));
    component.ngOnInit();
    expect(component.yearsWithMultipleWinners).toEqual(jasmine.arrayContaining(response.years));
  });

  it('should get top three studios on init', () => {
    const response = { studios: ['Studio 1', 'Studio 2', 'Studio 3'] };
    spyOn(service, 'getStudiosWithWinCount').and.returnValue(of([response]));
    component.ngOnInit();
    expect(component.topThreeStudiosWithWinners).toEqual(jasmine.arrayContaining(response.studios));
  });

  it('should get win interval producers on init', () => {
    const response = { min: ['Producer 1'], max: ['Producer 2'] };
    spyOn(service, 'getWinIntervalProducers').and.returnValue(of([response]));
    component.ngOnInit();
    expect(component.winMinIntervalProducers).toEqual(jasmine.arrayContaining(response.min));
    expect(component.winMaxIntervalProducers).toEqual(jasmine.arrayContaining(response.max));
  });
});
