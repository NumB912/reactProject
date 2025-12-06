import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import useSingleUploadPhoto from "../../../../hook/useUploadPhoto";
import { Image } from "../../../../model/image";
import UploadPhoto from "../../../../component/upload-photo/UploadPhoto";
import { Button } from "../../../../component/UI";

interface WallpaperEditorProps {
  currentWallpaper?: Image | null;
  onApply: (image: Image | null, file: File | null) => void;
}

const WallpaperEditor: React.FC<WallpaperEditorProps> = ({ currentWallpaper, onApply }) => {
  const {
    photo: wallpaperPreview,
    file: wallpaperFile,
    addPhoto,
    deletePhoto,
  } = useSingleUploadPhoto({ initialPhoto: currentWallpaper || undefined });

  const [isOpen, setIsOpen] = useState(false);

  const handleApply = () => {
    onApply(wallpaperPreview||null, wallpaperFile);
    setIsOpen(false);
  };

  const handleRemove = () => {
    deletePhoto();
    onApply(null, null);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const displayPhoto = wallpaperPreview || currentWallpaper;

  return (
    <>
      <div className="relative -mx-6 -mt-6 mb-8 h-64 md:h-80 bg-gray-200 overflow-hidden rounded-t-2xl">
        {displayPhoto ? (
          <img
            src={displayPhoto.url}
            alt="Profile wallpaper"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400">
            <p className="text-2xl md:text-4xl font-bold text-gray-600">No wallpaper</p>
          </div>
        )}

        <button
          onClick={() => setIsOpen(true)}
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-sm px-6 py-3.5 text-sm font-semibold shadow-2xl hover:bg-white hover:scale-105 transition-all duration-200 border border-gray-200"
        >
          <i className="fa-solid fa-camera" />
          {displayPhoto ? "Change Wallpaper" : "Add Wallpaper"}
        </button>
      </div>

      {/* Modal chỉnh sửa wallpaper */}
      <Modal
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        sx={{ zIndex: 1400 }}
        BackdropProps={{
          sx: { backgroundColor: "rgba(0,0,0,0.92)" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "95%", sm: "90%", md: "800px" },
            maxHeight: "90vh",
            bgcolor: "white",
            borderRadius: 4,
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4)",
            overflow: "hidden",
          }}
        >
          <div className="p-6 md:p-10">
            <h2 className="mb-8 text-center text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Change Wallpaper
            </h2>

            {/* Preview lớn đẹp */}
            <div className="relative mb-10 overflow-hidden rounded-3xl shadow-2xl bg-gray-900">
              {wallpaperPreview ? (
                <img
                  src={wallpaperPreview.url}
                  alt="Wallpaper preview"
                  className="w-full h-96 md:h-[500px] object-cover transition-transform duration-500 hover:scale-105"
                />
              ) : (
                <div className="flex h-96 md:h-[500px] items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <p className="text-2xl md:text-4xl font-medium text-gray-500">
                    No image selected
                  </p>
                </div>
              )}
            </div>

            {/* Upload zone đẹp như Instagram */}
            <div className="rounded-3xl border-4 border-dashed border-gray-300 bg-gray-50 p-12 text-center transition-all hover:border-blue-500 hover:bg-blue-50/50 cursor-pointer">
              <UploadPhoto
                photo={wallpaperPreview || undefined}
                handleDrop={addPhoto}
              >
                <div>
                  <i className="fa-solid fa-cloud-arrow-up mb-6 text-8xl text-blue-500 opacity-80" />
                  <p className="mb-3 text-2xl md:text-3xl font-bold text-gray-800">
                    Drop your wallpaper here
                  </p>
                  <p className="text-lg text-gray-600">or click to browse from device</p>
                  <p className="mt-4 text-sm text-gray-500">Recommended: 1500×500px or larger</p>
                </div>
              </UploadPhoto>
            </div>

            {/* Buttons đẹp lung linh */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleRemove}
                className="order-3 sm:order-1 rounded-xl border-2 border-red-500 px-8 py-4 text-lg font-bold text-red-600 hover:bg-red-50 transition"
              >
                Remove Wallpaper
              </Button>

              <Button
                onClick={handleClose}
                className="order-2 rounded-xl border-2 border-gray-400 px-8 py-4 text-lg font-bold hover:bg-gray-100 transition"
              >
                Cancel
              </Button>

              <Button
                onClick={handleApply}
                disabled={!wallpaperPreview}
                className="order-1 sm:order-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-12 py-4 text-lg font-bold text-white shadow-2xl hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              >
                Apply Wallpaper
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default WallpaperEditor;