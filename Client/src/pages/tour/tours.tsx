import React, { useEffect, useState } from "react";
import RatingStar from "../../component/SideFilterComponent/OptionType/OptionMaterial/StarRatingRadioOption";
import { Link, useNavigate } from "react-router";
import Calendar_Hotel from "../../component/calendar/CalendarHotel";
import { useCalendarHotel } from "../../store/CalendarStore/calendar_hotel_store";
import { formatDate } from "../../utils/TimeHandle";
import useTravelerHotel from "../../store/PassengerStore/traveler_store_hotel";
import { FilterItem } from "../../model/interface/interface_filter";
import { useHotelFilter } from "../../store/FilterStore/filter_store";
import CheckBoxOption from "../../component/SideFilterComponent/OptionType/CheckBoxOption";
import RadioOption from "../../component/SideFilterComponent/OptionType/RadioOption";

import DualSlider from "../../component/SliderRangeComponent/DualSlider"
import { Button } from "../../component/ButtonComponent/Button";
import { useTourCalendar } from "../../store/CalendarStore/calendar_tour_store";
import { useTourFilter } from "../../store/FilterStore/filter_tour_store";
import Calendar_Tour from "../../component/calendar/CalendarTour";
import ReusableSlider from "../../component/SliderComponent/SliderComponent";
import DropDownSelect from "../../component/DropDownComponent/DropDownSelect"
import { FaSort } from "react-icons/fa";
import Calendar_OneMonth from "../../component/calendar/CalendarBase/Calendar_OneMonth";
import Modal from "../../component/ModalComponent/Modal";
import { HeartFavorite } from "../../component/ButtonComponent/Button";
const Hotels = () => {
  const [price, setPrice] = useState(0);
  const [isShowsome, setShowsome] = useState(false);
  const [isShowSort, setShowSort] = useState(false);
  const {
    dateSelectedBook,
  } = useTourCalendar();

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

  const [showCheckIn, setShowCheckIn] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const nagative = useNavigate()

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

  const renderItemDateDeparture = (item: { id: string | number; value: string }) => {
    return (
      <div className="border border-black w-full p-1.5 text-center font-bold rounded-sm">
        <p>{item.value}</p>
      </div>
    );
  };

  return (
    <div className="w-8/10 max-md:w-full grid grid-cols-[250px_1fr] justify-items-center gap-2 bg-white p-3 mb-40">
      <div className="NameLocation col-span-2 mt-6 w-full">
        <p className="text-[max(3vw,30px)] font-bold text-center">
          Your place you want to go
        </p>
      </div>
      <div className="Calendar w-full col-span-2 flex justify-center items-end gap-3">
        <div className="flex flex-col w-full border-r border-gray-200 p-2 max-lg:hidden ">
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

                <Calendar_Tour containerStyle={"w-1/5 max-h-15"} CalendarStyleTour={"top-12 w-full"}/>
      </div>

      <div
        className="SideFilter w-full flex flex-col justify-start items-center 
      bg-gray-50 p-5
      *:font-bold  *:border-gray-300 *:w-full gap-5 *:py-1 
      max-xl:hidden"
      >
        <div className="OptionPrice">
          <p>Prices</p>
          <DualSlider />
        </div>
        <div className="flex w-full flex-col">
          <p className="text-md">Rating</p>
          <RadioOption
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
          </RadioOption>
        </div>

        <div className="w-full flex-1 flex flex-col gap-3 text-[20px]">
          <div className="flex w-full flex-col">
            <p className="text-md">Duration</p>
            <CheckBoxOption
              handleChange={(value: string | number) => {
                setDuration(String(value));
              }}
              arr={[
                { id: "CheckBoxDuration1", value: "Up to 1 hour" },
                { id: "CheckBoxDuration2", value: "1 to 4 hours" },
                { id: "CheckBoxDuration3", value: "4 hours to day" },
              ]}
              checkBoxName="HotelClass"
            >
              {(item: string) => <p>{item}</p>}
            </CheckBoxOption>
          </div>

          <div className="flex w-full flex-col">
            <p className="text-md">Product categories</p>
            <CheckBoxOption
              handleChange={(value: string | number) => {
                setCategories(String(value));
              }}
              arr={[
                {
                  id: "checkBoxProductCategories1",
                  value: "Sightseeing Tours",
                },
                { id: "heckBoxProductCategories2", value: "City Tours" },
                {
                  id: "heckBoxProductCategories3",
                  value: "Historical * Heritage Tours",
                },
                { id: "heckBoxProductCategories4", value: "Bus Tours" },
                { id: "heckBoxProductCategories5", value: "Walking Tours" },
                { id: "heckBoxProductCategories6", value: "Helicopter Tours" },
                { id: "heckBoxProductCategories7", value: "Hop-On Hop-Off" },
                { id: "heckBoxProductCategories8", value: "Night Tours" },
                { id: "heckBoxProductCategories9", value: "Private Tours" },
                {
                  id: "heckBoxProductCategories10",
                  value: "Skips-the-line Tours",
                },
                {
                  id: "heckBoxProductCategories11",
                  value: "Literary, Art & Music Tours",
                },
                { id: "heckBoxProductCategories12", value: "Multi-day Tours" },
                { id: "heckBoxProductCategories13", value: "Movie-TVs Tours" },
              ]}
              checkBoxName="HotelStyle"
            >
              {(item: string) => <p>{item}</p>}
            </CheckBoxOption>
          </div>
        </div>
      </div>

      <Modal isOpen={isShowsome} onClose={() => { setShowsome(false)}}
        styleContainer="w-full p-5 h-[calc(100vh-100px)] max-w-[700px] max-md:max-w-full max-md:h-[calc(100vh-100px)] max-md:h-full"
        parentContainerStyle="min-xl:hidden"
        styleButtonClose="cursor-pointer"
      >
        <div className="flex flex-col justify-between items-center w-full">
          <div className="ContentName font-bold text-3xl">Filter</div>
          <div
            className="SideFilter w-full flex flex-col justify-start items-center  p-5
      *:font-bold  *:border-gray-300 *:w-full gap-5 *:py-1 
"
          >
            <div className="OptionPrice">
              <p>Prices</p>
              <DualSlider />
            </div>
            <div className="flex w-full flex-col">
              <p className="text-md">Rating</p>
              <RadioOption
                handleChange={(valueStar: string | number) => {
                  toggleStar(Number(valueStar));
                  console.log(valueStar)
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
              </RadioOption>
            </div>

            <div className="w-full flex-1 flex flex-col gap-3 text-[20px]">
              <div className="flex w-full flex-col">
                <p className="text-md">Duration</p>
                <CheckBoxOption
                  handleChange={(value: string | number) => {
                    setDuration(String(value));
                  }}
                  arr={[
                    { id: "CheckBoxDuration1", value: "Up to 1 hour" },
                    { id: "CheckBoxDuration2", value: "1 to 4 hours" },
                    { id: "CheckBoxDuration3", value: "4 hours to day" },
                  ]}
                  checkBoxName="HotelClass"
                >
                  {(item: string) => <p>{item}</p>}
                </CheckBoxOption>
              </div>

              <div className="flex w-full flex-col">
                <p className="text-md">Product categories</p>
                <CheckBoxOption
                  handleChange={(value: string | number) => {
                    setCategories(String(value));
                  }}
                  arr={[
                    {
                      id: "checkBoxProductCategories1",
                      value: "Sightseeing Tours",
                    },
                    { id: "checkBoxProductCategories2", value: "City Tours" },
                    {
                      id: "checkBoxProductCategories3",
                      value: "Historical * Heritage Tours",
                    },
                    { id: "checkBoxProductCategories4", value: "Bus Tours" },
                    { id: "checkBoxProductCategories5", value: "Walking Tours" },
                    { id: "checkBoxProductCategories6", value: "Helicopter Tours" },
                    { id: "checkBoxProductCategories7", value: "Hop-On Hop-Off" },
                    { id: "checkBoxProductCategories8", value: "Night Tours" },
                    { id: "checkBoxProductCategories9", value: "Private Tours" },
                    {
                      id: "checkBoxProductCategories10",
                      value: "Skips-the-line Tours",
                    },
                    {
                      id: "checkBoxProductCategories11",
                      value: "Literary, Art & Music Tours",
                    },
                    { id: "checkBoxProductCategories12", value: "Multi-day Tours" },
                    { id: "checkBoxProductCategories13", value: "Movie-TVs Tours" },
                  ]}
                  checkBoxName="HotelStyle"
                >
                  {(item: string) => <p>{item}</p>}
                </CheckBoxOption>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isShowSort} onClose={() => { setShowSort(false) }}
        styleContainer={" rounded-none p-5 w-full h-[calc(100vh-100px)] max-w-[700px] max-md:max-w-full max-md:h-[calc(100vh-100px)] max-md:h-full"}
        styleButtonClose={"cursor-pointer"}
      >
         <div className="ContentName font-bold text-3xl">Sort</div>
        <div className="flex flex-col justify-between items-start w-full">
          <div className="sortOptions w-full flex flex-col gap-3">
            <RadioOption
              options={[
                { id: "sortOption1", value: "Price: Low to High" },
                { id: "sortOption2", value: "Price: High to Low" },
                { id: "sortOption3", value: "Rating: High to Low" },
                { id: "sortOption4", value: "Rating: Low to High" },
              ]} handleChange={(value) => { }} nameRadio="SortOptions"
              children={(value) => { return (<div>{value}</div>) }} />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 p-4 bottom-0 apply-reset self-end flex justify-between w-full *:w-[300px]">

            <div className="reset">
              <Button onClick={() => { }} className="w-full">
                Reset
              </Button>
            </div>

            <div className="apply">
              <Button onClick={() => { }} className="w-full">
                Apply
              </Button>
            </div>

          </div>
        </div>
      </Modal>
      <div
        className="SideResponsive hidden w-full justify-center items-center col-span-2 border border-gray-200 gap-2
        *:cursor-pointer
      max-xl:flex
      "
      >
        <div className=" w-full p-3 border-r border-gray-200 font-bold text-center" onClick={() => setShowsome(true)}>
          <i className="fa-solid fa-filter"></i> filter
        </div>
        <div className=" w-full p-3 font-bold text-center" onClick={() => setShowSort(true)}>
          <i className="fa-solid fa-sort"></i> Sort
        </div>
      </div>

      <div
        className="w-full py-3 gap-1 flex flex-col items-center 
      max-lg:w-full max-xl:col-span-2 p-3 "
      >
        <div className="flex justify-between items-center w-full">
          <div className="TotalSearch max-xl:w-full">
            Found <span className="font-bold">35</span> results
          </div>
          <div
            className="SortBy flex gap-2 items-center 
        max-xl:hidden"
          >
            <DropDownSelect
              icon={<FaSort />}
              onClick={() => { }}
              containerStyle="w-full"
              defaultOption="Sort by"
              options={[
                "Price: Low to High",
                "Price: High to Low",
                "Rating: High to Low",
                "Rating: Low to High",
              ]}
              styleOption="text-[clamp(1rem, 2.5vw, 2rem);] hover:bg-gray-200 hover:cursor-pointer"
              styleIcon="text-[clamp(1rem, 2.5vw, 2rem);]"
            />
          </div>
        </div>

        <div
          className=" flex flex-col max-lg:w-7/8 max-xl:col-span-2 gap-3 
        *:hover:shadow-md
        "
        >
          <div
            className="flex gap-3 justify-between rounded-xl border border-gray-200 
        max-lg:flex-col"
          >
            <div className="w-5/12 h-full relative max-lg:w-full">
              <img
                src="https://media.travel.com.vn/Destination/tf_240325115147_056953_Hoi%20An%20Ve%20Dem%20(3).jpg"
                alt=""
                srcSet=""
                className="min-md:rounded-l-xl max-sm:rounded-t-xl h-full w-full object-cover"
              />

              <HeartFavorite key={1} style=""/>
            </div>

            <div
              className="flex w-7/12 justify-between items-start h-full
             max-lg:flex-col max-lg:w-full p-5"
            >
              <div className="flex flex-col h-full w-full">
                <div className="NameTour pb-3">
                  <p className="line-clamp-2 text-2xl font-bold w-full ">
                    Đà Nẵng - Bà Nà - Cầu Vàng - Sơn Trà - Phố Cổ Hội An - La
                    Vang - Động Thiên Dường Và Động Phong Nha - Huế
                  </p>
                </div>
                <div
                  className="tag flex justify flex-wrap  gap-5 
                *:text-[clamp(1rem, 2.5vw, 2rem);]
                 *:min-w-60 max-xl:min-w-20"
                >
                  <div className="TourID">
                    <div className="flex gap-3 items-center">
                      <i className="fa-solid fa-ticket"></i>
                      <p>
                        <span className="font-semibold">Tour ID:</span>{" "}
                        NDKHASDK112
                      </p>
                    </div>
                  </div>

                  <div className="DeparturePoint">
                    <div className="flex gap-3 items-center">
                      <i className="fa-solid fa-location-dot"></i>
                      <p>
                        <span className="font-semibold">Departure point:</span>{" "}
                        TP. Hồ Chí Minh
                      </p>
                    </div>
                  </div>

                  <div className="TypeTour">
                    <div className="flex gap-3 items-center">
                      <i className="fa-regular fa-clock"></i>
                      <p>
                        <span className="font-semibold">Type Tour:</span> 4N3Đ
                      </p>
                    </div>
                  </div>

                  <div className="Vehicle">
                    <div className="flex gap-3 items-center">
                      <i className="fa-regular fa-paper-plane"></i>
                      <p>
                        <span className="font-semibold">Vehicle:</span> Máy bay
                      </p>
                    </div>
                  </div>
                </div>

                <div className="DateDeparture py-4 w-full">
                  <div className="flex gap-3 items-center">
                    <i className="fa-solid fa-calendar"></i>
                    <p>
                      <span className="font-semibold text-xl">
                        Date departure:
                      </span>
                    </p>
                  </div>
                  <div className="relative">
                    <ReusableSlider
                      items={items}
                      renderItem={renderItemDateDeparture}
                      containerClassName="w-full"
                      itemWrapperClassName="px-1 py-1 w-full"
                      sliderSettings={{
                        slidesToShow: 5,
                        dots: false,
                        autoplay: false,
                        infinite: false,
                        responsive: [
                          {
                            breakpoint: 1500,
                            settings: { slidesToShow: 5, slidesToScroll: 1 },
                          },
                          {
                            breakpoint: 1300,
                            settings: { slidesToShow: 4, slidesToScroll: 2 },
                          },
                          {
                            breakpoint: 1000,
                            settings: { slidesToShow: 3, slidesToScroll: 2 },
                          },
                          {
                            breakpoint: 768,
                            settings: { slidesToShow: 3, slidesToScroll: 1 },
                          },
                          {
                            breakpoint: 576,
                            settings: { slidesToShow: 2, slidesToScroll: 1 },
                          },
                        ],
                      }}
                    />
                  </div>
                </div>

                <div className="w-full flex max-xl:flex-col justify-between items-center">
                  <div className="price text-2xl max-xl:w-full flex flex-col ">
                    <span className="text-sm font-semibold italic">
                      Price:{" "}
                    </span>
                    <p className="font-bold text-black">9.000.000 VNĐ</p>
                  </div>

                  <div className="viewMore max-xl:w-full">
                    <Button className="rounded-md w-full" onClick={() => { nagative("/tours/123") }}>
                      View More
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
