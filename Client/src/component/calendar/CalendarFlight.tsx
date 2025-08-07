import React, { useState } from "react";
import { useCalendarFlight } from "../../store/CalendarStore/CalendarFlightStore";
import { isToday, isSameDay, getDateHandle, formatDate } from "../../utils/TimeHandle";
import WrapDropDownOutLineItem from "../DropDownComponent/WrapDropDownOutLineItem";
import Calendar_TwoMonth from "./CalendarBase/Calendar_TwoMonth";
import DropDownContent from "../DropDownComponent/DropDownContent";
const CalendarFlight = () => {
  const {
    datesBook,
    datesNextMonth,
    dateSelectedReturn,
    setDateSelectedBook,
    dateSelectedBook,
    setDateSelectedReturn,
    isSelectedBook,
    isSelectedReturn,
    setIsSelectedBook,
    setIsSelectedReturn,
    nextMonth,
    prevMonth,
    setThisMonth,
    setThisWeek,
    setTodayMonth,
  } = useCalendarFlight();

const [isShow,setIsShow] = useState(false)
return (    <>
      <WrapDropDownOutLineItem
        handleClickOutSide={()=>{setIsShow(false)}}
        handleShow={()=>{setIsShow(!isShow)}}
        className="w-full"
      >
          <i className="fa-solid fa-calendar"></i>
          <div className="DCI text-center">
            <p className="text-[10px]">Departure - Return</p>
            <p className="text-[13px] font-bold">
              {formatDate(dateSelectedBook)} - {" "}
              {formatDate(dateSelectedReturn)}
            </p>


       <DropDownContent isOpen={isShow} className={`bg-white absolute w-[700px] mt-5 p-5 border border-gray-300 rounded z-20`}>
              <Calendar_TwoMonth
                dateSelected={dateSelectedBook}
                dateEndSelected={dateSelectedReturn}
                dates={datesBook}
                nextMonth={nextMonth}
                prevMonth={prevMonth}
                nextMonthDates={datesNextMonth}
                onSelected={setDateSelectedBook}
                onEndSelected={setDateSelectedReturn}
                type="hotel"
              />
          </DropDownContent>
          </div>
      </WrapDropDownOutLineItem>
    </>)
};

export default CalendarFlight;
