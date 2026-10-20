import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { MessageCircle, ArrowBigUp, ArrowBigDown } from "lucide-react";
import { getPostSearchResults } from "../../../util/api";

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  

  if (!Number.isFinite(seconds) || seconds < 0) return "";
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

  return `${Math.floor(seconds / 604800)}w ago`;
}

function PostResults() {
  const [data, setData] = useState([]);
  const { searchResult: searchWord } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        const response = await getPostSearchResults(searchWord);
        setData(response);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setData([]);
      } finally {
      }
    }
    getData();
  }, [searchWord]);


  if (!data?.length) {
    return (
      <div className="mx-auto max-w-4xl py-12 text-center text-gray-400">
        No posts found for "{searchWord}"
      </div>
    );
  }

  const communityColors = [
    "bg-[#35c6a3]",
    "bg-[#dce5e9]",
    "bg-[#f2a65a]",
    "bg-[#91bde8]",
    "bg-[#d6b4f0]",
  ];
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="divide-y divide-[#303234]">
        {data.map((post, index) => (
          <article
            key={post.id}
            className="group flex cursor-pointer items-center gap-5 rounded-2xl px-4 py-5 transition-colors hover:bg-[#191c1e] sm:px-5"
            onClick={() => {navigate(`/r/${post.communityName}/${post.id}/comments`)}}
          >
            <div className="min-w-0 flex-1">
              {/* Community */}
              <div className="mb-3 flex items-center gap-2.5">
                {post.communityLogo ? (
                  <img
                    src={post.communityLogo}
                    alt=""
                    className="h-9 w-9 shrink-0 rounded-full border border-white/10 object-cover"
                  />
                ) : (
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center
                                rounded-full text-[#1a1a1b]
                                text-[25px] font-black tracking-[-2px] leading-none
                                ${communityColors[index % communityColors.length]}`}
                  >
                    r/
                  </div>
                )}

                <div className="flex min-w-0 items-center gap-2 text-sm">
                  <span className="truncate font-semibold text-[#91a5b0]">
                    r/{post.communityName}
                  </span>
                  <span className="text-gray-600">·</span>
                  <span className="shrink-0 text-[#91a5b0]">
                    {timeAgo(post.createdAt)}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-lg font-semibold leading-snug tracking-[-0.02em] text-[#e5e7eb] transition-colors group-hover:text-white sm:text-xl">
                {post.title}
              </h2>

              {/* Hardcoded engagement for now */}
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[#91a5b0]">
                <span className="inline-flex items-center gap-1.5">
                  <ArrowBigUp size={18} />0 votes
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MessageCircle size={16} />
                  55 comments
                </span>
              </div>
            </div>

            {/* Only display image when mediaUrl exists */}
            {post.mediaURL && (
              <img
                src={post.mediaURL}
                alt=""
                loading="lazy"
                className="h-24 w-28 shrink-0 rounded-xl border border-white/10 object-cover sm:h-28 sm:w-36"
              />
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

export default PostResults;
