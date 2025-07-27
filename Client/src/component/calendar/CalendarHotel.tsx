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
import WrapDropDownOutLineItem from "../DropDownComponent/WrapDropDownOutLineItem";

interface CalendarHotelProp {
  CalendarHotelStyle?: string;
}

const Calendar_Hotel = ({
  CalendarHotelStyle,
}: CalendarHotelProp) => {
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
    SetToday,
  } = useCalendarHotel();

  const [isShow, setIsShow] = useState(false);
  return (
    <>
      <WrapDropDownOutLineItem
        handleOnClick={() => {

            setIsShow(!isShow);
        }}
      >
          <i className="fa-solid fa-calendar"></i>
          <div className="DCI text-center">
            <p className="text-[10px]">Check In - Check Out</p>
            <p className="text-[13px] font-bold">
              {formatDate(dateSelectedBook)} -{" "}
              {formatDate(dateSelectedCheckOut)}
            </p>

            <div
              className={`bg-white absolute w-[700px] mt-5 p-5 border border-gray-300 left-0 rounded z-20 max-md:w-full ${
                isShow ? "" : "hidden"
              } ${CalendarHotelStyle}`}
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
      </WrapDropDownOutLineItem>
    </>
  );
};

export default Calendar_Hotel;
