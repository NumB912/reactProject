import React, { useEffect, useState } from "react";
import { useCalendarCarStore } from "../../store/CalendarStore/calendar_car_store";
import {
  isToday,
  isSameDay,
  DaysOfMonth,
  getDateHandle,
} from "../../utils/TimeHandle";
import { useTimeStore } from "../../store/time_store";
import Calendar_OneMonth_Timer from "./CalendarBase/Calendar_OneMonthWithTime";
import { CalendarOneMonthWithTimer } from "./interfaceCalendar/CalendarBaseProps";
import { usePassengerCar } from "../../store/PassengerStore/PassengerRentalCarStore";
import CalendarParent from "../DropDownComponent/DropDownOutLineItem";
import DropDownOutLineItem from "../DropDownComponent/DropDownOutLineItem";
 const CalendarRentalCar = () => {
 const {setIsSelectedPassenger} = usePassengerCar()
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
      setDatesPickUpFromDate,
      timePickUpSelected,
      timeDropOffSelected,
      setTimeDropOffSelected,
      setTimePickUpTimeSelected,
      SetToday
    } = useCalendarCarStore();

  useEffect(()=>{
    const currentDay = new Date();
    setDateSelectedPickup(new Date(currentDay.getFullYear(),currentDay.getMonth(),currentDay.getDate()+1))
    setdateSelectedDropOff(new Date(currentDay.getFullYear(),currentDay.getMonth(),currentDay.getDate()+2))
  },[])

  return (
        <div className="w-full flex items-center justify-center gap-3 max-sm:flex-wrap ">
          <DropDownOutLineItem handleOnClick={() => {
              setIsDateSelectedPickUp(!isDateSelectedPickUp);
              setIsDateSelectedDropOff(false);
              setIsSelectedPassenger(false)
              setDatesPickUpFromDate(dateSelectedPickUp)
            }}>

            <i className="fa-solid fa-calendar"></i>
            <div className="DCI" >
              <p className="text-[10px] font-semibold">Pick up</p>
              <p className="text-[13px] font-bold">
                {dateSelectedPickUp.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                }) +
                  " - " +
                  timePickUpSelected}
              </p>
            </div>
            <div
              className={`bg-white absolute w-[400px] top-15 left-0 p-5 border border-gray-300 rounded-2xl z-10
      max-lg:left-full max-2xl:left-0 ${isDateSelectedPickUp ? "" : "hidden"}`}
      onClick={(e)=>{e.stopPropagation()}}
            >
              <Calendar_OneMonth_Timer
                dateSelected={dateSelectedPickUp}
                dateStartSelected={dateSelectedPickUp}
                dateEndSelected={dateSelectedDropOff}
                titleTypeSeletedDate="Pick up"
                dates={datesPickUp}
                nextMonth={nextMonthDatesPickUp}
                prevMonth={prevMonthDatesPickUp}
                type="rentalCar"
                selectTime={timePickUpSelected}
                onSelected={setDateSelectedPickup}
                setSelectTime={setTimePickUpTimeSelected}
                onSetToday={SetToday}
              />
            </div>
          </DropDownOutLineItem>


                <DropDownOutLineItem handleOnClick={()=>{  setIsDateSelectedDropOff(!isDateSelectedDropOff);
              setIsDateSelectedPickUp(false);
              setIsSelectedPassenger(false);  
              setDatesDropOffFromDate(dateSelectedDropOff)}}>
       
            <i className="fa-solid fa-calendar"></i>
            <div className="DCI">
              <p className="text-[10px] font-semibold">Drop off</p>
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
              className={`bg-white absolute w-[400px] top-15 left-0 p-5 border border-gray-300 rounded-2xl z-10
      max-lg:left-full max-2xl:left-0 ${isDateSelectedDropOff ? "" : "hidden"}`}
                onClick={(e)=>e.stopPropagation()}
            >
             <Calendar_OneMonth_Timer
                titleTypeSeletedDate="Drop Off"
                type="rentalCar"
                dates={datesDropOff}
                dateStartSelected={dateSelectedPickUp}
                dateEndSelected={dateSelectedDropOff}
                dateSelected={dateSelectedDropOff}
                onSelected={setdateSelectedDropOff}
                selectTime={timeDropOffSelected}
                setSelectTime={setTimeDropOffSelected}
                nextMonth={nextMonthDatesDropOff}
                prevMonth={prevMonthDatesDropOFf}
                onSetToday={SetToday}
              />
            </div>
                </DropDownOutLineItem>
        </div>

  );
};

export default CalendarRentalCar