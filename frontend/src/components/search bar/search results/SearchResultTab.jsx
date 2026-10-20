import { useState } from "react";
import PostResults from "./PostResults";
import CommunityResults from "./CommunityResults";

function SearchResultTab() {
  const [activeTab, setActiveTab] = useState("Posts");

  const tabs = ["Posts", "Communities", "Profiles"];

  return (
    <div className="w-3/4 border-b border-[#343536]">
      <div className="flex items-center gap-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
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
        {activeTab === "Posts" &&  <PostResults />}
        {activeTab === "Communities" && <CommunityResults />}
       
        {/* Communities */}
        {/* Profile */}
      </div>
    </div>
  );
}

export default SearchResultTab;
