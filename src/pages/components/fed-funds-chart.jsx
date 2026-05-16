import React, { useState, useEffect } from 'react';
import fedData from '../../data/fed-funds.json';

const FED_EVENTS = [
  { date: '2020-03-01', label: '紧急降息至 0–0.25%', color: '#10b981' },
  { date: '2022-03-01', label: '首次加息 25bp', color: '#f59e0b' },
  { date: '2022-06-01', label: '单次加息 75bp（28 年来最大）', color: '#ef4444' },
  { date: '2023-07-01', label: '加息周期终点 5.25–5.50%', color: '#7c3aed' },
  { date: '2024-09-01', label: '降息 50bp，转向宽松', color: '#10b981' },
];

const FedFundsChart = () => {
  const [Recharts, setRecharts] = useState(null);

  useEffect(() => {
    import('recharts').then((mod) => setRecharts(mod));
  }, []);

  if (!Recharts) {
    return (
      <div className="my-6 flex h-[320px] items-center justify-center rounded border border-gray-200 bg-gray-50 text-sm text-gray-500">
        加载图表中...
      </div>
    );
  }

  const {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ReferenceLine,
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
        <div>联邦基金利率：{payload[0].value.toFixed(2)}%</div>
      </div>
    );
  };

  return (
    <div className="my-6">
      <div className="mb-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
        美国联邦基金利率（Federal Funds Rate）2020 – 2024
      </div>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={fedData} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
            <defs>
              <linearGradient id="fedFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#dc2626" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#dc2626" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tickFormatter={formatXTick}
              minTickGap={40}
              tick={{ fontSize: 11 }}
            />
            <YAxis
              tick={{ fontSize: 11 }}
              tickFormatter={(v) => `${v}%`}
              domain={[0, 6]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="stepAfter"
              dataKey="rate"
              stroke="#dc2626"
              strokeWidth={2}
              fill="url(#fedFill)"
              isAnimationActive={false}
            />
            {FED_EVENTS.map((evt, i) => (
              <ReferenceLine
                key={evt.date}
                x={evt.date}
                stroke={evt.color}
                strokeDasharray="4 4"
                strokeWidth={1.5}
                label={{
                  value: String(i + 1),
                  position: 'top',
                  fill: evt.color,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <ol className="mt-3 space-y-1 text-xs text-gray-700 dark:text-gray-300">
        {FED_EVENTS.map((evt, i) => (
          <li key={evt.date}>
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

export default FedFundsChart;
