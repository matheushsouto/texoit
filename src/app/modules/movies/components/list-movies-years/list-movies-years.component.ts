import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-list-movies-years',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './list-movies-years.component.html',
  styleUrl: './list-movies-years.component.scss'
})
export class ListMoviesYearsComponent {
  @Input() columns: string[] = [];
  @Input() data: any;
  @Input() title = '';
}
