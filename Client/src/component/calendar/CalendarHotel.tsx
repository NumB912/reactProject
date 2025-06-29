import React, { useState } from "react";
import { useChooseCalendar } from "../../store/CalendarStore/calendar_store";
import {
  isToday,
  isSameDay,
  getDateHandle,
  isBetween,
  formatDate,
} from "../../utils/TimeHandle";
import { useCalendarHotel } from "../../store/CalendarStore/calendar_hotel_store";
import Calendar_TwoMonth from "./CalendarBase/Calendar_TwoMonth";

const Calendar_Hotel = () => {
  const {
    datesBook,
    datesNextMonth,
    dateSelectedCheckOut,
    setDateSelectedBook,
    dateSelectedBook,
    setDateSelectedCheckOut,
    nextMonth,
    prevMonth,
    setThisMonth,
    setThisWeek,
    setTodayMonth,
  } = useCalendarHotel();
  return (
    <>
            <Calendar_TwoMonth
              dateSelected={dateSelectedBook}
              dateEndSelected={dateSelectedCheckOut}
              dates={datesBook}
              nextMonth={nextMonth}
              prevMonth={prevMonth}
              nextMonthDates={datesNextMonth}
              onSelected={setDateSelectedBook}
              onEndSelected={setDateSelectedCheckOut}
              onSetThisMonth={setThisMonth}
              onSetThisWeek={setThisWeek}
              onSetTodayMonth={setTodayMonth}
              type="hotel"
            />
    </>
  );
};

export default Calendar_Hotel;
