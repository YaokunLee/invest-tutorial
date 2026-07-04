# SimFin 10-year quarterly check

Checked on 2026-07-04 with SimFin API V3 `companies/statements/compact`, using `Authorization` header and a conservative request pace below START subscription's 5 requests/second limit.

Goal: fetch 10 years of quarterly PL data for Alibaba and comparable Chinese e-commerce / local-services companies, especially `Revenue`, `Selling & Marketing`, and `Selling, General & Administrative`.

Result:

| Ticker tested | SimFin company match | Quarterly PL result | Annual PL result |
|---|---|---|---|
| BABA | Alibaba Group Holding Ltd | q1/q2/q3/q4 returned 0 rows | FY rows available |
| PDD | Pinduoduo Inc. | q1/q2/q3/q4 returned 0 rows | FY rows available |
| JD | JD.com, Inc. | q2 returned only 2 rows; q1/q3/q4 returned 0 rows | FY rows available |
| 3690 | no company match | 0 rows | 0 rows |
| 3690.HK | no company match | 0 rows | 0 rows |
| MPNGY | no company match | 0 rows | 0 rows |
| MPNGF | no company match | 0 rows | 0 rows |

Additional note:

- Correct comma-separated quarterly syntax from the SimFin docs is `period=q1,q2,q3,q4`. With that syntax, NVDA returned 40 quarterly rows for 2016 Q3-2026 Q2.
- `period=quarters` was tested, but SimFin API V3 rejected it as an invalid enum for this endpoint.
- Even with `period=q1,q2,q3,q4`, SimFin is not sufficient for a 10-year quarterly Alibaba/PDD/JD/Meituan comparison chart using the compact statements endpoint.
- For the 10-year quarterly chart, use another source such as StockAnalysis/Fiscal.ai, FMP where available, or company reports.
