import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListWinnersComponent } from './list-winners.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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

  it('should emit searchItem event when getItems is called with a number', () => {
    spyOn(component.searchItem, 'emit');
    const event = { target: { value: '123' } } as any as Event;
    component.getItems(event);
    expect(component.searchItem.emit).toHaveBeenCalledWith(123);
  });

  it('should not emit searchItem event when getItems is called with a non-number', () => {
    spyOn(component.searchItem, 'emit');
    const event = { target: { value: 'abc' } } as any as Event;
    component.getItems(event);
    expect(component.searchItem.emit).not.toHaveBeenCalled();
  });
});
