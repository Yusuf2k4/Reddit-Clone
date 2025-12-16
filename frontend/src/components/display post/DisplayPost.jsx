import React, { useState, useRef, useEffect } from "react";
import {
  ArrowUp,
  ArrowDown,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Loader 
} from "lucide-react";
import { useLoaderData, useNavigate } from "react-router";

export default function DisplayPost() {
  const post = useLoaderData(); 

  const media = post?.media || [];

  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [votes, setVotes] = useState(post.votes || 0);
  const [voteState, setVoteState] = useState(null);
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState("");
  
  // 💡 NEW STATE: Tracks if the current media is loading
  const [mediaLoading, setMediaLoading] = useState(true); 

  const textareaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    setCurrentMediaIndex(0);
    setMediaLoading(true); 
  }, [media.length]);

  
  useEffect(() => {
    if (media.length > 0) {
        setMediaLoading(true);
    }
  }, [currentMediaIndex]);


  function prevMedia() {
    setCurrentMediaIndex((i) => (i - 1 + media.length) % media.length);
  }

  function nextMedia() {
    setCurrentMediaIndex((i) => (i + 1) % media.length);
  }

  function toggleUpvote() {
    if (voteState === "up") {
      setVoteState(null);
      setVotes((v) => v - 1);
    } else if (voteState === "down") {
      setVoteState("up");
      setVotes((v) => v + 2);
    } else {
      setVoteState("up");
      setVotes((v) => v + 1);
    }
  }

  function toggleDownvote() {
    if (voteState === "down") {
      setVoteState(null);
      setVotes((v) => v + 1);
    } else if (voteState === "up") {
      setVoteState("down");
      setVotes((v) => v - 2);
    } else {
      setVoteState("down");
      setVotes((v) => v - 1);
    }
  }

  function submitComment() {
    if (!comment.trim()) return;
    console.log("Submitting comment:", comment);
    setComment("");
    setIsCommenting(false);
  }

  // 💡 NEW HANDLER: Set loading state to false
  function handleMediaLoad() {
    setMediaLoading(false);
  }

 
  function renderMediaItem(item) {
    if (!item) return null;

    const { type, media: src } = item;
    
    
    const mediaClasses = "w-full h-96 object-contain rounded-lg";
    
    
    const loadingStyle = { display: mediaLoading ? 'none' : 'block' };

    if (type === "image") {
      return (
        <img
          src={src}
          alt={post.title || "media"}
          className={mediaClasses}
          onLoad={handleMediaLoad} // 💡 Image load handler
          onError={handleMediaLoad} // 💡 Handle errors
          style={loadingStyle} // 💡 Hide until loaded
        />
      );
    }

    // audio/recording
    if (type === "recording" || type === "audio") {
      // Audio does not usually need a spinner, but we keep the height consistent
      return (
        <div className="flex items-center justify-center h-96"> 
          <audio controls src={src} className="w-full max-w-sm" />
        </div>
      );
    }

    // video
    if (type === "video") {
      return (
        <video 
          controls 
          className={mediaClasses}
          onLoadedData={handleMediaLoad} // 💡 Video load handler
          style={loadingStyle} // 💡 Hide until loaded
        >
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      );
    }

    // Fallback: try to render as image
    return (
      <img
        src={src}
        alt={post.title || "media"}
        className={mediaClasses}
        onLoad={handleMediaLoad} 
        onError={handleMediaLoad} 
        style={loadingStyle} 
      />
    );
  }
  

  return (
    <>
      <article className="max-w-3xl mt-2 ml-2 bg-[#121212] rounded-2xl shadow-sm border border-gray-700 p-4 text-gray-200">
        {/* HEADER  */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={post.logo}
              alt={post.community}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-gray-100 hover:cursor-pointer" onClick={() => navigate(`/r/${post.community}`)}>
                r/{post.community}
              </span>
              <span className="text-xs text-gray-400 mt-0.5">
                {post.createdBy}
              </span>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            {post.createdAt ? post.createdAt : "just now"}
          </div>
        </div>

        {/* TITLE  */}
        <h2 className="text-lg font-semibold leading-snug text-gray-100 mb-3">
          {post.title}
        </h2>

        
        
        {/* MEDIA SLIDER */}
        {media.length > 0 && (
          <div className="mb-4">
            <div className="relative bg-black/20 rounded-lg overflow-hidden w-full h-96"> {/* 💡 Set fixed height on container */}
              
              {/* 💡 LOADING SPINNER OVERLAY */}
              {mediaLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#121212] z-10 rounded-lg">
                    <Loader size={48} className="animate-spin text-gray-500" />
                </div>
              )}
              
              {/* Main media */}
              <div className="w-full">
                {renderMediaItem(media[currentMediaIndex])}
              </div>

              {/* Prev / Next buttons (Hide buttons while loading) */}
              {media.length > 1 && !mediaLoading && (
                <>
                  <button
                    onClick={prevMedia}
                    aria-label="previous media"
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 hover:bg-black/60 z-20"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>

                  <button
                    onClick={nextMedia}
                    aria-label="next media"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 hover:bg-black/60 z-20"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>

                  {/* Count badge */}
                  <div className="absolute right-3 top-3 text-xs bg-black/60 px-2 py-1 rounded-full text-white z-20">
                    {currentMediaIndex + 1}/{media.length}
                  </div>
                </>
              )}
            </div>

            
          </div>
        )}
        {/* BODY HTML */}
        <div
          className="prose prose-sm max-w-none text-gray-300 prose-invert mb-4"
          dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
        />


        {/* VOTES + COMMENTS  */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 rounded-full border border-gray-700 bg-gray-900/40 px-3 py-2">
            <button
              aria-label="upvote"
              onClick={toggleUpvote}
              className={`p-1 rounded-md transition ${
                voteState === "up" ? "text-amber-400" : "text-gray-300"
              } hover:bg-gray-800`}
            >
              <ArrowUp className="w-5 h-5" />
            </button>
            <div className="text-sm font-medium text-gray-200">{votes}</div>
            <button
              aria-label="downvote"
              onClick={toggleDownvote}
              className={`p-1 rounded-md transition ${
                voteState === "down" ? "text-sky-400" : "text-gray-300"
              } hover:bg-gray-800`}
            >
              <ArrowDown className="w-5 h-5" />
            </button>
          </div>

          <div
            className="flex items-center gap-2 border border-gray-700 bg-gray-900/40 rounded-full px-3 py-2 cursor-pointer hover:bg-gray-800"
            onClick={() => {
              setIsCommenting((s) => !s);
              setTimeout(() => textareaRef.current?.focus(), 50);
            }}
          >
            <MessageCircle className="w-5 h-5 text-gray-300" />
            <span className="text-sm text-gray-200">
              {post.commentsCount || 0}
            </span>
          </div>
        </div>
      </article>

      {/* COMMENT BOX */}
      <div className="max-w-3xl mt-2 ml-2">
        {!isCommenting ? (
          <div
            onClick={() => {
              setIsCommenting(true);
              setTimeout(() => textareaRef.current?.focus(), 50);
            }}
            className="cursor-text rounded-full border border-gray-700 px-4 py-2 text-sm text-gray-400 hover:bg-gray-800"
          >
            Add a comment...
          </div>
        ) : (
          <div className="mt-2 space-y-2">
            <textarea
              ref={textareaRef}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-gray-700 bg-[#1a1a1a] text-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
              placeholder="What are your thoughts?"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setComment("");
                  setIsCommenting(false);
                }}
                className="px-4 py-2 rounded-full text-sm text-gray-300 hover:bg-gray-800"
              >
                Cancel
              </button>

              <button
                onClick={submitComment}
                className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm shadow-sm hover:bg-indigo-500"
              >
                Comment
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}