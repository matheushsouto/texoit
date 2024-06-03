import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
  producer: string;
  interval: string;
  previous: string;
  following: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {producer: '1986', interval: '2', previous: 'sdsds', following: 'asdasd'},
  {producer: '1986', interval: '2', previous: 'sdsds', following: 'asdasd'},
  {producer: '1986', interval: '2', previous: 'sdsds', following: 'asdasd'},
  {producer: '1986', interval: '2', previous: 'sdsds', following: 'asdasd'}
];

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
