export default function Title({ handleTitle, value }) {
  return (
    <div className="relative group">
      <input
        type="text"
        placeholder="Title"
        maxLength={300}
        value={value}
        className="
            w-full bg-transparent border border-zinc-700 rounded-lg p-4 text-lg text-gray-100 
            placeholder-zinc-500 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 
            transition-all duration-200
        "
        onChange={(e) => handleTitle(e.target.value)}
        name="title"
      />
      <span className="absolute bottom-4 right-4 text-xs text-zinc-600 group-focus-within:text-zinc-400">
        {value.length}/300
      </span>
    </div>
  );
}