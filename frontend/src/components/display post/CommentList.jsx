import { MessageCircle } from "lucide-react";
import CommentCard from "./CommentCard";
import { useEffect } from "react";

export default function CommentList({ commentData = [], fetchComments}) {
    
  if (!commentData.length) {
    return (
      <div className="mt-4 py-10 text-center">
        <MessageCircle size={30} className="mx-auto mb-3 text-[#818384]" />

        <p className="text-sm font-medium text-[#d7dadc]">
          The conversation starts here.
        </p>

        <p className="mt-1 text-xs text-[#818384]">
          Be the first to share your thoughts.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5">
      {commentData.map((comment) => (
        <CommentCard key={comment.commentId} comment={comment} fetchComments={fetchComments}/>
      ))}
    </div>
  );
}
