import React, { useEffect, useState } from "react";
import { FilterItem } from "../../../model/interface/interface_filter";
import { useHotelFilter } from "../../../store";
import FilterCheckInHotel from "../../../component/FilterComponent/filterCheckInHotel";
import DualSlider from "../../../component/SliderRangeComponent/DualSlider";
import { Button, HeartFavorite } from "../../../component/UI";
import CheckBoxOption from "../../../component/SideFilterComponent/OptionType/CheckBoxOption";
import { Link } from "react-router";
import { StarRatingStatic } from "../../../component";
import DropDownSelect from "../../../component/DropDownComponent/DropDownSelect";
import SlideButton from "../../../component/SlideButton/SlideButton";
import WrapDropDownOutLineItem from "../../../component/DropDownComponent/WrapDropDownOutLineItem";
import DropDownContent from "../../../component/DropDownComponent/DropDownContent";
import SortHotel from "../../../component/SortComponent/SortHotel";
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
    <div className="w-8/10 max-md:w-11/12 grid grid-cols-[200px_1fr] justify-items-center gap-2 mb-40">
      <div className="NameLocation col-span-2 mt-6 w-full">
        <p className="text-[max(3vw,30px)] font-bold text-center">
          Your place you want to go
        </p>
      </div>
      <FilterCheckInHotel />

      <div className="sideFilter max-lg:hidden w-full flex flex-col justify-start items-center *:font-bold *:border-t *:border-gray-300 *:w-full gap-5 *:py-1 ">
        <div className="OptionPrice">
          <p>Prices</p>
          <DualSlider />
        </div>
        <div className="flex w-full flex-col">
          <p className="text-md">Rating</p>
          {/* <RadioOption
            handleChange={(valueStar: string | number) => {
              toggleStar(Number(valueStar));
            }}
            options={[
              { id: "RadioRatingStar1", value: 5 },
              { id: "RadioRatingStar2", value: 4 },
              { id: "RadioRatingStar3", value: 3 },
              { id: "RadioRatingStar4", value: 2 },
            ]}
            nameRadio="RatingStar"
          >
            {(item: number | string) => <RatingStar stars={Number(item)} />}
          </RadioOption> */}
        </div>

        <div className="w-full flex-1 flex flex-col gap-3 text-[20px]">
          <div className="flex w-full flex-col">
            <p className="text-md">Amenities</p>
            <CheckBoxOption
              handleChange={(valueAmenity: string | number) => {
                toggleAmenity(String(valueAmenity));
              }}
              arr={[
                { id: "CheckBoxAmenties1", value: "Wifi" },
                { id: "CheckBoxAmenties2", value: "Breakfast" },
                { id: "CheckBoxAmenties3", value: "Parking" },
                { id: "CheckBoxAmenties4", value: "Pool" },
              ]}
              checkBoxName="Amenities"
            >
              {(item: string) => <p>{item}</p>}
            </CheckBoxOption>
          </div>

          <div className="flex w-full flex-col">
            <p className="text-md">Hotel Class</p>
            <CheckBoxOption
              handleChange={(valueAmenity: string | number) => {
                toggleHotelClasses(String(valueAmenity));
              }}
              arr={[
                { id: "CheckBoxHotelClass5", value: "5 Star" },
                { id: "CheckBoxHotelClass4", value: "4 Star" },
                { id: "CheckBoxHotelClass3", value: "3 Star" },
                { id: "CheckBoxHotelClass2", value: "2 Star" },
                { id: "CheckBoxHotelClass1", value: "1 Star" },
              ]}
              checkBoxName="HotelClass"
            >
              {(item: string) => <p>{item}</p>}
            </CheckBoxOption>
          </div>

          <div className="flex w-full flex-col">
            <p className="text-md">Hotel Style</p>
            <CheckBoxOption
              handleChange={(valueAmenity: string | number) => {
                toggleHotelStyle(String(valueAmenity));
              }}
              arr={[
                { id: "checkBoxHotelStyle1", value: "Budget" },
                { id: "CheckBoxHotelStyle2", value: "Mid-range" },
                { id: "checkBoxHotelStyle3", value: "Luxury" },
                { id: "CheckBoxHotelStyle4", value: "Family-friendly" },
                { id: "checkBoxHotelStyle5", value: "Business" },
                { id: "CheckBoxHotelStyle6", value: "Romantic" },
                { id: "checkBoxHotelStyle7", value: "Modern" },
              ]}
              checkBoxName="HotelStyle"
            >
              {(item: string) => <p>{item}</p>}
            </CheckBoxOption>
          </div>
        </div>
      </div>

      <div className="w-full py-3 gap-1 flex flex-col max-lg:w-full max-lg:col-span-2">
        <div className="flex flex-col max-lg:w-full max-lg:col-span-2 p-3 gap-3">
          <div className="flex justify-between">
            <div className="hotel-numbers">
              <p className="font-bold text-2xl mb-4">
                Tp. Hồ Chí Minh: Đã tìm thấy 900 kết quả
              </p>
              <div className="w-fit">
                <SortHotel />
              </div>
            </div>

            <SlideButton
              options={["Col", "Grid"]}
              onChange={(e: string) => {
                console.log(e);
              }}
            />
          </div>
          <div className="flex gap-3 justify-between rounded-xl border border-gray-200 p-2 shadow-md w-full">
            <div className="flex w-full justify-between items-start h-full p-1.5 gap-2">
              <div className="max-w-[200px] relative">
                <img
                  src="https://ik.imagekit.io/tvlk/apr-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/69000000/68120000/68113000/68112922/50b4deb1_z.jpg?_src=imagekit&tr=dpr-2,c-at_max,f-jpg,fo-auto,h-332,pr-true,q-80,w-480"
                  alt=""
                  srcSet=""
                  className="w-full aspect-square rounded-xl"
                />
                <HeartFavorite />
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
                    <div className="flex gap-2 items-center">
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

            <div className="self-center max-w-[200px] w-full">
              <div className="flex flex-col">
                <p className="text-sm text-center">1 đêm, 2 người lớn</p>
                <p className="text-3xl font-bold text-center">200.000 VNĐ</p>
                <p className="text-sm text-center">Đã bao gồm thuế và phí</p>
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
