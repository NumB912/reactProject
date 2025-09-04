import React, { useState } from "react";
import { formatDate } from "../../utils/TimeHandle";
import { useCalendarHotel } from "../../store/CalendarStore/CalendarHotelStore";
import Calendar_TwoMonth from "./CalendarBase/Calendar_TwoMonth";
import WrapDropDownOutLineItem from "../dropdown-component/WrapDropDownOutLineItem";
import DropDownContent from "../dropdown-component/DropDownContent";

interface CalendarHotelProp {
  CalendarHotelClass?: string;
}

const Calendar_Hotel = ({ CalendarHotelClass }: CalendarHotelProp) => {
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
        handleClickOutSide={() => {
          setIsShow(false);
        }}
        handleShow={() => {
          setIsShow(!isShow);
        }}
        className="w-full"
      >
        <i className="fa-solid fa-calendar"></i>
        <div className="DCI text-center">
          <p className="text-[10px]">Check In - Check Out</p>
          <p className="text-[13px] font-bold">
            {formatDate(dateSelectedBook)} - {formatDate(dateSelectedCheckOut)}
          </p>
        </div>{" "}
        <i className="fa-solid fa-caret-down"></i>
        <DropDownContent
          isOpen={isShow}
          className={`bg-white absolute w-[550px] p-5 border border-gray-300 rounded z-20 mt-15 ${CalendarHotelClass}`}
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
        </DropDownContent>
      </WrapDropDownOutLineItem>
    </>
  );
};

export default Calendar_Hotel;
