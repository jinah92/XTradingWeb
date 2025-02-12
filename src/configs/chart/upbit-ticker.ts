import type { GridOptions, ValueFormatterParams } from 'ag-grid-community';
import { UpbitTicker } from '../../apis/market';
import { currencyFormatter, percentFormatter } from '../../lib/formatter';

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
      valueFormatter: ({ value }) => percentFormatter(value as number),
    },
    {
      field: 'acc_trade_volume_24h',
      headerName: '24h Volume',
      valueFormatter: ({ value }) => currencyFormatter(value as number, 2, { K: 'K', M: 'M', B: 'B', G: 'G' }),
    },
    {
      field: 'acc_trade_price_24h',
      headerName: '24h Price',
      valueFormatter: ({ value }) => currencyFormatter(value as number, 2, { K: 'K', M: 'M', B: 'B', G: 'G' }),
    },
    {
      field: 'prev_closing_price',
      headerName: 'Previous Closing Price',
      valueFormatter: ({ value }) => currencyFormatter(value as number),
    },
  ],
};
