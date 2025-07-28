import React, { useEffect, useState } from "react";
import { useCalendarCarStore } from "../../store/CalendarStore/CalendarRentalCarStore";
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
import CalendarParent from "../DropDownComponent/WrapDropDownOutLineItem";
import DropDownOutLineItem from "../DropDownComponent/WrapDropDownOutLineItem";
import WrapDropDownOutLineItem from "../DropDownComponent/WrapDropDownOutLineItem";
import DropDownContent from "../DropDownComponent/DropDownContent";
const CalendarRentalCar = () => {
  const { setIsSelectedPassenger } = usePassengerCar();
  const {
    datesPickUp,
    setdateSelectedDropOff,
    setDateSelectedPickup,
    dateSelectedPickUp,
    dateSelectedDropOff,
    nextMonthDatesDropOff,
    nextMonthDatesPickUp,
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
    SetToday,
  } = useCalendarCarStore();

  useEffect(() => {
    const currentDay = new Date();
    setDateSelectedPickup(
      new Date(
        currentDay.getFullYear(),
        currentDay.getMonth(),
        currentDay.getDate() + 1
      )
    );
    setdateSelectedDropOff(
      new Date(
        currentDay.getFullYear(),
        currentDay.getMonth(),
        currentDay.getDate() + 2
      )
    );
  }, []);

  const [isPickUp,setIsPickUp] = useState<boolean>(false);
  const [isDropOff,setIsDropOff] = useState<boolean>(false);

  return (
    <div className="w-full flex gap-2 max-sm:flex-wrap">
      <WrapDropDownOutLineItem
        handleClickOutSide={() => {
          setIsPickUp(false)
        }}
        handleShow={()=>{
          setIsPickUp(!isPickUp)
          setDatesPickUpFromDate(dateSelectedPickUp);
        }}
      >
        <i className="fa-solid fa-calendar"></i>
        <div className="DCI">
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
        <DropDownContent isOpen={!!isPickUp} className="bg-white absolute w-[400px] top-15 left-0 p-5 border border-gray-300 rounded-2xl z-10">

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

        </DropDownContent>
      </WrapDropDownOutLineItem>

      <WrapDropDownOutLineItem
        handleClickOutSide={() => {
          setIsDropOff(false)
        }}
        handleShow={()=>{
          setIsDropOff(!isDropOff)!
          setDatesDropOffFromDate(dateSelectedDropOff);
        }}
      >
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

        <DropDownContent isOpen={!!isDropOff} className="bg-white absolute w-[400px] top-15 left-0 p-5 border border-gray-300 rounded-2xl z-10">
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
        </DropDownContent>
      </WrapDropDownOutLineItem>
    </div>
  );
};

export default CalendarRentalCar;
