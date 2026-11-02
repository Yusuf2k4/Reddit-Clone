import { useEffect, useState } from "react";
import { getCommunitySearchResults } from "../../../util/api";
import { useNavigate, useParams } from "react-router";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "../../InfiniteScroll";

const colors = [
  "bg-purple-600",
  "bg-emerald-600",
  "bg-orange-500",
  "bg-blue-600",
  "bg-pink-600",
];

export default function CommunityResults() {
  const { searchResult: name } = useParams();
  const navigate = useNavigate();

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["search-word-community", name],
    queryFn: ({ pageParam }) => getCommunitySearchResults(name, pageParam, 10),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.number + 1,
  });

  
  const communities = data?.pages?.flatMap((page) => page.content) ?? [];


  if (!communities?.length) {
    return (
      <div className="mx-auto max-w-4xl py-12 text-center text-gray-400">
        No community found for "{name}"
      </div>
    );
  }
  return (
    <div className="w-full max-w-3xl">
      <div className="flex flex-col ">
        {communities.map((community, index) => (
          <div
            key={community.name}
            className="flex items-start gap-3 py-4 px-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            onClick={() => navigate(`/r/${community.name}`)}
          >
            {/* Logo */}
            {community.logo ? (
              <img
                src={community.logo}
                alt={`${community.name} logo`}
                className="w-12 h-12 rounded-full object-cover shrink-0"
              />
            ) : (
              <div
                className={`w-12 h-12 rounded-full ${colors[index % colors.length]} flex items-center justify-center text-white font-semibold text-sm shrink-0`}
              >
                r/
              </div>
            )}

            {/* Community Information */}
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                r/{community.name}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {community.description}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1.5">
                240K members
              </p>
            </div>
          </div>
        ))}
        <InfiniteScroll getData={fetchNextPage} hasMore={hasNextPage} />
      </div>
    </div>
  );
}
