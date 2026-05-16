import { useId } from "react";

const ARPU_DEFINITION =
  "ARPU 是 Average Revenue Per User 的缩写，意思是平均每个用户或客户带来的收入。放在 Microsoft 365 里，可以理解成每个企业用户、每个 seat 或每个客户账号平均贡献多少订阅收入。提价、升级到高阶套餐、加购 Copilot 都会提高 ARPU。";

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
