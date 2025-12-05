import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import DualSlider from "../../../component/SliderRangeComponent/DualSlider";
import { useTourFilter } from "../../../store";
import Calendar_Tour from "../../../component/calendar/tour/CalendarTour";
import { Button, Modal } from "../../../component/UI";
import DropDownSelect from "../../../component/dropdown-component/DropDownSelect";
import ReusableSlider from "../../../component/SliderComponent/SliderComponent";
import SortTour from "../../../component/SortComponent/SortTour";
import SearchFilterTour from "../../../component/filter-component/SearchFilterTour";
import SideTourComponent from "../../../component/SideComponent/SideTourComponent";
import IconButton from "../../../component/UI/Button/IconButton";
import { StarRatingStatic } from "../../../component";
const Tours = () => {

  const {
    maxPrice,
    minPrice,
    selectedRating,
    selectedCategories,
    selectedDuration,
    setCategories,
    setDuration,
    resetFilters,
    setMaxPrice,
    setMinPrice,
    setRating,
    toggleStar,
  } = useTourFilter();

  const navigate = useNavigate();

  useEffect(() => {
    setMaxPrice(100);
    setMinPrice(0);
  }, []);

  const items = [
    { id: 1, value: "10/2" },
    { id: 2, value: "20/3" },
    { id: 3, value: "12/12" },
    { id: 4, value: "13/4" },
    { id: 5, value: "30/4" },
    { id: 6, value: "10/3" },
  ];

  return (
    <div className="content grid grid-cols-[250px_1fr] justify-items-center gap-2 bg-white mb-40">
      <div className="NameLocation col-span-2 mt-6 w-full">
        <p className="text-[max(3vw,30px)] font-bold text-center">
          Your place you want to go
        </p>
      </div>

      <SearchFilterTour />
      <SideTourComponent />

      <div
        className="SideResponsive hidden w-full justify-center items-center col-span-2 border border-gray-200 gap-2
        *:cursor-pointer
      max-xl:flex
      "
      >
        <div
          className=" w-full p-3 border-r border-gray-200 font-bold text-center"
        >
          <i className="fa-solid fa-filter"></i> filter
        </div>
        <div
          className=" w-full p-3 font-bold text-center"

        >
          <i className="fa-solid fa-sort"></i> Sort
        </div>
      </div>

      <div
        className="w-full py-3 gap-1 flex flex-col items-center 
      max-lg:w-full max-xl:col-span-2 p-3 "
      >
        <div className="flex justify-between items-center w-full py-3">
          <div className="TotalSearch max-xl:w-full">
            Found <span className="font-bold">35</span> results
          </div>
          <div
            className="SortBy
        max-xl:hidden"
          >
            <SortTour />
          </div>
        </div>

          <div className="flex gap-3 justify-between rounded-xl border border-gray-200 p-2 shadow-md w-full max-lg:flex-wrap">
            <div className="flex w-full justify-between items-start p-1.5 max-sm:flex-col gap-2">
              <div className="min-sm:max-w-[250px] relative">
                <img
                  src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/10/5b/53/e9.jpg"
                  alt=""
                  srcSet=""
                  className="w-full aspect-square rounded-xl object-cover"
                />
                <IconButton
                  iconColorActive="text-red-500"
                  className="absolute top-2 right-2 p-3 w-10"
                  typeButton="text"
                  icon={"heart"}
                  rounded="full"
                  variant="outline"
                  iconSize={15}
                />

                <div className="items-center absolute bottom-0 right-0 bg-black/90 rounded-md p-2 m-2 min-sm:hidden">
                  <div className="flex text-[clamp(15px,200rem,1vw)] items-center justify-center gap-2 text-white font-bold">
                    <span> 3.0</span>
                    <span>
                      <StarRatingStatic />
                    </span>
                  </div>
                  <p className="text-md text-white font-bold">Excellent</p>
                </div>
              </div>
              <div className="w-full">
                <div className="mb-2 flex flex-col gap-1">
                  <p className="font-bold text-2xl line-clamp-2">
                  Tour du lịch nguyên ngày ở chợ nỗi đồng bằng sông cửu long.
                  </p>
                  <div className="flex items-center gap-2">
                    <i className="fa-solid fa-location-dot"></i>
                    <p>Thị trấn Cái Bè, huyện Cái Bè, tỉnh Tiền Giang, Việt Nam</p>
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

                      <div className="flex gap-2 flex-wrap">
                        <p className="w-fit p-1 border border-gray-200 rounded-md shadow">
                         Free cancel
                        </p>
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="self-center p-2 w-full items-center max-lg:flex min-lg:max-w-[200px] max-sm:flex-wrap">
              <div className="flex flex-col max-lg:w-full min-lg:*:text-start">
                <p className="text-sm">Cho 1 người</p>
                <p className="text-2xl font-bold">100.000 VNĐ</p>
                <p className="text-sm">Đã bao gồm thuế và phí</p>
              </div>
              <Button
                onClick={() => {
                  navigate("/tours/tour-1");
                }}
                className="w-full rounded-md mt-5"
              >
                view more
              </Button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Tours;
