import React from "react";

import { useTourCalendar } from "../../store/CalendarStore/calendar_tour_store";
import Calendar_OneMonth from "./CalendarBase/Calendar_OneMonth";
import { formatDate } from "../../utils/TimeHandle";

interface CalendarTourProp{
  containerStyle?:String;
  CalendarStyleTour?:String;
}

const Calendar_Tour = ({containerStyle,CalendarStyleTour}:CalendarTourProp) => {
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
        className={`CheckInBlock relative w-full flex border justify-evenly items-center p-1.5 gap-3 rounded-sm ${containerStyle}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <i className="fa-solid fa-calendar"></i>
        <div
          className="DCI text-center 
            "
            // 
        >
          <p className="text-[10px]">Departure date</p>
          <p className="text-[13px] font-bold">
            {formatDate(dateSelectedBook)}
          </p>

          <div
            className={`bg-white absolute top-13 left-1/2 -translate-x-1/2 p-5 border border-gray-300 rounded-sm z-20
                     w-[400px] ${CalendarStyleTour}
                     max-md:w-full ${isOpen ? "" : "hidden"}`}
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
  );
};

export default Calendar_Tour;
