import React from "react";
import { useChooseCalendar } from "../../store/calendar_store";
import {
  isToday,
  isSameDay,
  getDateHandle,
  isBetween,
} from "../../utils/TimeHandle";
import { useTourCalendar } from "../../store/calendar_tour_store";
import { CalendarTwoMonth } from "./interfaceCalendar/CalendarBaseProps";
import Calendar_TwoMonth from "./Calendar_TwoMonth";
const Calendar_Tour = () => {
  const {dateSelectedBook,datesBook,SetToday,dateSelectedCheckOut,datesNextMonth,isSelectedBook,
    isSelectedCheckOut,nextMonth,prevMonth,resetAll,
    resetDatesOnly,setDateSelectedBook,setDateSelectedCheckOut,setDatesBook,setDatesNextMonth,setIsSelectedBook,setIsSelectedCheckOut
  } = useTourCalendar()
  return (
            <Calendar_TwoMonth
              dateSelected={dateSelectedBook}
              dates={datesBook}
              dateEndSelected={dateSelectedCheckOut}
              nextMonth={nextMonth}
              prevMonth={prevMonth}
              nextMonthDates={datesNextMonth}
              onSelected={setDateSelectedBook}
              onEndSelected={setDateSelectedCheckOut}
              type="hotel"
            />
  );
};

export default Calendar_Tour;
