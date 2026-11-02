
import { useEffect, useState } from "react";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageCircle,
  Share,
  Bookmark,
} from "lucide-react";
import { savePost } from "../../util/api";

function PostActions({postId, postSaved}) {
  const [vote, setVote] = useState(0);
  const [isSaved, setIsSaved] = useState(postSaved);



  useEffect(()=>{
    setIsSaved(postSaved)
  },[postSaved])
  const handleUpvote = () => {
    setVote((prev) => (prev === 1 ? 0 : 1));
  };

  const handleDownvote = () => {
    setVote((prev) => (prev === -1 ? 0 : -1));
  };

  const handleComment = () => {
    console.log("Comment clicked");
  };

  const handleShare = () => {
    console.log("Share clicked");
  };

  const handleSave = async () => {
    await savePost(postId);
    setIsSaved(prev => !prev)
    
  };

  return (
    <div className="flex items-center gap-3 text-sm text-gray-400">
      {/* Voting */}
      <div className="flex items-center gap-1 rounded-full bg-[#272729]">
        <button
          onClick={handleUpvote}
          className="rounded-full p-2 hover:bg-[#343436]"
          aria-label="Upvote"
        >
          <ArrowBigUp
            size={20}
            className={vote === 1 ? "text-orange-500" : ""}
          />
        </button>

        <span className="font-semibold text-white">
          {vote}
        </span>

        <button
          onClick={handleDownvote}
          className="rounded-full p-2 hover:bg-[#343436]"
          aria-label="Downvote"
        >
          <ArrowBigDown
            size={20}
            className={vote === -1 ? "text-blue-500" : ""}
          />
        </button>
      </div>

      {/* Comments */}
      <button
        onClick={handleComment}
        className="flex items-center gap-2 rounded-full bg-[#272729] px-3 py-2 hover:bg-[#343436]"
      >
        <MessageCircle size={18} />
        <span>Comment</span>
      </button>

      {/* Share */}
      <button
        onClick={handleShare}
        className="flex items-center gap-2 rounded-full bg-[#272729] px-3 py-2 hover:bg-[#343436]"
      >
        <Share size={18} />
        <span>Share</span>
      </button>

      {/* Save */}
      <button
        onClick={handleSave}
        className="rounded-full bg-[#272729] p-2 hover:bg-[#343436]"
        aria-label="Save post"
      >
        <Bookmark
          size={18}
          className={isSaved ? "fill-current text-white" : ""}
        />
      </button>
    </div>
  );
}

export default PostActions;
