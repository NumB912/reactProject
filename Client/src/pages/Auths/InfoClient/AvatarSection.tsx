import React, { ProfilerProps, useState } from "react";
import { Image } from "../../../interface/ImagePhotoUrl";
import { ProfileUser } from "../../../interface/Profile";

interface AvatarSectionProp{
    isOpenEditProfileModal:boolean;
    setIsOpenEditProfileModal:(isOpenEditProfileModal:boolean)=>void
    userProfile:ProfileUser|undefined
}

const AvatarSection = ({isOpenEditProfileModal,setIsOpenEditProfileModal,userProfile}:AvatarSectionProp) => {
  const [photoImageAvatar, setPhotoImageAvatar] = useState<Image>();
  return (
    <div className="profile flex-col flex *:p-5 gap-3 *:bg-white">
      <div className="border border-gray-200 shadow">
        <div className="image-avatar w-full flex justify-center items-center p-3">
          <img
            src={
              photoImageAvatar
                ? photoImageAvatar.url
                : "https://m.media-amazon.com/images/M/MV5BMzg3N2I3OTAtNThlYy00ZTM0LWFiMjItZmRkNzE3NWQ5MTg2XkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_QL75_UX500_CR0,0,500,281_.jpg"
            }
            className="w-[200px] aspect-square object-cover rounded-full border border-gray-300 cursor-pointer bg-center"
            onClick={() => {}}
          ></img>
        </div>
        <div className="flex justify-between items-center border-b-gray-200">
          <div className="profile-name">
            <p className="font-bold text-2xl">{userProfile?userProfile.name:""}</p>
            <p className="text-gray-400 text-[12px] font-semibold">@{userProfile?.userName}</p>
          </div>
          <div className="profile-edit">
            <div className="content flex justify-center items-center *:p-2 *:hover:bg-gray-200 *:text-[12px] border border-gray-200 *:cursor-pointer">
              <button
                className="border-r border-gray-200 font-semibold"
                onClick={() => {
                  setIsOpenEditProfileModal(true);
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
            <p className="text-gray-600 font-semibold">{userProfile?.following}</p>
          </div>

          <div className="item *:w-full">
            <p className="font-bold">Follower</p>
            <p className="text-gray-600 font-semibold">{userProfile?.follower}</p>
          </div>

          <div className="item *:w-full">
            <p className="font-bold">Reviews</p>
            <p className="text-gray-600 font-semibold">{userProfile?.reviews}</p>
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
            <p>{userProfile?.introduce.location}</p>
          </div>

          <div className="intro-content_phone-number flex gap-2 items-center mt-3 text-[13px] cursor-pointer">
            <i className="fa-solid fa-phone"></i>
            <p>{userProfile?.introduce.phoneNumber}</p>
          </div>

          <div className="intro-content_phone-number flex gap-2 items-center mt-3 text-[13px] cursor-pointer">
            <i className="fa-solid fa-envelope"></i>
            <p>{userProfile?.introduce.email}</p>
          </div>

          <div className="intro-content_phone-number flex gap-2 items-center mt-3 text-[13px] cursor-pointer ">
            <i className="fa-solid fa-plus"></i>
            <p>{userProfile?.introduce.introduceSelf?userProfile.introduce.introduceSelf:"Write something to introduce yourself"}</p>
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
  );
};

export default AvatarSection;
