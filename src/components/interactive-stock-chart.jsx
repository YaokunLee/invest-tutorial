import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const DEFAULT_HEIGHT = 380;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const asFiniteNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const normalizeDate = (time) => {
  if (!time) return null;
  if (typeof time === 'string') return time;
  if (typeof time === 'object' && time.year && time.month && time.day) {
    return `${time.year}-${String(time.month).padStart(2, '0')}-${String(time.day).padStart(2, '0')}`;
  }
  return null;
};

const getDateValue = (date) => {
  if (!DATE_PATTERN.test(date)) return Number.NaN;
  return new Date(`${date}T00:00:00Z`).getTime();
};

const normalizePriceData = (data) =>
  data
    .map((point) => {
      const date = normalizeDate(point.date || point.time);
      const close = asFiniteNumber(point.close ?? point.value);
      if (!date || close == null) return null;

      const open = asFiniteNumber(point.open);
      const high = asFiniteNumber(point.high);
      const low = asFiniteNumber(point.low);
      const hasOhlc = open != null && high != null && low != null;

      return {
        ...point,
        date,
        time: date,
        close,
        open: hasOhlc ? open : null,
        high: hasOhlc ? high : null,
        low: hasOhlc ? low : null,
        hasOhlc,
        dateValue: getDateValue(date),
      };
    })
    .filter((point) => point && Number.isFinite(point.dateValue))
    .sort((a, b) => a.dateValue - b.dateValue);

const resolveChartType = (chartType, data) => {
  if (chartType === 'candlestick') return 'candlestick';
  if (chartType === 'area') return 'area';
  return data.length > 0 && data.every((point) => point.hasOhlc) ? 'candlestick' : 'area';
};

const buildSeriesData = (data, chartType) => {
  if (chartType === 'candlestick') {
    return data.map((point) => ({
      time: point.date,
      open: point.open ?? point.close,
      high: point.high ?? point.close,
      low: point.low ?? point.close,
      close: point.close,
    }));
  }

  return data.map((point) => ({
    time: point.date,
    value: point.close,
  }));
};

const createPriceFormatter = (currency) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  });

const formatPercent = (value) => {
  if (!Number.isFinite(value)) return '-';
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
};

const findNearestIndex = (data, date) => {
  if (!date || !data.length) return -1;
  const target = getDateValue(date);
  if (!Number.isFinite(target)) return -1;

  let low = 0;
  let high = data.length - 1;

  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    const value = data[middle].dateValue;
    if (value === target) return middle;
    if (value < target) low = middle + 1;
    else high = middle - 1;
  }

  if (low <= 0) return 0;
  if (low >= data.length) return data.length - 1;

  const before = data[low - 1];
  const after = data[low];
  return target - before.dateValue <= after.dateValue - target ? low - 1 : low;
};

const getRangeStats = (data, startDate, endDate) => {
  const startIndex = findNearestIndex(data, startDate);
  const endIndex = findNearestIndex(data, endDate);
  if (startIndex < 0 || endIndex < 0) return null;

  const [fromIndex, toIndex] =
    startIndex <= endIndex ? [startIndex, endIndex] : [endIndex, startIndex];
  const from = data[fromIndex];
  const to = data[toIndex];
  const change = to.close - from.close;
  const changePercent = from.close === 0 ? Number.NaN : (change / from.close) * 100;

  return {
    from,
    to,
    change,
    changePercent,
    tradingDays: toIndex - fromIndex + 1,
  };
};

const buildChartOptions = () => ({
  layout: {
    background: { type: 'solid', color: '#101624' },
    textColor: '#94a3b8',
    fontFamily:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  grid: {
    vertLines: { color: 'rgba(148, 163, 184, 0.08)' },
    horzLines: { color: 'rgba(148, 163, 184, 0.10)' },
  },
  crosshair: {
    vertLine: {
      color: 'rgba(226, 232, 240, 0.58)',
      labelBackgroundColor: '#111827',
      width: 1,
    },
    horzLine: {
      color: 'rgba(226, 232, 240, 0.35)',
      labelBackgroundColor: '#111827',
      width: 1,
    },
  },
  rightPriceScale: {
    borderColor: 'rgba(148, 163, 184, 0.18)',
    scaleMargins: {
      top: 0.12,
      bottom: 0.16,
    },
  },
  timeScale: {
    borderColor: 'rgba(148, 163, 184, 0.18)',
    timeVisible: true,
    secondsVisible: false,
  },
  handleScale: {
    axisPressedMouseMove: true,
    mouseWheel: true,
    pinch: true,
  },
  handleScroll: {
    mouseWheel: true,
    pressedMouseMove: true,
    horzTouchDrag: true,
    vertTouchDrag: false,
  },
});

const buildSeries = (LightweightCharts, chart, chartType) => {
  if (chartType === 'candlestick') {
    return chart.addSeries(LightweightCharts.CandlestickSeries, {
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderUpColor: '#22c55e',
      borderDownColor: '#ef4444',
      wickUpColor: '#86efac',
      wickDownColor: '#fca5a5',
      priceLineVisible: false,
      lastValueVisible: true,
    });
  }

  return chart.addSeries(LightweightCharts.AreaSeries, {
    lineColor: '#38bdf8',
    topColor: 'rgba(56, 189, 248, 0.34)',
    bottomColor: 'rgba(14, 165, 233, 0.02)',
    lineWidth: 2,
    priceLineVisible: false,
    lastValueVisible: true,
  });
};

const getDefaultSelection = (data, initialStartDate, initialEndDate) => ({
  start: initialStartDate || data[0]?.date,
  end: initialEndDate || data[data.length - 1]?.date,
});

/**
 * Reusable tutorial stock chart.
 *
 * `data` may be close-only:
 *   { date: '2024-01-02', close: 123.45 }
 *
 * or OHLC candlestick data:
 *   { date: '2024-01-02', open: 120, high: 126, low: 119, close: 123.45 }
 */
const InteractiveStockChart = ({
  title,
  subtitle,
  ticker,
  data = [],
  events = [],
  initialStartDate,
  initialEndDate,
  chartType = 'auto',
  currency = 'USD',
  height = DEFAULT_HEIGHT,
  showRangeSummary = false,
  enableRangeSelection = false,
  enableEventSelection = false,
  showEvents = true,
}) => {
  const chartNodeRef = useRef(null);
  const chartApiRef = useRef(null);
  const selectionRef = useRef(null);
  const dragStartRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [selection, setSelection] = useState({ start: undefined, end: undefined });
  const [selectionBox, setSelectionBox] = useState(null);

  const priceFormatter = useMemo(() => createPriceFormatter(currency), [currency]);
  const formatPrice = useCallback(
    (value) => (Number.isFinite(value) ? priceFormatter.format(value) : '-'),
    [priceFormatter]
  );

  const priceData = useMemo(() => normalizePriceData(data), [data]);
  const resolvedChartType = useMemo(
    () => resolveChartType(chartType, priceData),
    [chartType, priceData]
  );
  const seriesData = useMemo(
    () => buildSeriesData(priceData, resolvedChartType),
    [priceData, resolvedChartType]
  );
  const defaultSelection = useMemo(
    () => getDefaultSelection(priceData, initialStartDate, initialEndDate),
    [priceData, initialStartDate, initialEndDate]
  );

  const markers = useMemo(
    () =>
      events
        .map((event, index) => {
          const nearest = priceData[findNearestIndex(priceData, event.date)];
          if (!nearest) return null;

          return {
            time: nearest.date,
            position: 'aboveBar',
            color: event.color || '#f59e0b',
            shape: 'circle',
            text: String(index + 1),
            size: 1.25,
          };
        })
        .filter(Boolean),
    [events, priceData]
  );

  const stats = useMemo(
    () => (showRangeSummary ? getRangeStats(priceData, selection.start, selection.end) : null),
    [priceData, selection, showRangeSummary]
  );

  const updateSelectionBox = useCallback(() => {
    if (!showRangeSummary) {
      setSelectionBox(null);
      return;
    }

    const chart = chartApiRef.current;
    const currentSelection = selectionRef.current;
    if (!chart || !currentSelection?.start || !currentSelection?.end) {
      setSelectionBox(null);
      return;
    }

    const startCoordinate = chart.timeScale().timeToCoordinate(currentSelection.start);
    const endCoordinate = chart.timeScale().timeToCoordinate(currentSelection.end);
    if (startCoordinate == null || endCoordinate == null) {
      setSelectionBox(null);
      return;
    }

    setSelectionBox({
      left: Math.min(startCoordinate, endCoordinate),
      width: Math.max(Math.abs(endCoordinate - startCoordinate), 2),
    });
  }, [showRangeSummary]);

  useEffect(() => {
    setSelection(defaultSelection);
  }, [defaultSelection]);

  useEffect(() => {
    selectionRef.current = selection;
    updateSelectionBox();
  }, [selection, updateSelectionBox]);

  useEffect(() => {
    if (!seriesData.length) {
      setIsReady(false);
      return undefined;
    }

    let resizeObserver;
    let isMounted = true;
    let series;

    const setupChart = async () => {
      setIsReady(false);
      const LightweightCharts = await import('lightweight-charts');
      if (!isMounted || !chartNodeRef.current) return;

      const chart = LightweightCharts.createChart(chartNodeRef.current, {
        ...buildChartOptions(),
        width: chartNodeRef.current.clientWidth,
        height: chartNodeRef.current.clientHeight,
      });

      series = buildSeries(LightweightCharts, chart, resolvedChartType);
      series.setData(seriesData);
      LightweightCharts.createSeriesMarkers(series, markers);
      chart.timeScale().fitContent();

      const handleVisibleRangeChange = () => updateSelectionBox();

      chart.timeScale().subscribeVisibleTimeRangeChange(handleVisibleRangeChange);

      resizeObserver = new ResizeObserver(([entry]) => {
        if (!entry) return;
        chart.resize(entry.contentRect.width, entry.contentRect.height);
        window.requestAnimationFrame(updateSelectionBox);
      });
      resizeObserver.observe(chartNodeRef.current);

      chartApiRef.current = chart;
      setIsReady(true);
      window.requestAnimationFrame(updateSelectionBox);
    };

    setupChart();

    return () => {
      isMounted = false;
      resizeObserver?.disconnect();
      chartApiRef.current?.remove();
      chartApiRef.current = null;
      series = null;
    };
  }, [markers, resolvedChartType, seriesData, updateSelectionBox]);

  const getDateFromPointer = (event) => {
    if (!enableRangeSelection) return null;

    const chart = chartApiRef.current;
    const node = chartNodeRef.current;
    if (!chart || !node) return null;

    const rect = node.getBoundingClientRect();
    const pointerDate = normalizeDate(chart.timeScale().coordinateToTime(event.clientX - rect.left));
    const nearest = priceData[findNearestIndex(priceData, pointerDate)];
    return nearest?.date || null;
  };

  const handlePointerDown = (event) => {
    const date = getDateFromPointer(event);
    if (!date) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStartRef.current = date;
    setSelection({ start: date, end: date });
  };

  const handlePointerMove = (event) => {
    if (!dragStartRef.current) return;
    const date = getDateFromPointer(event);
    if (!date) return;
    setSelection({ start: dragStartRef.current, end: date });
  };

  const handlePointerUp = (event) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragStartRef.current = null;
  };

  const selectFromEvent = (date) => {
    if (!enableEventSelection) return;

    const start = priceData[findNearestIndex(priceData, date)]?.date;
    setSelection({
      start,
      end: priceData[priceData.length - 1]?.date,
    });
  };

  const resetSelection = () => {
    setSelection(defaultSelection);
    chartApiRef.current?.timeScale().fitContent();
  };

  const deltaTone = stats?.changePercent >= 0 ? 'text-emerald-300' : 'text-rose-300';
  const rangeLabel = stats
    ? `${stats.from.date} -> ${stats.to.date} · ${stats.tradingDays} 个交易日 · ${formatPercent(
        stats.changePercent
      )} / ${formatPrice(stats.change)}`
    : '选择一段区间查看涨跌幅';
  const chartKindLabel = resolvedChartType === 'candlestick' ? 'K 线' : '收盘价';

  if (!priceData.length) {
    return (
      <div className="my-6 rounded border border-slate-200 bg-slate-50 px-4 py-5 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900">
        暂无可用股价数据。
      </div>
    );
  }

  return (
    <section className="my-8 overflow-hidden rounded-lg border border-slate-200 bg-slate-950 text-slate-100 shadow-xl shadow-slate-900/10 dark:border-slate-700">
      <div className="border-b border-white/10 px-4 py-4 sm:px-5">
        <div>
          <div className="text-xs font-semibold uppercase text-sky-300">
            {ticker} / {chartKindLabel}
          </div>
          <h3 className="mt-1 text-base font-semibold text-white">{title}</h3>
          {subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}
        </div>
      </div>

      <div className="px-3 pb-3 pt-4 sm:px-5">
        {showRangeSummary || enableRangeSelection ? (
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            {showRangeSummary ? (
              <div className={`text-xs ${stats ? deltaTone : 'text-slate-400'}`}>{rangeLabel}</div>
            ) : (
              <div className="text-xs text-slate-400">拖动图表选择区间</div>
            )}
            {enableRangeSelection ? (
              <button
                type="button"
                onClick={resetSelection}
                className="rounded border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-slate-300"
              >
                重置
              </button>
            ) : null}
          </div>
        ) : null}

        <div
          className="relative min-h-[320px] overflow-hidden rounded border border-white/10 bg-slate-950"
          style={{ height }}
        >
          <div ref={chartNodeRef} className="h-full w-full" />
          {!isReady ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950 text-sm text-slate-500">
              加载图表中...
            </div>
          ) : null}
          {showRangeSummary && selectionBox ? (
            <div
              className="pointer-events-none absolute inset-y-0 border-x border-sky-300/70 bg-sky-300/10"
              style={{
                left: selectionBox.left,
                width: selectionBox.width,
              }}
            />
          ) : null}
          {enableRangeSelection ? (
            <div
              className="absolute inset-0 cursor-crosshair touch-none"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              role="application"
              aria-label="拖拽选择股价区间"
            />
          ) : null}
        </div>

        {showEvents && events.length ? (
          <ol className="mt-4 space-y-1.5 text-xs text-slate-300">
            {events.map((event, index) => (
              <li key={`${event.date}-${event.label}`} className="flex gap-2">
                {enableEventSelection ? (
                  <button
                    type="button"
                    onClick={() => selectFromEvent(event.date)}
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 text-[11px] font-bold transition hover:scale-105"
                    style={{ color: event.color || '#f59e0b' }}
                    title="从这个事件开始计算之后涨跌幅"
                  >
                    {index + 1}
                  </button>
                ) : (
                  <span
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/10 text-[11px] font-bold"
                    style={{ color: event.color || '#f59e0b' }}
                  >
                    {index + 1}
                  </span>
                )}
                <span>
                  <span className="text-slate-500">{event.date}</span> - {event.label}
                </span>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  );
};

export default InteractiveStockChart;
