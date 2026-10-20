import React, { useState, useEffect, useRef } from "react";
import Autocomplete from "./Autocomplete";
import SearchCommunities from "./SearchCommunities";
import { useNavigate } from "react-router";

function SearchBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [word, setWord] = useState("");
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCommunitySelect = () => {
    setIsDropdownOpen(false);
  };
  function handleEnter(e){
    if(e.key === 'Enter'){
      if(word === ""){
        return
      }
      navigate(`/search/${encodeURIComponent(word)}`)
      setIsDropdownOpen(false);
    }
  }

  return (
    <div ref={searchRef} className="relative w-full">
      <input
        type="search"
        placeholder="Search Reddit"
        className="w-full bg-transparent outline-none text-sm placeholder-gray-400"
        value={word}
        onFocus={() => setIsDropdownOpen(true)}
        onChange={(e) => setWord(e.target.value)}
        onKeyDown={(e) => handleEnter(e)}
      />

      {isDropdownOpen && (
        <div
          className="absolute top-full left-0 z-50 mt-2
            h-[600px] w-full overflow-y-auto
            rounded-xl border border-[#343438]
            bg-[#18181b] shadow-2xl"
        >
          <Autocomplete
            word={word}
            onCommunitySelect={handleCommunitySelect}
            
          />

          <SearchCommunities
            word={word}
            onCommunitySelect={handleCommunitySelect}
          />
        </div>
      )}
    </div>
  );
}

export default SearchBar;