import React, { useEffect, useMemo, useState } from "react";

const DEFAULT_COLORS = ["#2563eb", "#dc2626", "#059669", "#d97706", "#7c3aed"];

const formatDefaultValue = (value, suffix = "") => {
  if (value == null || Number.isNaN(Number(value))) return "-";
  return `${Number(value).toLocaleString("en-US", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  })}${suffix}`;
};

const TutorialLineChart = ({
  title,
  subtitle,
  data,
  xKey = "label",
  series,
  valueSuffix = "",
  yDomain,
  height = 360,
  caption,
  valueFormatter,
}) => {
  const [Recharts, setRecharts] = useState(null);

  useEffect(() => {
    import("recharts").then((mod) => setRecharts(mod));
  }, []);

  const normalizedSeries = useMemo(
    () =>
      series.map((item, index) => ({
        ...item,
        color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
      })),
    [series]
  );

  const formatValue = (value) =>
    valueFormatter ? valueFormatter(value) : formatDefaultValue(value, valueSuffix);

  if (!Recharts) {
    return (
      <figure className="my-8">
        <div className="flex h-[320px] items-center justify-center rounded border border-gray-200 bg-gray-50 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
          加载图表中...
        </div>
        {caption ? (
          <figcaption className="text-center text-sm text-gray-500 mt-2">{caption}</figcaption>
        ) : null}
      </figure>
    );
  }

  const {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
  } = Recharts;

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const visiblePayload = payload.filter((item) => item.value != null);

    return (
      <div className="rounded border border-gray-200 bg-white px-3 py-2 text-xs shadow-md dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-1 font-semibold text-gray-900 dark:text-gray-100">{label}</div>
        <div className="space-y-1">
          {visiblePayload.map((item) => (
            <div key={item.dataKey} className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-600 dark:text-gray-300">{item.name}</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {formatValue(item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <figure className="my-8">
      <div className="rounded border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
        {title ? (
          <div className="text-center text-base font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </div>
        ) : null}
        {subtitle ? (
          <div className="mt-1 text-center text-sm text-gray-500 dark:text-gray-400">
            {subtitle}
          </div>
        ) : null}
        <div className="mt-4" style={{ width: "100%", height }}>
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 10, right: 24, bottom: 8, left: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey={xKey}
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickLine={false}
                axisLine={{ stroke: "#cbd5e1" }}
                minTickGap={18}
              />
              <YAxis
                domain={yDomain || ["auto", "auto"]}
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickLine={false}
                axisLine={{ stroke: "#cbd5e1" }}
                tickFormatter={(value) => formatValue(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={28} />
              {normalizedSeries.map((item) => (
                <Line
                  key={item.key}
                  type="monotone"
                  dataKey={item.key}
                  name={item.name}
                  stroke={item.color}
                  strokeWidth={2.5}
                  dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                  connectNulls={false}
                  isAnimationActive={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {caption ? (
        <figcaption className="text-center text-sm text-gray-500 mt-2">{caption}</figcaption>
      ) : null}
    </figure>
  );
};

export default TutorialLineChart;
