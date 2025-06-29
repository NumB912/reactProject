import React from "react";
import { useChooseCalendar } from "../../store/CalendarStore/calendar_store";
import { isToday, isSameDay, getDateHandle } from "../../utils/TimeHandle";
const Calendar = () => {
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
  } = useChooseCalendar();

  const renderMonth = (dates: Date[]) => {
    return (
        <div className="left w-1/2">
          <div className="nameMonth w-full text-center p-2">
            {datesBook[0].toLocaleString("en-US", { month: "short" }) +
              " " +
              datesBook[0].getFullYear()}
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
  *:font-semibold *:rounded-full *:cursor-pointer"
          >
            {Array.from({ length: 42 }).map((_, index) => {
              const date = getDateHandle(dates)[index];

              return (
                <div
                  key={index}
                  className={`day ${
                    date ? "" : "opacity-0"
                  } ${isToday(date) ? "bg-pink-400 text-white" : ""}
                    ${
                      isSameDay(date, dateSelectedBook)
                        ? "bg-black text-white"
                        : ""
                    }
                    ${
                      isSameDay(date, dateSelectedReturn)
                        ? "bg-blue-400 text-white"
                        : date &&
                          (new Date() > date ||
                            (dateSelectedReturn && date < dateSelectedReturn))
                        ? "text-gray-400"
                        : ""
                    }
                    
                    ${
                      isSelectedBook && date && date < dateSelectedBook
                        ? "text-gray-400"
                        : ""
                    }
                    
                  `}
                  onClick={() => {
                    if (isToday(date)) {
                      return;
                    }
                    if (!date) {
                      return;
                    }
                    if (!isSelectedBook && date) {
                      setDateSelectedBook(date);
                    }
                    if (isSelectedBook) {
                      setDateSelectedReturn(date);
                    }
                  }}
                >
                  {date ? date.getDate() : ""}
                </div>
              );
            })}
          </div>
        </div>
    );
  };
  return (
    <div className="calendar">
      <div className="p-4 pt-0 border-b-2 border-gray-300 mb-5">
        <i className="fa-solid fa-calendar"></i> Select your dates to find best
        prices for your trip
      </div>

      <div className="flex w-full relative justify-center items-center border-b-2 gap-10 border-gray-300 *:p-3">
        {renderMonth(datesBook)}
        {renderMonth(datesNextMonth)}
        <div className="toggle flex justify-between items-center absolute top-0 w-full px-3 *:hover:bg-gray-300 *:rounded-full *:aspect-square *:w-10 *:text-center">
          <div className="toggle right p-2" onClick={prevMonth}>
            <i className="fa-solid fa-angle-left"></i>
          </div>

          <div className="toggle right p-2" onClick={nextMonth}>
            <i className="fa-solid fa-angle-right"></i>
          </div>
        </div>
      </div>

      <div className="flex w-full pt-3 px-5 gap-3 *:font-semibold *:hover:bg-black *:hover:cursor-pointer *:hover:text-white">
        <div className="p-2 rounded-full min-w-27 border text-center" onClick={()=>{
          setTodayMonth();
        }}>
          Today
        </div>
        <div className="p-2 rounded-full min-w-27 border text-center" onClick={()=>{
          setThisWeek();
        }}>
          This week
        </div>
        <div className="p-2 rounded-full min-w-27 border text-center" onClick={()=>{
          setThisMonth()}}>
          This month
        </div>
      </div>
    </div>
  );
};

export default Calendar;
