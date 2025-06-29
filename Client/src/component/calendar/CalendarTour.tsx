import React from "react";

import { useTourCalendar } from "../../store/CalendarStore/calendar_tour_store";
import Calendar_OneMonth from "./CalendarBase/Calendar_OneMonth";
import { formatDate } from "../../utils/TimeHandle";
const Calendar_Tour = () => {
  const {
    dateSelectedBook,
    datesBook,
    nextMonth,
    prevMonth,
    setDateSelectedBook,
    setIsOpen,
    isOpen,
  } = useTourCalendar();
  return (
    <div
      className="w-full gap-2 relative flex justify-start items-center self-end 
              cursor-pointer
            *:flex *:justify-evenly *:items-center *:p-3 *:gap-3 *:border *:border-gray-300 *:rounded-md *:shadow-sm
            *:max-2xl:w-3/5 *:max-lg:w-full
            max-sm:flex-wrap max-2xl:justify-center max-lg:w-full"
    >
      <div
        className="CheckInBlock relative"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <i className="fa-solid fa-calendar"></i>
        <div
          className="DCI text-center 
                max-md:min-w-60 min-md:min-w-52 max-sm:min-w-50"
        >
          <p className="text-[10px]">Departure date</p>
          <p className="text-[13px] font-bold">
            {formatDate(dateSelectedBook)}
          </p>

          <div
            className={`bg-white absolute top-16 left-0  p-5 border border-gray-300 rounded-2xl z-20
                     w-[400px]
                     max-xl:left-1/2 max-xl:-translate-x-1/2 max-xl:w-4/5  max-md:w-full ${isOpen ? "" : "hidden"}`}
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
              type="hotel"
            />
          </div>
        </div>
        <i className="fa-solid fa-caret-down"></i>
      </div>
    </div>
  );
};

export default Calendar_Tour;
