import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";

const MediaCarousel = ({ mediaList = [] }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [mediaLoading, setMediaLoading] = useState(true);

  if (!mediaList.length) return null;

  const prevIndex =
    (currentMediaIndex - 1 + mediaList.length) % mediaList.length;

  const nextIndex =
    (currentMediaIndex + 1) % mediaList.length;

  const currentMedia = mediaList[currentMediaIndex];

  const handleNext = (e) => {
    e.stopPropagation();
    setMediaLoading(true);
    setCurrentMediaIndex(nextIndex);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setMediaLoading(true);
    setCurrentMediaIndex(prevIndex);
  };

  return (
    <div className="relative w-full h-64 md:h-96 bg-black rounded-md overflow-hidden mb-3 flex items-center justify-center">
      {mediaLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-20">
          <Loader size={40} className="animate-spin text-gray-400" />
        </div>
      )}

      {currentMedia.type === "video" ? (
        <video
          controls
          src={currentMedia.media}
          onLoadedData={() => setMediaLoading(false)}
          className="max-w-full max-h-full object-contain"
          style={{ display: mediaLoading ? "none" : "block" }}
        />
      ) : (
        <img
          src={currentMedia.media}
          alt="Post"
          onLoad={() => setMediaLoading(false)}
          onError={() => setMediaLoading(false)}
          className="max-w-full max-h-full object-contain"
          style={{ display: mediaLoading ? "none" : "block" }}
        />
      )}

      {mediaList.length > 1 && !mediaLoading && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-gray-700/80 p-2 rounded-full z-10"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-700/80 p-2 rounded-full z-10"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-3 right-3 bg-black/70 text-xs px-2 py-1 rounded-full">
            {currentMediaIndex + 1} / {mediaList.length}
          </div>
        </>
      )}
    </div>
  );
};

export default MediaCarousel;