import React, { useRef, useState } from 'react';
import { ChartUpbitTicker, UpbitTicker } from '../types/ticker';
import { UseWebSocket } from '../hooks/websocket/use-websocket';
import { AgGridReact } from 'ag-grid-react';
import { GridApi } from 'ag-grid-community';

import { currencyFormatter } from '../lib/formatter';
import { UPBIT_TICKER_MESSAGE, UPBIT_URL, COIN_LIST } from '../configs/ws-upbit/config';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const Home = () => {
  const [data, setData] = useState<UpbitTicker[]>(COIN_LIST);
  const { isConnect } = UseWebSocket(UPBIT_URL, UPBIT_TICKER_MESSAGE, onMessage);
  const gridApiRef = useRef<GridApi<ChartUpbitTicker> | null>(null);

  async function onMessage(event: MessageEvent) {
    const text = await (event.data as Blob).text();
    const json = JSON.parse(text) as ChartUpbitTicker;
    if (gridApiRef.current) {
      const rowNode = gridApiRef.current?.getRowNode(json.code as string);
      rowNode?.setData(json);
    } else {
      setData(data => data.map(item => (item.code === json.code ? { ...item, ...json } : item)));
    }
  }

  return (
    <div className="p-3 w-full">
      {isConnect && (
        <div className="ag-theme-alpine h-[calc(80vh-300px)] max-h-[1000px] overflow-auto">
          <AgGridReact<UpbitTicker>
            ref={ref => (gridApiRef.current = (ref as AgGridReact<UpbitTicker>)?.api || null)}
            rowData={data}
            getRowId={params => params.data.code!}
            columnDefs={[
              { field: 'code', headerName: 'Currency' },
              {
                field: 'trade_price',
                headerName: 'Price',
                valueFormatter: ({ value }) => currencyFormatter(value as number),
              },
              {
                field: 'signed_change_rate',
                headerName: 'Change',
                valueFormatter: params => `${Math.round(params.value * 100) / 100}%`,
              },
              {
                field: 'acc_trade_volume_24h',
                headerName: '24h Volume',
                valueFormatter: ({ value }) =>
                  currencyFormatter(value as number, 2, { K: 'K', M: 'M', B: 'B', G: 'G' }),
              },
              {
                field: 'acc_trade_price_24h',
                headerName: '24h Price',
                valueFormatter: ({ value }) =>
                  currencyFormatter(value as number, 2, { K: 'K', M: 'M', B: 'B', G: 'G' }),
              },
              {
                field: 'prev_closing_price',
                headerName: 'Previous Closing Price',
                valueFormatter: ({ value }) => currencyFormatter(value as number),
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
