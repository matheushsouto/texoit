import { WinIntervalProducersResponse } from "../modules/movies/interfaces/producer";

export const mockWinIntervalResponse: WinIntervalProducersResponse = {
  min: [{ producer: 'Producer A', interval: 1, previousWin: 2000, followingWin: 2001 }],
  max: [{ producer: 'Producer B', interval: 10, previousWin: 1990, followingWin: 2000 }]
};
