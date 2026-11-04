import { useMemo } from "react";

const stripHtml = (html = "") =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;|&#160;|&amp;nbsp;|\s/g, "")
    .trim();

export default function PostContent({
  post,
  showBody = true,
  showFullBody = false,
}) {
  const { title, bodyHtml } = post ?? {};

  const hasBody = useMemo(() => Boolean(stripHtml(bodyHtml)), [bodyHtml]);
  const shouldShowBody = showBody && hasBody;

  return (
    <div className="px-4 sm:px-5">
      <h2
        className={`text-lg font-semibold leading-snug tracking-[-0.02em] text-[#e5e7eb]
          transition-colors [overflow-wrap:anywhere] group-hover:text-white sm:text-xl
          ${showFullBody ? "" : "line-clamp-2"}`}
      >
        {title}
      </h2>

      {shouldShowBody && (
        <div
          className={`post-card-body mt-2 text-sm leading-relaxed text-[#b7c5cc]
            [overflow-wrap:anywhere]
            [&_img]:hidden [&_video]:hidden [&_iframe]:hidden
            [&_p]:m-0 [&_p+p]:mt-2
            [&_a]:text-sky-400 [&_a]:underline-offset-2 hover:[&_a]:underline
            [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-white/5 [&_pre]:p-2
            [&_blockquote]:border-l-2 [&_blockquote]:border-white/20 [&_blockquote]:pl-3
            ${showFullBody ? "" : "line-clamp-3"}`}
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      )}
    </div>
  );
}
