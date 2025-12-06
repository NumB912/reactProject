import React from "react";
import CalendarRentalCar from "../calendar/CalendarRentalCar";
import Passengers from "../passenger-content/PassengersRentalCar";
import { Button } from "../UI";
import SearchFilter from "./SearchFilter";
import InputLabelToggle from "../input-component/Input-label-button";

const SearchFilterRentalCar = () => {
  return (
    <SearchFilter className="max-xl:flex-wrap ">
      <InputLabelToggle
        handleOnChange={() => {}}
        label="Location"
        placeholder="Find hotel...."
      />
      <div className="gap-2 relative flex justify-start items-center self-end max-lg:flex-wrap max-xl:w-full">
        <CalendarRentalCar />
        <Passengers />

        <Button
          onClick={() => {
            console.log("hello");
          }}
          className="max-xl:w-full"
        >
          Search
        </Button>
      </div>
    </SearchFilter>
  );
};

export default SearchFilterRentalCar;
