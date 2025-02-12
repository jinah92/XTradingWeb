import { GridApi, GridReadyEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useRef, useMemo } from 'react';
import { MarketType, UpbitTicker } from '../../../apis/market';
import { realtimeCurrencyOptions } from '../../../configs/chart/upbit-ticker';
import { UPBIT_URL } from '../../../configs/ws-upbit/config';
import { useWebSocket } from '../../../hooks/websocket/use-websocket';
import { useSelectMarketsQuery } from '../../../queries/upbit';
import React from 'react';

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

  return (
    isConnect && <AgGridReact<UpbitTicker> onGridReady={onGridReady} rowData={data} {...realtimeCurrencyOptions} />
  );
});
