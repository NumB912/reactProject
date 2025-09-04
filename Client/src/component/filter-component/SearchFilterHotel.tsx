import React, { useState } from "react";
import { useCalendarHotel } from "../../store/CalendarStore/CalendarHotelStore";
import { formatDate } from "../../utils/TimeHandle";
import Calendar_Hotel from "../calendar/CalendarHotel";
import Traveler_Hotel from "../passenger-content/PassengersHotel";
import useTravelerHotel from "../../store/PassengerStore/CustomerHotelStore";
import PassengersHotel from "../passenger-content/PassengersHotel";
import WrapDropDownOutLineItem from "../dropdown-component/WrapDropDownOutLineItem";
import { Button } from "../UI";
import SearchFilter from "./SearchFilter";
import InputLabelToggle from "../input-component/Input-label-button";

interface Props {
  className?:string
}

const SearchFilterHotel = ({ className="" }: Props) => {
  return (
    <SearchFilter className={`max-lg:flex-wrap ${className}`}>
        <InputLabelToggle label="Location" placeholder="Find hotel...." handleOnChange={function (): void {
        throw new Error("Function not implemented.");
      } }/>
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
