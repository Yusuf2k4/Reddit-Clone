import {
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { MessageCircle } from "lucide-react";
import { useLoaderData, useParams } from "react-router";
import { UserContext } from "../../context/UserContext";
import { postUserHistory } from "../../util/api";
import PostCard from "./PostCard";
import TextBox from "../create Post/TextBox";

export default function DisplayPost() {
  const post = useLoaderData();

  const [isCommentFocused, setIsCommentFocused] = useState(false);
  const [comment, setComment] = useState("");
  const [text, setText] = useState("");
  const commentRef = useRef(null);
  const { id: postId } = useParams();
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function saveHistory() {
      if (!postId || !user) {
        return;
      }
      await postUserHistory(postId);
    }
    saveHistory();
  }, [postId, user?.id]);

  function handleCancel() {
    setText("");
    setComment("");
    setIsCommentFocused(false);
  }
  function handleSumbit() {
    console.log(text);
    console.log(comment);
    setText("");
    setComment("");
    setIsCommentFocused(false);
  }
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
        <PostCard
          post={post}
          options={{ showFullBody: true, showCarousel: true }}
        />

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
            {/* Collapsed state */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isCommentFocused
                  ? "grid-rows-[0fr] opacity-0"
                  : "grid-rows-[1fr] opacity-100"
              }`}
            >
              <div className="overflow-hidden">
                <button
                  type="button"
                  onClick={() => setIsCommentFocused(true)}
                  className="min-h-11 w-full rounded-lg border border-[#343536] bg-[#0e0e0f] px-4 py-3 text-left text-sm text-[#818384] transition-colors hover:border-[#6b8fa3]"
                >
                  Join the conversation...
                </button>
              </div>
            </div>

            {/* Expanded state */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isCommentFocused
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="min-h-0">
                  <TextBox
                    content={comment}
                    setContent={setComment}
                    setPlainText={setText}
                    height="auto"
                    minHeight="8rem"
                    maxHeight="16rem"
                    placeholder="Join the conversation..."
                    autoFocus={isCommentFocused}
                  />

                  <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-[#818384]">
                      Be respectful and keep it constructive.
                    </p>

                    <div className="flex shrink-0 items-center gap-2 self-end">
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="rounded-full px-4 py-2 text-sm font-semibold text-[#d7dadc] transition hover:bg-[#272729] active:scale-95"
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        onClick={handleSumbit}
                        disabled={!text.trim()}
                        className="rounded-full bg-[#d7dadc] px-5 py-2 text-sm font-semibold text-[#1a1a1b] transition hover:bg-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
