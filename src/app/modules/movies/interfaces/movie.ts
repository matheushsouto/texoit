export interface Movie {
  id: number;
  year: number;
  title: string;
  studios?: string[];
  producers?: string[];
  winner: boolean;
}

export interface MoviesResponse {
  content: Movie[];
  pageable: { pageSize: number; pageNumber: number };
  totalPages: number;
  totalElements: number;
}


export interface MovieData {
  id: number;
  year: number;
  title: string;
  studios: string[];
  producers: string[];
  winner: boolean;
}

export interface Sort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

export interface MoviesResponseData {
  content: MovieData[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

