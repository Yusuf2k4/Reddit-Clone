import { useParams, useSearchParams } from "react-router";
import profile from "../../assets/profile.png";

import { getSavedPost, getUserDownVotes, getUserHistory, getUserPosts, getUserUpVotes } from "../../util/api";
import UserPostList from "./UserPostList";
import UserHistory from "./UserHistory";

export default function User() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "posts";

  const tabs = [
    "posts",
    "comments",
    "saved",
    "history",
    "upvoted",
    "downvoted",
  ];

  function handleTabClick(tab) {
    setSearchParams({ tab });
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Main Profile Section - 3/4 width */}
        <div className="lg:col-span-3 min-w-0">
          {/* Profile Header */}
          <div className="mb-6 flex items-center gap-4">
            <img
              src={profile}
              alt="Profile"
              className="h-20 w-20 rounded-full object-cover"
            />

            <div>
              <h1 className="text-2xl font-bold text-white">User Name</h1>

              <p className="mt-1 text-sm text-[#818384]">u/userName</p>
            </div>
          </div>

          {/* Profile Tabs */}
          <div className="flex gap-6 overflow-x-auto border-b border-[#343536]">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`shrink-0 border-b-2 py-3 text-sm font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? "border-white text-white"
                    : "border-transparent text-[#818384] hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}

          <div className="mt-5">
            {activeTab === "posts" && <UserPostList getData={getUserPosts} queryKey="user-post"  /> }
            {activeTab === "comments" && <div>Comments</div>}
            {activeTab === "saved" && <UserPostList getData={getSavedPost} queryKey="user-saved-post" />}
            {activeTab === "history" && <UserHistory />}
            {activeTab === "upvoted" && <UserPostList getData={getUserUpVotes} queryKey="user-upvoted-post"/>}
            {activeTab === "downvoted" && <UserPostList getData={getUserDownVotes} queryKey="user-downvoted-post" />}
          </div>
        </div>

        {/* Right Sidebar - 1/4 width */}
        <aside className="mt-6 h-fit rounded-lg border border-[#343536] p-5">
          <h2 className="mb-4 text-lg font-bold text-white">
            Profile Overview
          </h2>

          <div className="mb-5">
            <p className="text-sm text-[#818384]">Reddit age</p>
            <p className="mt-1 font-semibold text-white">2 years</p>
          </div>

          <div className="mb-5">
            <p className="text-sm text-[#818384]">Followers</p>
            <p className="mt-1 font-semibold text-white">128</p>
          </div>

          <div>
            <p className="text-sm text-[#818384]">Contributions</p>
            <p className="mt-1 font-semibold text-white">245</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
