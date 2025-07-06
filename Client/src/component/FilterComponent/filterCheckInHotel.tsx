import React, { useState } from 'react'
import { useCalendarHotel } from '../../store/CalendarStore/calendar_hotel_store';
import { formatDate } from '../../utils/TimeHandle';
import Calendar_Hotel from '../calendar/CalendarHotel';
import Traveler_Hotel from '../SelectComponent/PassengersHotel';
import useTravelerHotel from '../../store/PassengerStore/CustomerHotelStore';
import PassengersHotel from '../SelectComponent/PassengersHotel';

interface Props{
  style?:String
}

const FilterCheckInHotel = ({style=""}:Props) => {


  return (
      <div className={`findTab w-full gap-1 flex col-span-2 justify-center items-center inset-shadow-2xs py-4 pb-7 border-b border-gray-300 ${style}`}>
        <div className="flex flex-col w-2/5 border-r border-gray-200 p-2 max-lg:hidden ">
          <p className="text-[15px] font-bold px-2">Location:</p>

          <div className="relative flex items-center">
            <input
              type="text"
              className="bg-white p-2  w-full"
              placeholder="Find hotels...."
            />
            <button
              type="button"
              className="absolute right-1 p-1 w-[30px] rounded-[10px] bg-black text-white"
            >
              <i className="fa-solid fa-x"></i>
            </button>
          </div>
        </div>

        <div
          className="w-3/5 gap-2 relative flex justify-start items-center self-end max-sm:flex-wrap max-lg:justify-center
        *:flex *:justify-evenly *:items-center *:p-1.5 *:w-full *:gap-3 *:border *:rounded-sm max-lg:w-full *:max-md:w-3/4 *:max-sm:w-full *:shadow-sm"
        >
          <Calendar_Hotel/>
      <PassengersHotel onClose={()=>{}}/>
        </div>
      </div>
  )
}

export default FilterCheckInHotel