import React, { useMemo, useRef, useState } from 'react';
import { UseWebSocket } from '../hooks/websocket/use-websocket';
import { AgGridReact } from 'ag-grid-react';
import { GridApi, GridReadyEvent } from 'ag-grid-community';

import { UPBIT_URL } from '../configs/ws-upbit/config';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { useSelectMarketsQuery } from '../queries/upbit';
import { MarketType, UpbitTicker } from '../apis/market';
import { realtimeCurrencyOptions } from '../configs/chart/upbit-ticker';

const Home = () => {
  const gridApiRef = useRef<GridApi<UpbitTicker> | null>(null);
  const [marketType] = useState<MarketType>('KRW');
  const { data } = useSelectMarketsQuery(marketType);

  const tickerMessage = useMemo(() => {
    if (data) {
      return [
        {
          ticket: 'currency_status',
        },
        { type: 'ticker', codes: data?.map(item => item.market) },
      ];
    }
    return undefined;
  }, [data]);

  const { isConnect } = UseWebSocket(UPBIT_URL, tickerMessage, onMessage);

  async function onMessage(event: MessageEvent) {
    const text = await (event.data as Blob).text();
    const json = JSON.parse(text) as UpbitTicker;
    if (gridApiRef.current) {
      const rowNode = gridApiRef.current?.getRowNode(json.code as string);
      rowNode?.updateData(json);
    }
  }

  const onGridReady = (params: GridReadyEvent<UpbitTicker, any>) => {
    gridApiRef.current = params.api;
  };

  return (
    <div className="p-3 w-full h-">
      {isConnect && (
        <div className="ag-theme-alpine h-[70vh] overflow-auto">
          <AgGridReact<UpbitTicker> onGridReady={onGridReady} rowData={data} {...realtimeCurrencyOptions} />
        </div>
      )}
    </div>
  );
};

export default Home;
