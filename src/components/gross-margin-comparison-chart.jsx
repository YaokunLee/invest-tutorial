import TutorialLineChart from "./tutorial-line-chart";

const grossMarginData = [
  { quarter: "Q1 2023", amd: 49.77, nvda: 64.63 },
  { quarter: "Q2 2023", amd: 49.54, nvda: 70.05 },
  { quarter: "Q3 2023", amd: 50.98, nvda: 73.95 },
  { quarter: "Q4 2023", amd: 50.68, nvda: 75.97 },
  { quarter: "Q1 2024", amd: 50.98, nvda: 78.35 },
  { quarter: "Q2 2024", amd: 53.04, nvda: 75.15 },
  { quarter: "Q3 2024", amd: 53.56, nvda: 74.56 },
  { quarter: "Q4 2024", amd: 53.98, nvda: 73.03 },
  { quarter: "Q1 2025", amd: 53.6, nvda: 60.52 },
  { quarter: "Q2 2025", amd: 43.19, nvda: 72.42 },
  { quarter: "Q3 2025", amd: 54.51, nvda: 73.41 },
  { quarter: "Q4 2025", amd: 56.84, nvda: null },
];

const GrossMarginComparisonChart = () => (
  <TutorialLineChart
    title="AMD vs NVDA Gross Margin"
    data={grossMarginData}
    xKey="quarter"
    yDomain={[40, 82]}
    valueSuffix="%"
    series={[
      { key: "amd", name: "AMD", color: "#2563eb" },
      { key: "nvda", name: "NVDA", color: "#dc2626" },
    ]}
    valueFormatter={(value) => (value == null ? "-" : `${Number(value).toFixed(2)}%`)}
    caption={
      <>
        AMD 和英伟达季度 Gross Margin 对比。数据来源：
        <a href="https://stockanalysis.com/stocks/amd/financials/?p=quarterly" target="_blank" rel="noreferrer">
          StockAnalysis AMD
        </a>
        ；
        <a href="https://stockanalysis.com/stocks/nvda/financials/?p=quarterly" target="_blank" rel="noreferrer">
          StockAnalysis NVDA
        </a>
        。英伟达财务季度与日历季度有约一个月偏移，这里按近似日历季度对齐。
      </>
    }
  />
);

export default GrossMarginComparisonChart;
