import React, { ProfilerProps, useState } from "react";
import { profile } from "../../../interface/Profile";
import { useNavigate } from "react-router";
import {  formatUrlImg } from "../../../utils/urlFormat";

interface AvatarSectionProp{
    isOpenEditProfileModal:boolean;
    setIsOpenEditProfileModal:(isOpenEditProfileModal:boolean)=>void
    userProfile:profile|undefined
}

const AvatarSection = ({isOpenEditProfileModal,setIsOpenEditProfileModal,userProfile}:AvatarSectionProp) => {
  const navigate = useNavigate()
  return (
    <div className="profile flex-col flex *:p-5 gap-3 *:bg-white">
      <div className="border border-gray-200 shadow">
        <div className="image-avatar w-full flex justify-center items-center p-3">
          <img
            src={
              userProfile?.image?.url
                ? formatUrlImg(userProfile.image.url)
                : "https://m.media-amazon.com/images/M/MV5BMzg3N2I3OTAtNThlYy00ZTM0LWFiMjItZmRkNzE3NWQ5MTg2XkEyXkFqcGdeQXRyYW5zY29kZS13b3JrZmxvdw@@._V1_QL75_UX500_CR0,0,500,281_.jpg"
            }
            className="w-[200px] aspect-square object-cover rounded-full border border-gray-300 cursor-pointer bg-center"
            onClick={() => {}}
          ></img>
        </div>
        <div className="flex justify-between items-center border-b-gray-200">
          <div className="profile-name">
            <p className="font-bold text-2xl">{userProfile?userProfile.name:"Chưa tồn tại tên người dùng"}</p>
          </div>
          <div className="profile-edit">
            <div className="flex justify-center items-center *:p-2 *:hover:bg-gray-200 *:text-[12px] border border-gray-200 *:cursor-pointer">
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
      </div>

      <div className="border border-gray-200 shadow">
        <div className="intro">
          <p className="font-bold text-sm">Thông tin người dùng</p>
        </div>

        <div className="intro-content flex flex-col">

          <div className="intro-content_phone-number flex gap-2 items-center mt-3 text-[13px] cursor-pointer">
            <i className="fa-solid fa-phone"></i>
            <p>{userProfile?.phone??"Chưa có thông tin"}</p>
          </div>

          <div className="intro-content_phone-number flex gap-2 items-center mt-3 text-[13px] cursor-pointer ">
            <i className="fa-solid fa-plus"></i>
            <p>{userProfile?.bio?userProfile.bio:"Giới thiệu về bạn"}</p>
          </div>
        </div>
      </div>

      {/* <div className="border border-gray-200 shadow">
        <div className="intro">
          <p className="font-bold text-sm">Share your travel advice</p>
        </div>

        <div className="intro-content flex flex-col">
          <div className="intro-content_location flex gap-2 items-center mt-3 text-[13px] cursor-pointer" 
          onClick={()=>{navigate("/PostPhotos")}}>
            <i className="fa-solid fa-camera"></i>
            <p>Share your photos</p>
          </div>

          <div className="intro-content_phone-number flex gap-2 items-center mt-3 text-[13px] cursor-pointer"
          onClick={()=>{navigate("/WriteReview")}}>
            <i className="fa-solid fa-pen"></i>
            <p>Share your reviews</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AvatarSection;
