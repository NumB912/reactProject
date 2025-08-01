import React, { useEffect, useState } from "react";
import { FilterItem } from "../../../model/interface/interface_filter";
import { useHotelFilter } from "../../../store";
import FilterCheckInHotel from "../../../component/FilterComponent/SearchFilterHotel";
import DualSlider from "../../../component/SliderRangeComponent/DualSlider";
import { Button, HeartFavorite } from "../../../component/UI";
import { Link } from "react-router";
import { StarRatingStatic } from "../../../component";
import DropDownSelect from "../../../component/DropDownComponent/DropDownSelect";
import WrapDropDownOutLineItem from "../../../component/DropDownComponent/WrapDropDownOutLineItem";
import DropDownContent from "../../../component/DropDownComponent/DropDownContent";
import SortHotel from "../../../component/SortComponent/SortHotel";
import Star from "../../../component/UI/Star";
import SideHotelComponent from "../../../component/SideComponent/SideHotelComponent";
const filterData: FilterItem[] = [
  {
    type: "Radio",
    title: "Rating",
    inputType: "StarRadio",
    name: "StarRating",
    options: [
      { id: "RadioOption1", value: 5 },
      { id: "RadioOption2", value: 4 },
      { id: "RadioOption3", value: 3 },
      { id: "RadioOption4", value: 2 },
    ],
  },
  {
    type: "Radio",
    title: "Room Type",
    inputType: "ValueRadio",
    name: "roomType",
    options: [
      { id: "RadioTextOption1", value: "Luxury" },
      { id: "RadioTextOption2", value: "Regular" },
    ],
  },
  {
    type: "CheckBox",
    title: "Property Type",
    inputType: "CheckBox",
    name: "CheckBoxHotelsType",
    options: [
      { id: "CheckBoxHotelsType1", value: "Luxury" },
      { id: "CheckBoxHotelsType2", value: "Regular" },
    ],
  },
  {
    type: "CheckBox",
    title: "Amenities",
    inputType: "CheckBox",
    name: "CheckBoxAmenties",
    options: [
      { id: "CheckBoxAmenties1", value: "Wifi" },
      { id: "CheckBoxAmenties2", value: "Breakfast" },
      { id: "CheckBoxAmenties3", value: "Parking" },
      { id: "CheckBoxAmenties4", value: "Pool" },
    ],
  },
];

const Hotels = () => {
  const {
    maxPrice,
    minPrice,
    location,
    selectedAmenities,
    selectedRating,
    hotelClasses,
    style,
    selectedStars,
    resetFilters,
    setLocation,
    setMaxPrice,
    setMinPrice,
    toggleAmenity,
    toggleStar,
    toggleHotelClasses,
    toggleHotelStyle,
  } = useHotelFilter();
  useEffect(() => {
    setMaxPrice(100);
    setMinPrice(0);
  }, []);

  return (
    <div className="w-7xl max-w-full grid grid-cols-[250px_1fr] justify-center gap-5 mb-40 p-5">
      <div className="NameLocation col-span-2 mt-6 w-full">
        <p className="text-[max(3vw,30px)] font-bold text-center">
          Your place you want to go
        </p>
      </div>
      <div className="col-span-2">
            <FilterCheckInHotel />
      </div>

      <div className="side-hotel">
        <SideHotelComponent/>
      </div>


      <div className="w-full gap-1 flex flex-col max-lg:col-span-2">
        <div className="flex flex-col gap-3 max-lg:col-span-2">
          <div className="flex justify-between">
            <div className="hotel-numbers">
              <p className="font-bold text-2xl">
                Tp. Hồ Chí Minh: Đã tìm thấy 900 kết quả
              </p>

            </div>

           <div className="w-fit">
                <SortHotel />
              </div>
          </div>
          <div className="flex gap-3 justify-between rounded-xl border border-gray-200 p-2 shadow-md w-full max-lg:flex-wrap">
            <div className="flex w-full justify-between items-start p-1.5 max-sm:flex-col gap-2">
              <div className="min-sm:max-w-[250px] relative">
                <img
                  src="https://ik.imagekit.io/tvlk/apr-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/69000000/68120000/68113000/68112922/50b4deb1_z.jpg?_src=imagekit&tr=dpr-2,c-at_max,f-jpg,fo-auto,h-332,pr-true,q-80,w-480"
                  alt=""
                  srcSet=""
                  className="w-full aspect-square rounded-xl object-cover"
                />
                <HeartFavorite />

                <div className="items-center absolute bottom-0 right-0 bg-black/90 rounded-md p-2 m-2 min-sm:hidden">
                  <div className="flex text-[clamp(15px,200rem,1vw)] items-center justify-center gap-2 text-white font-bold">
                    <span> 3.0</span> 
                    <span><Star/></span>
                  </div>
                  <p className="text-md text-white font-bold">Excellent</p>
                </div>
              </div>
              <div className="w-full">
                <div className="mb-2 flex flex-col gap-1">
                  <p className="font-bold text-2xl line-clamp-2">
                    Tank top Hotel
                  </p>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-location-dot"></i>
                    <p>TP. Hồ Chí Minh</p>
                  </div>
                </div>

                <div className="info-service">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center max-sm:hidden">
                      <p className="text-sm text-white bg-black p-2 font-bold rounded-sm">
                        3.0 - Good
                      </p>
                      <div className="flex-col flex justify-center">
                        <StarRatingStatic starNumber={5} />
                        <p className="text-sm italic text-gray-500">
                          (500 reviews)
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 border-l border-gray-200 pl-2">
                      <p className="text-md font-bold">Queen room</p>
                      <p className="text-sm">2 giường lớn</p>

                      <div className="flex gap-2 flex-wrap">
                        <p className="w-fit p-1 border border-gray-200 rounded-md shadow">
                          Wifi free
                        </p>
                        <p className="w-fit p-1 border border-gray-200 rounded-md shadow">
                          Breakfast
                        </p>
                        <p className="w-fit p-1 border border-gray-200 rounded-md shadow">
                          Lunch
                        </p>
                        <p className="w-fit p-1 border border-gray-200 rounded-md shadow">
                          elevator
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="self-center p-2 w-full items-center max-lg:flex min-lg:max-w-[200px] max-sm:flex-wrap">
              <div className="flex flex-col max-lg:w-full min-lg:*:text-start">
                <p className="text-sm">1 đêm, 2 người lớn</p>
                <p className="text-2xl font-bold">100.000 VNĐ</p>
                <p className="text-sm">Đã bao gồm thuế và phí</p>
              </div>
              <Button onClick={() => {}} className="w-full rounded-md mt-5">
                view more
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
