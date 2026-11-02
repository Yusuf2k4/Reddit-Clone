import { useState } from "react";
import PostResults from "./PostResults";
import CommunityResults from "./CommunityResults";
import { useSearchParams } from "react-router";

function SearchResultTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "posts";
  const tabs = ["posts", "communities", "profiles"];


  function handleTabs(tab){
    setSearchParams({tab})
  }

  return (
    <div className="w-3/4 border-b border-[#343536]">
      <div className="flex items-center gap-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabs(tab)}
            className={`relative py-4 text-sm font-semibold transition-colors duration-200 ${
              activeTab === tab
                ? "text-white"
                : "text-[#818384] hover:text-white"
            }`}
          >
            {tab}

            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-t-full bg-white" />
            )}
          </button>
        ))}
      </div>
      <div>
        {activeTab === "posts" &&  <PostResults />}
        {activeTab === "communities" && <CommunityResults />}
       
        {/* Profile */}
      </div>
    </div>
  );
}

export default SearchResultTab;
