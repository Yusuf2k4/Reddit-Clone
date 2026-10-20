import React, { useEffect, useState } from "react";
import { Users, ChevronRight } from "lucide-react";
import { autocompleteCommunities, fallbackCommunities } from "../../util/api";
import { useNavigate } from "react-router";

function SearchCommunities({ word, onCommunitySelect}) {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (word === "") {
        const response = await fallbackCommunities();
        setData(response);
      } else {
        const response = await autocompleteCommunities(word);
        setData(response);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [word]);

  return (
    <div className="border-t border-[#303034] bg-[#18181b] px-2 pb-2 pt-1">
      <div className="px-3 py-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-500">
          Communities
        </p>
      </div>

      {data.map((item, index) => (
        <div
          key={index}
          className="group flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-150 hover:bg-[#2a2a2d]"
          onClick={() => {
            
            navigate(`/r/${item.name}`)
            onCommunitySelect()
          }}
        >
          {item.logo ? (
            <img
              src={item.logo}
              alt=""
              className="h-10 w-10 shrink-0 rounded-full border border-[#3a3a40] object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#29292e]">
              <Users
                size={19}
                className="text-gray-400 group-hover:text-white"
              />
            </div>
          )}

          <div className="min-w-0 flex-1 ">
            <p className="truncate text-sm font-semibold text-gray-100 group-hover:text-white">
              r/{item.name}
            </p>
            <p className="mt-0.5 text-xs text-gray-500 group-hover:text-gray-400">
              Visit community
            </p>
          </div>

          <ChevronRight
            size={17}
            className="shrink-0 text-gray-600 transition-transform group-hover:translate-x-0.5 group-hover:text-gray-300"
          />
        </div>
      ))}
    </div>
  );
}

export default SearchCommunities;
