import {
  ArrowDown,
  ArrowUp,
  Forward,
  MessageCircle,
  Share,
  Bookmark,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { getHomeFeed } from "../util/api";
import InfiniteScroll from "./InfiniteScroll";
import PostCard from "./display Community/PostCard";
import MediaCarousel from "./MediaCarousel";
import { useNavigate } from "react-router";
import CommunityAvatar from "../util/loading screen/CommunityAvatar";
import { User } from "phosphor-react";

const ITEMS_PER_LOAD = 5;

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLast, setIsLast] = useState(true);
  const pageNo = useRef(0);
  const size = useRef(3);
  const loaderRef = useRef(false);
  const initialized = useRef(false);

  const navigate = useNavigate();

  const fetchPage = async () => {
    const data = await getHomeFeed(pageNo.current, size.current);
    setItems((prev) => [...prev, ...data.content]);
    setIsLast(data.last);
    pageNo.current += 1;
  };

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    fetchPage();
  }, []);

  console.log(items);

  return (
    <div className="max-w-4xl px-4 py-8 md:py-10">
      <div className="space-y-6">
        {items.map((item, index) => {
          const isMediaPost = !!item.image;

          return (
            <div>
              <div
                key={index}
                className="w-full bg-[rgb(26,26,27)] rounded-md text-white p-4 hover:bg-[#2a2a2a] transition-colors duration-200"
                onClick={() => navigate(`/r/${item.communityName}/${item.id}/comments`)}
              >
                {/* Header Row */}
                <div className="flex items-center text-sm text-gray-400 mb-2">
                  {item.communityLogo ? (
                <CommunityAvatar src={item.communityLogo} />
              ) : (
                <User size={16}/>
              )}
                  <span className="font-semibold text-white hover:cursor-pointer p-2" onClick={() => navigate(`/r/${item.communityName}`)}>
                    r/{item.communityName}
                  </span>
                </div>

                {/* Title */}
                <div className="text-[16px] font-medium mb-3 leading-snug">
                  {item.title}
                </div>

                {/* Media or Text Content */}
                {item.mediaDTOList?.length > 0 ? (
                  <MediaCarousel mediaList={item.mediaDTOList} />
                ) : (
                  <div className="text-sm text-gray-300 mb-4 leading-relaxed">
                    {item.bodyText}
                  </div>
                )}

                {/* Actions + Vote Row */}
                {/* Actions + Vote Row */}
                <div className="flex flex-wrap gap-3 items-center pt-3 text-sm text-gray-300">
                  {/* Vote Bubble */}
                  <div className="flex items-center space-x-2 bg-[rgb(36,36,37)] rounded-full px-3 py-1 cursor-pointer hover:bg-[rgb(46,46,47)]">
                    <ArrowUp className="hover:text-orange-500 w-4 h-4" />
                    <span className="text-white font-medium">67</span>
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
      <InfiniteScroll getData={fetchPage} hasMore={!isLast} />
    </div>
  );
};

export default Home;
