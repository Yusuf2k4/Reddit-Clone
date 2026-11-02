import { useNavigate, useParams } from "react-router";
import profile from "../../assets/profile.png";

const communityColors = [
  "bg-[#35c6a3]",
  "bg-[#dce5e9]",
  "bg-[#f2a65a]",
  "bg-[#91bde8]",
  "bg-[#d6b4f0]",
];

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);

  if (!Number.isFinite(seconds) || seconds < 0) return "";
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

  return `${Math.floor(seconds / 604800)}w ago`;
}

export default function PostHeader({
  post = [],
  index = 0,
  showUserName = true,
  showCommunity = true,
  showUserLogo = false,
}) {
  const navigate = useNavigate();
  const logo = showUserLogo ? profile : post?.communityLogo;
  const { communityName } = useParams();

  function handleNavigation() {
    if (communityName) {
      navigate(`/r/${communityName}`);
    } else {
      navigate(`/r/${post?.communityName}`);
    }
  }

  return (
    <header className="flex min-w-0 items-center gap-2.5">
      {/* Logo */}
      {logo ? (
        <img
          src={logo}
          alt=""
          className="h-10 w-10 shrink-0 rounded-full border border-white/10 object-cover"
        />
      ) : (
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center
          rounded-full text-[25px] font-black leading-none tracking-[-2px]
          text-[#1a1a1b] ${communityColors[index % communityColors.length]}`}
        >
          {showUserLogo ? "u/" : "r/"}
        </div>
      )}

      {/* Names and timestamp */}
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-sm">
          {showCommunity ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNavigation();
              }}
              className="truncate font-semibold text-[#91a5b0] hover:underline"
            >
              r/{post?.communityName ?? communityName}
            </button>
          ) : (
            showUserName &&
            post?.userName && (
              <span className="truncate font-semibold text-[#91a5b0]">
                u/{post.userName}
              </span>
            )
          )}

          {post?.createdAt && (
            <>
              <span className="text-[#818384]">·</span>
              <span className="shrink-0 text-xs text-[#818384]">
                {timeAgo(post.createdAt)}
              </span>
            </>
          )}
        </div>

        {showCommunity && showUserName && post?.userName && (
          <div className="mt-0.5 truncate text-xs text-[#818384]">
            u/{post.userName}
          </div>
        )}
      </div>
    </header>
  );
}
