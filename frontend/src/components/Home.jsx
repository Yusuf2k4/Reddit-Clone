import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import { getHomeFeed } from "../util/api";

import InfiniteScroll from "./InfiniteScroll";
import MediaCarousel from "./MediaCarousel";
import PostHeader from "./display post/PostHeader";
import PostContent from "./display post/PostContent";
import PostActions from "./display post/PostActions";
import PostCard from "./display post/PostCard";

const Home = () => {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["home-feed"],
    queryFn: ({ pageParam }) => getHomeFeed(pageParam, 6),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.number + 1,
  });

  const navigate = useNavigate();

  const items = data?.pages?.flatMap((page) => page.content) ?? [];

  return (
    <div className="max-w-4xl px-4 py-8 md:py-10">
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={item.postId}>
            <PostCard
              post={item}
              options={{ showCarousel: true, showUserName: false }}
            />

            {index !== items.length - 1 && (
              <div className="relative my-6">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
                <div className="absolute inset-0 h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent blur-sm" />
              </div>
            )}
          </div>
        ))}
      </div>

      <InfiniteScroll getData={fetchNextPage} hasMore={hasNextPage} />
    </div>
  );
};

export default Home;
