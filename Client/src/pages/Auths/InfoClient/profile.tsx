import React, { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Tabs, { Tab } from "../../../component/UI/Tabs";
import { Button, Modal } from "../../../component/UI";
import PhotoGallery from "../../../component/PhotoGallery";
import useUploadPhoto from "../../../hook/useUploadPhoto";
import UploadPhoto, {
  UploadPhotosHandle,
} from "../../../component/UploadPhoto";
import UploadPhotoWallpaper from "../../../component/UploadPhotoWallpaper";
import { Image } from "../../../interface/ImagePhotoUrl";
const InfoClient = () => {
  const { id } = useParams();
  const [isShowEdit, setShowEdit] = useState<boolean>(false);

  const {
    photo: avatarPhoto,
    addphoto: addAvatarPhoto,
    deletePhoto: clearAvatarPhoto,
  } = useUploadPhoto();

  const {
    photo: wallpaperPhoto,
    addphoto: addWallpaperPhoto,
    editPhoto: editWallpaperPhoto,
    deletePhoto: clearWallpaperPhoto,
  } = useUploadPhoto();

  const inputRefWallpaper = React.useRef<UploadPhotosHandle>(null);
  const inputRefAvatar = React.useRef<UploadPhotosHandle>(null);
  const [photoImageWallpaper, setPhotoImageWallpaper] =
    useState<Image>();
  const [photoImageAvatar, setPhotoImageAvatar] = useState<Image>();
  const [isOpenModalUploadImageWallpaper, setIsOpenModalUploadImageWallpaper] =
    useState(false);
  const [isOpenModalUploadImageAvatar, setIsOpenModalUploadImageAvatar] =
    useState(false);
  const nav: Tab[] = [
    {
      navigationID: "1",
      contentNavigation: "Reviews",
      urlNavigation: `/profile/${id}/reviews`,
    },
    {
      navigationID: "2",
      contentNavigation: "Photos",
      urlNavigation: `/profile/${id}/photos`,
    },
    {
      navigationID: "3",
      contentNavigation: "Trips",
      urlNavigation: `/profile/${id}/Trips`,
    },
    {
      navigationID: "4",
      contentNavigation: "Favorite",
      urlNavigation: `/profile/${id}/Favorites`,
    },
    {
      navigationID: "5",
      contentNavigation: "Coupon",
      urlNavigation: `/profile/${id}/Coupons`,
    },
    {
      navigationID: "6",
      contentNavigation: "Booking",
      urlNavigation: `/profile/${id}/bookings`,
    },
  ];

  const closeWallpaperModal = () => {
    setIsOpenModalUploadImageWallpaper(false);
  };

  const handleCancelImageWallpaper = () => {
    if (!photoImageWallpaper) {
      clearWallpaperPhoto();
    }
    closeWallpaperModal();
  };

  const handleSaveImageWallpaper = () => {
    if (wallpaperPhoto) {
      setPhotoImageWallpaper(wallpaperPhoto);
    }

    closeWallpaperModal();
  };

  return (
    <div className="info relative w-full flex flex-col justify-center items-center bg-gray-200 ">
      <div className="bg-gray-300 w-full h-[400px] flex justify-center items-center">
        {photoImageWallpaper ? (
          <div className="w-screen">
            <div
              className="upload-image w-full "
            >
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
      <div className="-mt-10 grid grid-cols-[310px_1fr] m-2 w-9/12 z-30 gap-3 mb-">
        <div className="profile flex-col flex *:p-5 gap-3 *:bg-white">
          <div className="border border-gray-200 shadow">
            <div className="image-avatar w-full flex justify-center items-center p-3">
              <img
                src="https://m.media-amazon.com/images/M/MV5BMzg3N2I3OTAtNThlYy00ZTM0LWFiMjItZmRkNzE3NWQ5MTg2XkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_QL75_UX500_CR0,0,500,281_.jpg"
                className="w-[200px] aspect-square object-cover rounded-full border border-gray-300 cursor-pointer bg-center"
                onClick={() => {
                  setIsOpenModalUploadImageAvatar(true);
                }}
              ></img>
            </div>
            <div className="flex justify-between items-center border-b-gray-200">
              <div className="profile-name">
                <p className="font-bold text-2xl">Sups</p>
                <p className="text-gray-400 text-[12px] font-semibold">
                  @sups1234
                </p>
              </div>
              <div className="profile-edit">
                <div className="content flex justify-center items-center *:p-2 *:hover:bg-gray-200 *:text-[12px] border border-gray-200 *:cursor-pointer">
                  <button
                    className="border-r border-gray-200 font-semibold"
                    onClick={() => {
                      setShowEdit(true);
                    }}
                  >
                    Edit profile
                  </button>
                  <button>
                    <i className="fa-solid fa-gear"></i>{" "}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex grow justify-center gap-10 items-center mt-5 *:text-center">
              <div className="item *:w-full">
                <p className="font-bold">Following</p>
                <p className="text-gray-600 font-semibold">0</p>
              </div>

              <div className="item *:w-full">
                <p className="font-bold">Follower</p>
                <p className="text-gray-600 font-semibold">0</p>
              </div>

              <div className="item *:w-full">
                <p className="font-bold">Reviews</p>
                <p className="text-gray-600 font-semibold">0</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 shadow">
            <div className="intro">
              <p className="font-bold text-sm">Intro</p>
            </div>

            <div className="intro-content flex flex-col">
              <div className="intro-content_location flex gap-2 items-center mt-3 text-[13px] cursor-pointer">
                <i className="fa-solid fa-location-dot"></i>
                <p>VietNam</p>
              </div>

              <div className="intro-content_phone-number flex gap-2 items-center mt-3 text-[13px] cursor-pointer">
                <i className="fa-solid fa-phone"></i>
                <p>0123456789</p>
              </div>

              <div className="intro-content_phone-number flex gap-2 items-center mt-3 text-[13px] cursor-pointer">
                <i className="fa-solid fa-envelope"></i>
                <p>Example@gmail.com</p>
              </div>

              <div className="intro-content_phone-number flex gap-2 items-center mt-3 text-[13px] cursor-pointer ">
                <i className="fa-solid fa-plus"></i>
                <p>Write something to introduce yourself</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 shadow">
            <div className="intro">
              <p className="font-bold text-sm">Share your travel advice</p>
            </div>

            <div className="intro-content flex flex-col">
              <div className="intro-content_location flex gap-2 items-center mt-3 text-[13px] cursor-pointer">
                <i className="fa-solid fa-camera"></i>
                <p>Share your photos</p>
              </div>

              <div className="intro-content_phone-number flex gap-2 items-center mt-3 text-[13px] cursor-pointer">
                <i className="fa-solid fa-pen"></i>
                <p>Share your reviews</p>
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={isShowEdit}
          onClose={() => {
            setShowEdit(false);
          }}
          zIndex={100}
        >
          <div className="grid w-screen grid-cols-[100px_1fr] max-w-[700px] p-5 gap-10">
            <div className="profile-edit-img w-full">
              <div
                className="relative w-full aspect-square rounded-full overflow-hidden cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpenModalUploadImageAvatar(
                    !isOpenModalUploadImageAvatar
                  );
                }}
              >
                <img
                  src="https://m.media-amazon.com/images/M/MV5BMzg3N2I3OTAtNThlYy00ZTM0LWFiMjItZmRkNzE3NWQ5MTg2XkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_QL75_UX500_CR0,0,500,281_.jpg"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center">
                  <i className="fa-solid fa-camera mb-1"></i>
                  <p>Change Photo</p>
                </div>
              </div>
            </div>

            <div className="info-edit w-full *:mt-8">
              <div className="info-edit_name w-full">
                <p className="font-semibold text-[10px] mb-1">Name</p>
                <input
                  className="border border-gray-300 p-1.5 w-full text-sm"
                  type="text"
                  placeholder="Name"
                  value={"Sups"}
                />
              </div>

              <div className="info-edit_name w-full">
                <p className="font-semibold text-[10px] mb-1">Username</p>
                <span className="relative">
                  <input
                    className="border border-gray-300 p-1.5 w-full pl-8 text-sm"
                    type="text"
                    placeholder="Name"
                    value={"Sups"}
                  />
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 p-1.5 text-gray-400">
                    @
                  </span>
                </span>
              </div>

              <div className="info-edit_name w-full">
                <p className="font-semibold text-[10px] mb-1">Location</p>
                <span className="relative">
                  <input
                    className="border border-gray-300 p-1.5 w-full pl-8 text-sm"
                    type="text"
                    placeholder="Location"
                  />
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 p-1.5 text-gray-400">
                    <i className="fa-solid fa-location-dot"></i>
                  </span>
                </span>
              </div>

              <div className="info-edit_name w-full">
                <p className="font-semibold text-[10px] mb-1">Email</p>
                <span className="relative">
                  <input
                    className="border border-gray-300 p-1.5 w-full pl-8 text-sm"
                    type="text"
                    placeholder="Email"
                  />
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 p-1.5 text-gray-400">
                    <i className="fa-solid fa-envelope"></i>
                  </span>
                </span>
              </div>

              <div className="info-edit_name w-full">
                <p className="font-semibold text-[10px] mb-1">Phone number</p>
                <span className="relative">
                  <input
                    className="border border-gray-300 p-1.5 w-full pl-8 text-sm"
                    type="text"
                    placeholder="Phone number"
                  />
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 p-1.5 text-gray-400">
                    <i className="fa-solid fa-phone"></i>
                  </span>
                </span>
              </div>

              <div className="info-edit_name w-full">
                <p className="font-semibold text-[10px] mb-1">About me</p>
                <span className="relative">
                  <textarea
                    className="border border-gray-300 p-1.5 w-full text-sm h-25"
                    placeholder="introduce about yourself"
                  />
                </span>
              </div>

              <div className="button-submit flex justify-end gap-2">
                <Button
                  className="w-30"
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    border: "1px solid black",
                    padding: "5px",
                  }}
                  onClick={() => {}}
                >
                  Cancel
                </Button>
                <Button
                  className="w-30"
                  style={{ padding: "5px" }}
                  onClick={() => {}}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          onClose={() => {
            setIsOpenModalUploadImageAvatar(false);
          }}
          isOpen={isOpenModalUploadImageAvatar}
          zIndex={1000}
        > 
          <UploadPhoto
            ref={inputRefAvatar}
            photo={photoImageAvatar}
            style={{ display: !avatarPhoto ? "block" : "none" }}
          ></UploadPhoto>
        </Modal>
        <div className="content-profile p-3 bg-white border border-gray-200">
          <Tabs
            activeStyle="border-b-3 font-bold transition-all ease-in"
            elseActiveStyle="hover:bg-gray-200"
            tabs={nav}
            classNameContainerStyle="flex gap-3 border-b border-b-gray-200"
            contentNaigationStyle="p-3 min-w-[80px] text-center text-sm"
            onClose={() => {}}
          />
          <div className="p-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoClient;
