import React, { createContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Tabs, { Tab } from "../../../component/UI/Tabs";
import { Button, Modal } from "../../../component/UI";
import PhotoGallery from "../../../component/PhotoGallery";
import UploadPhoto, {
  UploadPhotosHandle,
} from "../../../component/UploadPhoto";
import WallpaperSection from "./WallpaperSection";
import AvatarSection from "./AvatarSection";
import EditProfileModal from "./EditProfileModal";
import { ProfileUser } from "../../../interface/Profile";
import useUploadPhoto from "../../../hook/useUploadPhoto";
import { EditPhotoAvatarModal } from "./EditPhotoAvatarModal";

const InfoClient = () => {
  const { id } = useParams();
  const [isOpenEditProfileModal, setIsOpenEditProfileModal] = 
    useState<boolean>(false);
  const [userProfile, setProfileUser] = useState<ProfileUser>({
    name: "sups",
    follower: 0,
    following: 10,
    avatarPhoto: {
      description: "",
      id: "",
      url: "https://comicbook.com/wp-content/uploads/sites/4/2025/02/Bocchi-The-Rock-Season-2.jpg?resize=2000,1122",
    },
    introduce: {
      email: "example@gmail.com",
      introduceID: "1",
      about: "",
      location: "VietNam",
      phoneNumber: "0123456789",
    },
    profileID: "",
    userName: "sups112",
    wallpaperPhoto: {
      description: "",
      id: "",
      url: "",
    },
    photoShares: {
      photos: [],
      photoShareID: "1",
    },
    reviews: 5,
  });

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
      contentNavigation: "Booking",
      urlNavigation: `/profile/${id}/bookings`,
    },
  ];

  useEffect(() => {
    setProfileUser({
      name: "sups",
      follower: 0,
      following: 10,
      avatarPhoto: {
        description: "",
        id: "2",
        url: "https://comicbook.com/wp-content/uploads/sites/4/2025/02/Bocchi-The-Rock-Season-2.jpg?resize=2000,1122",
      },
      introduce: {
        email: "example@gmail.com",
        introduceID: "1",
        about: "",
        location: "VietNam",
        phoneNumber: "0123456789",
      },
      profileID: "",
      userName: "sups112",
      wallpaperPhoto: {
        description: "",
        id: "",
        url: "",
      },
      photoShares: {
        photos: [],
        photoShareID: "1",
      },
      reviews: 5,
    });
  }, []);

  return (
    <div className="w-full info relative flex flex-col justify-center items-center bg-gray-200 ">
      <WallpaperSection />

      <div className="content -mt-10 grid grid-cols-[310px_1fr] m-2 w-9/12 z-30 gap-3 mb-">
        <AvatarSection
          userProfile={userProfile}
          setIsOpenEditProfileModal={setIsOpenEditProfileModal}
          isOpenEditProfileModal={isOpenEditProfileModal}
        />
        {isOpenEditProfileModal && (
          <EditProfileModal
            userProfile={userProfile}
            setIsOpenEditProfileModal={setIsOpenEditProfileModal}
            isOpenEditProfileModal={isOpenEditProfileModal}
          />
        )}

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
