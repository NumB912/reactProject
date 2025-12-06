import React, { useEffect, useState } from "react";
import { Button, InputBar } from "../UI";
import { useCalendarFlight } from "../../store/CalendarStore/CalendarFlightStore";
import { data } from "react-router";
import { useTravelerFlight } from "../../store";
import { PassengerFlight } from "../passenger-content/PassengersFlight";
import { Input } from "@mui/material";
import DropDownOutLineItem from "../dropdown-component/WrapDropDownOutLineItem";
import CalendarFlight from "../calendar/CalendarFlight";
import DropDownContent from "../dropdown-component/DropDownContent";
import WrapDropDownOutLineItem from "../dropdown-component/WrapDropDownOutLineItem";
function SearchFlight() {

  // function handleDate(date?: Date) {
  //   if (!date) return "";

  //   return `${date.toLocaleString("en-US", {
  //     month: "short",
  //   })} ${date.getDate()}`;
  // }

  return (
    <div className="flex justify-center items-center gap-2 max-xl:flex-wrap w-full max-w-6xl">
      <div className="flex gap-2 w-full max-sm:flex-wrap">
        <InputBar onChange={()=>{}} placeholder="Nơi cất cánh" nameIcon="plane-departure"/>
        <InputBar onChange={()=>{}} placeholder="Nơi hạ cánh" nameIcon="plane-up"/>
      </div>

      <div
        className="flex gap-2"
      >
        <div className="w-fit"> <CalendarFlight/></div>
        <div className="w-fit"><PassengerFlight onClose={()=>{}}/></div>
      </div>

      <Button
        className="min-xl:max-w-[200px] font-bold w-full h-full"
        onClick={() => {
          console.log("press");
        }}
        variant="primary"
        rounded="full"
      >
        Tìm kiếm
      </Button>
    </div>
  );
}

export default SearchFlight;
