# Claude Project Notes

Also follow `AGENTS.md`; it is the primary project instruction file.

## Editing This Course
- Write for readers without finance or investing background.
- Avoid AI-flavored contrast templates such as `不是 xxx，而是 xxx` unless the contrast is genuinely needed.
- Keep headings clean and avoid emoji in titles.
- Do not overuse direct `你` address in introductions; mix in `大部分人` / `普通人` / neutral phrasing.
- Clarify easy-to-confuse foreign names. For example, `文艺复兴科技` is the firm, while `Medallion Fund` is its best-known fund.

## Sources And Figures
- Links in figure captions must be visibly clickable, such as blue and underlined.
- If a user provides a chart screenshot and source URL, save the image under `public/invest/`, insert it with `AssetImage`, and link the source in the caption.
- If the source is not known, mark it as `来源待补充`; do not invent sources.

## Financial Data APIs
- Follow `AGENTS.md` for API-key handling.
- Store the SimFin key only in `.env.local` as `SIMFIN_API_KEY`; do not put the actual key in tracked docs, source, article text, or committed data.
- Use the SimFin API through the `Authorization` header and cite SimFin plus any calculation formula when charting derived metrics.

## Local Preview
- Validate the same local URL the user is using. `localhost` and `127.0.0.1` can hit different dev server bindings.
- If a Next/webpack overlay appears on only one host, check for duplicate dev servers on the same port before changing source code.
