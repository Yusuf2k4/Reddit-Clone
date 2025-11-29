import React from "react";
import { Image, Trash2, UploadCloud } from "lucide-react";

function Step3Styling({
  logo,
  banner,
  bannerRef,
  logoRef,
  finalBannerUrl,
  finalLogoUrl,
  communityName,
  communityDesc,
  handleBanner,
  handleLogo,
  handleBannerImage,
  handleLogoImage,
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
      
      {/* LEFT: Upload Controls */}
      <div className="flex-1 space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-2 text-white">
            Style your community
          </h2>
          <p className="text-sm text-gray-400">
            Visual flair helps establish your community’s culture!
          </p>
        </div>

        <div className="space-y-4">
          {/* Banner Upload Row */}
          <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-200">Banner Image</span>
              <input
                type="file"
                accept="image/*"
                hidden
                ref={bannerRef}
                onChange={handleBanner}
              />
              <button
                type="button"
                onClick={() => bannerRef?.current.click()}
                className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <UploadCloud size={16} /> Upload
              </button>
            </div>
            
            {finalBannerUrl ? (
               <div className="relative w-full h-24 rounded-lg overflow-hidden group border border-gray-700">
                 <img src={finalBannerUrl} alt="Banner" className="w-full h-full object-cover" />
                 <button 
                    onClick={handleBannerImage}
                    className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-red-600 rounded-md text-white opacity-0 group-hover:opacity-100 transition-all"
                 >
                    <Trash2 size={14} />
                 </button>
               </div>
            ) : (
              <div className="w-full h-24 rounded-lg border border-dashed border-gray-700 flex items-center justify-center bg-gray-900/20">
                 <span className="text-xs text-gray-600">Recommended 5:1 ratio</span>
              </div>
            )}
          </div>

          {/* Logo Upload Row */}
          <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-200">Icon / Logo</span>
              <input
                type="file"
                accept="image/*"
                hidden
                ref={logoRef}
                onChange={handleLogo}
              />
              <button
                type="button"
                onClick={() => logoRef.current.click()}
                className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <UploadCloud size={16} /> Upload
              </button>
            </div>

            {finalLogoUrl ? (
               <div className="flex items-center gap-4">
                 <div className="relative w-16 h-16 rounded-full overflow-hidden group border border-gray-700">
                    <img src={finalLogoUrl} alt="Logo" className="w-full h-full object-cover" />
                 </div>
                 <button 
                    onClick={handleLogoImage}
                    className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1"
                 >
                    <Trash2 size={12} /> Remove
                 </button>
               </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border border-dashed border-gray-700 flex items-center justify-center bg-gray-900/20">
                   <Image size={20} className="text-gray-600"/>
                </div>
                <span className="text-xs text-gray-600">1:1 ratio</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: Live Preview */}
      <div className="w-full lg:w-96 shrink-0">
        <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">Live Preview</p>
        <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-800 bg-[#0f0f10]">
          
          {/* Preview Banner */}
          <div className="w-full h-24 bg-gray-800 relative">
            {finalBannerUrl ? (
              <img
                src={finalBannerUrl}
                alt="Banner Preview"
                className="w-full h-full object-cover"
              />
            ) : (
               <div className="w-full h-full bg-gradient-to-r from-indigo-900/30 to-purple-900/30"></div>
            )}
          </div>

          {/* Preview Header Info */}
          <div className="px-4 pb-6 relative">
            <div className="flex justify-between items-end -mt-6 mb-3">
               {/* Preview Logo */}
              <div className="w-20 h-20 rounded-full border-4 border-[#0f0f10] bg-gray-800 overflow-hidden flex-shrink-0 relative z-10">
                {finalLogoUrl ? (
                  <img
                    src={finalLogoUrl}
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-400 font-bold text-xl">
                    r/
                  </div>
                )}
              </div>
              
              {/* Fake Join Button */}
              <button className="px-4 py-1.5 rounded-full bg-white text-black font-bold text-sm opacity-50 cursor-default">
                 Join
              </button>
            </div>

            <div className="flex flex-col">
              <h3 className="text-xl font-bold text-white break-words">{communityName || "r/name"}</h3>
              <p className="text-xs text-gray-400 mb-3">r/{communityName.replace(/^r\//, "")}</p>
              <p className="text-sm text-gray-300 leading-snug line-clamp-4">
                {communityDesc || "Community description..."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step3Styling;