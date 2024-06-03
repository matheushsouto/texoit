import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStudiosYearsComponent } from './list-studios-years.component';

describe('ListStudiosYearsComponent', () => {
  let component: ListStudiosYearsComponent;
  let fixture: ComponentFixture<ListStudiosYearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListStudiosYearsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStudiosYearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
