import React, { useState } from "react";
import { useCalendarHotel } from "../../store/CalendarStore/CalendarHotelStore";
import { formatDate } from "../../utils/TimeHandle";
import Calendar_Hotel from "../calendar/CalendarHotel";
import Traveler_Hotel from "../PassengerComponent/PassengersHotel";
import useTravelerHotel from "../../store/PassengerStore/CustomerHotelStore";
import PassengersHotel from "../PassengerComponent/PassengersHotel";
import WrapDropDownOutLineItem from "../DropDownComponent/WrapDropDownOutLineItem";
import { Button } from "../UI";
import SearchFilter from "./SearchFilter";
import InputLabelToggle from "../InputComponent/Input-label-button";

interface Props {
  style?: String;
}

const SearchFilterHotel = ({ style = "" }: Props) => {
  return (
    <SearchFilter className="max-lg:flex-wrap">
        <InputLabelToggle handleOnChange={()=>{}} label="Location" placeholder="Find hotel...."/>
      <div className="w-full flex items-center justify-center gap-2 mt-2 max-lg:flex-wrap">
        <div className="flex w-full gap-2 max-sm:flex-wrap">
          <Calendar_Hotel CalendarHotelClass="max-sm:w-screen max-sm:-translate-x-1/2  max-sm:left-1/2 max-lg:w-full max-lg:left-0 max-md:flex-wrap min-lg:left-1/2 min-lg:-translate-x-1/2 "/>
          <PassengersHotel />
        </div>
        <Button className="w-fit max-lg:w-full" onClick={() => {}}>
          Search
        </Button>
      </div>
    </SearchFilter>
  );
};

export default SearchFilterHotel;
