import React, { useEffect, useState } from "react";
import { Button, InputBar } from "../UI";
import { useCalendarFlight } from "../../store/CalendarStore/CalendarFlightStore";
import { data } from "react-router";
import { useTravelerFlight } from "../../store";
import { PassengerFlight } from "../Passengers/PassengersFlight";
import { Input } from "@mui/material";
import DropDownOutLineItem from "../DropDownComponent/WrapDropDownOutLineItem";
import CalendarFlight from "../calendar/CalendarFlight";
import DropDownContent from "../DropDownComponent/DropDownContent";
import WrapDropDownOutLineItem from "../DropDownComponent/WrapDropDownOutLineItem";
function SearchFlight() {

  // function handleDate(date?: Date) {
  //   if (!date) return "";

  //   return `${date.toLocaleString("en-US", {
  //     month: "short",
  //   })} ${date.getDate()}`;
  // }

  return (
    <div className="flex justify-center items-center gap-2 max-xl:flex-wrap">
      <div className="flex gap-2 w-full max-sm:flex-wrap">
        <InputBar onChange={()=>{}}/>
        <InputBar onChange={()=>{}}/>
      </div>

      <div
        className="flex gap-2"
      >
        <div className="w-fit"> <CalendarFlight/></div>
        <div className="w-fit"><PassengerFlight onClose={()=>{}}/></div>
      </div>

      <Button
        className="p-4 max-xl:w-full"
        onClick={() => {
          console.log("press");
        }}
      >
        Search
      </Button>
    </div>
  );
}

export default SearchFlight;
