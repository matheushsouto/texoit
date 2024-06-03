import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMoviesYearsComponent } from './list-movies-years.component';

describe('ListMoviesYearsComponent', () => {
  let component: ListMoviesYearsComponent;
  let fixture: ComponentFixture<ListMoviesYearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMoviesYearsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListMoviesYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
