import React, { useEffect, useState } from "react";
import SideBarFilter from "../../component/SIdeBarFilter/filterSide";
import RatingStar from "../../component/SIdeBarFilter/OptionType/OptionMaterial/StarRatingRadioOption";
import { Link } from "react-router";
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
import HeartFavorite from "../../component/Favorite/HeartFavorite";
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
  const [price, setPrice] = useState(0);
     const [showRoomAndGuest, setShowRoomAndGuest] = useState(false);

  const {
    dateSelectedBook,
    dateSelectedCheckOut,
    isSelectedCheckOut,
    isSelectedBook,
    datesBook,
    datesNextMonth,
    setDateSelectedBook,
    setDateSelectedCheckOut,
    prevMonth,
    nextMonth
  } = useCalendarHotel();

  const { roomQuantity, total } = useTravelerHotel();

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

  const [showCheckIn, setShowCheckIn] = useState(false);
  useEffect(()=>{
    setMaxPrice(100)
    setMinPrice(0)
  },[])

  return (
    <div className="w-3/4 max-md:w-11/12 grid grid-cols-[200px_1fr] justify-items-center gap-2 bg-white p-3 mb-40">
      <div className="NameLocation col-span-2 mt-6 w-full">
        <p className="text-[max(3vw,30px)] font-bold text-center">
          Your place you want to go
        </p>
      </div>
      <div className="findTab w-full gap-1 flex col-span-2 justify-center items-center inset-shadow-2xs py-4 pb-7 border-b border-gray-300 ">
        <div className="flex flex-col w-2/5 border-r border-gray-200 p-2 max-lg:hidden ">
          <p className="text-[15px] font-bold px-2">Location:</p>

          <div className="relative flex items-center">
            <input
              type="text"
              className="bg-white p-2  w-full"
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

        <div
          className="w-3/5 gap-2 relative flex justify-start items-center self-end max-sm:flex-wrap max-lg:justify-center
        *:flex *:justify-evenly *:items-center *:p-1.5 *:w-full *:gap-3 *:border *:border-gray-300 *:rounded-2xl max-lg:w-full *:max-md:w-3/4 *:max-sm:w-full *:shadow-sm"
        >
            <Calendar_Hotel/>
          <div
            className="roomAndGuest"
            onClick={(e) => {
              setShowRoomAndGuest(!showRoomAndGuest);
            }}
          >
            <i className="fa-solid fa-users"></i>
            <div className="RAG max-md:min-w-60 text-center max-sm:min-w-50">
              <p className="text-[10px]">Room/Guests</p>
              <p className="text-[13px] font-bold">{`${
                roomQuantity > 1
                  ? `${roomQuantity} rooms`
                  : `${roomQuantity} room`
              } ,${total > 1 ? `${total} guests` : `${total} guest`}`}</p>
            </div>
            <i className="fa-solid fa-caret-down"></i>

            <div
              className={`bg-white absolute top-[62px] border border-gray-300 rounded-2xl z-10 ${
                showRoomAndGuest ? "" : "hidden"
              }`}
            >
              <Traveler_Hotel onClose={setShowRoomAndGuest} />
            </div>
          </div>
        </div>
      </div>

      <div className="sideFilter max-lg:hidden w-full flex flex-col justify-start items-center *:font-bold *:border-t *:border-gray-300 *:w-full gap-5 *:py-1 ">
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
              {(item:string)=><p>{item}</p>}

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
                {(item:string)=><p>{item}</p>}
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
                {(item:string)=><p>{item}</p>}
            </CheckBoxOption>
          </div>
        </div>
      </div>

      <div className="w-full py-3 gap-1 flex flex-col max-lg:w-full max-lg:col-span-2 p-3 ">
        <div className="filter-tag flex justify-between items-center p-1 rounded-2xl">
          <div className="flex gap-2 *:p-1.5 *:border *:rounded-3xl *:text-[10px] *:font-bold *:border-gray-400 *:max-sm:hidden">
            <div className="tag">
              <p>Free wifi</p>
            </div>
            <div className="tag">
              <p>Free Parking</p>
            </div>
            <div className="tag">
              <p>Free Lunch</p>
            </div>
            <div className="tag">
              <RatingStar stars={4} />
            </div>
          </div>

          <div className="Filter-tool *:p-1.5 *:border *:rounded-3xl *:text-[10px] *:font-bold *:border-gray-400 min-lg:hidden">
            <Link to="#">
              <i className="fa-solid fa-filter"></i> Filter
            </Link>
          </div>
        </div>

        <div className="*:hover:shadow-md flex flex-col max-lg:w-full max-lg:col-span-2 p-3 gap-3">
          <div
            className="flex gap-3 justify-between rounded-xl border border-gray-200 
        max-sm:flex-col"
          >
            <div className="w-3/12 h-full max-sm:w-full relative">
              <img
                src="https://ik.imagekit.io/tvlk/apr-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/69000000/68120000/68113000/68112922/50b4deb1_z.jpg?_src=imagekit&tr=dpr-2,c-at_max,f-jpg,fo-auto,h-332,pr-true,q-80,w-480"
                alt=""
                srcSet=""
                className="w-full min-sm:rounded-l-xl max-sm:rounded-t-xl min-sm:aspect-square"
              />
            <HeartFavorite />
            </div>

            <div className="flex w-9/12 justify-between items-start h-full p-1.5 max-sm:flex-col max-sm:w-full max-sm:*:w-full">
              <div className="w-9/12 *:text-[13px] text-gray-600">
                <p className="font-bold w-full text-black text-[16px]">
                  1. Marriott New York JFK Airport
                </p>
                <div className="starRating *:mr-1.5">
                  <span>4.5</span>
                  <RatingStar stars={5} />
                  <span>(503 Reviews)</span>
                </div>
                <p className="">
                  <i className="fa-solid fa-location-dot"></i> Thailand
                </p>
                <div className="amenties overflow-hidden">
                  <p>
                    <i className="fa-solid fa-check"></i> Free wifi
                  </p>
                  <p>
                    <i className="fa-solid fa-check"></i> Breakfast & lunch
                  </p>
                </div>
                <div className="mention overflow-hidden">
                  <p>
                    <i className="fa-solid fa-check"></i> Mention: Budget
                  </p>
                </div>
              </div>

              <div className=" w-3/12 flex flex-col items-end justify-between h-full text-center">
                <p className="font-bold text-2xl p-3">300$</p>
                <Link
                  to="/hotels/123"
                  className="p-2 w-8/10 bg-black rounded-xl text-white font-bold text-[10px] max-sm:w-full"
                >
                  View Hotel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <>
    //   <Calendar_base
    //     dateSelected={dateSelectedBook}
    //     dates={datesBook}
    //     dateSelectedCheckOut={dateSelectedCheckOut}
    //     nextMonthDates={datesNextMonth}
    //     onSelected={setDateSelectedBook}
    //     onSelectedCheckOut={setDateSelectedCheckOut}
    //     nextMonth={() => {}} 
    //     prevMonth={() => {}}
    //     type="hotel"
    //   />
    // </>
  );
};

export default Hotels;
