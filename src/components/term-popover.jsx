export default function TermPopover({ term, children }) {
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        className="cursor-help border-b border-dotted border-blue-500 text-blue-600 dark:text-blue-400"
        aria-describedby={`${term}-popover`}
      >
        {term}
      </button>
      <span
        id={`${term}-popover`}
        className="absolute bottom-full left-1/2 z-50 mb-2 hidden w-64 -translate-x-1/2 rounded-md border border-gray-200 bg-white px-3 py-2 text-left text-sm leading-6 text-gray-700 shadow-lg group-hover:block group-focus-within:block dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
      >
        {children}
      </span>
    </span>
  );
}
