# Agent Instructions

## Package Manager
- Use **npm**: `npm install`, `npm run dev`, `npm run build`, `npm run lint`

## Commit Attribution
- AI commits MUST include:

```text
Co-Authored-By: (the agent model's name and attribution byline)
```

## Session Logs
- Project session logs live in `.Codex/session-logs/`.
- Before resuming prior work, read `.Codex/session-logs/INDEX.md`.
- Read only the relevant log file from the index.
- On `/save-session`, merge related sessions into the same log file with date separators.

## Investment Writing Sources
- For investing philosophy, book notes, Buffett material, and quote lookup, search `knowledge-base/`.
- For company research, holdings, industry notes, financial reports, PPTs, charts, and raw source material, start with `/Users/mac/Myfiles/invest/opportunities/INDEX.md`.
- When writing investment articles, search both sources when the topic mixes investment principles with company or industry analysis.
- Do not fabricate book quotes, page numbers, chapters, company filings, dates, financial figures, or source attributions.
- After modifying files under `/Users/mac/Myfiles/invest/opportunities/`, check whether `/Users/mac/Myfiles/invest/opportunities/INDEX.md` needs an update.

## Audience And Style
- Write for readers without finance or investor background.
- When mentioning foreign investors, funds, companies, or books, use the common Chinese name first.
- Add a short identifier the first time a person or institution appears, e.g. `西蒙斯是文艺复兴科技的创始人`.
- Prefer concrete numbers and time ranges over vague claims like `收益率很高`.
- Avoid unexplained English-only names in article prose.
- Avoid AI-flavored contrast templates such as `不是 xxx，而是 xxx` unless the sentence truly needs that contrast.
- Keep section titles clean and avoid emoji in headings.
- Do not overuse direct `你` address in introductions; mix in `大部分人` / `普通人` / neutral phrasing so the tone feels natural.
- When a foreign company, fund, or product has easy-to-confuse names, clarify the relationship in prose. Example: `文艺复兴科技` is the firm, `Medallion Fund` is its best-known fund.

## Quote Policy
- Prefer `notes.md` paraphrases for article drafts.
- Use `quotes.md` only for short quote candidates with a recorded source.
- If no lawful PDF or paper book page has been checked, mark location as `pending_verification`.
- Do not present web-sourced quote candidates as verified book citations.

## Article Assets
- PPT, PDF, and annual-report charts from `/Users/mac/Myfiles/invest/opportunities/` may be used as research inputs.
- For public articles, prefer redrawing charts from extracted data over direct screenshots.
- If using or redrawing a chart, include company, file name, report date or year, and page or slide when available.
- Source links in image captions must look clickable: use visible link styling such as blue color and underline, not the same gray as the caption.
- If a user provides a chart screenshot and source URL, save the screenshot under `public/invest/`, insert it with `AssetImage`, and link the source in the figure caption.
- If a chart source is not known yet, say `来源待补充` instead of inventing a source.

## Local Frontend Checks
- After content or style edits, validate the rendered page at the URL the user is using, especially `localhost` versus `127.0.0.1`.
- If `localhost` and `127.0.0.1` behave differently, check for duplicate dev servers bound to IPv6 and IPv4 on the same port before debugging source code.
