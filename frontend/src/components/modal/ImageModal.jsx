import React, { useImperativeHandle, useRef, useState } from "react";
import ReactCrop, { centerCrop, convertToPixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

// Helper to center crop with a fixed aspect
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  const width = Math.min(90, mediaWidth);
  const height = width / aspect;
  return {
    unit: "%",
    width,
    height: (height / mediaHeight) * 100,
    x: (100 - width) / 2,
    y: (100 - (height / mediaHeight) * 100) / 2,
  };
}

// Function to crop image and return blob + preview URL
function getCroppedImg(image, crop) {
  const canvas = document.createElement("canvas");
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");

  // Scale from displayed size to natural image size
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      resolve({ blob, url });
    }, "image/png");
  });
}

function ImageModal({ ref, imagePreview, aspect, onCropDone, onFileSet }) {
  const dialogRef = useRef();
  const imgRef = useRef();
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();

  // Open / close from parent
  useImperativeHandle(ref, () => ({
    open: () => dialogRef.current.showModal(),
    close: () => dialogRef.current.close(),
  }));

  // Set initial crop with aspect on image load
  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      const newCrop = centerAspectCrop(width, height, aspect);
      setCrop(newCrop);
      setCompletedCrop(convertToPixelCrop(newCrop, width, height));
    }
  }

  // Handle "Done" click
  async function handleDone() {
    if (!completedCrop || !imgRef.current) return;

    const { blob, url } = await getCroppedImg(imgRef.current, completedCrop);
    onFileSet(blob);     // send blob to parent
    onCropDone(url);     // send preview URL to parent
    dialogRef.current.close();
  }

  return (
    <dialog
      ref={dialogRef}
      className="w-[90vw] max-w-3xl rounded-xl p-4 bg-gray-800 text-white shadow-xl mx-auto my-auto"
    >
      <h3 className="text-lg font-semibold mb-3">Crop Image</h3>

      {imagePreview && (
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
        >
          <img
            ref={imgRef}
            src={imagePreview}
            alt="To crop"
            onLoad={onImageLoad}
            className="max-h-[60vh] object-contain"
          />
        </ReactCrop>
      )}

      <div className="mt-4 flex gap-3 justify-end w-full">
        <button
          type="button"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
          onClick={handleDone}
        >
          Done
        </button>
      </div>
    </dialog>
  );
}

export default ImageModal;
