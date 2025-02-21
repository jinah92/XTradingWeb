import { createChart, ColorType, CandlestickSeries, IChartApi, ISeriesApi } from 'lightweight-charts';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ISODateString, MarketCandleRange } from '../../../app/const/market';
import { useMarketCandlesMinuteQuery } from '../../../queries';
import { Button } from '@shared';

interface TradingChartProps {
  market: string;
}

export const TradingChart = ({ market }: TradingChartProps) => {
  const [interval, setInterval] = useState<MarketCandleRange>('1D');
  const { data, isLoading } = useMarketCandlesMinuteQuery(market, interval);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<ISODateString>('');
  const chartInstance = useRef<IChartApi | null>(null);
  const seriesInstance = useRef<ISeriesApi<'Candlestick'> | null>(null);

  useEffect(() => {
    if (isLoading) return;

    if (data?.length && seriesInstance.current && chartInstance.current) {
      chartInstance.current.timeScale().fitContent();
      seriesInstance.current?.setData(data.getData());
      toRef.current = data.firstDate;
    }
  }, [isLoading, interval]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
    };

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#ffffff' },
        textColor: '#000000',
      },
      width: chartContainerRef.current.clientWidth,
      autoSize: true,
      height: 300,
      timeScale: {
        timeVisible: true, // 시간을 가로축에 표시
        secondsVisible: false, // 초 단위는 비활성화
        fixLeftEdge: true,
        fixRightEdge: true,
      },
    });

    const newSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
      priceFormat: {
        type: 'volume',
      },
    });

    window.addEventListener('resize', handleResize);

    seriesInstance.current = newSeries;
    chartInstance.current = chart;

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  const handleInterval = useCallback(
    ({ target }: React.MouseEvent<HTMLButtonElement>) =>
      setInterval((target as HTMLButtonElement).value as MarketCandleRange),
    [],
  );

  return (
    <div className="flex flex-col">
      <div className="flex gap-1">
        {['1D', '7D', '1M', '3M'].map(value => (
          <Button
            key={value}
            variant={interval === value ? 'default' : 'secondary'}
            onClick={handleInterval}
            value={value}
          >
            {value}
          </Button>
        ))}
      </div>
      <div ref={chartContainerRef} />
    </div>
  );
};
