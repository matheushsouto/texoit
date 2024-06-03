import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProducersComponent } from './list-producers.component';

describe('ListProducersComponent', () => {
  let component: ListProducersComponent;
  let fixture: ComponentFixture<ListProducersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProducersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListProducersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
