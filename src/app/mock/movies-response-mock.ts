import { MoviesResponseData } from "../modules/movies/interfaces/movie";

export const mockMoviesResponse: MoviesResponseData = {
  content: [
    { id: 1, year: 2020, title: 'Movie 1', studios: ['Studio 1'], producers: ['Producer 1'], winner: true },
    { id: 2, year: 2021, title: 'Movie 2', studios: ['Studio 2'], producers: ['Producer 2'], winner: false },
  ],
  pageable: {
    sort: { unsorted: true, sorted: false, empty: true },
    offset: 0,
    pageSize: 5,
    pageNumber: 0,
    paged: true,
    unpaged: false
  },
  totalPages: 1,
  totalElements: 2,
  last: true,
  size: 5,
  number: 0,
  sort: { unsorted: true, sorted: false, empty: true },
  first: true,
  numberOfElements: 2,
  empty: false
};
