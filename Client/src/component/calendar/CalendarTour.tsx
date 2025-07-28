import React from "react";

import { useTourCalendar } from "../../store/CalendarStore/CalendarTourStore";
import Calendar_OneMonth from "./CalendarBase/Calendar_OneMonth";
import { formatDate, formatDateWeek } from "../../utils/TimeHandle";
import WrapDropDownOutLineItem from "../DropDownComponent/WrapDropDownOutLineItem";

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
    SetToday
  } = useTourCalendar();
  return (
    <WrapDropDownOutLineItem handleClickOutSide={()=>{}} handleShow={()=>{}}>
      <div
        className={`relative flex justify-center items-center gap-3 rounded-full cursor-pointer ${containerStyle}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <i className="fa-solid fa-calendar"></i>
        <div
          className="DCI text-center 
            "
        >
          <p className="text-[10px]">Departure date</p>
          <p className="text-[13px] font-bold">
            {formatDateWeek(dateSelectedBook)}
          </p>

          <div
            className={`bg-white absolute mt-5 left-1/2 -translate-x-1/2 p-5 border border-gray-300 rounded-sm z-20
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
              onSetToday={SetToday}
              type="Tour"
            />
          </div>
        </div>
        <i className="fa-solid fa-caret-down"></i>
      </div>
    </WrapDropDownOutLineItem>
  );
};

export default Calendar_Tour;
