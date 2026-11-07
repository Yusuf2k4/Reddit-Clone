import {
  ArrowBigDown,
  ArrowBigUp,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react";

import profile from "../../assets/profile.png";
import { useState } from "react";
import TextBox from "../create Post/TextBox";
import { useParams } from "react-router";
import { getCommentsByPost, saveUserComment } from "../../util/api";

function getTimeAgo(date) {
  if (!date) return null;

  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

  return `${Math.floor(seconds / 604800)}w ago`;
}

export default function CommentCard({ comment, fetchComments}) {
  let {
    userLogo,
    userName,
    bodyHtml,
    voteType,
    totalVotes,
    commentedAt,
    commentDTOList,
  } = comment;
  if (userLogo === null) {
    userLogo = profile;
  }

  const { id } = useParams();


  async function sumbitReply(parentId) {
    console.log(parentId)
    const response = {
      bodyHtml: content,
      bodyText: plainText,
      postId: id,
      parentId,
    };
    await saveUserComment(response);
    setContent("")
    setPlainText("")
    setIsFocused(false)
    await fetchComments();
    

  }
  const [isFocused, setIsFocused] = useState(false);
  const [content, setContent] = useState("");
  const [plainText, setPlainText] = useState("");
  return (
    <div className="group relative flex gap-3 py-3">
      {/* Avatar */}
      <div className="shrink-0">
        <img
          src={userLogo}
          alt=""
          className="h-11 w-11 rounded-full object-cover"
        />
      </div>

      {/* Comment content */}
      <div className="min-w-0 flex-1">
        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="truncate text-[15px] font-bold text-[#d7dadc]">
            u/{userName}
          </span>

          <span className="text-[#818384]">·</span>

          {commentedAt && (
            <span className="text-sm text-[#818384]">
              {getTimeAgo(commentedAt)}
            </span>
          )}
        </div>

        {/* Body */}
        <div
          className="mt-2 text-[15px] leading-6 text-[#d7dadc] break-words"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />

        {/* Actions */}
        <div className="mt-2 flex flex-col items-start gap-3 text-[#8ba0a9]">
          {/* Actions row */}
          <div className="flex items-center gap-4">
            {/* Votes */}
            <div className="flex items-center gap-2">
              <button
                className={`transition hover:text-[#ff4500] ${
                  voteType === 1 ? "text-[#ff4500]" : ""
                }`}
              >
                <ArrowBigUp size={20} strokeWidth={1} />
              </button>

              <span className="text-sm font-semibold">{totalVotes}</span>

              <button
                className={`transition hover:text-[#7193ff] ${
                  voteType === -1 ? "text-[#7193ff]" : ""
                }`}
              >
                <ArrowBigDown size={20} strokeWidth={1} />
              </button>
            </div>

            {/* Reply */}
            <button
              className="flex items-center gap-2 text-sm transition hover:text-[#d7dadc]"
              onClick={() => setIsFocused((prev) => !prev)}
            >
              <MessageCircle size={20} strokeWidth={1} />
              Reply
            </button>
          </div>

          {/* Reply textbox and buttons */}
          {isFocused && (
            <div className="w-full space-y-3">
              <TextBox
                content={content}
                setContent={setContent}
                setPlainText={setPlainText}
                height="auto"
                minHeight="4rem"
                maxHeight="8rem"
                placeholder="Reply to someone"
                autoFocus={isFocused}
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setIsFocused(false);
                    setContent("");
                    setPlainText("");
                  }}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-[#d7dadc] transition hover:bg-[#343536]"
                >
                  Cancel
                </button>

                <button
                  onClick={() => sumbitReply(comment?.commentId)}
                  disabled={!content.trim()}
                  className="rounded-full bg-[#d7dadc] px-4 py-2 text-sm font-semibold text-[#1a1a1b] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Comment
                </button>
              </div>
            </div>
          )}
          {commentDTOList?.length > 0 && (
            <div className="ml-3 border-l-2 border-[#343536] pl-3 w-full">
              {commentDTOList.map((reply) => (
                <CommentCard key={reply.commentId} comment={reply} fetchComments={fetchComments}/>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
