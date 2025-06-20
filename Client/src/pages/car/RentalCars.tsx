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
import small_car from "../../assets/small_car.jpg";
import medium_car from "../../assets/medium_car.jpg";
import large_car from "../../assets/large_car.jpg";
import SUV from "../../assets/SUV.jpg";
import wild from "../../assets/wild_card.jpg";
import { useCalendarCarStore } from "../../store/calendar_car_store"; // <-- Add this import
import Passengers from "../../component/travelers_quantity/passengers";
import { Calendar_rentalCar } from "../../component/calendar/calendar_rentalCar";
import { useTimeStore } from "../../store/time_store";
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
     setIsDropOffTimeSelected,
     setIsPickUpTimeSelected,
     setTimeDropOffSelected,
     setTimePickUpTimeSelected,
     isDropOffTimeSelected,
     isPickUpTimeSelected,
     timeDropOffSelected,
     timePickUpTimeSelected,
   } = useTimeStore();

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
  const [favorite, setFavorite] = useState(false);
  const [showRoomAndGuest, setShowRoomAndGuest] = useState(false);

  console.log(selectedAmenities);
  console.log(style);
  console.log(hotelClasses);
  console.log(selectedRating);
  console.log(selectedStars);
  console.log(maxPrice);
  console.log(minPrice);
  useEffect(() => {
    setMaxPrice(100);
    setMinPrice(0);
  }, []);

    const {
      datesPickUp,
      setdateSelectedDropOff,
      setDateSelectedPickup,
      dateSelectedPickUp,
      dateSelectedDropOff,
      nextMonthDatesDropOff,
      nextMonthDatesPickUp,
      isDateSelected,
      isDateSelectedDropOff,
      isDateSelectedPickUp,
      setIsDateSelectedDropOff,
      setIsDateSelectedPickUp,
      prevMonthDatesDropOFf,
      prevMonthDatesPickUp,
      datesDropOff,
      setDatesDropOffFromDate,
      setDatesPickUpFromDate
    } = useCalendarCarStore();

      const [passengers,setSelectedPassengers] = useState<string>("Select")
      const [isSelectedPassenger,setIsSelectedPassenger] = useState<boolean>(false)


  return (
    <div className="w-3/4 max-xl:w-full grid grid-cols-[250px_1fr] justify-items-center gap-2 bg-white p-3 mb-40">
      <div className="NameLocation col-span-2 mt-6 w-full">
        <p className="text-[max(3vw,30px)] font-bold text-center">
          Your place you want to go
        </p>
      </div>
      <div className="findTab max-md:w-3/4 w-full gap-1 flex col-span-2 justify-center items-center inset-shadow-2xs py-4 pb-7 border-b border-gray-300 ">
        <div className="flex flex-col w-full border-r border-gray-200 p-2 max-lg:hidden">
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

        <div className="w-3/5 gap-2 relative flex justify-start items-center self-end max-2xl:flex-wrap max-lg:justify-center max-lg:2/5 max-sm:w-full max-md:w-7/8">
          {/* <div
            className="CheckInBlock relative flex justify-evenly items-center p-1.5 w-full gap-3 border border-gray-300 rounded-2xl shadow-sm"
            onClick={(e) => {
              e.stopPropagation();
              setShowCheckIn(!showCheckIn);
            }}
          >
            <i className="fa-solid fa-calendar"></i>
            <div className="DCI text-center min-md:min-w-52 ">
              <p className="text-[10px]">Pick up - Drop off</p>
              <p className="text-[13px] font-bold">
                {formatDate(dateSelectedBook)} -{" "}
                {formatDate(dateSelectedCheckOut)}
              </p>

              <div
                className={`bg-white absolute w-[700px] top-[350px] left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 border border-gray-300 rounded-2xl z-10
      max-lg:left-full max-2xl:left-0 ${showCheckIn ? "" : "hidden"}`}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Calendar_Hotel />
              </div>
            </div>
            <i className="fa-solid fa-caret-down"></i>
          </div> */}

           <div className="w-full flex items-center justify-center gap-3 max-sm:flex-wrap *:border *:w-full *:p-1 *:flex *:items-center *:gap-3 *:rounded-md *:min-xl:min-w-48">
                    <div
                      className="CheckInBlock border"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDateSelectedPickUp(!isDateSelectedPickUp);
                        setIsDateSelectedDropOff(false);
                        setIsSelectedPassenger(false)
                        setDatesPickUpFromDate(dateSelectedPickUp)
                      }}
                    >
                      <i className="fa-solid fa-calendar"></i>
                      <div className="DCI flex flex-col justify-center w-full">
                        <p className="text-[10px] font-normal">Pick up</p>
                        <p className="text-[13px] font-bold">
                          {" "}
                          {dateSelectedPickUp.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          }) +
                            " - " +
                            timePickUpTimeSelected}
                        </p>
                      </div>
                      <div
                        className={`bg-white absolute w-[400px] top-14 left-0 p-5 border border-gray-300 rounded-md z-10
                max-lg:left-full max-2xl:left-0 ${isDateSelectedPickUp ? "" : "hidden"}`}
                      >
                                   <Calendar_rentalCar
                                   titleTypeSeletedDate="Pick Up"
                                     type="rentalCar"
                                     dates={datesPickUp} // Provide the appropriate dates array here
                                     dateSelected={dateSelectedPickUp}
                                     dateEndSelected={dateSelectedDropOff}
                                     onSelected={(date: Date) => {
                                       setDateSelectedPickup(date);
                                     }}
                                     selectTime={timePickUpTimeSelected}
                                     setSelectTime={(time: string) => {
                                       setTimePickUpTimeSelected(time);
                                     }}
                                     nextMonth={nextMonthDatesPickUp}
                                     prevMonth={prevMonthDatesPickUp}
                                   />
                      </div>
                    </div>
          
                    <div
                      className="CheckInBlock relative"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDateSelectedDropOff(!isDateSelectedDropOff);
                        setIsDateSelectedPickUp(false);
                        setIsSelectedPassenger(false);
                        setDatesDropOffFromDate(dateSelectedDropOff)
                      }}
                    >
                      <i className="fa-solid fa-calendar"></i>
                      <div className="DCI flex flex-col justify-center w-full">
                        <p className="text-[10px] font-normal">Drop off</p>
                        <p className="text-[13px] font-bold">
                          {dateSelectedDropOff.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          }) +
                            " - " +
                            timeDropOffSelected}
                        </p>
                      </div>
          
                      <div
                        className={`bg-white absolute w-[400px] top-14 p-5 border border-gray-300 rounded-md z-10
                max-lg:left-full max-2xl:left-0 ${isDateSelectedDropOff ? "" : "hidden"}`}
                      >
                                   <Calendar_rentalCar
                                   titleTypeSeletedDate="Drop Off"
                                      type="rentalCar"
                                      dates={datesDropOff}
                                      dateSelected={dateSelectedDropOff}
                                      onSelected={(date: Date) => {
                                        setdateSelectedDropOff(date);
                                      }}
                                      dateEndSelected={dateSelectedDropOff}
                                      selectTime={timePickUpTimeSelected}
                                      setSelectTime={(time: string) => {
                                        setTimeDropOffSelected(time);
                                      }}
                                      nextMonth={nextMonthDatesDropOff}
                                      prevMonth={prevMonthDatesDropOFf}
                                    />
                      </div>
                    </div>
                  </div>
         <div className="roomAndGuest relative border p-1 pr-8 flex items-center gap-3 max-lg:w-full w-full rounded-md"
            onClick={(e)=>{
              e.stopPropagation()
              setIsSelectedPassenger(!isSelectedPassenger);
              setIsDateSelectedPickUp(false);
              setIsDateSelectedDropOff(false);
            }}
        >
          <i className="fa-solid fa-users"></i>
          <div className="RAG flex flex-col justify-center items-start">
            <p className="text-[10px] font-normal">passenger</p>
            <p className="text-[13px] font-bold min-w-23"> {passengers=="1"?`${passengers} passenger`:passengers=="Select"?`passenger`:`${passengers} passengers`}</p>
          </div>
          <div
            className={`bg-white w-full absolute top-[238px] left-1/2 -translate-x-1/2 -translate-y-1/2 border border-gray-300 z-10 rounded-2xl ${isSelectedPassenger ? "" : "hidden"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Passengers setSelectedPassengers={setSelectedPassengers} setIsSelectedPassenger={setIsSelectedPassenger}/>
          </div>
        </div>

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
      <div className="w-full hidden max-lg:flex justify-center items-center col-span-2 gap-3 max-sm:flex-wrap">
        <div className="filter border border-gray-300 rounded-2xl p-2 w-full max-w-3xl flex justify-between items-center">
          <div className="text-center w-full"><i className="fa-solid fa-filter"></i> filter</div>
        </div>
        <div className="sort border border-gray-300 rounded-2xl p-2 w-full max-w-3xl flex justify-between items-center">
          <div className="text-center w-full"><i className="fa-solid fa-sort"></i> sort</div>
        </div>
      </div>

      <div className="sideFilter max-lg:hidden flex flex-col justify-start items-center font-bold w-full gap-5 py-1 ">
        <div className="OptionPrice w-full">
          <p>Prices</p>
          <SliderRange />
        </div>

        <div className="w-full flex-1 flex flex-col gap-3 *:border-t *:border-gray-300 *:pt-3">
          <div className="traverSelected relative flex gap-3 flex-col">
            <div className="py-1">Capacity</div>
            <div className="flex justify-between items-center gap-3">
              <div>
                <p className="text-sm font-semibold">passengers</p>
              </div>
              <div className="flex w-full gap-1 items-center justify-end">
                <div className="minus p-1 bg-black text-white cursor-pointer"><i className="fa-solid fa-minus"></i></div>
                <div className="content p-2 ">4</div>
                <div className="add p-1 bg-black text-white cursor-pointer"><i className="fa-solid fa-plus"></i></div>
              </div>
            </div>

               <div className="flex justify-between items-center gap-3">
              <div>
                <p className="text-sm font-semibold">Bags</p>
              </div>
              <div className="flex w-full gap-1 items-center justify-end">
                <div className="minus p-1 bg-black text-white cursor-pointer"><i className="fa-solid fa-minus"></i></div>
                <div className="content p-2 ">4</div>
                <div className="add p-1 bg-black text-white cursor-pointer"><i className="fa-solid fa-plus"></i></div>
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
        <div className="filter-tag flex justify-between items-center p-1 rounded-2xl w-full">
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
        </div>

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
                src={wild}
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
