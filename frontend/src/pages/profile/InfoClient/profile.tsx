import React, { createContext, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Tabs, { Tab } from "../../../component/UI/Tabs";
import AvatarSection from "./AvatarSection";
import EditProfileModal from "./ProfileEdit/EditProfileModal";
import useUploadPhoto from "../../../hook/useUploadPhoto";
import { EditPhotoAvatarModal } from "./ProfileEdit/EditPhotoAvatarModal";
import WallpaperSection from "./WallpaperSection";
import api from "../../../../API/api";
import { profile } from "../../../interface/Profile";

const InfoClient = () => {
  const { id } = useParams();
  const [isOpenEditProfileModal, setIsOpenEditProfileModal] =
    useState<boolean>(false);
  const [userProfile, setProfileUser] = useState<profile>();

  const nav: Tab[] = [
    {
      navigationID: "4",
      contentNavigation: "Yêu thích",
      urlNavigation: `/profile/Favorites`,
    },
    {
      navigationID: "5",
      contentNavigation: "Booking",
      urlNavigation: `/profile/bookings`,
    },{
      navigationID: "5",
      contentNavigation: "Tài liệu",
      urlNavigation: `/profile/become_supplier`,
    }
  ];

  useEffect(() => {
    api
      .get("/user/detail")
      .then((res) => {
        setProfileUser(res.data.data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  const onSuccess = (profile:profile)=>{
    setProfileUser(profile)
  }

  useEffect(()=>{

  })


  if(!userProfile){
    return <div>Vui lòng đăng nhập</div>
  }

  return (
    <div className="w-full info relative flex flex-col justify-center items-center bg-gray-200 py-10">

      <div className="content mt-30 grid grid-cols-[310px_1fr] m-2 w-9/12 z-30 gap-3 mb-">
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
            onSuccess={onSuccess}
          />
        )}

        <div className="content-profile p-3 bg-white border border-gray-200 rounded-xl">
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
