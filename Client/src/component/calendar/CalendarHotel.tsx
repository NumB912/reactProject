import React, { useState } from "react";
import { useChooseCalendar } from "../../store/CalendarStore/calendar_store";
import {
  isToday,
  isSameDay,
  getDateHandle,
  isBetween,
  formatDate,
} from "../../utils/TimeHandle";
import { useCalendarHotel } from "../../store/CalendarStore/calendar_hotel_store";
import Calendar_TwoMonth from "./CalendarBase/Calendar_TwoMonth";

interface CalendarHotelProp{
  CalendarHotelContainerStyle?:string,
  CalendarHotelStyle?:string
}

const Calendar_Hotel = ({CalendarHotelContainerStyle,CalendarHotelStyle}:CalendarHotelProp) => {
  const {
    datesBook,
    datesNextMonth,
    dateSelectedCheckOut,
    setDateSelectedBook,
    dateSelectedBook,
    setDateSelectedCheckOut,
    nextMonth,
    prevMonth,
    SetNextWeek,
    SetThisWeek,
    SetToday
  } = useCalendarHotel();

  const [isShow,setIsShow] = useState(false)
  return (
    <>
      <div
        className={`CheckInBlock relative cursor-pointer ${CalendarHotelContainerStyle}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsShow(!isShow);
          // if (showRoomAndGuest) {
          //   setShowRoomAndGuest(!showRoomAndGuest)
          // }
        }}
      >
        <i className="fa-solid fa-calendar"></i>
        <div className="DCI text-center max-md:min-w-60 min-md:min-w-52 max-sm:min-w-50">
          <p className="text-[10px]">Check In - Check Out</p>
          <p className="text-[13px] font-bold">
            {formatDate(dateSelectedBook)} - {formatDate(dateSelectedCheckOut)}
          </p>

          <div
            className={`bg-white absolute w-[700px] top-[350px] left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 border border-gray-300 rounded-2xl z-20
      max-lg:left-full max-2xl:left-0 ${isShow ? "" : "hidden"} ${CalendarHotelStyle}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Calendar_TwoMonth
              dateSelected={dateSelectedBook}
              dateEndSelected={dateSelectedCheckOut}
              dates={datesBook}
              nextMonth={nextMonth}
              prevMonth={prevMonth}
              nextMonthDates={datesNextMonth}
              onSelected={setDateSelectedBook}
              onEndSelected={setDateSelectedCheckOut}
              onSetNextWeek={SetNextWeek}
              onSetThisWeek={SetThisWeek}
              onSetToday={SetToday}
              type="hotel"
            />
          </div>
        </div>
        <i className="fa-solid fa-caret-down"></i>
      </div>

    </>
  );
};

export default Calendar_Hotel;
