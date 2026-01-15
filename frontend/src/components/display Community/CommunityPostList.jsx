import React, { useEffect, useState } from 'react';
import PostCard from './PostCard'; 

function CommunityPostList({ community }) {
  
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getCommunityPosts(){
      const response = await fetch(`http://localhost:8080/${community.name}/posts`)
      const data = await response.json();
      console.log(data);
      setPosts(data);
    }
    getCommunityPosts();
  },[community.name])
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
            key={post.id} 
            post={post} 
          />
        ))}
      </div>
    </div>
  );
}

export default CommunityPostList;