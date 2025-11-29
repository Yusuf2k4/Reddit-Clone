export default function Selector({ types, handleActive, activeType }) {
  return (
    <div className="flex border-b border-zinc-700 overflow-x-auto no-scrollbar">
      {types.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => handleActive(t.id)}
          className={`
            flex-1 sm:flex-none px-6 py-3 text-sm font-semibold relative transition-colors whitespace-nowrap
            ${
              activeType === t.id
                ? "text-gray-100 border-b-2 border-blue-500"
                : "text-gray-500 hover:bg-zinc-800/50 hover:text-gray-300"
            }
          `}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}