import PostCard from "../display post/PostCard";

export default function PostList({posts = [], showUserName = true, showVoting = true}) {
  return (
    <div>
        {posts.map((post) => (
        <PostCard
          key={post.postId}
          post={post}
          showUserName={showUserName}
          showVoting={showVoting}
        />
      ))}
    </div>
  )
}
