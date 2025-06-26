import React from "react";
import { useChooseCalendar } from "../../store/calendar_store";
import {
  isToday,
  isSameDay,
  getDateHandle,
  isBetween,
} from "../../utils/TimeHandle";
import { useTourCalendar } from "../../store/calendar_tour_store";
import Calendar_OneMonth from "./Calendar_OneMonth";
const Calendar_Tour = () => {
  const {dateSelectedBook,datesBook,nextMonth,prevMonth,setDateSelectedBook
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
