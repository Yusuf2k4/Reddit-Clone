import React from 'react';
import { X } from "lucide-react";

function Step1Topics({ topics, selectedTags, selectTags, removeTags }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Add Topics</h1>
        <p className="text-sm mt-2 text-gray-400">
          Add up to 3 topics to help interested redditors find your community.
        </p>
      </div>

      {/* Selected Tags Area */}
      <div className="mb-8 min-h-[3rem]">
        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
          Selected ({selectedTags.length}/3)
        </p>
        <div className="flex flex-wrap gap-2">
          {selectedTags.length === 0 && (
            <span className="text-gray-600 text-sm italic">No topics selected</span>
          )}
          {selectedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => removeTags(tag)}
              className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full 
              bg-gray-800 border border-gray-700 text-white text-sm 
              hover:bg-red-900/30 hover:border-red-800 group transition-all"
            >
              {tag}
              <X size={14} className="text-gray-400 group-hover:text-red-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
        {topics.map((data) => (
          <div key={data.id} className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
            <h3 className="text-lg font-medium text-gray-200 mb-3">{data.name}</h3>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag) => (
                <button
                  type="button"
                  key={tag.id}
                  disabled={selectedTags.length >= 3 && !selectedTags.includes(tag.name)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                    ${
                      selectedTags.includes(tag.name)
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                        : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                    }
                    ${selectedTags.length >= 3 && !selectedTags.includes(tag.name) ? "opacity-40 cursor-not-allowed" : ""}
                  `}
                  onClick={() => selectTags(tag.name)}
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

export default Step1Topics;