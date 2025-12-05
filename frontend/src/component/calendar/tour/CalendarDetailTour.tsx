import React, { useState } from "react";
import WrapDropDownOutLineItem from "../../dropdown-component/WrapDropDownOutLineItem";
import { useTourCalendar } from "../../../store";
import DropDownContent from "../../dropdown-component/DropDownContent";
import Calendar_OneMonth from "../CalendarBase/Calendar_OneMonth";

const CalendarDetailTour = () => {
    const [isShow,setIsShow] = useState<boolean>(false)

  const {
    dateSelectedBook,
    datesBook,
    nextMonth,
    prevMonth,
    setDateSelectedBook,
    SetToday,
  } = useTourCalendar();
  return (
    <div>
      {" "}
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
          <div className="DCI text-center">
            <p className="text-[10px]">Hãy lựa chọn ngày</p>
            <p className="text-[13px] font-bold">
              {dateSelectedBook.toLocaleDateString("en-US",{
                month:"long",
                day:"2-digit",
                year:"numeric"
              })}
            </p>
          </div>
          <i className="fa-solid fa-caret-down"></i>
        </div>
        <DropDownContent
          isOpen={isShow}
          className={`top-0 mt-15 w-full border border-gray-200 p-5 rounded bg-white`}
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
    </div>
  );
};

export default CalendarDetailTour;
