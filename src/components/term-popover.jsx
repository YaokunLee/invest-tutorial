import { useId } from "react";

const TERM_DEFINITIONS = {
  ARR: "Annual Recurring Revenue，年度经常性收入。常用于 SaaS 公司，表示按当前订阅规模年化后，一年大概能重复获得多少收入。",
  ARPU: "ARPU 是 Average Revenue Per User 的缩写，意思是平均每个用户或客户带来的收入。放在 Microsoft 365 里，可以理解成每个企业用户、每个 seat 或每个客户账号平均贡献多少订阅收入。提价、升级到高阶套餐、加购 Copilot 都会提高 ARPU。",
  backlog: "Backlog 是已经签约但还没有完全确认成收入的订单或合同金额。对云业务来说，它能反映未来收入的可见度，但还要看交付能力和客户是否持续使用。",
  CapEx: "Capital Expenditures，资本开支。指公司为了购买或建设长期资产花的钱，比如数据中心、服务器、GPU、厂房和设备。CapEx 会影响未来产能，也会压低短期自由现金流。",
  DCF: "Discounted Cash Flow，贴现现金流估值。它用未来自由现金流折现回今天，估算一家公司大概值多少钱。",
  EBITDA: "Earnings Before Interest, Taxes, Depreciation and Amortization，即扣除利息、税、折旧和摊销前的利润。常用来观察重资产公司的经营赚钱能力。",
  EBIT: "Earnings Before Interest and Taxes，即息税前利润。它比 EBITDA 多扣除了折旧和摊销，更接近会计口径下的经营利润。",
  EPS: "Earnings Per Share，每股收益。计算方式是净利润除以股数，能反映每一股对应多少利润。",
  "EV/EBITDA": "企业价值除以 EBITDA 的估值倍数。它把债务和现金也考虑进去，常用于比较重资产、并购或资本结构差异较大的公司。",
  FCF: "Free Cash Flow，自由现金流。通常等于经营现金流减去资本开支，表示公司维持运营和必要投入之后真正剩下的现金。",
  "FCF Margin": "自由现金流率。计算方式是自由现金流除以收入，用来观察一家公司把收入转化成现金的能力。",
  GMV: "Gross Merchandise Value，平台成交总额。它表示平台上发生了多少交易额，但不等于平台自己的收入或利润。",
  "Gross Margin": "毛利率。计算方式是毛利除以收入，反映产品或服务本身扣掉直接成本后还能留下多少。",
  "Net Income": "净利润。它是扣除成本、费用、利息、税等项目后最终归属于公司的利润，但不一定等于现金流。",
  "Operating Cash Flow": "经营现金流。它反映公司日常经营活动实际产生的现金，比净利润更接近现金口径。",
  "Operating Margin": "经营利润率。计算方式是经营利润除以收入，反映扣掉研发、销售、管理等经营费用后还能留下多少利润。",
  PE: "Price to Earnings Ratio，市盈率。计算方式是股价除以每股收益，也可以理解为公司市值除以净利润。",
  "Profit Margin": "净利润率。计算方式是净利润除以收入，反映收入最后有多少变成了股东利润。",
  PS: "Price to Sales Ratio，市销率。计算方式是公司市值除以收入，常用于还没有稳定盈利的成长公司。",
  RevPAR: "Revenue Per Available Room，每间可用客房收入。酒店行业常用指标，同时受入住率和房价影响。",
  Revenue: "收入。它表示公司销售产品或服务获得的总金额，还没有扣除成本和费用。",
  RPO: "Remaining Performance Obligations，剩余履约义务。可以理解为已签合同中未来还没有确认收入的部分，常用于观察云和订阅业务未来收入可见度。",
  SBC: "Stock-Based Compensation，股权激励。公司用股票或期权支付员工报酬，现金流表里不直接流出现金，但会稀释股东。",
  "TAC rate": "Traffic Acquisition Cost rate，流量获取成本率。对 Google 这类广告公司来说，它表示为获得流量分给合作方的成本占相关收入的比例。",
  TAM: "Total Addressable Market，总可服务市场。它表示理论上的市场空间，但大市场不等于公司一定能赚钱。",
  WACC: "Weighted Average Cost of Capital，加权平均资本成本。可以粗略理解为公司综合使用债务和股权资金的成本。",
  takeRate: "Take rate，平台抽佣率或变现率。计算方式通常是平台收入除以 GMV，表示平台能从交易额中抽走多少。",
  净留存率: "Net Retention Rate，净留存率。它看老客户在流失、降级、续费和加购之后，收入总体是变多还是变少。",
  利润杠杆: "这里的“杠杆”不是借钱，而是收入增长后，利润增长得更快。比如收入增长 10%，但经营利润增长 20%，就说明成本没有同比例增加，利润被放大了。",
  安全边际: "安全边际是估算价值和买入价格之间的缓冲。价格低于你估算的合理价值越多，安全边际越高。",
  护城河: "护城河指一家公司长期抵御竞争、保持利润和市场地位的能力，比如品牌、网络效应、迁移成本、规模效应或技术优势。",
  获客成本: "Customer Acquisition Cost，获客成本。它表示公司为了获得一个新客户平均要花多少钱。",
  "逆DCF": "逆 DCF 是从当前股价反推市场隐含的未来现金流增长假设，用来判断市场预期是否过高或过低。",
  客户迁移成本: "客户迁移成本指客户从一个产品或平台换到另一个产品或平台时要付出的成本，包括数据迁移、员工学习、系统重建和业务中断风险。",
  毛利率: "毛利率。计算方式是毛利除以收入，反映产品或服务本身扣掉直接成本后还能留下多少。",
  网络效应: "网络效应指用户越多，产品对其他用户越有价值。比如社交平台上朋友越多越难离开，支付网络商户和用户越多越有用。",
  资本开支: "资本开支，也就是 CapEx。指公司为了购买或建设长期资产花的钱，比如数据中心、服务器、GPU、厂房和设备。",
  经营利润率: "经营利润率。计算方式是经营利润除以收入，反映扣掉研发、销售、管理等经营费用后还能留下多少利润。",
  自由现金流: "自由现金流，也就是 FCF。通常等于经营现金流减去资本开支，表示公司维持运营和必要投入之后真正剩下的现金。",
};

const ARPU_DEFINITION =
  TERM_DEFINITIONS.ARPU;

export function FinanceTerm({ term, label }) {
  const definition = TERM_DEFINITIONS[term];

  if (!definition) {
    return label || term;
  }

  return <TermPopover term={label || term}>{definition}</TermPopover>;
}

export function ArpuTerm() {
  return <TermPopover term="ARPU">{ARPU_DEFINITION}</TermPopover>;
}

export default function TermPopover({ term, children }) {
  const id = useId();

  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        className="cursor-help border-b border-dotted border-blue-500 text-blue-600 dark:text-blue-400"
        aria-describedby={id}
      >
        {term}
      </button>
      <span
        id={id}
        className="absolute bottom-full left-1/2 z-50 mb-2 hidden w-64 -translate-x-1/2 rounded-md border border-gray-200 bg-white px-3 py-2 text-left text-sm leading-6 text-gray-700 shadow-lg group-hover:block group-focus-within:block dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
      >
        {children}
      </span>
    </span>
  );
}
