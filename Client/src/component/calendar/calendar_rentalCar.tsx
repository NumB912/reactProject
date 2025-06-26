import React, { useState } from "react";
import { useCalendarCarStore } from "../../store/calendar_car_store";
import {
  isToday,
  isSameDay,
  DaysOfMonth,
  getDateHandle,
} from "../../utils/TimeHandle";
import { TimeSelected } from "../TimerComponent/timeSelected";
import { useTimeStore } from "../../store/time_store";
import Calendar_OneMonth_Timer from "./Calendar_OneMonthWithTime";
import { CalendarOneMonthWithTimer } from "./interfaceCalendar/CalendarBaseProps";
export const Calendar_rentalCar = ({titleTypeSeletedDate,dateSelected,dates,nextMonth,onSelected,prevMonth,type,selectTime,setSelectTime}:CalendarOneMonthWithTimer) => {
const {dateSelectedDropOff,dateSelectedPickUp} = useCalendarCarStore()
  return (
    <Calendar_OneMonth_Timer
      dateStartSelected={dateSelectedPickUp}
      setSelectTime={setSelectTime}
      titleTypeSeletedDate={titleTypeSeletedDate}
      dateEndSelected={dateSelectedDropOff}
      dateSelected={dateSelected}
      dates={dates}
      nextMonth={nextMonth}
      onSelected={onSelected}
      prevMonth={prevMonth}
      selectTime={selectTime}
      type="rentalCar"
    />
  );
};
