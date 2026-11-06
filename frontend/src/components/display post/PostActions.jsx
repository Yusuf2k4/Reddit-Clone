import { useEffect, useState } from "react";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageCircle,
  Share,
  Bookmark,
} from "lucide-react";
import { savePost, votePost } from "../../util/api";

function PostActions({ post = [] }) {
  const [isSaved, setIsSaved] = useState(post?.isSaved ?? false);
  const [totalVotes, setTotalVotes] = useState(post?.totalVotes ?? 0);
  const [voteType, setVoteType] = useState(post?.voteType ?? 0);
  useEffect(() => {
    setIsSaved(post?.isSaved);
  }, [post?.isSaved]);

  useEffect(() => {
    setTotalVotes(post?.totalVotes ?? 0);
    setVoteType(post?.voteType ?? 0);
  }, [post?.totalVotes, post?.voteType]);

  const handleVote = async (vote) => {
    let newVoteType = vote;

    if (vote === voteType) {
      setTotalVotes((prev) => prev - vote);
      setVoteType(0);
      newVoteType = 0;
    } else if (voteType === -vote) {
      setTotalVotes((prev) => prev + 2 * vote);
      setVoteType(vote);
    } else {
      setTotalVotes((prev) => prev + vote);
      setVoteType(vote);
    }

    await votePost(post?.postId, newVoteType);
  };

  const handleComment = () => {
    console.log("Comment clicked");
  };

  const handleShare = () => {
    console.log("Share clicked");
  };

  const handleSave = async () => {
    await savePost(post?.postId);
    setIsSaved((prev) => !prev);
  };
  let voteBg = "bg-[#272729]";
  if (voteType === 1) {
    voteBg = "bg-[#D93A00]";
  }
  if (voteType === -1) {
    voteBg = "bg-[#6A5CFF]";
  }

  return (
    <div className="flex items-center gap-3 text-sm text-gray-400">
      {/* Voting */}
      <div className={`flex items-center gap-1 rounded-full ${voteBg}`}>
        <button
          onClick={() => handleVote(1)}
          className="rounded-full p-2 hover:bg-black/20"
          aria-label="Upvote"
        >
          <ArrowBigUp
            size={20}
            className={voteType === 1 ? "fill-current text-white" : ""}
          />
        </button>

        <span className="font-semibold text-white">{totalVotes}</span>

        <button
          onClick={() => handleVote(-1)}
          className="rounded-full p-2 hover:bg-black/20"
          aria-label="Downvote"
        >
          <ArrowBigDown
            size={20}
            className={voteType === -1 ? "fill-current text-white" : ""}
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
