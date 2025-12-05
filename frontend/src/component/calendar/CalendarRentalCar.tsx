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
import CalendarParent from "../dropdown-component/WrapDropDownOutLineItem";
import DropDownOutLineItem from "../dropdown-component/WrapDropDownOutLineItem";
import WrapDropDownOutLineItem from "../dropdown-component/WrapDropDownOutLineItem";
import DropDownContent from "../dropdown-component/DropDownContent";

const CalendarRentalCar = () => {
  const {
    datesPickUp,
    setdateSelectedDropOff,
    setDateSelectedPickup,
    dateSelectedPickUp,
    dateSelectedDropOff,
    nextMonthDatesDropOff,
    nextMonthDatesPickUp,
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
  const [isPickUp, setIsPickUp] = useState<boolean>(false);
  const [isDropOff, setIsDropOff] = useState<boolean>(false);
  return (
    <div className={`w-full flex gap-2 max-sm:flex-wrap`}>
      <WrapDropDownOutLineItem
        handleClickOutSide={() => {
          setIsPickUp(false);
        }}
        handleShow={() => {
          setIsPickUp(!isPickUp);
          setDatesPickUpFromDate(dateSelectedPickUp);
        }}
        className="w-full"
      >
        <i className="fa-solid fa-calendar"></i>
        <div className="DCI">
          <p className="text-[10px] font-semibold">Ngày nhận xe</p>
          <p className="text-[13px] font-bold">
            {dateSelectedPickUp.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }) +
              " - " +
              timePickUpSelected}
          </p>
        </div>
        <DropDownContent
          isOpen={!!isPickUp}
          className="bg-white min-lg:min-w-xs max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:w-screen w-full max-w-[500px] absolute left-0 p-5 mt-15 border border-gray-300 rounded-2xl z-10"
        >
          <Calendar_OneMonth_Timer
            dateSelected={dateSelectedPickUp}
            dateStartSelected={dateSelectedPickUp}
            dateEndSelected={dateSelectedDropOff}
            dates={datesPickUp}
            nextMonth={nextMonthDatesPickUp}
            prevMonth={prevMonthDatesPickUp}
            selectTime={timePickUpSelected}
            onSelected={setDateSelectedPickup}
            setSelectTime={setTimePickUpTimeSelected}
            onSetToday={SetToday}
          />
        </DropDownContent>
      </WrapDropDownOutLineItem>

      <WrapDropDownOutLineItem
        handleClickOutSide={() => {
          setIsDropOff(false);
        }}
        handleShow={() => {
          setIsDropOff(!isDropOff)!;
          setDatesDropOffFromDate(dateSelectedDropOff);
        }}
        className="w-full"
      >
        <i className="fa-solid fa-calendar"></i>
        <div className="DCI">
          <p className="text-[10px] font-semibold">Ngày trả xe</p>
          <p className="text-[13px] font-bold">
            {dateSelectedDropOff.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }) +
              " - " +
              timeDropOffSelected}
          </p>
        </div>

        <DropDownContent
          isOpen={!!isDropOff}
          className="bg-white min-lg:min-w-xs max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:w-screen w-full max-w-[500px] top-0 mt-15 left-0 p-5 border border-gray-300 rounded-2xl z-10"
        >
          <Calendar_OneMonth_Timer
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
