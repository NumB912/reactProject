import React, { useState } from "react";
import Dropdown from "../../../../component/DropDownComponent/Dropdown";
import DropDownContent from "../../../../component/DropDownComponent/DropDownContent";
import { Link } from "react-router";
import { ButtonBorder } from "../../../../component/UI";
import ViewDetailPhoto from "./ViewDetailPhoto";
import EditPhoto from "./EditPhoto";

const Photo = () => {
  const [isOpenSetting, setIsOpenSetting] = useState<boolean>(false);
  const [isOpenViewDetailPhotoModal, setIsOpenViewDetailPhotoModal] =
    useState<boolean>(false);
  const [isOpenEditPhotoModal, setisOpenEditPhotoModal] =
    useState<boolean>(false);
  return (
    <div className="photo w-full border border-gray-200 shadow-md rounded-md">
      <div className="profile-post flex justify-between gap-2 p-3">
        <div className="flex gap-2">
          <img
            src="https://www.animeherald.com/wp-content/uploads/2024/05/Bocchi-the-Rock-003-20240323.jpg"
            className="rounded-full aspect-square object-cover w-[45px]"
          />
          <div className="">
            <p className="font-bold text-md">Sups</p>
            <p className="text-[12px] text-gray-400">23/5/2025</p>
          </div>
        </div>
        <Dropdown
          handleClose={() => {
            setIsOpenSetting(false);
          }}
          className="relative"
        >
          <DropDownContent
            className="top-10 w-[130px] flex flex-col bg-white *:p-2 *:hover:bg-gray-200 border-gray-200 border right-0"
            isOpen={isOpenSetting}
          >
            <button
              onClick={() => {
                setIsOpenViewDetailPhotoModal(!isOpenViewDetailPhotoModal);
              }}
              className="w-full"
            >
              View details
            </button>
            <button      onClick={() => {
                setisOpenEditPhotoModal(!isOpenEditPhotoModal);
              }} className="w-full">Edit</button>
            <button className="w-full">Delete</button>
          </DropDownContent>

          <ButtonBorder
            className=""
            onClick={() => {
              setIsOpenSetting(!isOpenSetting);
            }}
          >
            <i className="fa-solid fa-ellipsis"></i>
          </ButtonBorder>
        </Dropdown>
      </div>
      <img
        src="https://www.animeherald.com/wp-content/uploads/2024/05/Bocchi-the-Rock-003-20240323.jpg"
        className="aspect-square w-full object-cover"
      />

      <div className="flex p-2 gap-2 *:cursor-pointer">
        <button className="flex gap-2 items-center">
          <i className="fa-solid fa-thumbs-up"></i> Like
        </button>
        <button className="flex gap-2 items-center">
          <i className="fa-solid fa-heart"></i> Save
        </button>
      </div>

      <ViewDetailPhoto isOpen={isOpenViewDetailPhotoModal} setIsOpen={()=>{setIsOpenViewDetailPhotoModal(false)}}/>
        <EditPhoto isOpen={isOpenEditPhotoModal} setIsOpen={()=>{setisOpenEditPhotoModal(false)}}/>
    </div>
  );
};

export default Photo;
