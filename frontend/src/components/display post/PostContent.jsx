import { useNavigate, useParams } from "react-router";

export default function PostContent({
  post,
  showBody = true,
  showFullBody = false,
}) {
  const { title, bodyHtml } = post ?? {};

  const hasBody = Boolean(
    bodyHtml
      ?.replace(/<[^>]*>/g, "")
      .replace(/&nbsp;|&#160;|&amp;nbsp;|\s/g, "")
      .trim(),
  );

  const shouldShowBody = showBody && hasBody;

  return (
    <div className="px-4 sm:px-5">
      <h2 className="break-words text-lg font-semibold leading-snug tracking-[-0.02em] text-[#e5e7eb] transition-colors group-hover:text-white sm:text-xl">
        {title}
      </h2>

      {shouldShowBody && (
        <div
          className={`post-card-body mt-2 break-words text-sm text-[#b7c5cc] [&_img]:hidden [&_video]:hidden ${
            showFullBody ? "" : "line-clamp-3"
          }`}
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      )}
    </div>
  );
}