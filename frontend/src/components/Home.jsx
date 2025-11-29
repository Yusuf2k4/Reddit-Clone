import {
  ArrowDown,
  ArrowUp,
  Forward,
  MessageCircle,
  Share,
  Bookmark,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const ITEMS_PER_LOAD = 5;

const Home = () => {
  const [items, setItems] = useState([]);
  const page = useRef(0);
  const loaderRef = useRef(null);

  // Fetch only the current page from the full JSON
  const [loading, setLoading] = useState(false);

  const fetchPage = async () => {
    if (loading) return; // prevent duplicate calls
    setLoading(true);

    const res = await fetch("/data.json");
    const data = await res.json();

    const start = page.current * ITEMS_PER_LOAD;
    const end = start + ITEMS_PER_LOAD;

    const nextItems = data.slice(start, end);

    if (nextItems.length > 0) {
      setItems((prev) => [...prev, ...nextItems]);
      page.current += 1;
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPage(); // Load first page
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !loading) {
          fetchPage();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className="max-w-4xl px-4 py-8 md:py-10">
      <div className="space-y-6">
        {items.map((item, index) => {
          const isMediaPost = !!item.image;

          return (
            <div>
              <div
                key={index}
                className="w-full bg-[rgb(26,26,27)] rounded-md text-white p-4 hover:bg-[#2a2a2a] transition-colors duration-200 "
              >
                {/* Header Row */}
                <div className="flex items-center text-sm text-gray-400 mb-2">
                  <img
                    src="/profile.jpg"
                    alt="User"
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span className="font-semibold text-white">
                    {item.communityName}
                  </span>
                </div>

                {/* Title */}
                <div className="text-[16px] font-medium mb-3 leading-snug">
                  {item.title}
                </div>

                {/* Media or Text Content */}
                {isMediaPost ? (
                  <div className="rounded-md overflow-hidden mb-4">
                    <img
                      src={item.image}
                      alt="Post"
                      className="w-full max-w-[512px] h-[400px] mx-auto object-contain rounded"
                    />
                  </div>
                ) : (
                  <div className="text-sm text-gray-300 mb-4 leading-relaxed">
                    {item.description || "Sample text post content..."}
                  </div>
                )}

                {/* Actions + Vote Row */}
                {/* Actions + Vote Row */}
                <div className="flex flex-wrap gap-3 items-center pt-3 text-sm text-gray-300">
                  {/* Vote Bubble */}
                  <div className="flex items-center space-x-2 bg-[rgb(36,36,37)] rounded-full px-3 py-1 cursor-pointer hover:bg-[rgb(46,46,47)]">
                    <ArrowUp className="hover:text-orange-500 w-4 h-4" />
                    <span className="text-white font-medium">69</span>
                    <ArrowDown className="hover:text-blue-500 w-4 h-4" />
                  </div>

                  {/* Comment Bubble */}
                  <div className="flex items-center space-x-1 bg-[rgb(36,36,37)] rounded-full px-3 py-1 cursor-pointer hover:bg-[rgb(46,46,47)]">
                    <MessageCircle className="w-4 h-4" />
                    <span>42</span>
                  </div>

                  {/* Bookmark Bubble */}
                  <div className="flex items-center bg-[rgb(36,36,37)] rounded-full px-3 py-1 cursor-pointer hover:bg-[rgb(46,46,47)]">
                    <Bookmark className="w-4 h-4" />
                  </div>

                  {/* Share Bubble */}
                  <div className="flex items-center space-x-1 bg-[rgb(36,36,37)] rounded-full px-3 py-1 cursor-pointer hover:bg-[rgb(46,46,47)]">
                    <Forward className="w-4 h-4" />
                    <span>Share</span>
                  </div>
                </div>
                {/* Horizontal Line Between Posts */}
              </div>
              {index !== items.length - 1 && (
                <div className="relative my-6">
                  <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
                  <div className="absolute inset-0 h-[1px] w-full blur-sm bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Loader or End Message */}
      <div
        ref={loaderRef}
        className="py-5 text-center text-gray-500 text-sm h-12 flex items-center justify-center"
      >
        {loading ? "Loading..." : "No more items"}
      </div>
    </div>
  );
};

export default Home;
