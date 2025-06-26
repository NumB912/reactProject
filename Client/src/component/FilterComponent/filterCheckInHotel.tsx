import React, { useState } from 'react'
import { useCalendarHotel } from '../../store/calendar_hotel_store';
import { useHotelFilter } from '../../store/filter_store';
import { formatDate } from '../../utils/TimeHandle';
import Calendar_Hotel from '../calendar/calendar_hotel';
import Traveler_Hotel from '../SelectComponent/traveler_hotel';
import useTravelerHotel from '../../store/traveler_store_hotel';

interface Props{
  style?:String
}

const FilterCheckInHotel = ({style=""}:Props) => {
  const [showRoomAndGuest, setShowRoomAndGuest] = useState(false);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const { roomQuantity, total } = useTravelerHotel();
  const {
    dateSelectedBook,
    dateSelectedCheckOut,
  } = useCalendarHotel();

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
        *:flex *:justify-evenly *:items-center *:p-1.5 *:w-full *:gap-3 *:border *:border-gray-300 *:rounded-2xl max-lg:w-full *:max-md:w-3/4 *:max-sm:w-full *:shadow-sm"
        >
          <div
            className="CheckInBlock relative"
            onClick={(e) => {
              e.stopPropagation();
              setShowCheckIn(!showCheckIn);
              if (showRoomAndGuest) {
                setShowRoomAndGuest(!showRoomAndGuest)
              }
            }}
          >
            <i className="fa-solid fa-calendar"></i>
            <div className="DCI text-center max-md:min-w-60 min-md:min-w-52 max-sm:min-w-50">
              <p className="text-[10px]">Check In - Check Out</p>
              <p className="text-[13px] font-bold">
                {formatDate(dateSelectedBook)} - {formatDate(dateSelectedCheckOut)}
              </p>

              <div
                className={`bg-white absolute w-[700px] top-[350px] left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 border border-gray-300 rounded-2xl z-20
      max-lg:left-full max-2xl:left-0 ${showCheckIn ? "" : "hidden"}`}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Calendar_Hotel />
              </div>
            </div>
            <i className="fa-solid fa-caret-down"></i>
          </div>
          <div
            className="roomAndGuest"
            onClick={(e) => {
              setShowRoomAndGuest(!showRoomAndGuest);
              if (showCheckIn) {
                setShowCheckIn(!showCheckIn)
              }
            }}
          >
            <i className="fa-solid fa-users"></i>
            <div className="RAG max-md:min-w-60 text-center max-sm:min-w-50">
              <p className="text-[10px]">Room/Guests</p>
              <p className="text-[13px] font-bold">{`${roomQuantity > 1
                ? `${roomQuantity} rooms`
                : `${roomQuantity} room`
                } ,${total > 1 ? `${total} guests` : `${total} guest`}`}</p>
            </div>
            <i className="fa-solid fa-caret-down"></i>

            <div
              className={`bg-white absolute top-[62px] border border-gray-300 rounded-2xl z-10 ${showRoomAndGuest ? "" : "hidden"
                }`}
            >
              <Traveler_Hotel onClose={setShowRoomAndGuest} />
            </div>
          </div>
        </div>
      </div>
  )
}

export default FilterCheckInHotel