import React from 'react'

interface CalendarWrapProps {
    children:React.ReactNode
    styleContainer?:string
    handle?:() => void
}

const CalendarWrap = ({children, styleContainer}: CalendarWrapProps) => {
  return (
    <div className={`calendar-wrap ${styleContainer}`}>
      {children}
    </div>
  )
}

export default CalendarWrap