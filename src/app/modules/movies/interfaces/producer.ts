export interface ProducerWinInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface WinIntervalProducersResponse {
  min: ProducerWinInterval[];
  max: ProducerWinInterval[];
}
