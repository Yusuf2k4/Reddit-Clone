import PostCard from "../display post/PostCard";

export default function PostList({
  posts = [],
  
}) {
  
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.postId} post={post} options={{showFullBody:false}}/>
      ))}
    </div>
  );
}
