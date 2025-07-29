import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FilterItem } from "../../../model/interface/interface_filter";
import { useHotelFilter } from "../../../store";
import { CalendarRentalCar } from "../../../component";
import Passengers from "../../../component/Passengers/PassengersRentalCar";
import { Button } from "../../../component/UI";
import CheckBoxOption from "../../../component/SideFilterComponent/OptionType/CheckBoxOption";
import DualSlider from "../../../component/SliderRangeComponent/DualSlider";
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

const RentalCars = () => {
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
    setRating,
    setStyle,
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
    <div className="w-3/4 max-xl:w-full grid grid-cols-[250px_1fr] justify-items-center gap-2 bg-white p-3 mb-40">
      <div className="NameLocation col-span-2 mt-6 w-full">
        <p className="text-[max(3vw,30px)] font-bold text-center">
          Your place you want to go
        </p>
      </div>
      <div className=" w-full gap-1 flex col-span-2 items-end rounded-xl shadow-lg border border-gray-200 p-5 m-5">
        <div className=" w-full gap-1 flex col-span-2 justify-center items-center max-lg:flex-wrap">
          <div className="flex flex-col w-full border-r border-gray-200 p-2">
            <p className="text-[15px] font-bold px-2">Location:</p>

            <div className="relative flex items-center">
              <input
                type="text"
                className="bg-white p-2 w-full"
                placeholder="Find hotels...."
              />
              <button
                type="button"
                className="absolute right-1 p-1 w-[30px] rounded-[10px] bg-black text-white"
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
          </div>

          <div className="w-full gap-2 relative flex justify-start items-center self-end max-2xl:flex-wrap max-lg:justify-center max-lg:w-full">
            <CalendarRentalCar />
            <Passengers />

            <div className="search w-full">
              <Button
                onClick={() => {
                  console.log("hello");
                }}
                className="w-full"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full hidden max-lg:flex justify-center items-center col-span-2 gap-3 max-sm:flex-wrap">
        <div className="filter border border-gray-300 rounded-2xl p-2 w-full max-w-3xl flex justify-between items-center">
          <div className="text-center w-full">
            <i className="fa-solid fa-filter"></i> filter
          </div>
        </div>
        <div className="sort border border-gray-300 rounded-2xl p-2 w-full max-w-3xl flex justify-between items-center">
          <div className="text-center w-full">
            <i className="fa-solid fa-sort"></i> sort
          </div>
        </div>
      </div>
      <div className="sideFilter max-lg:hidden flex flex-col justify-start items-center font-bold w-full gap-5 py-1 ">
        <div className="OptionPrice w-full">
          <p>Prices</p>
          <DualSlider />
        </div>

        <div className="w-full flex-1 flex flex-col gap-3 *:border-t *:border-gray-300 *:pt-3">
          <div className="traverSelected relative flex gap-3 flex-col">
            <div className="py-1">Capacity</div>
            <div className="flex justify-between items-center gap-3">
              <div>
                <p className="text-sm font-semibold">passengers</p>
              </div>
              <div className="flex w-full gap-1 items-center justify-end">
                <div className="minus p-1 bg-black text-white cursor-pointer">
                  <i className="fa-solid fa-minus"></i>
                </div>
                <div className="content p-2 ">4</div>
                <div className="add p-1 bg-black text-white cursor-pointer">
                  <i className="fa-solid fa-plus"></i>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center gap-3">
              <div>
                <p className="text-sm font-semibold">Bags</p>
              </div>
              <div className="flex w-full gap-1 items-center justify-end">
                <div className="minus p-1 bg-black text-white cursor-pointer">
                  <i className="fa-solid fa-minus"></i>
                </div>
                <div className="content p-2 ">4</div>
                <div className="add p-1 bg-black text-white cursor-pointer">
                  <i className="fa-solid fa-plus"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col">
            <p className="text-md">Car Type</p>
            <CheckBoxOption
              handleChange={(valueAmenity: string | number) => {
                toggleAmenity(String(valueAmenity));
              }}
              arr={[
                { id: "CheckBoxCarType1", value: "Small" },
                { id: "CheckBoxCarType2", value: "Medium" },
                { id: "CheckBoxCarType3", value: "Large" },
                { id: "CheckBoxCarType4", value: "SUV" },
                { id: "CheckBoxCarType5", value: "Wild Card" },
                { id: "CheckBoxCarType6", value: "Luxury" },
                { id: "CheckBoxCarType7", value: "Regular" },
                { id: "CheckBoxCarType8", value: "Electric" },
              ]}
              checkBoxName="CarType"
            >
              {(item: number | string) => <p>{item}</p>}
            </CheckBoxOption>
          </div>

          <div className="flex w-full flex-col">
            <p className="text-md">Car Specifications</p>
            <CheckBoxOption
              handleChange={(valueAmenity: string | number) => {
                toggleHotelClasses(String(valueAmenity));
              }}
              arr={[
                {
                  id: "checkBoxCarSpecification1",
                  value: "With air conditioning",
                },
                {
                  id: "checkBoxCarSpecification4",
                  value: "Automatic transmission",
                },
                { id: "checkBoxCarSpecification3", value: "2 doors" },
                { id: "checkBoxCarSpecification2", value: "4 doors" },
              ]}
              checkBoxName="CarSpecification"
            >
              {(item: number | string) => <p>{item}</p>}
            </CheckBoxOption>
          </div>

          <div className="flex w-full flex-col">
            <p className="text-md">Mileage</p>
            <CheckBoxOption
              handleChange={(valueAmenity: string | number) => {
                toggleHotelStyle(String(valueAmenity));
              }}
              arr={[{ id: "checkboxMileage1", value: "Unlimited" }]}
              checkBoxName="Mileage"
            >
              {(item: number | string) => <p>{item}</p>}
            </CheckBoxOption>
          </div>
        </div>
      </div>

      <div className="w-full py-3 gap-1 flex flex-col max-lg:w-full max-lg:col-span-2 p-3 ">
        {/* <div className="filter-tag flex justify-between items-center p-1 rounded-2xl w-full">
          <div className="flex gap-3 overflow-x-scroll max-lg:max-w-4xl max-2xl:max-w-3xl min-2xl:max-w-4xl *:w-50">
            <div className="typeCar flex flex-col items-center justify-center p-3 border shadow-md border-gray-300 rounded-md shrink-0">
              <img src={small_car} alt="" className="w-24" />
              <p>Medium</p>
              <div className="flex gap-2">
                <div className="typeItem flex gap-1 items-center">
                  <i className="fa-solid fa-person"></i>
                  <p>5</p>
                </div>

                <div className="typeItem flex gap-1 items-center">
                  <i className="fa-solid fa-bag-shopping"></i>
                  <p>5</p>
                </div>

                <div className="typeItem flex gap-1 items-center">
                  <i className="fa-solid fa-suitcase-rolling"></i>
                  <p>5</p>
                </div>
              </div>
            </div>

            <div className="typeCar flex flex-col items-center justify-center p-3 border shadow-md border-gray-300 rounded-md shrink-0">
              <img src={small_car} alt="" className="w-24" />
              <p>Medium</p>
              <div className="flex gap-2">
                <div className="typeItem flex gap-1 items-center">
                  <i className="fa-solid fa-person"></i>
                  <p>5</p>
                </div>

                <div className="typeItem flex gap-1 items-center">
                  <i className="fa-solid fa-bag-shopping"></i>
                  <p>5</p>
                </div>

                <div className="typeItem flex gap-1 items-center">
                  <i className="fa-solid fa-suitcase-rolling"></i>
                  <p>5</p>
                </div>
              </div>
            </div>

            <div className="typeCar flex flex-col items-center justify-center p-3 border shadow-md border-gray-300 rounded-md shrink-0">
              <img src={small_car} alt="" className="w-24" />
              <p>Medium</p>
              <div className="flex gap-2">
                <div className="typeItem flex gap-1 items-center">
                  <i className="fa-solid fa-person"></i>
                  <p>5</p>
                </div>

                <div className="typeItem flex gap-1 items-center">
                  <i className="fa-solid fa-bag-shopping"></i>
                  <p>5</p>
                </div>

                <div className="typeItem flex gap-1 items-center">
                  <i className="fa-solid fa-suitcase-rolling"></i>
                  <p>5</p>
                </div>
              </div>
            </div>

            <div className="typeCar flex flex-col items-center justify-center p-3 border shadow-md border-gray-300 rounded-md shrink-0">
              <img src={small_car} alt="" className="w-24" />
              <p>Medium</p>
              <div className="flex gap-2">
                <div className="typeItem flex gap-1 items-center">
                  <i className="fa-solid fa-person"></i>
                  <p>5</p>
                </div>

                <div className="typeItem flex gap-1 items-center">
                  <i className="fa-solid fa-bag-shopping"></i>
                  <p>5</p>
                </div>

                <div className="typeItem flex gap-1 items-center">
                  <i className="fa-solid fa-suitcase-rolling"></i>
                  <p>5</p>
                </div>
              </div>
            </div>

            <div className="typeCar flex flex-col items-center justify-center p-3 border shadow-md border-gray-300 rounded-md shrink-0">
              <img src={small_car} alt="" className="w-24" />
              <p>Medium</p>
              <div className="flex gap-2">
                <div className="typeItem flex gap-1 items-center">
                  <i className="fa-solid fa-person"></i>
                  <p>5</p>
                </div>

                <div className="typeItem flex gap-1 items-center">
                  <i className="fa-solid fa-bag-shopping"></i>
                  <p>5</p>
                </div>

                <div className="typeItem flex gap-1 items-center">
                  <i className="fa-solid fa-suitcase-rolling"></i>
                  <p>5</p>
                </div>
              </div>
            </div>

            <div className="typeCar flex flex-col items-center justify-center p-3 border shadow-md border-gray-300 rounded-md shrink-0">
              <img src={small_car} alt="" className="w-24" />
              <p>Medium</p>
              <div className="flex gap-2">
                <div className="typeItem flex gap-1 items-center">
                  <i className="fa-solid fa-person"></i>
                  <p>5</p>
                </div>

                <div className="typeItem flex gap-1 items-center">
                  <i className="fa-solid fa-bag-shopping"></i>
                  <p>5</p>
                </div>

                <div className="typeItem flex gap-1 items-center">
                  <i className="fa-solid fa-suitcase-rolling"></i>
                  <p>5</p>
                </div>
              </div>
            </div>

            <div className="typeCar flex flex-col items-center justify-center p-3 border shadow-md border-gray-300 rounded-md shrink-0">
              <img src={small_car} alt="" className="w-24" />
              <p>Medium</p>
              <div className="flex gap-2">
                <div className="typeItem flex gap-1 items-center">
                  <i className="fa-solid fa-person"></i>
                  <p>5</p>
                </div>

                <div className="typeItem flex gap-1 items-center">
                  <i className="fa-solid fa-bag-shopping"></i>
                  <p>5</p>
                </div>

                <div className="typeItem flex gap-1 items-center">
                  <i className="fa-solid fa-suitcase-rolling"></i>
                  <p>5</p>
                </div>
              </div>
            </div>
          </div>
        </div> */}

        <div className="*:hover:shadow-md flex flex-col max-lg:w-full max-lg:col-span-2 p-3 gap-3">
          <div
            className="flex gap-3 justify-between border border-gray-200 
        max-sm:flex-col"
          >
            <div className="">
              <div className="flex flex-col p-4">
                <p className="text-[12px]">JFK Airport, New York</p>
                <p className="font-bold w-full text-black text-[16px]">
                  Wild card
                </p>
              </div>
              <img
                src={
                  "https://cdn.rcstatic.com/images/car_images/web/ford/focus_lrg.jpg"
                }
                alt=""
                srcSet=""
                className=" object-cover w-50 max-sm:w-full"
              />
            </div>

            <div className="flex w-9/12 justify-between items-start h-full p-1.5 max-sm:flex-col max-sm:w-full max-sm:*:w-full">
              <div className="w-9/12 flex flex-col gap-2">
                <div className="w-full *:text-[13px] text-gray-600 flex-wrap">
                  <div className="flex gap-2 items-center">
                    <i className="fa-solid fa-briefcase"></i>
                    <p>2 bags</p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <i className="fa-solid fa-person"></i> <p>4 Seats</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <i className="fa-solid fa-suitcase-rolling"></i> 1 small bag
                  </div>
                  <div className="flex gap-2 items-center">
                    <i className="fa-solid fa-car"></i> 4 doors
                  </div>
                  <div className="flex gap-2 items-center">
                    <i className="fa-solid fa-snowflake"></i>Air condition
                  </div>
                  <div className="flex gap-2 items-center">
                    <i className="fa-solid fa-memory"></i> Automatic tranmision
                  </div>
                  <div className="flex gap-2 items-center">
                    <i className="fa-solid fa-gas-pump"></i>Full to full
                  </div>
                  <div className="flex gap-2 items-center">
                    <i className="fa-solid fa-check"></i>Unlimited mileage
                  </div>
                </div>

                <div className="w-full">
                  <div className="score flex gap-3 items-center">
                    <div className="rating h-full">
                      <p className="p-3 bg-gray-300 rounded-md font-bold text-white">
                        5
                      </p>
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className=" text-md font-bold">Location Rating</p>
                      <p className="text-gray-500 text-sm">Excellent</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" w-3/12 flex flex-col items-end justify-between h-full text-center">
                <p className="font-bold text-2xl p-3">300$</p>
                <Link
                  to="/rentalCar/123"
                  className="p-2 w-8/10 bg-black rounded-xl text-white font-bold text-[10px] max-sm:w-full"
                >
                  View Deal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalCars;
