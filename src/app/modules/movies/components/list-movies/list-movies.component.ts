import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from '../../../../shared/services/movies.service';
import { take } from 'rxjs';
import { PaginationInfo } from '../../interfaces/pagination';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { Movie, MoviesResponse } from '../../interfaces/movie';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-list-movies',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss'],
})
export class ListMoviesComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'year', 'title', 'winner'];
  public dataSource = new MatTableDataSource<Movie>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public paginationInfo: PaginationInfo = {
    size: 5,
    page: 0,
    totalPages: 0,
    totalElements: 0,
  };
  public filterInfo: { winner?: boolean; year?: number } = {};
  public selectedWinner!: boolean;

  constructor(private movieService: MoviesService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  private loadMovies(): void {
    this.movieService
      .getAllMovies(
        this.paginationInfo.page,
        this.paginationInfo.size,
        this.filterInfo.winner,
        this.filterInfo.year
      )
      .pipe(take(1))
      .subscribe((response: MoviesResponse) => {
        this.dataSource.data = response.content;
        this.updatePaginationInfo(response);
      });
  }

  private updatePaginationInfo(response: MoviesResponse): void {
    this.paginationInfo.totalPages = response.totalPages;
    this.paginationInfo.totalElements = response.totalElements;

    if (this.paginator) {
      this.paginator.length = this.paginationInfo.totalElements;
      this.paginator.pageIndex = this.paginationInfo.page;
      this.paginator.pageSize = this.paginationInfo.size;
    }
  }

  public setPaginatorData(event: PageEvent): void {
    this.paginationInfo.page = event.pageIndex;
    this.paginationInfo.size = event.pageSize;
    this.loadMovies();
  }

  public onYearChange(data: Event): void {
    const filterValue = this.getFilterValueFromEvent(data);

    if (isNaN(parseInt(filterValue))) {
      delete this.filterInfo.year;
      return this.loadMovies();
    }

    this.filterInfo.year = parseInt(filterValue);
    this.loadMovies();
  }

  private getFilterValueFromEvent(event: Event): string {
    return (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  public onWinnerSelectionChange(value: boolean): void {
    this.filterInfo.winner = value;
    this.loadMovies();
  }
}
