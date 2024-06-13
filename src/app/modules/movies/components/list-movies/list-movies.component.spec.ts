import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ListMoviesComponent } from './list-movies.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MoviesService } from '../../../../shared/services/movies.service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { of } from 'rxjs';
import { mockMoviesResponse } from '../../../../mock/movies-response-mock';

describe('ListMoviesComponent', () => {
  let component: ListMoviesComponent;
  let fixture: ComponentFixture<ListMoviesComponent>;
  let movieService: jasmine.SpyObj<MoviesService>;

  beforeEach(async () => {
    const movieServiceSpy = jasmine.createSpyObj('MoviesService', ['getAllMovies']);
    await TestBed.configureTestingModule({
      imports: [
        ListMoviesComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: MoviesService, useValue: movieServiceSpy }
      ]
    })
    .compileComponents();

    movieService = TestBed.inject(MoviesService) as jasmine.SpyObj<MoviesService>;
    movieService.getAllMovies.and.returnValue(of(mockMoviesResponse));

    fixture = TestBed.createComponent(ListMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies on init', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(movieService.getAllMovies).toHaveBeenCalled();
    expect(component.dataSource.data.length).toBe(2);
  }));

  it('should update pagination info after loading movies', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.paginationInfo.totalPages).toBe(mockMoviesResponse.totalPages);
    expect(component.paginationInfo.totalElements).toBe(mockMoviesResponse.totalElements);
  }));

  it('should set paginator data and reload movies on paginator event', fakeAsync(() => {
    const pageEvent: PageEvent = { pageIndex: 1, pageSize: 5, length: 10 };
    component.setPaginatorData(pageEvent);
    tick();
    expect(component.paginationInfo.page).toBe(1);
    expect(component.paginationInfo.size).toBe(5);
    expect(movieService.getAllMovies).toHaveBeenCalled();
  }));

  it('should apply year filter and reload movies', fakeAsync(() => {
    const event = { target: { value: '2021' } } as unknown as Event;
    component.onYearChange(event);
    tick();
    expect(component.filterInfo.year).toBe(2021);
    expect(movieService.getAllMovies).toHaveBeenCalled();
  }));

  it('should clear year filter if input is not a number', fakeAsync(() => {
    const event = { target: { value: 'not-a-number' } } as unknown as Event;
    component.onYearChange(event);
    tick();
    expect(component.filterInfo.year).toBeUndefined();
    expect(movieService.getAllMovies).toHaveBeenCalled();
  }));

  it('should apply winner filter and reload movies', fakeAsync(() => {
    component.onWinnerSelectionChange(true);
    tick();
    expect(component.filterInfo.winner).toBe(true);
    expect(movieService.getAllMovies).toHaveBeenCalled();
  }));

  it('should update winner filter correctly when updateWinnerFilter is called', fakeAsync(() => {
    component['updateWinnerFilter']('all' as unknown as boolean);
    tick();
    expect(component.filterInfo.winner).toBeUndefined();
    component['updateWinnerFilter'](true);
    tick();
    expect(component.filterInfo.winner).toBe(true);
    component['updateWinnerFilter'](false);
    tick();
    expect(component.filterInfo.winner).toBe(false);
  }));

  it('should remove winner filter when removeWinnerFilter is called', fakeAsync(() => {
    component.onWinnerSelectionChange(true);
    tick();
    expect(component.filterInfo.winner).toBe(true);
    component['removeWinnerFilter']();
    tick();
    expect(component.filterInfo.winner).toBeUndefined();
  }));
});
