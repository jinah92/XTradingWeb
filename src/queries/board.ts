import { queryOptions } from "@tanstack/react-query";

const options = {
    rootKey: 'board',
    getIdeas: () =>
      queryOptions({
        queryKey: [options.rootKey, 'ideas'],
        queryFn: () => MarketService.getMarkets(),
      }),
    getFeeds: () =>
      queryOptions({
        queryKey: [options.rootKey, 'feeds'],
        queryFn: () => MarketService.getMarkets(),
      }),
  };