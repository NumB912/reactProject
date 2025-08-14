import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FilterItem } from "../../../model/interface/interface_filter";
import { useHotelFilter } from "../../../store";
import { CalendarRentalCar } from "../../../component";
import Passengers from "../../../component/PassengerComponent/PassengersRentalCar";
import { Button } from "../../../component/UI";

import DualSlider from "../../../component/SliderRangeComponent/DualSlider";
import SearchFilterRentalCar from "../../../component/FilterComponent/SearchFilterRentalCar";
import SideRentalCarComponent from "../../../component/SideComponent/SideRentalCarComponent";

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
    <div className="content grid grid-cols-[250px_1fr] justify-center gap-2 bg-white p-3 mb-40">
      <div className="NameLocation col-span-2 mt-6 w-full">
        <p className="text-[max(3vw,30px)] font-bold text-center">
          Your place you want to go
        </p>
      </div>

      <div className="col-span-2">
        <SearchFilterRentalCar />
      </div>

      <SideRentalCarComponent/>

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
