import { useState } from "react";

function CommunityAvatar({ src }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-8 h-8 rounded-full  flex-shrink-0 overflow-hidden">
      {/* Spinner */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Image */}
      <img
        src={src}
        alt=""
        onLoad={() => setLoaded(true)}
        className={`
          w-full h-full rounded-full object-cover
          transition-opacity duration-300
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
      />
    </div>
  );
}

export default CommunityAvatar;
