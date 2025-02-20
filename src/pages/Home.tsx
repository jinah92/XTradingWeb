import React from 'react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { MarketType } from '../apis/market';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/ui';
import { MarketsOverviewChart } from '../components/chart/markets/marketsOverviewChart';

const Home = () => {
  return (
    <div className="p-3 w-full">
      <div className="ag-theme-alpine overflow-auto">
        <Tabs className="w-full" defaultValue="ALL">
          <TabsList className="grid w-full grid-cols-4">
            {Array.from<MarketType>(['ALL', 'KRW', 'BTC', 'USDT']).map(market => (
              <TabsTrigger key={market} value={market}>
                {market}
              </TabsTrigger>
            ))}
          </TabsList>
          {Array.from<MarketType>(['ALL', 'KRW', 'BTC', 'USDT']).map(market => (
            <TabsContent className="h-[800px]" key={market} value={market}>
              <MarketsOverviewChart type={market} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
