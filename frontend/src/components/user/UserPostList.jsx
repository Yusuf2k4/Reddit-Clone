import { useContext, useEffect, useState } from "react";
import { getSavedPost, getUserPosts } from "../../util/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { UserContext } from "../../context/UserContext";
import PostCard from "../display post/PostCard";
import InfiniteScroll from "../InfiniteScroll";
import PostList from "./PostList";

export default function UserPostList({ getData, queryKey }) {
  const { user } = useContext(UserContext);
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: [queryKey, user?.id],
    queryFn: ({ pageParam }) => getData(pageParam, 7),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.number + 1,
  });
  const items = data?.pages?.flatMap((page) => page.content);
  console.log(data);

  return (
    <div>
      <PostList posts={items} />

      <InfiniteScroll getData={fetchNextPage} hasMore={hasNextPage} />
    </div>
  );
}
