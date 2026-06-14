import React from 'react'
import { useEffect, useRef } from 'react'

function InfiniteScroll({getData, hasMore}) {

    const observerRef = useRef();
    useEffect(()=>{

        const intersectionObserver = new IntersectionObserver((entries) => {
            if(entries[0].intersectionRatio <= 0) return;
            if(entries[0].isIntersecting && hasMore){

              getData();
            }
            

        },{threshold:0.1});
        if(observerRef.current){
          intersectionObserver.observe(observerRef.current);
        }

        return () => {

          
          intersectionObserver.disconnect();
        }

    },[hasMore,getData])
  return (
    
    <div ref={observerRef} className='bg-red-600'>FEtching posts</div>
  )
}

export default InfiniteScroll