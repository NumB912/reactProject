// WallpaperSection.tsx
import React, { useRef, useState } from "react";
import { Button, Modal } from "../../../component/UI";
import useSingleUploadPhoto from "../../../hook/useUploadPhoto";
import { UploadPhotosHandle } from "../../../component/upload-photo/UploadPhotos";
import { Image } from "../../../model/image";
import UploadPhoto from "../../../component/upload-photo/UploadPhoto";

const WallpaperSection: React.FC = () => {
  const {
    photo: wallpaperPreview,
    addPhoto: addWallpaperPhoto,
    deletePhoto: clearWallpaperPhoto,
  } = useSingleUploadPhoto();

  const inputRef = useRef<UploadPhotosHandle>(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [savedWallpaper, setSavedWallpaper] = useState<Image | null>(null);

  const displayPhoto = savedWallpaper || wallpaperPreview;

  // Modal handlers
  const openModal = () => setIsOpenModal(true);
  const closeModal = () => {
    clearWallpaperPhoto(); // Dọn dẹp blob URL → tránh memory leak
    setIsOpenModal(false);
  };

  const handleApply = () => {
    if (wallpaperPreview) {
      setSavedWallpaper(wallpaperPreview);
    }
    closeModal();
  };

  const handleRemove = () => {
    clearWallpaperPhoto();
    setSavedWallpaper(null);
    closeModal();
  };

  return (
    <div className="relative w-full h-[400px] bg-gray-200 overflow-hidden">
      {/* Hiển thị ảnh nền */}
      {displayPhoto ? (
        <img
          src={displayPhoto.url}
          alt="Wallpaper"
          className="w-full h-full object-cover"
        />
      ) : (
        <div
          onClick={openModal}
          className="flex h-full cursor-pointer flex-col items-center justify-center text-gray-500 transition hover:bg-gray-300/50"
        >
          <i className="fa-solid fa-image text-6xl mb-4" />
          <p className="text-xl font-medium">Click to upload wallpaper</p>
        </div>
      )}

      {/* Nút đổi ảnh khi đã có wallpaper */}
      {savedWallpaper && (
        <div className="absolute top-4 right-4 z-10">
          <Button
            onClick={openModal}
            className="flex items-center gap-3 rounded-full bg-white/90 px-6 py-3 text-sm font-medium shadow-xl hover:bg-white"
          >
            <i className="fa-solid fa-camera" />
            Change Wallpaper
          </Button>
        </div>
      )}

      {/* Modal thay đổi wallpaper */}
      <Modal isOpen={isOpenModal} onClose={closeModal}>
        <div className="max-w-4xl w-full overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <h2 className="text-center text-2xl font-bold">Change Wallpaper</h2>
          </div>

          {/* Body */}
          <div className="p-8">
            {/* Preview ảnh đang chọn */}
            {wallpaperPreview ? (
              <div className="group relative mb-8 cursor-pointer overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={wallpaperPreview.url}
                  alt="Wallpaper preview"
                  className="h-96 w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
                  <i className="fa-solid fa-camera text-6xl text-white" />
                </div>
              </div>
            ) : (
              <div className="mb-8 flex h-96 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200">
                <p className="text-xl text-gray-500">No image selected</p>
              </div>
            )}

            {/* Khu vực upload */}
            <div className="rounded-2xl border-4 border-dashed border-gray-300 p-12 text-center transition hover:border-blue-400">
              <UploadPhoto
                ref={inputRef}
                photo={wallpaperPreview || undefined}
                handleDrop={addWallpaperPhoto} // Đảm bảo UploadPhoto dùng onDrop
              >
                <div
                  className="cursor-pointer"
                  onClick={() => inputRef.current?.openFileDialog?.()}
                >
                  <i className="fa-solid fa-cloud-arrow-up mb-6 text-7xl text-gray-400" />
                  <p className="mb-2 text-2xl font-bold text-gray-700">
                    Drop your wallpaper here
                  </p>
                  <p className="text-gray-500">or click to browse</p>
                  <p className="mt-4 text-sm text-gray-400">
                    JPG, PNG • Max 10MB • Recommended 1920×1080
                  </p>
                </div>
              </UploadPhoto>
            </div>
          </div>

          {/* Footer - Buttons */}
          <div className="flex justify-center gap-6 border-t bg-gray-50 p-6">
            <Button
              onClick={handleRemove}
              className="rounded-xl border border-red-500 px-8 py-3 font-medium text-red-600 hover:bg-red-50"
            >
              Remove Wallpaper
            </Button>

            <Button
              onClick={closeModal}
              className="rounded-xl border border-gray-400 px-8 py-3 font-medium hover:bg-gray-100"
            >
              Cancel
            </Button>

            <Button
              onClick={handleApply}
              disabled={!wallpaperPreview}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-3 font-bold text-white shadow-lg transition hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Apply Wallpaper
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WallpaperSection;