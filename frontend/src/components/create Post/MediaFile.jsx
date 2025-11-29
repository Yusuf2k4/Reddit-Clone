import { Plus, X, Image as ImageIcon } from "lucide-react";
import { useMemo } from "react";

export default function MediaFile({ handleMedia, mediaFiles, onRemove }) {
  
  // Generate preview URLs efficiently
  const previews = useMemo(() => {
    return mediaFiles.map(file => ({
        url: URL.createObjectURL(file),
        type: file.type,
        name: file.name
    }));
  }, [mediaFiles]);

  return (
    <div className="p-4 border border-dashed border-zinc-700 rounded-lg bg-zinc-900/30">
      {mediaFiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10">
            <input
                id="media-input"
                type="file"
                accept="image/*,video/*"
                multiple
                className="hidden"
                onChange={handleMedia}
            />
            <label
                htmlFor="media-input"
                className="cursor-pointer flex flex-col items-center gap-2 group"
            >
                <div className="p-3 rounded-full bg-zinc-800 group-hover:bg-zinc-700 transition">
                     <ImageIcon size={32} className="text-gray-400" />
                </div>
                <span className="text-blue-500 font-semibold hover:underline">Upload images/video</span>
                <span className="text-zinc-500 text-xs">Drag and drop or click to upload</span>
            </label>
        </div>
      ) : (
        <div className="space-y-4">
            {/* Image Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {previews.map((file, idx) => (
                    <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-zinc-700 bg-black">
                        {file.type.startsWith('video') ? (
                            <video src={file.url} className="w-full h-full object-cover opacity-80" />
                        ) : (
                            <img src={file.url} alt="preview" className="w-full h-full object-cover" />
                        )}
                        
                        <button 
                            type="button"
                            onClick={() => onRemove(idx)}
                            className="absolute top-2 right-2 p-1 rounded-full bg-black/60 text-white hover:bg-red-500 transition"
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
                
                {/* Add More Button */}
                <div className="aspect-square flex items-center justify-center border border-dashed border-zinc-700 rounded-lg hover:bg-zinc-800 transition">
                    <input
                        id="media-input-add"
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        className="hidden"
                        onChange={handleMedia}
                    />
                    <label htmlFor="media-input-add" className="w-full h-full flex items-center justify-center cursor-pointer">
                         <Plus size={32} className="text-zinc-500" />
                    </label>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}