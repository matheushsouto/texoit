import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const moviesMultipleWinners = [
      {
        years: [
          {
            year: 1986,
            winnerCount: 2,
          },
          {
            year: 1990,
            winnerCount: 2,
          },
          {
            year: 2015,
            winnerCount: 2,
          },
        ],
      },
    ];

    const studiosWithWinCount = [
      {
        studios: [
          {
            name: 'Columbia Pictures',
            winCount: 6,
          },
          {
            name: 'Paramount Pictures',
            winCount: 6,
          },
          {
            name: 'Warner Bros',
            winCount: 5,
          },
        ],
      },
    ];

    const winIntervalProducers = [
      {
        min: [
          {
            producer: 'Producer Name',
            interval: 9,
            previousWin: 2018,
            followingWin: 2019,
          },
        ],
        max: [
          {
            producer: 'Producer Name',
            interval: 99,
            previousWin: 1900,
            followingWin: 1999,
          },
        ],
      },
    ];

    const moviePerYear = [
      {
        movies: [
          {
            id: 1,
            year: 1990,
            title: 'Movie Title',
            studios: ['Studio name'],
            producers: ['Producer name'],
            winner: true,
          },
          {
            id: 2,
            year: 1991,
            title: 'Movie Title',
            studios: ['Studio name'],
            producers: ['Producer name'],
            winner: true,
          },
          {
            id: 3,
            year: 1992,
            title: 'Movie Title',
            studios: ['Studio name'],
            producers: ['Producer name'],
            winner: true,
          },
          {
            id: 5,
            year: 1993,
            title: 'Movie Title',
            studios: ['Studio name'],
            producers: ['Producer name'],
            winner: true,
          },
          {
            id: 99,
            year: 1994,
            title: 'Movie Title',
            studios: ['Studio name'],
            producers: ['Producer name'],
            winner: true,
          },
        ],
      },
    ];
    return {
      moviesMultipleWinners,
      studiosWithWinCount,
      winIntervalProducers,
      moviePerYear,
    };
  }
}
