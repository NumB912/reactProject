import React, { useState } from "react";
import { useCalendarCarStore } from "../../store/CalendarStore/calendar_car_store";
import {
  isToday,
  isSameDay,
  DaysOfMonth,
  getDateHandle,
} from "../../utils/TimeHandle";
import { TimeSelected } from "../TimerComponent/timeSelected";
import { useTimeStore } from "../../store/time_store";
import Calendar_OneMonth_Timer from "./CalendarBase/Calendar_OneMonthWithTime";
import { CalendarOneMonthWithTimer } from "./interfaceCalendar/CalendarBaseProps";
export const Calendar_rentalCar = ({
  titleTypeSeletedDate,
  dateSelected,
  dates,
  nextMonth,
  onSelected,
  prevMonth,
  type,
  selectTime,
  setSelectTime,
}: CalendarOneMonthWithTimer) => {
  const { dateSelectedDropOff, dateSelectedPickUp,isDateSelectedPickUp,setIsDateSelectedDropOff,setIsDateSelectedPickUp,setDatesPickUpFromDate } = useCalendarCarStore();
      const [passengers,setSelectedPassengers] = useState<string>("Select")
      const [isSelectedPassenger,setIsSelectedPassenger] = useState<boolean>(false)

  return (
    <div
      className="CheckInBlock border"
      onClick={(e) => {
        e.stopPropagation();
        setIsDateSelectedPickUp(!isDateSelectedPickUp);
        setIsDateSelectedDropOff(false);
        setIsSelectedPassenger(false);
        setDatesPickUpFromDate(dateSelectedPickUp);
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
                    max-lg:left-full max-2xl:left-0 ${
                      isDateSelectedPickUp ? "" : "hidden"
                    }`}
      >
        {" "}
        <Calendar_OneMonth_Timer
          dateStartSelected={dateSelectedPickUp}
          setSelectTime={setSelectTime}
          titleTypeSeletedDate={titleTypeSeletedDate}
          dateEndSelected={dateSelectedDropOff}
          dateSelected={dateSelected}
          dates={dates}
          nextMonth={nextMonth}
          onSelected={onSelected}
          prevMonth={prevMonth}
          selectTime={selectTime}
          type="rentalCar"
        />
      </div>
    </div>
  );
};
