import React, { useState } from "react";
import { useChooseCalendar } from "../../store/CalendarStore/CalendarFlightStore";
import {
  isToday,
  isSameDay,
  getDateHandle,
  isBetween,
  formatDate,
} from "../../utils/TimeHandle";
import { useTourCalendar } from "../../store/CalendarStore/CalendarTourStore";
import Calendar_OneMonth from "./CalendarBase/Calendar_OneMonth";
import WrapDropDownOutLineItem from "../dropdown-component/WrapDropDownOutLineItem";
import DropDownContent from "../dropdown-component/DropDownContent";
const Calendar_Tour_OneMonth = () => {
  const {
    dateSelectedBook,
    datesBook,
    nextMonth,
    prevMonth,
    setDateSelectedBook,
  } = useTourCalendar();
  const [showCheckIn, setShowCheckIn] = useState(false);
  return (
    <WrapDropDownOutLineItem
      handleClickOutSide={() => {
        setShowCheckIn(false);
      }}
      handleShow={() => {
        setShowCheckIn(!showCheckIn);
      }}
      className="w-full"
    >
      <i className="fa-solid fa-calendar"></i>
      <div className="DCI text-center max-md:min-w-60 min-md:min-w-52 max-sm:min-w-50 p-2">
        <p className="text-[13px] font-bold">{formatDate(dateSelectedBook)}</p>

        {/* <div
            className={`bg-white absolute w-[400px] top-15 left-1/2 -translate-x-1/2 p-5 border border-gray-300 rounded-2xl
      max-lg:left-full max-2xl:left-0 ${showCheckIn ? "" : "hidden"}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          > */}
        <DropDownContent
          isOpen={showCheckIn}
          className="bg-white absolute w-[400px] top-0 left-1/2 -translate-x-1/2 p-5 border border-gray-300 rounded-2xl
      max-lg:left-full max-2xl:left-0"
        >
          <Calendar_OneMonth
            dateSelected={dateSelectedBook}
            dates={datesBook}
            nextMonth={nextMonth}
            prevMonth={prevMonth}
            onSelected={setDateSelectedBook}
          />
        </DropDownContent>
        {/* </div> */}
      </div>
    </WrapDropDownOutLineItem>
  );
};

export default Calendar_Tour_OneMonth;
