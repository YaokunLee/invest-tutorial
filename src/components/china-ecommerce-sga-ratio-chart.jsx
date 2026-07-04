import TutorialLineChart from "./tutorial-line-chart";

const chinaEcommerceSgaRatioData = [
  { quarter: "2016 Q2", baba: 19.78, pdd: null, jd: 15.53, meituan: null },
  { quarter: "2016 Q3", baba: 19.51, pdd: null, jd: 16.57, meituan: null },
  { quarter: "2016 Q4", baba: 14.6, pdd: null, jd: 15.89, meituan: null },
  { quarter: "2017 Q1", baba: 19.98, pdd: null, jd: 14.95, meituan: null },
  { quarter: "2017 Q2", baba: 16.99, pdd: null, jd: 14.0, meituan: null },
  { quarter: "2017 Q3", baba: 17.6, pdd: null, jd: 14.9, meituan: null },
  { quarter: "2017 Q4", baba: 15.8, pdd: null, jd: 13.58, meituan: null },
  { quarter: "2018 Q1", baba: 19.29, pdd: null, jd: 14.14, meituan: null },
  { quarter: "2018 Q2", baba: 19.24, pdd: null, jd: 14.35, meituan: null },
  { quarter: "2018 Q3", baba: 16.31, pdd: null, jd: 15.98, meituan: null },
  { quarter: "2018 Q4", baba: 15.31, pdd: null, jd: 15.0, meituan: null },
  { quarter: "2019 Q1", baba: 18.32, pdd: null, jd: 14.07, meituan: null },
  { quarter: "2019 Q2", baba: 14.81, pdd: null, jd: 13.21, meituan: null },
  { quarter: "2019 Q3", baba: 15.62, pdd: null, jd: 13.44, meituan: null },
  { quarter: "2019 Q4", baba: 14.38, pdd: null, jd: 5.5, meituan: null },
  { quarter: "2020 Q1", baba: 17.68, pdd: null, jd: 11.13, meituan: null },
  { quarter: "2020 Q2", baba: 13.33, pdd: null, jd: 10.04, meituan: null },
  { quarter: "2020 Q3", baba: 18.92, pdd: null, jd: 10.7, meituan: null },
  { quarter: "2020 Q4", baba: 15.39, pdd: null, jd: 11.9, meituan: null },
  { quarter: "2021 Q1", baba: 27.21, pdd: 60.22, jd: 11.33, meituan: 24.16 },
  { quarter: "2021 Q2", baba: 16.62, pdd: 46.96, jd: 10.96, meituan: 29.48 },
  { quarter: "2021 Q3", baba: 18.8, pdd: 48.29, jd: 11.47, meituan: 28.21 },
  { quarter: "2021 Q4", baba: 18.62, pdd: 43.72, jd: 12.08, meituan: 27.61 },
  { quarter: "2022 Q1", baba: 17.0, pdd: 49.64, jd: 11.12, meituan: 24.68 },
  { quarter: "2022 Q2", baba: 16.55, pdd: 38.71, jd: 10.51, meituan: 22.56 },
  { quarter: "2022 Q3", baba: 15.9, pdd: 42.12, jd: 10.09, meituan: 21.39 },
  { quarter: "2022 Q4", baba: 16.53, pdd: 48.66, jd: 10.98, meituan: 21.98 },
  { quarter: "2023 Q1", baba: 18.09, pdd: 45.37, jd: 10.65, meituan: 21.2 },
  { quarter: "2023 Q2", baba: 14.67, pdd: 34.69, jd: 10.45, meituan: 24.56 },
  { quarter: "2023 Q3", baba: 15.52, pdd: 32.69, jd: 10.36, meituan: 25.43 },
  { quarter: "2023 Q4", baba: 17.3, pdd: 31.97, jd: 10.7, meituan: 26.36 },
  { quarter: "2024 Q1", baba: 19.29, pdd: 29.07, jd: 10.78, meituan: 22.09 },
  { quarter: "2024 Q2", baba: 18.9, pdd: 28.73, jd: 10.71, meituan: 21.31 },
  { quarter: "2024 Q3", baba: 17.86, pdd: 32.5, jd: 10.99, meituan: 22.18 },
  { quarter: "2024 Q4", baba: 19.11, pdd: 30.17, jd: 11.37, meituan: 22.87 },
  { quarter: "2025 Q1", baba: 19.73, pdd: 36.65, jd: 10.86, meituan: 20.68 },
  { quarter: "2025 Q2", baba: 24.46, pdd: 27.64, jd: 14.7, meituan: 27.44 },
  { quarter: "2025 Q3", baba: 29.81, pdd: 29.63, jd: 15.4, meituan: 38.98 },
  { quarter: "2025 Q4", baba: 28.19, pdd: 30.42, jd: 14.91, meituan: 37.65 },
  { quarter: "2026 Q1", baba: 26.12, pdd: 33.28, jd: 13.42, meituan: 28.46 },
];

const ChinaEcommerceSgaRatioChart = () => (
  <TutorialLineChart
    title="中国电商与本地生活公司 SGA / Revenue（10 年季度）"
    data={chinaEcommerceSgaRatioData}
    xKey="quarter"
    yDomain={[0, 70]}
    valueSuffix="%"
    height={380}
    series={[
      { key: "baba", name: "Alibaba", color: "#dc2626" },
      { key: "pdd", name: "PDD", color: "#2563eb" },
      { key: "jd", name: "JD", color: "#059669" },
      { key: "meituan", name: "Meituan", color: "#d97706" },
    ]}
    valueFormatter={(value) => (value == null ? "-" : `${Number(value).toFixed(2)}%`)}
    caption={
      <>
        阿里巴巴、PDD、京东、美团季度 SG&A Expenses / Revenue 对比。这个口径比纯营销费用更宽，可用来观察销售、补贴、营销和管理费用压力的变化。PDD
        2018-2020 年早期费用率最高超过 300%，图中从 2021 年开始显示，以保留近年可比变化的可读性。数据来源：
        <a
          className="text-blue-600 underline dark:text-blue-400"
          href="https://www.macrotrends.net/stocks/charts/BABA/alibaba/income-statement?freq=Q"
          target="_blank"
          rel="noreferrer"
        >
          Macrotrends BABA
        </a>
        ；
        <a
          className="text-blue-600 underline dark:text-blue-400"
          href="https://www.macrotrends.net/stocks/charts/PDD/pdd-holdings/income-statement?freq=Q"
          target="_blank"
          rel="noreferrer"
        >
          Macrotrends PDD
        </a>
        ；
        <a
          className="text-blue-600 underline dark:text-blue-400"
          href="https://www.macrotrends.net/stocks/charts/JD/jd/income-statement?freq=Q"
          target="_blank"
          rel="noreferrer"
        >
          Macrotrends JD
        </a>
        ；
        <a
          className="text-blue-600 underline dark:text-blue-400"
          href="https://stockanalysis.com/quote/hkg/3690/financials/?p=quarterly"
          target="_blank"
          rel="noreferrer"
        >
          StockAnalysis Meituan
        </a>
        。
      </>
    }
  />
);

export default ChinaEcommerceSgaRatioChart;
