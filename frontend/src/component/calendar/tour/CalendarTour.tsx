import React, { useState } from "react";

import { useTourCalendar } from "../../../store/CalendarStore/CalendarTourStore";
import Calendar_OneMonth from "../CalendarBase/Calendar_OneMonth";
import { formatDate, formatDateWeek } from "../../../utils/TimeHandle";
import WrapDropDownOutLineItem from "../../dropdown-component/WrapDropDownOutLineItem";
import DropDownContent from "../../dropdown-component/DropDownContent";

interface CalendarTourProp {
  containerStyle?: String;
  CalendarTourClassName?: String;
}

const Calendar_Tour = ({
  containerStyle,
  CalendarTourClassName,
}: CalendarTourProp) => {
  const [isShow, setIsShow] = useState(false);
  const {
    dateSelectedBook,
    datesBook,
    nextMonth,
    prevMonth,
    setDateSelectedBook,
    SetToday,
  } = useTourCalendar();

  return (
    <WrapDropDownOutLineItem
      handleClickOutSide={() => {
        setIsShow(false);
      }}
      handleShow={() => {
        setIsShow(!isShow);
      }}
      className="w-full"
    >
      <div className="flex w-full justify-evenly items-center">
        <i className="fa-solid fa-calendar"></i>
        <div
          className="DCI text-center"
        >
          <p className="text-[10px]">Ngày đi</p>
          <p className="text-[13px] font-bold">
            {formatDateWeek(dateSelectedBook)}
          </p>
        </div>
        <i className="fa-solid fa-caret-down"></i>
      </div>
      <DropDownContent
        isOpen={isShow}
        className={`top-0 mt-15 bg-white absolute left-0 w-[400px] p-5 border border-gray-300 rounded-2xl z-20 max-md:left-1/2 max-md:-translate-x-1/2 ${CalendarTourClassName}`}
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
      </DropDownContent>
    </WrapDropDownOutLineItem>
  );
};

export default Calendar_Tour;
