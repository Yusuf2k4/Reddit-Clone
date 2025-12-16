import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { ImageWithSkeleton } from "../../util/loading screen/ImageWithSkeleton";
import CommunityAvatar from "../../util/loading screen/CommunityAvatar";

export default function Dropdown({ dropDownIsOpen, onSelect, communityName }) {
  // Fallback if loader data is missing during development
  const data = useLoaderData()
  const [communities, setCommunities] = useState(data);

  useEffect(() => {
    if (!communityName){
      setCommunities(data)
      return;
    };

    if(communityName === ""){
      setCommunities(useLoaderData())
    }
    console.log(communityName)
    const delay = setTimeout(() => {
      async function getCommunities() {
        const response = await fetch(
          `http://localhost:8080/communities/${communityName}`
        );
        const data = await response.json();
        setCommunities(data);
      }

      getCommunities();
    }, 1200); // 1.2 sec debounce (between 1–1.5 sec)

    return () => clearTimeout(delay); // cleanup
  }, [communityName]);

  if (!dropDownIsOpen) return null;

  return (
    <div className="absolute top-full left-0 mt-2 w-full rounded-lg shadow-xl shadow-black/50 z-50 bg-zinc-800 border border-zinc-700 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
      <div className="p-2">
        
      </div>
      <ul className="max-h-80 overflow-y-auto custom-scrollbar">
        {communities?.length > 0 ? (
          communities.map((community, idx) => (
            <li
              key={idx}
              onClick={() => onSelect(community)}
              className="px-4 py-2.5 text-gray-200 hover:bg-zinc-700 cursor-pointer transition-colors flex items-center gap-3"
            >
              
                <CommunityAvatar src={community.logo}/>     
              
              <span className="text-sm  font-bold truncate">
                r/{community.name}
              </span>
            </li>
          ))
        ) : (
          <li className="px-4 py-3 text-gray-400 italic text-sm text-center">
            No communities found
          </li>
        )}
      </ul>
    </div>
  );
}
