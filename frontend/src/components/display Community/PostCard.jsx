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
import MediaCarousel from "../MediaCarousel";

const PostCard = ({ post }) => {

  // NEW STATE: Tracks if the currently selected media item is loading


  const authorName = "u/" + post.userName;
  const voteCount = post.voteCount || 0;
  const commentCount = post.commentCount || 0;
  const hasMedia = post.mediaResponseDTOList && post.mediaResponseDTOList.length > 0;
  
  // Calculate indices for preloading: previous and next
  
  const navigate = useNavigate();

  // Function called when the media element finishes loading


  // Slider Logic (Modified to trigger loading state on index change)
  
  const handleChange = () => {
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
          <MediaCarousel mediaList={post.mediaResponseDTOList}/>
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
