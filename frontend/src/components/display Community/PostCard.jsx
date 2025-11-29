import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUp,
  ArrowDown,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Loader,
} from "lucide-react";

const PostCard = ({ post }) => {
  console.log(post);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  // NEW STATE: Tracks if the currently selected media item is loading
  const [mediaLoading, setMediaLoading] = useState(true);

  const authorName = post.createdBy || "u/Anonymous";
  const voteCount = post.voteCount || 0;
  const commentCount = post.commentCount || 0;
  const hasMedia = post.media && post.media.length > 0;

  // Calculate indices for preloading: previous and next
  const prevIndex =
    (currentMediaIndex - 1 + post.media.length) % post.media.length;
  const nextIndex = (currentMediaIndex + 1) % post.media.length;

  const navigate = useNavigate();

  // Function called when the media element finishes loading
  const handleMediaLoad = () => setMediaLoading(false);

  // Slider Logic (Modified to trigger loading state on index change)
  const handleNextMedia = (e) => {
    e.stopPropagation();
    setMediaLoading(true); // Start loading when index changes
    setCurrentMediaIndex(nextIndex);
  };

  const handlePrevMedia = (e) => {
    e.stopPropagation();
    setMediaLoading(true); // Start loading when index changes
    setCurrentMediaIndex(prevIndex);
  };
  const handleChange = () => {
    console.log(post.id);
    navigate(`${post.id}/comments`);
  };
  return (
    // High-Contrast Dark Mode: bg-gray-950
    <div
      className="bg-[rgb(26,26,27)]  border-gray-700 rounded-lg p-3 shadow-2xl md:p-4 hover:cursor-pointer"
      
    >
      <div onClick={handleChange}>
        {/* 1. User Profile & Name Header (Omitted for brevity, no changes here) */}
        <div className="flex items-center mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm mr-2">
            {authorName[2] || "U"}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-100">
              {authorName}
            </span>
            <span className="text-xs text-gray-400">Posted just now</span>
          </div>
        </div>

        {/* 2. Title (Omitted for brevity, no changes here) */}
        <h3 className="text-xl font-bold mb-3 text-gray-50">{post.title}</h3>

        {/* 3. & 7. Media Slider */}
        {hasMedia && (
          <div className="relative w-full h-64 md:h-96 bg-black rounded-md overflow-hidden mb-3 flex items-center justify-center">
            {/* 🔄 LOADING SPINNER 🔄 */}
            {mediaLoading && (
              // Spinner matched to dark gray background
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-20">
                <Loader size={48} className="animate-spin text-gray-400" />
              </div>
            )}

            {/* Display Current Media */}
            {post.media[currentMediaIndex].type === "video" ? (
              <video
                controls
                src={post.media[currentMediaIndex].media}
                onLoadedData={handleMediaLoad} // Video loading handler
                className="max-w-full max-h-full object-contain"
                style={{ display: mediaLoading ? "none" : "block" }} // Hide video element until loaded
              />
            ) : (
              <img
                src={post.media[currentMediaIndex].media}
                alt="Post content"
                onLoad={handleMediaLoad} // Image loading handler
                onError={handleMediaLoad} // Handle errors just in case
                className="max-w-full max-h-full object-contain"
                style={{ display: mediaLoading ? "none" : "block" }} // Hide image element until loaded
              />
            )}

            {/* Slider Controls (Show only if not loading and more than 1 item) */}
            {post.media.length > 1 && !mediaLoading && (
              <>
                {/* ChevronLeft Button */}
                <button
                  onClick={handlePrevMedia}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-700/80 text-white hover:bg-gray-700 p-2 rounded-full shadow-lg z-10 hidden sm:block transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* ChevronRight Button */}
                <button
                  onClick={handleNextMedia}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-700/80 text-white hover:bg-gray-700 p-2 rounded-full shadow-lg z-10 hidden sm:block transition-colors"
                >
                  <ChevronRight size={20} />
                </button>

                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                  {currentMediaIndex + 1} / {post.media.length}
                </div>
              </>
            )}
          </div>
        )}

        <div className="mb-4">
          <div
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
            className="text-sm text-gray-300 leading-relaxed overflow-hidden"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
            }}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center bg-gray-800 rounded-full p-1 sm:p-2 space-x-1">
          <button className="p-1 rounded-full hover:bg-gray-700">
            <ArrowUp
              size={20}
              className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
            />
          </button>
          <span className="text-sm font-bold text-gray-50 px-1">
            {voteCount}
          </span>
          <button className="p-1 rounded-full hover:bg-gray-700">
            <ArrowDown
              size={20}
              className="text-gray-400 hover:text-blue-500 transition-colors cursor-pointer"
            />
          </button>
        </div>
        <div className="flex items-center text-gray-400 font-medium text-sm p-1 sm:p-2 rounded-md hover:bg-gray-800 cursor-pointer transition-colors">
          <MessageCircle size={20} className="mr-2" />
          <span>{commentCount} Comments</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
