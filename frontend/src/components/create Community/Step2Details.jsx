import React from "react";

function Step2Details({
  communityName,
  communityDesc,
  changeCommunityName,
  setCommunityDesc,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-12 h-full">
      {/* LEFT: INPUT FORM */}
      <div className="flex-1 order-2 md:order-1">
        <h2 className="text-2xl font-semibold mb-3 text-white">
          Tell us about your community
        </h2>
        <p className="text-sm text-gray-400 mb-8">
          A name and description help people understand what your community is
          about.
        </p>

        <div className="space-y-6">
          {/* Name Input */}
          <div className="relative group">
            <div className="absolute left-4 top-[1.1rem] text-gray-400 pointer-events-none transition-opacity duration-200">
              <span className="text-gray-500">r/</span>
            </div>

            <input
              type="text"
              id="communityName"
              required
              placeholder=" "
              maxLength={21}
              value={communityName}
              onChange={changeCommunityName}
              className="
                peer block w-full 
                border border-gray-700 hover:border-gray-600
                text-gray-100 bg-gray-900/30
                pl-8 pr-4 pt-6 pb-2 
                rounded-xl focus:outline-none
                focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                transition-all duration-200
              "
            />
            <label
              htmlFor="communityName"
              className="
                absolute left-8 top-3 
                text-gray-500 text-xs uppercase tracking-wider font-bold
                transition-all duration-200
                peer-placeholder-shown:top-4 
                peer-placeholder-shown:text-gray-500 
                peer-placeholder-shown:text-base 
                peer-placeholder-shown:normal-case
                peer-placeholder-shown:font-normal
                peer-focus:top-2 
                peer-focus:text-indigo-400 
                peer-focus:text-xs
                peer-focus:uppercase
                peer-focus:font-bold
              "
            >
              Community Name
            </label>
            <div className="text-right mt-1">
              <span className="text-xs text-gray-500">
                {21 - communityName.replace(/^r\//, "").length} characters
                remaining
              </span>
            </div>
          </div>

          {/* Description Input */}
          <div className="relative">
            <textarea
              id="description"
              placeholder=" "
              required
              rows="4"
              maxLength={500}
              value={communityDesc}
              onChange={(e) => setCommunityDesc(e.target.value)}
              className="
                peer block w-full 
                border border-gray-700 hover:border-gray-600
                text-gray-100 bg-gray-900/30
                px-4 pt-6 pb-2 rounded-xl resize-none 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                transition-all duration-200 custom-scrollbar
              "
            />
            <label
              htmlFor="description"
              className="
                absolute left-4 top-3 
                text-gray-500 text-xs uppercase tracking-wider font-bold
                transition-all duration-200
                peer-placeholder-shown:top-4 
                peer-placeholder-shown:text-gray-500 
                peer-placeholder-shown:text-base 
                peer-placeholder-shown:normal-case
                peer-placeholder-shown:font-normal
                peer-focus:top-2 
                peer-focus:text-indigo-400 
                peer-focus:text-xs
                peer-focus:uppercase
                peer-focus:font-bold
              "
            >
              Description
            </label>
          </div>
        </div>
      </div>

      {/* RIGHT: PREVIEW CARD */}
      <div className="w-full md:w-80 shrink-0 flex flex-col order-1 md:order-2">
        <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
          Preview
        </p>
        <div className="bg-[#0f0f10] border border-gray-800 p-5 rounded-xl shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-sm font-bold">
              r/
            </div>
            <p className="text-lg md:text-xl text-gray-100 font-bold truncate">
              r/{communityName || "communityName"}
            </p>
          </div>
          <hr className="border-gray-800 mb-3" />
          <p className="text-sm text-gray-400 leading-relaxed break-words line-clamp-5">
            {communityDesc || "Your community description will appear here."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Step2Details;
