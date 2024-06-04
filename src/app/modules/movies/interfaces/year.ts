export interface YearWithMultipleWinners {
  year: number;
  winnerCount: number;
}

export interface YearsResponse {
  years: YearWithMultipleWinners[];
}
