import React, { useState } from "react";
import { useCalendarHotel } from "../../store/CalendarStore/CalendarHotelStore";
import { formatDate } from "../../utils/TimeHandle";
import Calendar_Hotel from "../calendar/CalendarHotel";
import Traveler_Hotel from "../Passengers/PassengersHotel";
import useTravelerHotel from "../../store/PassengerStore/CustomerHotelStore";
import PassengersHotel from "../Passengers/PassengersHotel";
import WrapDropDownOutLineItem from "../DropDownComponent/WrapDropDownOutLineItem";
import { Button } from "../UI";

interface Props {
  style?: String;
}

const FilterCheckInHotel = ({ style = "" }: Props) => {
  return (
    <div
      className={`findTab w-full gap-1 flex col-span-2 items-end rounded-xl shadow-sm border border-gray-200 p-5 m-5 max-xl:flex-wrap ${style}`}
    >
      <div className="flex flex-col w-full min-xl:border-r min-xl:border-gray-200 min-xl:pr-3">
        <p className="text-[15px] font-bold">Location:</p>

        <div className="relative flex items-center border-2 border-gray-200 mt-2">
          <input
            type="text"
            className="bg-white p-3 w-full "
            placeholder="Find hotels...."
          />
          <button
            type="button"
            className="absolute right-3 p-1 w-[30px] rounded-[10px] bg-black text-white"
          >
            <i className="fa-solid fa-x"></i>
          </button>
        </div>
      </div>

      <div className="w-full flex items-center justify-center gap-2 mt-2 max-lg:flex-wrap">
        <div className="flex w-full gap-2 max-sm:flex-wrap">
          <Calendar_Hotel />
          <PassengersHotel />
        </div>
        <Button className="w-fit max-lg:w-full" onClick={() => {}}>
          Search
        </Button>
      </div>
    </div>
  );
};

export default FilterCheckInHotel;
