import TutorialLineChart from "./tutorial-line-chart";

const nvdaSgaRatioData = [
  { quarter: "2016 Q3", nvda: 10.99 },
  { quarter: "2016 Q4", nvda: 8.53 },
  { quarter: "2017 Q1", nvda: 8.1 },
  { quarter: "2017 Q2", nvda: 9.55 },
  { quarter: "2017 Q3", nvda: 8.88 },
  { quarter: "2017 Q4", nvda: 8.04 },
  { quarter: "2018 Q1", nvda: 7.59 },
  { quarter: "2018 Q2", nvda: 7.2 },
  { quarter: "2018 Q3", nvda: 7.59 },
  { quarter: "2018 Q4", nvda: 8.11 },
  { quarter: "2019 Q1", nvda: 12.06 },
  { quarter: "2019 Q2", nvda: 11.89 },
  { quarter: "2019 Q3", nvda: 10.31 },
  { quarter: "2019 Q4", nvda: 9.19 },
  { quarter: "2020 Q1", nvda: 9.24 },
  { quarter: "2020 Q2", nvda: 9.51 },
  { quarter: "2020 Q3", nvda: 16.22 },
  { quarter: "2020 Q4", nvda: 10.9 },
  { quarter: "2021 Q1", nvda: 10.05 },
  { quarter: "2021 Q2", nvda: 9.19 },
  { quarter: "2021 Q3", nvda: 8.08 },
  { quarter: "2021 Q4", nvda: 7.84 },
  { quarter: "2022 Q1", nvda: 7.37 },
  { quarter: "2022 Q2", nvda: 7.14 },
  { quarter: "2022 Q3", nvda: 8.83 },
  { quarter: "2022 Q4", nvda: 10.64 },
  { quarter: "2023 Q1", nvda: 10.33 },
  { quarter: "2023 Q2", nvda: 8.8 },
  { quarter: "2023 Q3", nvda: 4.61 },
  { quarter: "2023 Q4", nvda: 3.8 },
  { quarter: "2024 Q1", nvda: 3.22 },
  { quarter: "2024 Q2", nvda: 2.98 },
  { quarter: "2024 Q3", nvda: 2.8 },
  { quarter: "2024 Q4", nvda: 2.56 },
  { quarter: "2025 Q1", nvda: 2.48 },
  { quarter: "2025 Q2", nvda: 2.36 },
  { quarter: "2025 Q3", nvda: 2.4 },
  { quarter: "2025 Q4", nvda: 1.99 },
  { quarter: "2026 Q1", nvda: 1.88 },
  { quarter: "2026 Q2", nvda: 1.59 },
];

const NvdaSgaRatioChart = () => (
  <TutorialLineChart
    title="NVIDIA SGA / Revenue（10 年季度）"
    data={nvdaSgaRatioData}
    xKey="quarter"
    yDomain={[0, 18]}
    valueSuffix="%"
    height={380}
    series={[{ key: "nvda", name: "NVIDIA", color: "#16a34a" }]}
    valueFormatter={(value) => (value == null ? "-" : `${Number(value).toFixed(2)}%`)}
    caption={
      <>
        英伟达 2016 Q3-2026 Q2 季度 Selling, General & Admin / Revenue。英伟达没有单独披露营销费用，所以这里使用 SGA
        作为更宽口径观察。数据来源：
        <a
          className="text-blue-600 underline dark:text-blue-400"
          href="https://backend.simfin.com/api/v3/companies/statements/compact"
          target="_blank"
          rel="noreferrer"
        >
          SimFin Financial Statements API
        </a>
        ，按 SGA / Revenue 计算。
      </>
    }
  />
);

export default NvdaSgaRatioChart;
