import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-list-winners',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './list-winners.component.html',
  styleUrl: './list-winners.component.scss'
})
export class ListWinnersComponent {
  @Input() columns: string[] = [];
  @Input() title = '';
  @Input() data: any;
  @Output() searchItem = new EventEmitter<number>();

  public getItems(data: Event) {
    const filterValue = this.getFilterValueFromEvent(data);

    if (isNaN(parseInt(filterValue))) {
      return;
    }

    this.searchItem.emit(parseInt(filterValue));
  }

  private getFilterValueFromEvent(event: Event): string {
    return (event.target as HTMLInputElement).value.trim().toLowerCase();
  }
}
