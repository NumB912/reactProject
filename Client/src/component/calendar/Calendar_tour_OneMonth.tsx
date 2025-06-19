import React, { useState } from "react";
import { useChooseCalendar } from "../../store/calendar_store";
import {
  isToday,
  isSameDay,
  getDateHandle,
  isBetween,
  formatDate,
} from "../../utils/TimeHandle";
import { useTourCalendar } from "../../store/calendar_tour_store";
import { CalendarTwoMonth } from "./interfaceCalendar/CalendarBaseProps";
import Calendar_TwoMonth from "./Calendar_TwoMonth";
import Calendar_OneMonth from "./Calendar_OneMonth";
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
      <div
        className="CheckInBlock relative"
        onClick={(e) => {
          e.stopPropagation();
          setShowCheckIn(!showCheckIn);
        }}
      >
        <i className="fa-solid fa-calendar"></i>
        <div className="DCI text-center max-md:min-w-60 min-md:min-w-52 max-sm:min-w-50 p-2">
          <p className="text-[13px] font-bold">
            {formatDate(dateSelectedBook)}
          </p>

          <div
            className={`bg-white absolute w-[400px] top-[50px] left-1/2 -translate-x-1/2 p-5 border border-gray-300 rounded-2xl z-10
      max-lg:left-full max-2xl:left-0 ${showCheckIn ? "" : "hidden"}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Calendar_OneMonth
            dateSelected={dateSelectedBook}
            dates={datesBook}
            nextMonth={nextMonth}
            prevMonth={prevMonth}
            onSelected={setDateSelectedBook}
            type="Tour"
            />
          </div>
        </div>
        <i className="fa-solid fa-caret-down"></i>
      </div>
  );
};

export default Calendar_Tour_OneMonth;
