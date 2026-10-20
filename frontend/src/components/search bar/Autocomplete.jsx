
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { autocomplete, fallbackAutocomplete } from "../../util/api";
import { useNavigate } from "react-router";

function Autocomplete({ word, onCommunitySelect }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (word === "") {
        const response = await fallbackAutocomplete();
        setData(response);
      } else {
        const response = await autocomplete(word);
        setData(response);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [word]);


  return (
    <div className="bg-[#18181b] px-2 pt-2">
      <div className="px-3 py-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-500">
          {word === "" ? "Trending searches" : "Search suggestions"}
        </p>
      </div>

      {data.map((item, index) => (
        <div
          key={index}
          className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 transition-colors duration-150 hover:bg-[#2a2a2d]"
          onClick={() => {
            navigate(`/search/${encodeURIComponent(item)}`)
            onCommunitySelect()
          }}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#29292e] transition-colors group-hover:bg-[#38383f]">
            <Search
              size={17}
              className="text-gray-400 group-hover:text-white"
            />
          </div>

          <p className="min-w-0 flex-1 truncate text-sm text-gray-200 group-hover:text-white">
            {item}
          </p>

          <span className="text-gray-600 opacity-0 transition-opacity group-hover:opacity-100">
            ↗
          </span>
        </div>
      ))}
    </div>
  );
}

export default Autocomplete;
