import React from "react";
import { CalendarTwoMonth } from "./interfaceCalendar/CalendarBaseProps";
import {
  getDateHandle,
  isBetween,
  isSameDay,
  isToday,
} from "../../utils/TimeHandle";

const Calendar_TwoMonth = ({
  dates,
  nextMonth,
  nextMonthDates,
  dateSelected,
  dateEndSelected,
  onSelected,
  prevMonth,
  type,
  onEndSelected,
  onSetThisMonth,
  onSetThisWeek,
  onSetTodayMonth
}: CalendarTwoMonth) => {
  const renderDaysTwoMonth = (
    dates: Date[],
    dateSelected: Date | null,
    dateSelectedCheckOut: Date | null,
    onSelected: (date: Date) => void,
    onSelectedCheckOut?: (date: Date) => void
  ) => {
    return Array.from({ length: 42 }).map((_, index) => {
      const date = getDateHandle(dates)[index];

      const isDisabled =
        !date ||
        new Date() > date ||
        (dateSelected !== null && date < dateSelected);
      const isStartDate = isSameDay(date, dateSelected ?? undefined);
      const isEndDate = isSameDay(date, dateSelectedCheckOut ?? undefined);
      const isInRange =
        date &&
        dateSelected &&
        dateSelectedCheckOut &&
        isBetween(date, dateSelected, dateSelectedCheckOut);

      return (
        <div
          key={index}
          className={`day 
              ${!date ? "opacity-0 cursor-default pointer-events-none" : ""}
              ${isToday(date) ? "bg-pink-400 text-white" : ""}
              ${isStartDate ? "bg-black text-white" : ""}
              ${isEndDate ? "bg-blue-400 text-white" : ""}
              ${isDisabled ? "text-gray-400" : ""}
              ${isInRange ? " text-gray-400" : ""}
            `}
          onClick={() => {
            if (!date || isToday(date)) return;
            if (!dateSelected) {
              onSelected(date);
            } else {
              onSelectedCheckOut?.(date);
            }
          }}
        >
          {date ? date.getDate() : ""}
        </div>
      );
    });
  };

  let renderItemTwoMonth = (
    <div>
      <div className="calendar">
        <div className="p-4 pt-0 border-b-2 border-gray-300 mb-5">
          <i className="fa-solid fa-calendar"></i> Select your dates to find
          best prices for your trip
        </div>

        <div className="flex w-full relative justify-center items-center border-b-2 gap-10 border-gray-300 *:p-3">
          <div className="left w-1/2">
            <div className="nameMonth w-full text-center p-2">
              {dates[0].toLocaleString("en-US", { month: "short" }) +
                " " +
                dates[0].getFullYear()}
            </div>
            <div
              className="DayOfWeek flex justify-center items-center gap-2 my-3 border-b-2 pb-4 border-gray-300
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
              className="grid grid-cols-7 gap-1.5 w-full 
      *:text-center *:aspect-square *:flex *:items-center 
      *:justify-center *:hover:border-2 *:hover:shadow-2xl 
      *:font-semibold *:rounded-full"
            >
              {renderDaysTwoMonth(
                dates,
                dateSelected,
                dateEndSelected ?? null,
                onSelected,
                onEndSelected
              )}
            </div>
          </div>
          <div className="right w-1/2">
            <div className="nameMonth w-full text-center p-2">
              {dates[0].toLocaleString("en-US", { month: "short" }) +
                " " +
                dates[0].getFullYear()}
            </div>
            <div
              className="DayOfWeek flex justify-center items-center gap-2 my-3 border-b-2 pb-4 border-gray-300
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
              className="grid grid-cols-7 gap-1.5 w-full 
      *:text-center *:aspect-square *:flex *:items-center 
      *:justify-center *:hover:border-2 *:hover:shadow-2xl 
      *:font-semibold *:rounded-full"
            >
              {renderDaysTwoMonth(
                nextMonthDates,
                dateSelected,
                dateEndSelected ?? null,
                onSelected,
                onEndSelected
              )}
            </div>
          </div>

          <div className="toggle flex justify-between items-center absolute top-0 w-full px-3 *:hover:bg-gray-300 *:rounded-full *:aspect-square *:w-10 *:text-center">
            <div className="toggle right p-2" onClick={prevMonth}>
              <i className="fa-solid fa-angle-left"></i>
            </div>

            <div className="toggle right p-2" onClick={nextMonth}>
              <i className="fa-solid fa-angle-right"></i>
            </div>
          </div>
        </div>

        <div className="flex p-3 gap-3">
          <div className="flex gap-3">
            <div className="bg-pink-400 p-3"></div>
            <p>Today</p>
          </div>

          <div className="flex gap-3">
            <div className="bg-black p-3"></div>
            <p>CheckIn</p>
          </div>

          <div className="flex gap-3">
            <div className="bg-blue-400 p-3"></div>
            <p>CheckOut</p>
          </div>
        </div>

        <div className="flex w-full pt-3 px-5 gap-3 *:font-semibold *:hover:bg-black *:hover:cursor-pointer *:hover:text-white">
          <div className="p-2 rounded-full min-w-27 border text-center" onClick={onSetTodayMonth}>
            Today
          </div>
          <div className="p-2 rounded-full min-w-27 border text-center" onClick={onSetThisWeek}>
            This week
          </div>
          <div className="p-2 rounded-full min-w-27 border text-center" onClick={onSetTodayMonth}>
            This month
          </div>
        </div>
      </div>
    </div>
  );

  return <div>{renderItemTwoMonth}</div>;
};

export default Calendar_TwoMonth;
