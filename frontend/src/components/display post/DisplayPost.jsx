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
import MediaCarousel from "../MediaCarousel";

export default function DisplayPost() {
  const post = useLoaderData(); 
  const media = post?.media || [];
  console.log(post)

  const [votes, setVotes] = useState(0)
  const [voteState, setVoteState] = useState(null);
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState("");
  



  const textareaRef = useRef(null);
  const navigate = useNavigate();

 
  



 
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

  


  return (
    <>
      <article className="max-w-3xl mt-2 ml-2 bg-[#121212] rounded-2xl shadow-sm border border-gray-700 p-4 text-gray-200">
        {/* HEADER  */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={post.logo}
              alt={post.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-gray-100 hover:cursor-pointer" onClick={() => navigate(`/r/${post.name}`)}>
                r/{post.name}
              </span>
              <span className="text-xs text-gray-400 mt-0.5">
                u/{post.userName}
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
          <MediaCarousel mediaList={media} />
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