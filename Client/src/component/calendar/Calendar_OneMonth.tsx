import React, { useState } from "react";
import { getDateHandle, isBetween, isSameDay, isToday } from "../../utils/TimeHandle";
import { CalendarBaseProps, CalendarOneMonthWithTimer } from "./interfaceCalendar/CalendarBaseProps";
import { TimeSelected } from "../Timer/timeSelected";
import { useCalendarCarStore } from "../../store/calendar_car_store";
import Calendar_Tour_OneMonth from "./Calendar_tour_OneMonth";

const Calendar_OneMonth = ({
  dates,
  dateSelected,
  nextMonth,
  prevMonth,
  onSelected,
}: CalendarBaseProps) => {
  const renderItemOneMonth =(
  dates: Date[],
  onSelected: (date: Date) => void,
)=>(
    <>
      <div className="Calendar_rentalCar">
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
          <div className="toggle flex justify-between items-center absolute top-0 w-full px-3 *:hover:bg-gray-300 *:rounded-full *:aspect-square *:w-10 *:text-center">
            <div
              className="toggle right p-2"
              onClick={(e) => {
                e.stopPropagation();
                prevMonth();
              }}
            >
              <i className="fa-solid fa-angle-left"></i>
            </div>

            <div
              className="toggle right p-2"
              onClick={(e) => {
                e.stopPropagation();
                nextMonth();
              }}
            >
              <i className="fa-solid fa-angle-right"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );

    const renderDayOneMonth = (
      dates: Date[],
      onSelected: (date: Date) => void,
    ) => {
      return Array.from({ length: 42 }).map((_, index) => {
        const date = getDateHandle(dates)[index];
        const isDisabled =
          !date ||
          new Date() > date ||
          (dateSelected !== null && date < dateSelected);

          const isDateSelected = isSameDay(date, dateSelected ?? undefined)
           return (
          <div
            key={index}
            className={`day 
                ${!date ? "opacity-0 cursor-default pointer-events-none" : ""}
                ${isToday(date) ? "bg-pink-400 text-white" : ""}
                ${isDisabled? "text-gray-400" : ""}
                ${isDateSelected?"bg-black text-white":""}
              `}
            onClick={() => {
              if (!date || isToday(date)) return;
              onSelected(date)
            }}
          >
            {date ? date.getDate() : ""}
          </div>
        );
      });
    };

  return (
      renderItemOneMonth(
        dates,
        onSelected
      )
  );
};

export default Calendar_OneMonth;
