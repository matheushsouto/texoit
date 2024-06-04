import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { YearWithMultipleWinners } from '../../interfaces/year';

@Component({
  selector: 'app-list-movies-years',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './list-movies-years.component.html',
  styleUrl: './list-movies-years.component.scss'
})
export class ListMoviesYearsComponent {
  @Input() columns: string[] = [];
  @Input() data!: YearWithMultipleWinners[];
  @Input() title = '';
}
