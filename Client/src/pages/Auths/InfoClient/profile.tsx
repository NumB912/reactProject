import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Tabs, { Tab } from "../../../component/UI/Tabs";
import { Button, Modal } from "../../../component/UI";
import PhotoGallery from "../../../component/PhotoGallery";
import UploadPhoto, {
  UploadPhotosHandle,
} from "../../../component/UploadPhoto";
import { Image } from "../../../interface/ImagePhotoUrl";
import WallpaperSection from "./WallpaperSection";
import AvatarSection from "./AvatarSection";
import EditProfileModal from "./EditProfileModal";
import { ProfileUser } from "../../../interface/Profile";
import useUploadPhoto from "../../../hook/useUploadPhoto";
const InfoClient = () => {
  const { id } = useParams();
  const [isOpenEditProfileModal,setIsOpenEditProfileModal] = useState<boolean>(false)
   const [userProfile,setProfileUser] = useState<ProfileUser>();
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
    const {
      photo: avatarPhoto,
      addphoto: addAvatarPhoto,
      deletePhoto: clearAvatarPhoto,
    } = useUploadPhoto();


  useEffect(()=>{
    setProfileUser({
      name:"sups",
      follower:0,
      following:10,
      introduce:{
        email:"example@gmail.com",
        introduceID:"1",
        introduceSelf:"",
        location:"VietNam",
        phoneNumber:"0123456789"
      },
      profileID:"",
      userName:"sups112",
      wallpaperPhoto:{
        description:"",
        id:"",
        url:"",
      },
      photoShares:{
        photos:[],
        photoShareID:"1"
      },
      reviews:5
    })
  },[])

  return (
    <div className="info relative w-full flex flex-col justify-center items-center bg-gray-200 ">
      <WallpaperSection />

      <div className="-mt-10 grid grid-cols-[310px_1fr] m-2 w-9/12 z-30 gap-3 mb-">
        <AvatarSection userProfile={userProfile} setIsOpenEditProfileModal={setIsOpenEditProfileModal} isOpenEditProfileModal={isOpenEditProfileModal}/>

        <EditProfileModal userProfile={userProfile} setIsOpenEditProfileModal={setIsOpenEditProfileModal} isOpenEditProfileModal={isOpenEditProfileModal}/>
        {/* 

        <Modal
          onClose={() => {
            setIsOpenModalUploadImageAvatar(false);
          }}
          isOpen={isOpenModalUploadImageAvatar}
          zIndex={1000}
          styleContainer="max-md:w-full min-sm:min-w-[500px]"
        > 
          <div className="w-full my-2 flex justify-center">

          {avatarPhoto && <img src={avatarPhoto.url} className="min-w-[100px] max-w-[200px] aspect-square object-cover rounded-full border-2 border-dashed p-1"/>}

          </div>
          <UploadPhoto
            ref={inputRefAvatar}
            photo={avatarPhoto}
            handleDrop={addAvatarPhoto}
          ></UploadPhoto>
        </Modal> */}
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
