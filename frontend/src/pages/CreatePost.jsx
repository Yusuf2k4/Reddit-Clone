import { ChevronDown, ChevronUp } from "lucide-react";
import { Circle } from "phosphor-react";
import { useEffect, useRef, useState } from "react";
import {
  Form,
  useFetcher,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from "react-router";
import "react-quill-new/dist/quill.snow.css";

// Components
import Dropdown from "../components/create Post/Dropdown";
import Selector from "../components/create Post/Selector";
import Title from "../components/create Post/Title";
import MediaFile from "../components/create Post/MediaFile";
import Link from "../components/create Post/Link";
import TextBox from "../components/create Post/TextBox";
import { uploadImage } from "../firebase/storage";

const CreatePost = () => {
  const [dropdownIsOpen, setDropDownIsOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [isPosting, setIsPosting] = useState(false);

  const [title, setTitle] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [linkUrl, setLinkUrl] = useState("");
  const [content, setContent] = useState("");
  const [plainText, setPlainText] = useState(""); // Store plain text for submission
  const [activeType, setActiveType] = useState("text");
  const [searchCommunityName, setSearchCommunityName] = useState("");

  const inputRef = useRef();
  const navigate = useNavigate();
  const { communityName } = useParams();

  const fetcher = useFetcher();
  const community = useRouteLoaderData("community");
  const showSpinner = isPosting || fetcher.state === "submitting" || fetcher.state === "loading";

  useEffect(() => {
    if (dropdownIsOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [dropdownIsOpen]);

  useEffect(() => {
    if (selectedCommunity) {
      const path = `/r/${selectedCommunity.name}/post`;
      navigate(path);
    }
  }, [selectedCommunity, navigate]);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      if (fetcher.data.ok) {
        navigate(
          `/r/${fetcher.data.communityName}/${fetcher.data.id}/comments`
        );
      }
    }
  }, [fetcher.state, fetcher.data, navigate]);

  const types = [
    { id: "text", label: "Text" },
    { id: "media", label: "Images & Video" },
    
  ];

  function handleSelectCommunity(community) {
    setSelectedCommunity(community);
    setSearchCommunityName("");
    setDropDownIsOpen(false);
  }

  function handleMedia(e) {
    const files = Array.from(e.target.files || []);
    // Append new files to existing ones
    setMediaFiles((prev) => [...prev, ...files]);
  }

  function removeMedia(index) {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleData(e) {
    setIsPosting(true);

    let mediaArray = [];

    for (let media of mediaFiles) {
      const type = media.type.startsWith("image") ? "image" : "recording";
      const url = await uploadImage(media, "Post image");
      mediaArray.push({ type, media: url });
    }

    const payload = {
      title,
      bodyText: plainText,
      bodyHtml: content,
      media: mediaArray,
      community: communityName,
      createdBy: "u/wholesome",
    };

    fetcher.submit(payload, { method: "post", encType: "application/json" });
  }

  function handleCommunityName(e) {
    setSearchCommunityName(e.target.value);
  }

  return (
    // Parent container constraints
    <div className=" max-w-4xl px-4 py-8 md:py-10 ">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-bold text-2xl md:text-3xl text-gray-100">
          Create Post
        </h1>
      </div>

      <div onSubmit={handleData} className="space-y-6" method="post">
        {/* --- Community Selector --- */}
        <div
          className="relative z-20 w-full sm:w-72"
          onClick={() => setDropDownIsOpen(!dropdownIsOpen)}
        >
          <div
            className={`
                flex items-center justify-between px-4 py-2.5 
                 cursor-pointer border transition-all duration-200
                bg-zinc-800 hover:bg-zinc-700 ${
                  community ? "rounded-full" : "rounded-sm"
                }
                ${
                  dropdownIsOpen
                    ? "border-gray-500 ring-1 ring-gray-500"
                    : "border-zinc-700"
                }
            `}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              {!dropdownIsOpen && community ? (
                // Assuming community has an icon or just use generic
                <div className="w-8 h-8 rounded-full bg-blue-600 flex-shrink-0">
                  <img src={community?.logo} alt="" className="rounded-full" />
                </div>
              ) : (
                !community && (
                  <Circle size={24} className="text-gray-400 flex-shrink-0" />
                )
              )}

              {!dropdownIsOpen && (
                <p className="text-gray-200 text-sm font-medium truncate">
                  {community ? community.name : "Select a community"}
                </p>
              )}
              {dropdownIsOpen && (
                <input
                  type="text"
                  placeholder="Search a community"
                  className="
                              relative z-50 
                              bg-transparent 
                              text-gray-200 
                              placeholder-gray-400 
                              outline-none 
                              text-sm 
                              w-full
                            "
                  value={searchCommunityName}
                  ref={inputRef}
                  onChange={handleCommunityName}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>
            {dropdownIsOpen ? (
              <ChevronUp size={18} className="text-gray-400" />
            ) : (
              <ChevronDown size={18} className="text-gray-400" />
            )}
          </div>

          <Dropdown
            dropDownIsOpen={dropdownIsOpen}
            onSelect={handleSelectCommunity}
            communityName={searchCommunityName}
          />
        </div>

        {/* --- Content Type Tabs --- */}
        <Selector
          types={types}
          handleActive={setActiveType}
          activeType={activeType}
        />

        {/* --- Title Input --- */}
        <Title handleTitle={setTitle} value={title} />

        {/* --- Dynamic Content Sections --- */}
        <div className="bg-zinc-900/50 rounded-xl space-y-4">
          {activeType === "media" && (
            <MediaFile
              handleMedia={handleMedia}
              mediaFiles={mediaFiles}
              onRemove={removeMedia}
            />
          )}

          {activeType === "link" && (
            <Link handleLink={setLinkUrl} linkUrl={linkUrl} />
          )}

          <TextBox
            content={content}
            setContent={setContent}
            setPlainText={setPlainText}
          />
        </div>

        {/* --- Action Buttons --- */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-zinc-800">
          <button
            className={`
                        px-6 py-2.5 rounded-full font-semibold text-sm transition duration-200 flex items-center justify-center gap-2
                        ${
                          title.length > 0 && ! showSpinner
                            ? "bg-blue-600 text-white hover:bg-blue-500"
                            : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                        }
                      `}
            disabled={!title.length || showSpinner}
            onClick={handleData}
          >
            {showSpinner ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Post"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
