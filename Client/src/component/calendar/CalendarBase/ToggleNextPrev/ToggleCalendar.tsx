import React from 'react'

interface ToggleCalendarProp{
    prevMonth:()=>void;
    nextMonth:()=>void;
    styleToggleCalendarContainer?:string;
    styleToggleStyle?:string
}

const ToggleCalendar = ({prevMonth,nextMonth,styleToggleCalendarContainer,styleToggleStyle}:ToggleCalendarProp) => {
  return (
              <div className={`toggle flex justify-between items-center absolute top-0 w-full px-3 
              *:hover:bg-gray-300 *:rounded-full *:aspect-square *:w-10 *:text-center ${styleToggleCalendarContainer}`}>
            <div className={`toggle right p-2 cursor-pointer ${styleToggleStyle}`} onClick={prevMonth}>
              <i className="fa-solid fa-angle-left"></i>
            </div>

            <div className={`toggle right p-2 cursor-pointer ${styleToggleStyle}`} onClick={nextMonth}>
              <i className="fa-solid fa-angle-right"></i>
            </div>
          </div>
  )
}

export default ToggleCalendar