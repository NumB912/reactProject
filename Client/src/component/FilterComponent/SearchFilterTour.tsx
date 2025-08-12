import React from "react";
import Calendar_Tour from "../calendar/CalendarTour";
import { Button } from "../UI";
import InputLabelToggle from "../InputComponent/Input-label-button";
import SearchFilter from "./SearchFilter";

const SearchFilterTour = () => {
  return (
    <SearchFilter className="w-full gap-2 flex col-span-2 items-end rounded-xl shadow-lg border border-gray-200 p-5 m-5 max-xl:flex-wrap">
      <InputLabelToggle handleOnChange={()=>{}} label="Location" placeholder="Find hotel...."/>

      <div className="w-fit flex items-center justify-center gap-2 max-sm:flex-wrap max-xl:w-full min-md:min-w-[500px]">
        <Calendar_Tour CalendarTourClassName={"max-sm:w-screen max-sm:rounded-none"}/>
        <Button className="w-full" onClick={() => {}}>
          Search
        </Button>
      </div>
    </SearchFilter>
  );
};

export default SearchFilterTour;
