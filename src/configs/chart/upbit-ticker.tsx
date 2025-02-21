import SignedNumberTypo from '../../components/typography/SignedNumberTypo';
import { currencyFormatter, percentFormatter } from '../../lib/formatter';

import type { UpbitTicker } from '../../apis/ticker';
import type { GridOptions, ValueFormatterParams, ICellRendererParams } from 'ag-grid-community';

export const realtimeCurrencyOptions: GridOptions<UpbitTicker> = {
  getRowId: ({ data }) => data.market,
  pagination: true,
  paginationPageSize: 20,
  columnDefs: [
    { field: 'code', headerName: 'Currency' },
    {
      field: 'trade_price',
      headerName: 'Price',
      valueFormatter: (params: ValueFormatterParams<UpbitTicker, number>) => currencyFormatter(params.value!),
    },
    {
      field: 'signed_change_rate',
      headerName: 'Change',
      cellRenderer: (params: ICellRendererParams<UpbitTicker, number>) => (
        <SignedNumberTypo data={params.value!} formatter={percentFormatter} />
      ),
    },
    {
      field: 'acc_trade_volume_24h',
      headerName: '24h Volume',
      valueFormatter: ({ value }) => currencyFormatter(value as number),
    },
    {
      field: 'acc_trade_price_24h',
      headerName: '24h Price',
      valueFormatter: ({ value }) => currencyFormatter(value as number),
    },
    {
      field: 'prev_closing_price',
      headerName: 'Previous Closing Price',
      valueFormatter: ({ value }) => currencyFormatter(value as number),
    },
  ],
};
