import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-list-studios-years',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './list-studios-years.component.html',
  styleUrl: './list-studios-years.component.scss'
})
export class ListStudiosYearsComponent {
  @Input() columns: string[] = [];
  @Input() data: any;
  @Input() title = '';
}
