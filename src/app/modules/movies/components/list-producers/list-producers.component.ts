import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ProducerWinInterval } from '../../interfaces/producer';

@Component({
  selector: 'app-list-producers',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './list-producers.component.html',
  styleUrl: './list-producers.component.scss'
})
export class ListProducersComponent {
  @Input() columns: string[] = [];
  @Input() data!: ProducerWinInterval[];
  @Input() title = '';
}
