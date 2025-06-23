import React, { useEffect, useState } from "react";
import SideBarFilter from "../../component/SIdeBarFilter/filterSide";
import RatingStar from "../../component/SIdeBarFilter/OptionType/OptionMaterial/StarRatingRadioOption";
import { Link, useNavigate } from "react-router";
import Calendar_Hotel from "../../component/calendar/calendar_hotel";
import { useCalendarHotel } from "../../store/calendar_hotel_store";
import { formatDate } from "../../utils/TimeHandle";
import Traveler_Hotel from "../../component/travelers_quantity/traveler_hotel";
import useTravelerHotel from "../../store/traveler_store_hotel";
import { FilterItem } from "../../model/interface/interface_filter";
import { useHotelFilter } from "../../store/filter_store";
import CheckBoxOption from "../../component/SIdeBarFilter/OptionType/CheckBoxOption";
import RadioOption from "../../component/SIdeBarFilter/OptionType/RadioOption";
import SliderRange from "../../component/sliderRange/sliderRange";
import Button from "../../component/Button";
import { useTourCalendar } from "../../store/calendar_tour_store";
import { useTourFilter } from "../../store/filter_tour_store";
import Calendar_Tour from "../../component/calendar/calendar_tour";
import ReusableSlider from "../../component/Slider/SliderComponent";
const Hotels = () => {
  const [price, setPrice] = useState(0);

  const {
    dateSelectedBook,
    dateSelectedCheckOut,
    isSelectedCheckOut,
    isSelectedBook,
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

  const navigate = useNavigate()

  const [showCheckIn, setShowCheckIn] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setMaxPrice(100);
    setMinPrice(0);
  }, []);

  const items: String[] = [
    "10/2",
    "20/3",
    "12/12",
    "13/4",
    "30/4",
    "10/3"
  ]

  const renderItemDateDeparture = (item) => {
    return (
      <div className="border-2 border-black w-full p-1.5 text-center font-bold rounded-md">
        <p>{item}</p>
      </div>)
  }

  return (
    <div className="w-8/10 max-md:w-full grid grid-cols-[250px_1fr] justify-items-center gap-2 bg-white p-3 mb-40">
      <div className="NameLocation col-span-2 mt-6 w-full">
        <p className="text-[max(3vw,30px)] font-bold text-center">
          Your place you want to go
        </p>
      </div>
      <div className="findTab w-full gap-1 flex col-span-2 justify-center items-center inset-shadow-2xs py-4 border-b border-gray-300 ">
        <div
          className="w-full gap-2 relative flex justify-start items-center self-end max-sm:flex-wrap max-lg:justify-center
        *:flex *:justify-evenly *:items-center *:p-1.5 *:gap-3 *:border *:border-gray-300 *:rounded-2xl max-lg:w-full *:max-md:w-3/4 *:max-sm:w-full *:shadow-sm"
        >
          <div
            className="CheckInBlock relative"
            onClick={(e) => {
              e.stopPropagation();
              setShowCheckIn(!showCheckIn);
            }}
          >
            <i className="fa-solid fa-calendar"></i>
            <div className="DCI text-center max-md:min-w-60 min-md:min-w-52 max-sm:min-w-50">
              <p className="text-[10px]">Check In - Check Out</p>
              <p className="text-[13px] font-bold">
                {formatDate(dateSelectedBook)} -{" "}
                {formatDate(dateSelectedCheckOut)}
              </p>

              <div
                className={`bg-white absolute w-[700px] top-[350px] left-full -translate-x-1/2 -translate-y-1/2 p-5 border border-gray-300 rounded-2xl z-10
      max-lg:left-full max-2xl:left-0 ${showCheckIn ? "" : "hidden"}`}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Calendar_Tour />
              </div>
            </div>
            <i className="fa-solid fa-caret-down"></i>
          </div>
        </div>
      </div>

      <div className="sideFilter w-full flex flex-col justify-start items-center 
      bg-gray-50 p-5
      *:font-bold  *:border-gray-300 *:w-full gap-5 *:py-1 max-xl:hidden">
        <div className="OptionPrice">
          <p>Prices</p>
          <SliderRange />
        </div>
        <div className="flex w-full flex-col">
          <p className="text-md">Rating</p>
          <RadioOption
            handleChange={(valueStar: string | number) => {
              toggleStar(Number(valueStar));
            }}
            arr={[
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
                { id: "checkBoxProductCategories1", value: "Sightseeing Tours" },
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
                { id: "heckBoxProductCategories10", value: "Skips-the-line Tours" },
                { id: "heckBoxProductCategories11", value: "Literary, Art & Music Tours" },
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
      <div className=" hidden max-xl:flex w-full justify-center items-center col-span-2 border border-gray-200 gap-2">
              <div className=" w-full p-3 border-r border-gray-200 font-bold text-center"><i className="fa-solid fa-filter"></i> filter</div>
              <div className=" w-full p-3 font-bold text-center"><i className="fa-solid fa-sort"></i> Sort</div>
      </div>
      <div className="w-full py-3 gap-1 flex flex-col items-center max-lg:w-full max-xl:col-span-2 p-3 ">

        <div className="*:hover:shadow-md flex flex-col max-lg:w-7/8 max-xl:col-span-2 gap-3">
          <div
            className="flex gap-3 justify-between rounded-xl border border-gray-200 
        max-lg:flex-col"
          >
            <div className="w-5/12 h-full relative max-lg:w-full">
              <img
                src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/99/65/58/caption.jpg?w=800&h=600&s=1"
                alt=""
                srcSet=""
                className="min-md:rounded-l-xl max-sm:rounded-t-xl h-full w-full object-cover"
              />

              <div
                className="flex bg-white p-2 items-center justify-center absolute top-0 right-0 m-1 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  setFavorite(!favorite);
                }}
              >
                {favorite ? (
                  <i className="fa-solid fa-heart text-red-500"></i>
                ) : (
                  <i className="fa-regular fa-heart"></i>
                )}
              </div>
            </div>

            <div className="flex w-7/12 justify-between items-start h-full max-lg:flex-col max-lg:w-full p-5">
              <div className="flex flex-col h-full w-full">
                <div className="NameTour pb-3">
                  <p className="line-clamp-2 text-2xl font-bold w-full ">Đà Nẵng - Bà Nà - Cầu Vàng - Sơn Trà - Phố Cổ Hội An - La Vang - Động Thiên Dường Và Động Phong Nha - Huế</p>
                </div>
                <div className="tag flex justify flex-wrap *:text-md gap-5 *:min-w-60 max-xl:min-w-20">

                  <div className="TourID">
                    <div className="flex gap-3 items-center">
                      <i className="fa-solid fa-ticket"></i>
                      <p><span className="font-semibold">Tour ID:</span> NDKHASDK112</p>
                    </div>
                  </div>

                  <div className="DeparturePoint">
                    <div className="flex gap-3 items-center">
                      <i className="fa-solid fa-location-dot"></i>
                      <p><span className="font-semibold">Departure point:</span> TP. Hồ Chí Minh</p>
                    </div>
                  </div>

                  <div className="TypeTour">
                    <div className="flex gap-3 items-center">
                     <i className="fa-regular fa-clock"></i>
                      <p><span className="font-semibold">Type Tour:</span> 4N3Đ</p>
                    </div>
                  </div>

                  <div className="Vehicle">
                    <div className="flex gap-3 items-center">
                      <i className="fa-regular fa-paper-plane"></i>
                      <p><span className="font-semibold">Vehicle:</span> Máy bay</p>
                    </div>
                  </div>


                </div>


                <div className="DateDeparture py-4 w-full">
                  <div className="flex gap-3 items-center">
                    <i className="fa-solid fa-calendar"></i>
                    <p><span className="font-semibold text-xl">Date departure:</span></p>
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
                          { breakpoint: 1500, settings: { slidesToShow: 5, slidesToScroll: 1 } },
                          { breakpoint: 1300, settings: { slidesToShow: 4, slidesToScroll: 2 } },
                          { breakpoint: 1000, settings: { slidesToShow: 3, slidesToScroll: 2 } },
                          { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 1 } },
                          { breakpoint: 576, settings: { slidesToShow: 2, slidesToScroll: 1 } },
                        ]
                      }}
                    />
                  </div>


                </div>

                <div className="w-full flex max-xl:flex-col justify-between items-center">
                  <div className="price text-2xl max-xl:w-full flex flex-col">
                    <span className="text-sm font-semibold italic">Price: </span>
                    <p className="font-bold text-black">9.000.000 VNĐ</p>
                  </div>

                  <div className="viewMore max-xl:w-full">
                    <Button className="rounded-md w-full" onClick={() => { }}>
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
