import React, { useEffect, useRef, useState } from 'react';
import PostCard from './PostCard'; 
import InfiniteScroll from '../InfiniteScroll';
import { data } from 'react-router';

function CommunityPostList({ community }) {
  
  const [posts, setPosts] = useState([]);
  const pageRef = useRef(0);
  const sizeRef = useRef(5);
  const[isLast, setIsLast] = useState(false);
  const initialized = useRef(false)



  useEffect(() => {
    setPosts([]);
    setIsLast(false);
    pageRef.current = 0;
  }, [community.name]);


  async function fetchPosts(){
    console.log("FETCHING PAGE  = ", pageRef.current)
    

    if(isLast) return;

    const response = await fetch(`http://localhost:8080/post/community/${community.name}?page=${pageRef.current}&size=${sizeRef.current}`);
    const data = await response.json();


    setPosts((prev) => [...prev,...data.content])
    setIsLast(data.last)

    pageRef.current += 1;
  }

  
  useEffect(() => { 
    if(initialized.current) return;
    initialized.current = true;
    fetchPosts();

    
    
    
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
        <InfiniteScroll getData={fetchPosts} hasMore={!isLast} />
      </div>
    </div>
  );
}

export default CommunityPostList;