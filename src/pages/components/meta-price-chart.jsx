import InteractiveStockChart from '../../components/interactive-stock-chart';
import metaData from '../../data/meta-prices.json';

const META_EVENTS = [
  { date: '2021-10-28', label: 'Facebook 改名为 Meta', color: '#818cf8' },
  { date: '2022-02-02', label: 'Q4 2021 财报：DAU 首次下降，次日 -26%', color: '#fb7185' },
  { date: '2022-03-16', label: '美联储首次加息 25bp', color: '#fbbf24' },
  { date: '2022-11-09', label: '宣布裁员 1.1 万人', color: '#f87171' },
  { date: '2023-02-01', label: 'Q4 2022 财报 + 回购 400 亿，"效率年"启动', color: '#34d399' },
];

const MetaPriceChart = () => (
  <InteractiveStockChart
    ticker="META"
    title="Meta 股价走势"
    subtitle="标记关键事件，观察股价大致阶段变化。"
    data={metaData}
    events={META_EVENTS}
  />
);

export default MetaPriceChart;
