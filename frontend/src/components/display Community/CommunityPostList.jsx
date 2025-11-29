import React from 'react';
import PostCard from './PostCard'; 

function CommunityPostList({ community }) {
  // Guard clause
  if (!community || !community.postList || community.postList.length === 0) {
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
        {community.postList.map((post) => (
          <PostCard 
            key={post.id} 
            post={{
                ...post,
                
            }} 
          />
        ))}
      </div>
    </div>
  );
}

export default CommunityPostList;