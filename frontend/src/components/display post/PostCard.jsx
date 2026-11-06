import { useNavigate, useParams } from "react-router";
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageCircle,
  Bookmark,
} from "lucide-react";

import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import MediaCarousel from "../MediaCarousel";

const defaults = {
  showCommuityName: true,
  showUserName: true,
  showBody: true,
  showFullBody: false,
  showAction: true,
  showCarousel: false,
  showUserLogo: false,
};
export default function PostCard({ post, index = 0, options = {} }) {
  const navigate = useNavigate();
  const {
    showCommunityName,
    showUserName,
    showBody,
    showFullBody,
    showAction,
    showCarousel,
    showUserLogo,
  } = { ...defaults, ...options };
  const { communityName } = useParams();
  const media = post?.mediaDTOList || post?.media || post.mediaList;

  const isPathMatching = window.location.pathname === `/r/${post?.communityName}/${post.postId}/comments`

  function openPost() {
    if(window.location.pathname === `/r/${post?.communityName}/${post.postId}/comments`){
      return
    }
    navigate(`/r/${post?.communityName}/${post.postId}/comments`);
  }
  return (
    <article className="group flex  items-center gap-5 rounded-2xl px-4 py-5 transition-colors hover:bg-[#191c1e] sm:px-5">
      <div className="min-w-0 flex-1">
        <div className="mb-3">
          <PostHeader
            post={post}
            index={index}
            showUserName={showUserName}
            showCommunity={showCommunityName}
            showUserLogo={showUserLogo}
          />
        </div>

        <div onClick={openPost} className={isPathMatching ? "":"cursor-pointer"}>
          <PostContent
            post={post}
            showBody={showBody}
            showFullBody={showFullBody}
          />
        </div>

        {showCarousel && media?.length > 0 && (
          <div className="mt-3">
            <MediaCarousel key={post?.postId} mediaList={media} />
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-[#91a5b0]">
          {showAction ? (
            <PostActions post={post} />
          ) : (
            <div className="flex items-center gap-4 font-mono text-xs tracking-wide">
              <span>0 votes</span>
              <span>·</span>
              <span>55 comments</span>
            </div>
          )}
        </div>
      </div>

      {!showCarousel && post?.mediaURL && (
        <img
          src={post?.mediaURL}
          alt=""
          loading="lazy"
          className="h-24 w-28 shrink-0 rounded-xl border border-white/10 object-cover sm:h-28 sm:w-36"
        />
      )}
    </article>
  );
}
