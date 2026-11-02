import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { MessageCircle, ArrowBigUp, ArrowBigDown } from "lucide-react";
import { getPostSearchResults } from "../../../util/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "../../InfiniteScroll";
import PostCard from "../../display post/PostCard";



function PostResults() {
  const { searchResult: searchWord } = useParams();
  const navigate = useNavigate();

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ["search-word-post",searchWord],
    queryFn: ({ pageParam }) => getPostSearchResults(searchWord, pageParam, 10),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.number+1,
  });

  const posts = data?.pages?.flatMap((page) => page.content) ?? [];


  if (!posts?.length) {
    return (
      <div className="mx-auto max-w-4xl py-12 text-center text-gray-400">
        No posts found for "{searchWord}"
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="divide-y divide-[#303234]">
        {posts.map((post, index) => (
          <PostCard post={post} key={post?.postId} />
        ))}
        <InfiniteScroll getData={fetchNextPage} hasMore={hasNextPage} />
      </div>
    </div>
  );
}

export default PostResults;
