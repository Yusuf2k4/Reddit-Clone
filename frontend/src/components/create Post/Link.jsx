export default function Link({ handleLink, linkUrl }) {
  return (
    <div className="p-4 bg-zinc-900/50 rounded-lg">
      <textarea
        placeholder="Url"
        className="
            w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-blue-400 
            placeholder-zinc-500 outline-none focus:ring-1 focus:ring-blue-500 resize-none
        "
        rows={2}
        value={linkUrl}
        onChange={(e) => handleLink(e.target.value)}
      />
      <p className="text-xs text-zinc-500 mt-2">Valid URLs only.</p>
    </div>
  );
}