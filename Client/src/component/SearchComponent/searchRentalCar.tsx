import React, { useEffect, useState } from "react";
import { Button } from "../ButtonComponent/Button";
import Passengers from "../SelectComponent/PassengersRentalCar";
import { Calendar_rentalCar } from "../calendar/CalendarRentalCar";
import { useCalendarCarStore } from "../../store/CalendarStore/calendar_car_store";
import { useTimeStore } from "../../store/time_store";
import { useNavigate } from "react-router-dom";

function SearchRental() {
  const navigate = useNavigate();

  const {
    setdateSelectedDropOff,
    setDateSelectedPickup,
    dateSelectedPickUp,
    dateSelectedDropOff,
    isDateSelectedDropOff,
    isDateSelectedPickUp,
    setIsDateSelectedDropOff,
    setIsDateSelectedPickUp,
    nextMonthDatesDropOff,
    nextMonthDatesPickUp,
    prevMonthDatesDropOFf,
    prevMonthDatesPickUp,
    datesPickUp,
    datesDropOff,
    setDatesDropOffFromDate,
    setDatesPickUpFromDate
  } = useCalendarCarStore();
  
  const {
    setTimeDropOffSelected,
    setTimePickUpTimeSelected,
    timeDropOffSelected,
    timePickUpTimeSelected,
  } = useTimeStore();

  const [passengers,setSelectedPassengers] = useState<string>("Select")
  const [isSelectedPassenger,setIsSelectedPassenger] = useState<boolean>(false)

  useEffect(()=>{
    const currentDay = new Date();
    setDateSelectedPickup(new Date(currentDay.getFullYear(),currentDay.getMonth(),currentDay.getDate()+1))
    setdateSelectedDropOff(new Date(currentDay.getFullYear(),currentDay.getMonth(),currentDay.getDate()+2))
  },[])


  return (
    <div className="flex justify-center items-center gap-2 flex-wrap w-8/10">
      <div className="flex gap-2 max-lg:w-3/4 flex-wrap max-xl:w-8/10">
        <div className="relative w-[300px] max-lg:w-full max-xl:w-full h-full flex justify-center items-center">
          <i className="fa-solid fa-plane-arrival absolute left-6"></i>
          <input
            type="text"
            placeholder={"rentalcar"}
            className="m-auto border border-gray-300 shadow-md rounded-md w-full p-4
                 max-sm:border-b
                 max-sm:pl-13 pl-13 max-sm:focus:border-blue-500 max-sm:focus:outline-0"
          />
        </div>
      </div>

      <div
        className="gap-2 relative flex items-center max-lg:flex-wrap max-lg:justify-center *:gap-3 max-lg:w-3/4 max-xl:w-8/10 "
      >
        <div className="w-full flex items-center justify-center gap-3 max-sm:flex-wrap *:border *:w-full *:p-4 *:flex *:items-center *:gap-3 *:rounded-md *:min-xl:min-w-48">
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
            <div className="DCI">
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
              className={`bg-white absolute w-[400px] top-14 left-0 p-5 border border-gray-300 rounded-2xl z-10
      max-lg:left-full max-2xl:left-0 ${isDateSelectedPickUp ? "" : "hidden"}`}
            >
              <Calendar_rentalCar
                titleTypeSeletedDate="Pick Up"
                type="rentalCar"
                dates={datesPickUp}
                dateSelected={dateSelectedPickUp}
                onSelected={(date: Date) => {
                  setDateSelectedPickup(date);
                }}
                selectTime={timePickUpTimeSelected}
                setSelectTime={(time: string) => {
                  setTimePickUpTimeSelected(time);
                }}
                nextMonth={nextMonthDatesPickUp}
                prevMonth={nextMonthDatesDropOff}
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
            <div className="DCI">
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
              className={`bg-white absolute w-[400px] top-14 left-0 p-5 border border-gray-300 rounded-2xl z-10
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
                selectTime={timeDropOffSelected}
                setSelectTime={(time: string) => {
                  setTimeDropOffSelected(time);
                }}
                nextMonth={nextMonthDatesDropOff}
                prevMonth={prevMonthDatesDropOFf}
              />
            </div>
          </div>
        </div>

        <div className="roomAndGuest relative border p-4 pr-8 flex items-center gap-3 rounded-md max-lg:w-full *:min-xl:min-w-10"
            onClick={(e)=>{
              e.stopPropagation()
              setIsSelectedPassenger(true)
              setIsDateSelectedPickUp(false);
              setIsDateSelectedDropOff(false);

            }}
        >
          <i className="fa-solid fa-users"></i>
          <div className="RAG">
            <p className="text-[13px] font-bold min-w-23"> {passengers=="1"?`${passengers} passenger`:passengers=="Select"?`passenger`:`${passengers} passengers`}</p>
          </div>
          <div
            className={`bg-white absolute top-14 left-0 w-full border border-gray-300 z-10 rounded-md ${isSelectedPassenger ? "" : "hidden"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Passengers setSelectedPassengers={setSelectedPassengers} setIsSelectedPassenger={setIsSelectedPassenger}/>
          </div>
        </div>
      </div>

      <Button
        className="p-4 w-[150px] max-lg:w-3/4 max-xl:w-8/10 max-2xl:w-11/12"
        onClick={() => {
          navigate("/rentalcar")
        }}
      >
        Search
      </Button>
    </div>
  );
}

export default SearchRental;
