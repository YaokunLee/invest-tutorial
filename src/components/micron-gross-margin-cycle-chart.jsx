import TutorialLineChart from "./tutorial-line-chart";

const micronGrossMarginData = [
  { quarter: "2016 Q3", micron: 18.0, skHynix: 34.2 },
  { quarter: "2016 Q4", micron: 25.47, skHynix: 44.73 },
  { quarter: "2017 Q1", micron: 36.66, skHynix: 52.43 },
  { quarter: "2017 Q2", micron: 46.87, skHynix: 57.28 },
  { quarter: "2017 Q3", micron: 50.7, skHynix: 58.05 },
  { quarter: "2017 Q4", micron: 55.08, skHynix: 61.75 },
  { quarter: "2018 Q1", micron: 58.09, skHynix: 61.12 },
  { quarter: "2018 Q2", micron: 60.57, skHynix: 63.72 },
  { quarter: "2018 Q3", micron: 61.03, skHynix: 66.09 },
  { quarter: "2018 Q4", micron: 58.32, skHynix: 58.17 },
  { quarter: "2019 Q1", micron: 49.08, skHynix: 39.47 },
  { quarter: "2019 Q2", micron: 38.18, skHynix: 31.26 },
  { quarter: "2019 Q3", micron: 28.64, skHynix: 26.55 },
  { quarter: "2019 Q4", micron: 26.56, skHynix: 24.05 },
  { quarter: "2020 Q1", micron: 28.25, skHynix: 30.39 },
  { quarter: "2020 Q2", micron: 32.42, skHynix: 38.88 },
  { quarter: "2020 Q3", micron: 34.15, skHynix: 35.0 },
  { quarter: "2020 Q4", micron: 30.07, skHynix: 30.52 },
  { quarter: "2021 Q1", micron: 26.44, skHynix: 32.12 },
  { quarter: "2021 Q2", micron: 42.12, skHynix: 42.04 },
  { quarter: "2021 Q3", micron: 47.28, skHynix: 49.39 },
  { quarter: "2021 Q4", micron: 46.38, skHynix: 48.91 },
  { quarter: "2022 Q1", micron: 47.21, skHynix: 44.43 },
  { quarter: "2022 Q2", micron: 46.69, skHynix: 45.89 },
  { quarter: "2022 Q3", micron: 39.47, skHynix: 35.2 },
  { quarter: "2022 Q4", micron: 21.86, skHynix: 0.31 },
  { quarter: "2023 Q1", micron: -32.66, skHynix: -32.34 },
  { quarter: "2023 Q2", micron: -17.8, skHynix: -16.12 },
  { quarter: "2023 Q3", micron: -10.85, skHynix: 0.71 },
  { quarter: "2023 Q4", micron: -0.74, skHynix: 19.69 },
  { quarter: "2024 Q1", micron: 18.53, skHynix: 38.57 },
  { quarter: "2024 Q2", micron: 26.9, skHynix: 45.65 },
  { quarter: "2024 Q3", micron: 35.32, skHynix: 52.19 },
  { quarter: "2024 Q4", micron: 38.44, skHynix: 52.44 },
  { quarter: "2025 Q1", micron: 36.79, skHynix: 57.27 },
  { quarter: "2025 Q2", micron: 37.72, skHynix: 53.9 },
  { quarter: "2025 Q3", micron: 44.67, skHynix: 57.38 },
  { quarter: "2025 Q4", micron: 56.04, skHynix: 68.77 },
  { quarter: "2026 Q1", micron: 74.41, skHynix: 79.27 },
  { quarter: "2026 Q2", micron: 84.56, skHynix: null },
];

const MicronGrossMarginCycleChart = () => (
  <TutorialLineChart
    title="Micron vs SK Hynix Quarterly Gross Margin"
    data={micronGrossMarginData}
    xKey="quarter"
    yDomain={[-40, 90]}
    valueSuffix="%"
    height={380}
    series={[
      { key: "micron", name: "Micron", color: "#0891b2" },
      { key: "skHynix", name: "SK Hynix", color: "#dc2626" },
    ]}
    valueFormatter={(value) => (value == null ? "-" : `${Number(value).toFixed(2)}%`)}
    caption={
      <>
        美光 2016 Q3-2026 Q2、SK 海力士 2016 Q3-2026 Q1 季度 Gross Margin，按 Gross Profit / Revenue 计算。美光财务数据来源：
        <a
          className="text-blue-600 underline dark:text-blue-400"
          href="https://backend.simfin.com/api/v3/companies/statements/compact"
          target="_blank"
          rel="noreferrer"
        >
          SimFin Financial Statements API
        </a>
        ；SK 海力士 2021 Q2-2026 Q1 使用
        <a
          className="text-blue-600 underline dark:text-blue-400"
          href="https://stockanalysis.com/quote/krx/000660/financials/?p=quarterly"
          target="_blank"
          rel="noreferrer"
        >
          StockAnalysis SK Hynix
        </a>
        ，2016 Q3-2021 Q1 使用
        <a
          className="text-blue-600 underline dark:text-blue-400"
          href="https://www.alphaspread.com/security/krx/000660/financials/income-statement"
          target="_blank"
          rel="noreferrer"
        >
          Alpha Spread SK Hynix
        </a>
        的 TTM Revenue / Gross Profit 序列结合直接季度数据反推。
      </>
    }
  />
);

export default MicronGrossMarginCycleChart;
