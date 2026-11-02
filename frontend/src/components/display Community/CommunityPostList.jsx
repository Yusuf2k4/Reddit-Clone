import InfiniteScroll from "../InfiniteScroll";

import { fetchPostsByCommunity } from "../../util/api";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import PostCard from "../display post/PostCard";

function CommunityPostList({ community }) {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["community-post", community.name],
    queryFn: ({ pageParam }) =>
      fetchPostsByCommunity(community.name, pageParam, 5),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.number + 1,
  });

  const posts = data?.pages?.flatMap((page) => page.content) ?? [];

  // Guard clause
  if (!community || !posts || posts.length === 0) {
    return (
      <div className="text-center p-8 text-gray-400">
        No posts found in the community.
      </div>
    );
  }

  return (
    <div className="mx-auto py-4 px-2 sm:px-6 w-full">
      {/* Heading color adjusted for dark backgrounds */}

      <div className="flex flex-col space-y-4">
        {posts.map((post) => (
          <PostCard
            post={post}
            key={post?.postId}
            options={{
              showCommunityName: false,
              showCarousel: true,
              showUserLogo: true,
            }}
          />
        ))}
        <InfiniteScroll getData={fetchNextPage} hasMore={hasNextPage} />
      </div>
    </div>
  );
}

export default CommunityPostList;
