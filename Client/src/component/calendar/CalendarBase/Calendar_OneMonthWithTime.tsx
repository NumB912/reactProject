import React, { useState } from "react";
import {
  getDateHandle,
  isBetween,
  isSameDay,
  isToday,
} from "../../../utils/TimeHandle";
import { CalendarOneMonthWithTimer } from "../interfaceCalendar/CalendarBaseProps";
import CalendarWrap from "./CalendarWrap";
import ToggleCalendar from "./ToggleNextPrev/ToggleCalendar";
import BottomToggle from "./BottomToggle/BottomToggle";
import TimeSelected from "../../TimerComponent/timeSelected";

const Calendar_OneMonth_Timer = ({
  selectTime,
  dates,
  dateSelected,
  dateStartSelected,
  dateEndSelected,
  nextMonth,
  prevMonth,
  onSelected,
  setSelectTime,
  onSetNextWeek,
  onSetThisWeek,
  onSetToday,
  titleTypeSeletedDate,
}: CalendarOneMonthWithTimer) => {
  const [isTimeOpen, setIsTimeOpen] = useState<boolean>(false)
  const renderItemOneMonth = (
    dates: Date[],
    onSelected: (date: Date) => void
  ) => (
    <>
      <CalendarWrap>
        <div className="DropDownTime flex justify-around items-center border-b-2 border-gray-300 pb-3 my-3">
          <div className="font-semibold">{titleTypeSeletedDate}</div>
          <div className="time border p-3 border-gray-300 relative w-[110px]"
            onClick={(e) => {
              e.stopPropagation();
              setIsTimeOpen(true);
            }}
          >
            {selectTime} <i className="fa-solid fa-caret-down"></i>
            <div
              className={`bg-white absolute top-[200px] left-1/2 -translate-x-1/2 -translate-y-1/2 border border-gray-300 z-10 w-[110px]
                ${isTimeOpen ? "" : "hidden"}`}
            >
              <TimeSelected
                setIsTimeSelected={setIsTimeOpen}
                timeSelected={selectTime}
                isTimeSelected={isTimeOpen}
                setTime={(time) => {
                  setSelectTime(time);
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex w-full relative justify-center items-center border-b-2 gap-10 border-gray-300 *:p-3">
          <div className="calendar w-full flex flex-col">
            <div className="nameMonth w-full text-center p-2">
              {dates[0]
                ? dates[0].toLocaleString("en-US", { month: "short" }) +
                " " +
                dates[0].getFullYear()
                : ""}
            </div>
            <div
              className="DayOfWeek flex justify-center w-full items-center gap-2 my-3 border-b-2 pb-4 border-gray-300
                                  *:w-full *:text-center *:text-sm *:font-semibold "
            >
              <div className="sunday">S</div>
              <div className="monday">M</div>
              <div className="tueday">T</div>
              <div className="wednesday">W</div>
              <div className="thursday">T</div>
              <div className="friday">F</div>
              <div className="saturdays">S</div>
            </div>
            <div
              className="grid grid-cols-7 w-full 
          *:text-center *:aspect-square *:flex *:items-center 
          *:justify-center *:hover:border *:m-[1px]
          *:font-semibold *:rounded-full"
            >
              {renderDayOneMonth(dates, onSelected)}
            </div>
          </div>
          <ToggleCalendar nextMonth={nextMonth} prevMonth={prevMonth} />
        </div>

{/* 
                <BottomToggle onSetNextWeek={onSetNextWeek} onSetThisWeek={onSetThisWeek} onSetToday={onSetToday}/> */}
      </CalendarWrap>
    </>
  );

  const renderDayOneMonth = (
    dates: Date[],
    onSelected: (date: Date) => void
  ) => {
    return Array.from({ length: 42 }).map((_, index) => {
      const date = getDateHandle(dates)[index];
      const isDisabled =
        !date ||
        new Date() > date ||
        (dateSelected !== null && date < dateSelected);
      const isStartDate = isSameDay(date, dateStartSelected ?? undefined);
      const isEndDate = isSameDay(date, dateEndSelected ?? undefined);
      const isab =
        date &&
        dateStartSelected &&
        dateEndSelected &&
        isBetween(date, dateStartSelected, dateEndSelected);
      return (
        <div
          key={index}
          className={`day 
                ${!date ? "opacity-0 cursor-default pointer-events-none" : ""}
                ${isToday(date) ? "bg-pink-400 text-white" : ""}
                ${isStartDate ? "bg-black text-white" : ""}
                ${isEndDate ? "bg-blue text-white" : ""}
                ${isDisabled && !isab ? "text-gray-400" : ""}
                ${isEndDate ? "bg-blue-400" : ""}
                ${date &&
              dateStartSelected &&
              dateEndSelected &&
              isBetween(date, dateStartSelected, dateEndSelected)
              ? "text-gray-400"
              : ""
            }
              `}
          onClick={() => {
            if (!date || isToday(date)) return;
            onSelected(date);
          }}
        >
          {date ? date.getDate() : ""}
        </div>
      );
    });
  };

  return renderItemOneMonth(dates, onSelected);
};

export default Calendar_OneMonth_Timer;
