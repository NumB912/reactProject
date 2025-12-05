import React from 'react'

interface PassengerWrap {
    children:React.ReactNode
    styleContainer?:string
    handle?:() => void
}

const PassengerWrap = ({children, styleContainer}: PassengerWrap) => {
  return (
    <div className={`Passenger-wrap ${styleContainer}`}>
      {children}
    </div>
  )
}

export default PassengerWrap