import { useState } from "react";

export function ImageWithSkeleton({ src, alt, className, skeletonClassName }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton */}
      {!loaded && (
        <div
          className={`
            absolute inset-0 
            animate-pulse 
            bg-gray-700
            ${skeletonClassName}
          `}
        />
      )}

      {/* Image */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`
                    w-full h-full object-cover
                    transition-all duration-500
                    ${loaded ? "opacity-100 blur-0" : "opacity-0 blur-md"}
                `}
      />
    </div>
  );
}
