import { useRef, useMemo } from 'react';
import React from 'react';

import { AgGridReact } from 'ag-grid-react';

import { realtimeCurrencyOptions } from '../../../configs/chart/upbit-ticker';
import { UPBIT_URL } from '../../../configs/ws-upbit/config';
import { useWebSocket } from '../../../hooks/websocket/use-websocket';
import { useSelectMarketsQuery } from '../../../queries';

import type { MarketType } from '../../../apis/market';
import type { UpbitTicker } from '../../../apis/ticker';
import type { GridApi, GridReadyEvent } from 'ag-grid-community';

export const MarketsOverviewChart = React.memo(({ type }: { type: MarketType }) => {
  const gridApiRef = useRef<GridApi<UpbitTicker> | null>(null);
  const { data } = useSelectMarketsQuery(type);

  const onGridReady = (params: GridReadyEvent<UpbitTicker, any>) => {
    gridApiRef.current = params.api;
  };

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

  async function onMessage(event: MessageEvent) {
    const text = await (event.data as Blob).text();
    const json = JSON.parse(text) as UpbitTicker;
    if (gridApiRef.current) {
      const rowNode = gridApiRef.current?.getRowNode(json.code as string);
      rowNode?.updateData(json);
    }
  }

  const { isConnect } = useWebSocket(UPBIT_URL, tickerMessage, onMessage);

  const handleMarketRow = (event: { data: UpbitTicker }) => {
    const path = `/market/${event.data.code}`;
    const fullPath = `${window.location.origin}${path}`; // Construct full URL
    window.open(fullPath, '_blank', 'noopener,noreferrer'); // Open in new tab
  };

  return (
    isConnect && (
      <AgGridReact<UpbitTicker>
        onRowClicked={handleMarketRow}
        onGridReady={onGridReady}
        rowData={data}
        {...realtimeCurrencyOptions}
      />
    )
  );
});
