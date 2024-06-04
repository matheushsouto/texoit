import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-list-producers',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './list-producers.component.html',
  styleUrl: './list-producers.component.scss'
})
export class ListProducersComponent {
  @Input() columns: string[] = [];
  @Input() data: any;
  @Input() title = '';
}
