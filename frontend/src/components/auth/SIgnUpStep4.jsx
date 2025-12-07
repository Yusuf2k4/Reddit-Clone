import { useLoaderData } from "react-router";

export default function SignUpStep4({handleTag, selectedTag}) {
    const topics = useLoaderData();
  return (
    <div className="flex flex-col h-full text-start px-6">
      {/* Header: shrink-0 prevents it from getting squashed */}
      <div className="shrink-0">
        <h1 className="text-2xl text-white text-center font-semibold">
          Interests
        </h1>
        <p className="text-gray-400 text-sm text-center">
          Pick things you'd like to see in your home feed.
        </p>
      </div>

      {/* LIST: flex-1 fills remaining space, overflow-y-auto allows internal scrolling */}
      <div className="flex-1 mt-4 w-full overflow-y-auto pr-2 custom-scrollbar">
        {topics.map((topic) => (
          <div key={topic.id} className="mb-4">
            <h1 className="text-white text-xl font-semibold mb-2">
              {topic.name}
            </h1>
            <div className="flex flex-wrap gap-2">
              {topic.tags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={()=> handleTag(tag.name)}
                  // Added type="button" so it doesn't submit the form
                  className={`px-3 py-2 bg-gray-700 text-slate-100 rounded-full hover:bg-gray-600 transition-colors ${selectedTag.includes(tag.name) ? "bg-orange-700 hover:bg-orange-400 transition-all duration-300" : ""}`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
