function VideoWithSkeleton({ src, className = "", onLoad }) {
  const [loaded, setLoaded] = useState(false);

  const handleLoadedData = (e) => {
    setLoaded(true);
    onLoad && onLoad(e);
  };

  const handleError = (e) => {
    setLoaded(true);
    onLoad && onLoad(e);
  };

  return (
    <div className={`relative ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-900/80">
          <div className="w-12 h-8 animate-pulse rounded-md bg-gray-700" />
        </div>
      )}

      <video
        controls
        src={src}
        onLoadedData={handleLoadedData}
        onError={handleError}
        className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
