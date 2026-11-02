import { useContext, useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react";
import { useLoaderData, useParams } from "react-router";

import MediaCarousel from "../MediaCarousel";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import { UserContext } from "../../context/UserContext";
import { postUserHistory } from "../../util/api";
import PostCard from "./PostCard";

export default function DisplayPost() {
  const post = useLoaderData();
  const media = post?.media || [];

  const [isCommentFocused, setIsCommentFocused] = useState(false);
  const [comment, setComment] = useState("");
  const commentRef = useRef(null);
  const {id: postId} = useParams();
  const {user} = useContext(UserContext);




  useEffect(()=>{
    async function saveHistory(){
      if(!postId || !user){
        return
      }
      await postUserHistory(postId);


    }
    saveHistory();
  },[postId, user?.id])
  useEffect(() => {
    function handleClickOutside(event) {
      if (commentRef.current && !commentRef.current.contains(event.target)) {
        setIsCommentFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!post) {
    return (
      <main className="w-full px-4 py-5 text-[#d7dadc] sm:px-6">
        <p>Post not found.</p>
      </main>
    );
  }
  return (
    <main className="w-full min-w-0 px-4 py-5 text-[#d7dadc] sm:px-6">
      <div className="mx-8 w-full max-w-3xl space-y-4">
        <PostCard post={post} options={{showFullBody: true, showCarousel: true}}/>

        {/* Comments section */}
        <section className="pt-1">
          <h2 className="mb-3 text-base font-semibold text-[#d7dadc]">
            Comments
          </h2>

          {/* Expandable comment textbox */}
          <div
            ref={commentRef}
            className="rounded-xl border border-[#343536] bg-[#1a1a1b] p-3 transition-colors duration-200 sm:p-4"
          >
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onFocus={() => setIsCommentFocused(true)}
              onClick={() => setIsCommentFocused(true)}
              placeholder="Join the conversation..."
              rows={isCommentFocused ? 4 : 1}
              className={`w-full resize-none rounded-lg border border-[#343536] bg-[#0e0e0f] px-4 py-3 text-sm leading-relaxed text-[#d7dadc] placeholder:text-[#818384] outline-none transition-all duration-200 focus:border-[#6b8fa3] ${
                isCommentFocused ? "min-h-28" : "min-h-11"
              }`}
            />

            {isCommentFocused && (
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-[#818384]">
                  Be respectful and keep it constructive.
                </p>

                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  disabled={!comment.trim()}
                  className="shrink-0 self-end rounded-full bg-[#d7dadc] px-5 py-2 text-sm font-semibold text-[#1a1a1b] transition hover:bg-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Comment
                </button>
              </div>
            )}
          </div>

          {/* Empty comments state */}
          <div className="mt-4 rounded-xl border border-[#343536] bg-[#1a1a1b] px-4 py-8 text-center">
            <MessageCircle size={28} className="mx-auto mb-3 text-[#818384]" />

            <p className="text-sm font-medium text-[#d7dadc]">
              The conversation starts here.
            </p>

            <p className="mt-1 text-xs text-[#818384]">
              Be the first to share your thoughts.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
