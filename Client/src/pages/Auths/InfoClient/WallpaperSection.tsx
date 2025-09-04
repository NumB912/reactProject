import React, { useState } from "react";
import { Button, Modal } from "../../../component/UI";
import useSingleUploadPhoto from "../../../hook/useUploadPhoto";
import { UploadPhotosHandle } from "../../../component/upload-photo/UploadPhotos";
import { Image } from "../../../model/image";
import UploadPhoto from "../../../component/upload-photo/UploadPhoto";
const WallpaperSection = () => {
  const {
    photo: wallpaperPhoto,
    addphoto: addWallpaperPhoto,
    editPhoto: editWallpaperPhoto,
    deletePhoto: clearWallpaperPhoto,
  } = useSingleUploadPhoto();
  const inputRefWallpaper = React.useRef<UploadPhotosHandle>(null);
  const [isOpenModalUploadImageWallpaper, setIsOpenModalUploadImageWallpaper] =
    useState(false);
  const [photoImageWallpaper, setPhotoImageWallpaper] = useState<Image>();
  const closeWallpaperModal = () => {
    setIsOpenModalUploadImageWallpaper(false);
  };

  const closeEditProfileModal = () => {
    setIsOpenModalUploadImageWallpaper(false);
  };

  const handleCancelImageWallpaper = () => {
    if (!photoImageWallpaper) {
      clearWallpaperPhoto();
    }
    closeWallpaperModal();9
  };

  const handleSaveImageWallpaper = () => {
    if (wallpaperPhoto) {
      setPhotoImageWallpaper(wallpaperPhoto);
    }

    closeWallpaperModal();
  };
  return (
    <div className="bg-gray-300 w-full h-[400px] flex justify-center items-center">
      {photoImageWallpaper ? (
        <div className="w-screen">
          <div className="upload-image w-full ">
            <img
              src={photoImageWallpaper.url}
              className="w-full object-cover h-[400px]"
            />
          </div>
        </div>
      ) : (
        <div className=" w-full h-full flex justify-center items-center">
          <div
            className="upload-image cursor-pointer flex gap-3 justify-center items-center"
            onClick={() => setIsOpenModalUploadImageWallpaper(true)}
          >
            <i className="fa-solid fa-image"></i>
            <p>Upload image</p>
          </div>
        </div>
      )}

      <Modal
        isOpen={isOpenModalUploadImageWallpaper}
        onClose={() => {
          setIsOpenModalUploadImageWallpaper(false);
        }}
      >
        <div
          className={`w-screen ${
            !wallpaperPhoto ? "max-w-[700px]" : ""
          } p-5 gap-10`}
        >
          {wallpaperPhoto ? (
            <div className="w-full">
              <div
                className="upload-image w-full relative"
                onClick={() => {
                  inputRefWallpaper.current?.openFileDialog();
                }}
              >
                <i className="text-2xl text-gray-300 fa-solid fa-camera absolute top-1/2 left-1/2 -translate-1/2 z-[9002]"></i>
                <img
                  src={wallpaperPhoto.url}
                  className=" object-cover w-full h-[400px]"
                />
              </div>
              <div className="option-image flex justify-end *:ml-2 *:mt-5">
                <Button
                  onClick={handleCancelImageWallpaper}
                  className="w-[200px]"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveImageWallpaper}
                  className="w-[200px]"
                >
                  Done
                </Button>
              </div>
            </div>
          ) : (
            ""
          )}

          <UploadPhoto
            ref={inputRefWallpaper}
            photo={wallpaperPhoto}
            handleDrop={addWallpaperPhoto}
            style={{ display: !wallpaperPhoto ? "block" : "none" }}
          >
            <div className="upload-wallpaper text-gray-500">
              <p>Upload your wallpaper</p>
            </div>
          </UploadPhoto>
        </div>
      </Modal>
    </div>
  );
};

export default WallpaperSection;
