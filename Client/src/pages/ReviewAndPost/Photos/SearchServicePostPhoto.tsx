import React from "react";
import { InputBar } from "../../../component/UI";
import UploadPostPhoto from "../../../component/upload-photo/UploadPostPhoto";

const SearchServicePostPhoto = () => {
  return (
    <div className="grid grid-cols-[400px_1fr] w-8/10 py-20 gap-20">
      <div className="flex flex-col justify-center items-center gap-10 border-r border-gray-300">
        <p className="text-7xl font-bold">Share your photos</p>
              <div className="post-photo border border-gray-300 rounded-sm p-4 w-60 m-5 shadow">
            <div className="post-review__service-img">
              <img
                className="object-cover aspect-square"
                src="https://dulichdaiviet.vn/uploaded/tour/mien-tay/tourdulichmientay7ngay6dem.jpg"
                alt="service_img"
              />
            </div>

            <div className="post-review__service-info">
              <p className="post-review__service-name font-bold">
                The Mekong River in Southwest Vietnam
              </p>
              <p className="post-review__service-address text-gray-500">
                Kiên Giang
              </p>
            </div>
          </div>

        <div className="content-photo flex flex-col gap-4">
          <p className="title-content font-bold">Share your photo with us:</p>
          <p className="leading-8">
            Share your photo with us to help others discover the beauty of this
            place.
          </p>
          <p className="leading-8">
            You can upload a maximum of 50 photos at a time Accepted photo
            formats include .jpg .jpeg .gif and .png File size should be less
            than 15MB.
          </p>
        </div>
      </div>

      <div className="search-post-photo w-full flex flex-col gap-10">
        <div className="">
          <p className="text-md font-semibold mb-2">Search for a service</p>
           <InputBar placeholder="Search for a location" foundServices={[]} onChange={(value) => {}} />
        </div>

        <UploadPostPhoto/>

      </div>
    </div>
  );
};

export default SearchServicePostPhoto;
