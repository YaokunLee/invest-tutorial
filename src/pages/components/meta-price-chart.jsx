import React, { useState, useEffect } from 'react';
import metaData from '../../data/meta-prices.json';

const META_EVENTS = [
  { date: '2021-10-28', label: 'Facebook 改名为 Meta', color: '#6366f1' },
  { date: '2022-02-02', label: 'Q4 2021 财报：DAU 首次下降，次日 -26%', color: '#ef4444' },
  { date: '2022-03-16', label: '美联储首次加息 25bp', color: '#f59e0b' },
  { date: '2022-11-09', label: '宣布裁员 1.1 万人', color: '#ef4444' },
  { date: '2023-02-01', label: 'Q4 2022 财报 + 回购 400 亿，"效率年"启动', color: '#10b981' },
];

const MetaPriceChart = () => {
  const [Recharts, setRecharts] = useState(null);
  const [hoverIdx, setHoverIdx] = useState(null);

  useEffect(() => {
    import('recharts').then((mod) => setRecharts(mod));
  }, []);

  if (!Recharts) {
    return (
      <div className="my-6 flex h-[400px] items-center justify-center rounded border border-gray-200 bg-gray-50 text-sm text-gray-500">
        加载图表中...
      </div>
    );
  }

  const {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ReferenceLine,
    Legend,
  } = Recharts;

  const formatXTick = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="rounded border border-gray-300 bg-white px-3 py-2 text-xs shadow-md dark:border-gray-600 dark:bg-gray-800">
        <div className="font-semibold">{label}</div>
        <div>收盘：${payload[0].value.toFixed(2)}</div>
      </div>
    );
  };

  return (
    <div className="my-6">
      <div className="mb-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
        Meta (META) 股价 2020 – 2023
      </div>
      <div style={{ width: '100%', height: 380 }}>
        <ResponsiveContainer>
          <LineChart data={metaData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tickFormatter={formatXTick}
              minTickGap={40}
              tick={{ fontSize: 11 }}
            />
            <YAxis
              tick={{ fontSize: 11 }}
              tickFormatter={(v) => `$${v}`}
              domain={['auto', 'auto']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#1d4ed8"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            {META_EVENTS.map((evt, i) => (
              <ReferenceLine
                key={evt.date}
                x={evt.date}
                stroke={evt.color}
                strokeDasharray="4 4"
                strokeWidth={hoverIdx === i ? 2.5 : 1.5}
                ifOverflow="extendDomain"
                label={{
                  value: String(i + 1),
                  position: 'top',
                  fill: evt.color,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <ol className="mt-3 space-y-1 text-xs text-gray-700 dark:text-gray-300">
        {META_EVENTS.map((evt, i) => (
          <li
            key={evt.date}
            onMouseEnter={() => setHoverIdx(i)}
            onMouseLeave={() => setHoverIdx(null)}
            className="cursor-pointer hover:font-semibold"
          >
            <span style={{ color: evt.color }} className="font-bold">
              {i + 1}.
            </span>{' '}
            <span className="text-gray-500">{evt.date}</span> — {evt.label}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default MetaPriceChart;
