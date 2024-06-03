import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWinnersComponent } from './list-winners.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SimpleChanges } from '@angular/core';

describe('ListWinnersComponent', () => {
  let component: ListWinnersComponent;
  let fixture: ComponentFixture<ListWinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ListWinnersComponent,
        BrowserAnimationsModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set dataDefault on changes if data is provided', () => {
    const mockData = [{ year: 2000, title: 'Movie 1' }];
    component.data = mockData;

    const changes: SimpleChanges = {
      data: {
        currentValue: mockData,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true
      }
    };

    component.ngOnChanges(changes);
    expect(component.dataDefault).toEqual(mockData);
  });

  it('should not set dataDefault on changes if data is not provided', () => {
    component.data = null;

    const changes: SimpleChanges = {
      data: {
        currentValue: null,
        previousValue: [{ year: 2000, title: 'Movie 1' }],
        firstChange: false,
        isFirstChange: () => false
      }
    };

    component.ngOnChanges(changes);
    expect(component.dataDefault).toBeUndefined();
  });

  it('should filter data by year when a filter is applied', () => {
    const mockData = [
      { year: 2000, title: 'Movie 1' },
      { year: 2001, title: 'Movie 2' }
    ];
    component.data = mockData;
    component.dataDefault = mockData;

    const event = { target: { value: '2000' } } as unknown as Event;
    component.applyFilter(event);
    expect(component.data).toEqual([{ year: 2000, title: 'Movie 1' }]);
  });

  it('should reset data to default when filter is empty', () => {
    const mockData = [
      { year: 2000, title: 'Movie 1' },
      { year: 2001, title: 'Movie 2' }
    ];
    component.data = [{ year: 2000, title: 'Movie 1' }];
    component.dataDefault = mockData;

    const event = { target: { value: '' } } as unknown as Event;
    component.applyFilter(event);
    expect(component.data).toEqual(mockData);
  });

  it('should get filter value from event', () => {
    const event = { target: { value: ' 2000 ' } } as unknown as Event;
    const filterValue = component['getFilterValueFromEvent'](event);
    expect(filterValue).toBe('2000');
  });

  it('should check if filter value is empty', () => {
    const emptyFilterValue = '';
    const nonEmptyFilterValue = '2000';

    expect(component['isFilterValueEmpty'](emptyFilterValue)).toBeTrue();
    expect(component['isFilterValueEmpty'](nonEmptyFilterValue)).toBeFalse();
  });

  it('should check if movie year contains filter value', () => {
    const movie = { year: 2000, title: 'Movie 1' };
    const filterValue = '2000';

    expect(component['isMovieYearContainsFilterValue'](movie, filterValue)).toBeTrue();
  });
});
