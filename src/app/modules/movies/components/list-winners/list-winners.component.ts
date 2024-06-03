import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

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
export class ListWinnersComponent implements OnChanges{
  @Input() columns: string[] = [];
  @Input() title = '';
  @Input() data: any;
  public dataDefault: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.data) {
      return;
    }
    this.dataDefault = this.data
  }

  public applyFilter(event: Event) {
    const filterValue = this.getFilterValueFromEvent(event);

    if (this.isFilterValueEmpty(filterValue)) {
      this.resetDataToDefault();
    } else {
      this.filterDataByYear(filterValue);
    }
  }

  private getFilterValueFromEvent(event: Event): string {
    return (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  private isFilterValueEmpty(filterValue: string): boolean {
    return filterValue === '';
  }

  private resetDataToDefault(): void {
    this.data = this.dataDefault;
  }

  private filterDataByYear(filterValue: string): void {
    this.data = this.dataDefault.filter((movie: any) => this.isMovieYearContainsFilterValue(movie, filterValue));
  }

  private isMovieYearContainsFilterValue(movie: any, filterValue: string): boolean {
    return movie.year.toString().includes(filterValue);
  }
}
