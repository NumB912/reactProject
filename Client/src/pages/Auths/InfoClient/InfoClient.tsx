import React from "react";
import Logo from "../../../assets/logo.png";
import { Outlet, useParams } from "react-router-dom";
import Tabs, { Tab } from "../../../component/UI/Tabs";
const InfoClient = () => {
  const { id } = useParams();
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

  return (
    <div className="info relative w-full flex flex-col justify-center items-center bg-gray-200">
      <div className="bg-gray-300 opacity-40 w-full h-[400px] flex justify-center items-center">
        <div className=" w-full h-full flex justify-center items-center">
          <div className="upload-image cursor-pointer flex gap-3 justify-center items-center">
            <i className="fa-solid fa-image"></i>
            <p>Upload image</p>
          </div>
        </div>
      </div>
      <div className="-mt-10 grid grid-cols-[350px_1fr] m-2 w-11/12 z-30 gap-3">
        <div className="profile flex-col flex *:p-3 gap-3 *:bg-white">
          <div className="border border-gray-200 shadow">
            <div className="image-avatar">
              <img src={Logo}></img>
            </div>
            <div className="flex justify-between items-center border-b-gray-200">
              <div className="">
                {" "}
                <p className="font-bold text-2xl">Bocchi of the rock</p>
                <p className="text-sm text-gray-400">@bocchi112</p>
              </div>
              <div className="editprofile">
                <button className="font-semibold text-sm border border-gray-300 p-1 cursor-pointer hover:bg-gray-200">
                  <i className="fa-solid fa-gear"></i> Edit profile{" "}
                </button>
              </div>
            </div>
            <div className="flex *:grow *:p-2">
              <p className="font-bold">Follower: 0</p>
              <p className="font-bold">Following: 0</p>
              <p className="font-bold">Blog: 0</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 border border-gray-200 shadow">
            <p className="font-bold text-2xl">My Profile</p>
            <div className="email flex items-center gap-2 *:text-sm">
              <i className="fa-solid fa-envelope min-w-5"></i>
              <p>ExampleEmail@gmail.com</p>
            </div>
            <div className="city flex items-center gap-2 *:text-sm">
              <i className="fa-solid fa-location-dot min-w-5"></i>
              <p>Đà Nẵng</p>
            </div>

            <div className="phone flex items-center gap-2 *:text-sm">
              <i className="fa-solid fa-phone min-w-5"></i>
              <p>0123456789</p>
            </div>
            <div className="content *:text-sm">
              <p className="font-bold">About me</p>
              <p className="line-clamp-4 ">
                Thông tin cơ bản: Minh sống tại Đà Nẵng, là lập trình viên
                backend làm việc từ xa cho một startup Singapore. Anh có một
                con mèo tên là "Docker". Tính cách: Trầm tính, hướng nội, cầu
                toàn. Có xu hướng suy nghĩ nhiều, ít nói nhưng khi đã nói thì
                sâu sắc. Hay tự dằn vặt vì những chuyện nhỏ nhặt. Rất trung
                thành và sống có trách nhiệm.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 border border-gray-200 shadow">
            <p className="font-bold text-2xl">Share more photos</p>
            <div className="post-photo flex gap-2 items-center *:text-sm">
              <i className="fa-solid fa-image min-w-5"></i>
              <p>Post your photos</p>

            </div>

            <div className="post-reviews flex gap-2 items-center *:text-sm">
           <i className="fa-solid fa-thumbs-up min-w-5"></i>
              <p>Post your reviews</p>

            </div>
          </div>
        </div>
        <div className="content-profile p-3 bg-white">
          <Tabs
            activeStyle="border-b-3 font-bold transition-all ease-in"
            elseActiveStyle="hover:bg-gray-200"
            tabs={nav}
            classNameContainerStyle="flex gap-3 border-b border-b-gray-200"
            contentNaigationStyle="p-3 min-w-[80px] text-center text-sm"
            onClose={() => { }}
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
