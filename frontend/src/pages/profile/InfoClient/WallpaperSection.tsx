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


  // const openModal = () => setIsOpenModal(true);
  // const closeModal = () => {
  //   clearWallpaperPhoto(); 
  //   setIsOpenModal(false);
  // };

  // const handleApply = () => {
  //   if (wallpaperPreview) {
  //     setSavedWallpaper(wallpaperPreview);
  //   }
  //   closeModal();
  // };

  // const handleRemove = () => {
  //   clearWallpaperPhoto();
  //   setSavedWallpaper(null);
  //   closeModal();
  // };

  console.log(displayPhoto?.image.url)

  return (
    <div className="relative w-full h-[400px] bg-gray-200 overflow-hidden">
      {
        displayPhoto?.image.url ??
        <img
          src={displayPhoto?.image.url||""}
          alt="Wallpaper"
          className="w-full h-full object-cover"
        />
      }

    </div>
  );
};

export default WallpaperSection;