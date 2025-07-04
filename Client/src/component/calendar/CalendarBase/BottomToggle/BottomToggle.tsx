import React from 'react'

interface BottomToggleProp{
    onSetNextWeek?:()=>void;
    onSetThisWeek?:()=>void;
    onSetToday?:()=>void;
}

const BottomToggle = ({onSetNextWeek,onSetThisWeek,onSetToday}:BottomToggleProp) => {
  return (
        <div className="flex w-full p-2 gap-3 *:font-semibold *:hover:bg-black *:hover:cursor-pointer *:hover:text-white">
          <div className="p-2 rounded-full min-w-27 border text-center" onClick={onSetToday}>
            Today
          </div>
          <div className="p-2 rounded-full min-w-27 border text-center" onClick={onSetThisWeek}>
            This week
          </div>
          <div className="p-2 rounded-full min-w-27 border text-center" onClick={onSetNextWeek}>
            Next week
          </div>
        </div>
  )
}

export default BottomToggle