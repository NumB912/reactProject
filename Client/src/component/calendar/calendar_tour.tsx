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
import Calendar_OneMonth from "./Calendar_OneMonth";
const Calendar_Tour = () => {
  const {dateSelectedBook,datesBook,SetToday,dateSelectedCheckOut,datesNextMonth,isSelectedBook,
    isSelectedCheckOut,nextMonth,prevMonth,resetAll,
    resetDatesOnly,setDateSelectedBook,setDateSelectedCheckOut,setDatesBook,setDatesNextMonth,setIsSelectedBook,setIsSelectedCheckOut
  } = useTourCalendar()
  return (
            <Calendar_OneMonth
              dateSelected={dateSelectedBook}
              dates={datesBook}
              nextMonth={nextMonth}
              prevMonth={prevMonth}
              onSelected={setDateSelectedBook}
              type="hotel"
            />
  );
};

export default Calendar_Tour;
